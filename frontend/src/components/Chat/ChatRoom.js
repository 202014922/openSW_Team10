import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import ApiService from '../../services/ApiService';
import WebSocketService from '../../services/WebSocketService';
import { Container, Typography, Box, TextField, Button, List, ListItem, ListItemText, Alert, Avatar, ListItemAvatar } from '@mui/material';
import { motion } from 'framer-motion';
import AuthService from '../../services/AuthService';

function ChatRoom() {
    const { chatId } = useParams();
    const user = AuthService.getCurrentUser();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [error, setError] = useState('');
    const messagesEndRef = useRef(null);
    const subscriptionRef = useRef(null); // 구독 객체를 저장할 ref

    useEffect(() => {
        // WebSocket 연결
        WebSocketService.connect();

        // 메시지 불러오기
        const fetchMessages = async () => {
            try {
                const response = await ApiService.getMessages(chatId);
                setMessages(response.data);
                scrollToBottom();
            } catch (err) {
                console.error('메시지를 불러오는 데 실패했습니다.', err);
                setError('메시지를 불러오는데 실패했습니다.');
            }
        };

        fetchMessages();

        // WebSocket 메시지 핸들러 정의
        const handleMessage = (message) => {
            setMessages(prev => [...prev, message]);
            scrollToBottom();
        };

        // WebSocket 구독 설정 및 구독 객체 저장
        subscriptionRef.current = WebSocketService.subscribe(`/topic/chat/${chatId}`, handleMessage);

        return () => {
            // 컴포넌트 언마운트 시 구독 해제
            if (subscriptionRef.current) {
                subscriptionRef.current.unsubscribe();
                subscriptionRef.current = null;
            }
        };
    }, [chatId]);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

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
            // 메시지를 직접 추가하지 않고, 서버에서 WebSocket을 통해 다시 수신하도록 함
        } catch (err) {
            console.error('메시지 전송에 실패했습니다.', err);
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
                                <ListItemAvatar>
                                    <Avatar>{msg.senderId === user.id ? '�' : '👥'}</Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={`${msg.senderId === user.id ? '나' : `유저 ${msg.senderId}`}: ${msg.content}`}
                                    secondary={new Date(msg.timestamp).toLocaleString()}
                                />
                            </ListItem>
                        ))}
                        <div ref={messagesEndRef} />
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