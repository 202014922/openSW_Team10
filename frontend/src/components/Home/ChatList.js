import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ApiService from '../../services/ApiService';
import { Container, Typography, Box, List, ListItem, ListItemText, Button, Alert } from '@mui/material';
import { motion } from 'framer-motion';

function ChatList() {
    const [chats, setChats] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const response = await ApiService.getUserChats(user.id);
                setChats(response.data);
            } catch (err) {
                setError('채팅 목록을 불러오는 데 실패했습니다.');
            }
        };

        fetchChats();
    }, [user.id]);

    return (
        <Container maxWidth="md">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h4" gutterBottom>
                        채팅 목록
                    </Typography>
                    {error && <Alert severity="error">{error}</Alert>}
                    {chats.length === 0 ? (
                        <Typography>No chats available.</Typography>
                    ) : (
                        <List>
                            {chats.map((chatId, index) => (
                                <ListItem key={index} secondaryAction={
                                    <Button component={Link} to={`/chat/${chatId}`} variant="contained" color="primary">
                                        채팅하기
                                    </Button>
                                }>
                                    <ListItemText primary={`채팅 ID: ${chatId}`} />
                                </ListItem>
                            ))}
                        </List>
                    )}
                </Box>
            </motion.div>
        </Container>
    );
}

export default ChatList;