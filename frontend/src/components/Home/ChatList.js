import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ApiService from '../../services/ApiService';
import { Container, Typography, Box, List, ListItem, ListItemText, Button, Alert, Avatar, ListItemAvatar, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import AuthService from '../../services/AuthService';

function ChatList() {
    const [chats, setChats] = useState([]);
    const [users, setUsers] = useState({});
    const user = AuthService.getCurrentUser();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchChats = async () => {
            try {
                if (!user || !user.id) {
                    setError('사용자 정보가 올바르지 않습니다.');
                    setLoading(false);
                    return;
                }
                const response = await ApiService.getUserChats(user.id);
                const chatIds = response.data;
                setChats(chatIds);

                // 상대방 사용자 정보를 가져옵니다.
                const userIds = chatIds.map(chatId => {
                    const parts = chatId.split('_');
                    const smallerId = parseInt(parts[1]);
                    const largerId = parseInt(parts[2]);
                    return smallerId === user.id ? largerId : smallerId;
                });

                const uniqueUserIds = [...new Set(userIds)];
                const userPromises = uniqueUserIds.map(id => ApiService.getUserProfile(id));

                const usersData = await Promise.all(userPromises);
                const usersMap = {};
                usersData.forEach(userData => {
                    usersMap[userData.data.id] = userData.data;
                });
                setUsers(usersMap);
                setLoading(false);
            } catch (err) {
                console.error('채팅 목록을 불러오는 데 실패했습니다.', err);
                setError('채팅 목록을 불러오는 데 실패했습니다.');
                setLoading(false);
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
                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                            <CircularProgress />
                        </Box>
                    ) : chats.length === 0 ? (
                        <Typography variant="body1" align="center">
                            채팅방이 없습니다.
                        </Typography>
                    ) : (
                        <List>
                            {chats.map((chatId, index) => {
                                // 상대방 사용자 ID 추출
                                const parts = chatId.split('_');
                                const smallerId = parseInt(parts[1]);
                                const largerId = parseInt(parts[2]);
                                const otherUserId = smallerId === user.id ? largerId : smallerId;
                                const otherUser = users[otherUserId];

                                return (
                                    <ListItem key={index} secondaryAction={
                                        <Button component={Link} to={`/chat/${chatId}`} variant="contained" color="primary">
                                            채팅하기
                                        </Button>
                                    }>
                                        <ListItemAvatar>
                                            {otherUser && otherUser.profilePicture ? (
                                                <Avatar src={`http://localhost:8080${otherUser.profilePicture}`} alt={`${otherUser.username} 프로필`} />
                                            ) : (
                                                <Avatar>{otherUser ? otherUser.username.charAt(0).toUpperCase() : 'U'}</Avatar>
                                            )}
                                        </ListItemAvatar>
                                        <ListItemText primary={`채팅 상대: ${otherUser ? otherUser.username : '유저 ' + otherUserId}`} />
                                    </ListItem>
                                );
                            })}
                        </List>
                    )}
                </Box>
            </motion.div>
        </Container>
    );
}

export default ChatList;