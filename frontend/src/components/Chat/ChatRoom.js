import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ApiService from '../../services/ApiService';
import WebSocketService from '../../services/WebSocketService';
import { Container, Typography, Box, TextField, Button, List, ListItem, ListItemText, Alert } from '@mui/material';
import { motion } from 'framer-motion';

function ChatRoom() {
    const { chatId } = useParams();
    const user = JSON.parse(localStorage.getItem('user'));
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        // 메시지 불러오기
        const fetchMessages = async () => {
            try {
                const response = await ApiService.getMessages(chatId);
                setMessages(response.data);
            } catch (err) {
                setError('메시지를 불러오는 데 실패했습니다.');
            }
        };

        fetchMessages();

        // WebSocket 구독 설정
        WebSocketService.subscribe(`/topic/chat/${chatId}`, (message) => {
            const parsedMessage = JSON.parse(message.body);
            setMessages(prev => [...prev, parsedMessage]);
        });

        return () => {
            // WebSocket 연결 해제는 App.js에서 처리
        };
    }, [chatId]);

    const handleSend = async () => {
        if (input.trim() === '') return;
        const message = {
            chatId,
            senderId: user.id,
            content: input,
        };
        try {
            await ApiService.sendMessage(message);
            setInput('');
        } catch (err) {
            setError('메시지 전송에 실패했습니다.');
        }
    };

    return (
        <Container maxWidth="md">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h4" gutterBottom>
                        채팅방: {chatId}
                    </Typography>
                    {error && <Alert severity="error">{error}</Alert>}
                    <List sx={{ maxHeight: '60vh', overflow: 'auto' }}>
                        {messages.map((msg, index) => (
                            <ListItem key={index}>
                                <ListItemText
                                    primary={`${msg.senderId === user.id ? '나' : `유저 ${msg.senderId}`}: ${msg.content}`}
                                    secondary={new Date(msg.timestamp).toLocaleString()}
                                />
                            </ListItem>
                        ))}
                    </List>
                    <Box sx={{ display: 'flex', mt: 2 }}>
                        <TextField
                            label="메시지 입력"
                            variant="outlined"
                            fullWidth
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleSend();
                                }
                            }}
                        />
                        <Button variant="contained" color="primary" onClick={handleSend} sx={{ ml: 2 }}>
                            전송
                        </Button>
                    </Box>
                    <Box sx={{ mt: 2 }}>
                        <Button component={Link} to={`/planner/${chatId}`} variant="outlined" color="secondary">
                            플래너 작성
                        </Button>
                    </Box>
                </Box>
            </motion.div>
        </Container>
    );
}

export default ChatRoom;