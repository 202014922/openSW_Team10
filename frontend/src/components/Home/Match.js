
import React, { useState, useEffect } from 'react';
import ApiService from '../../services/ApiService';
import { Container, Typography, Box, List, ListItem, ListItemText, Button, Alert } from '@mui/material';
import { motion } from 'framer-motion';

function Match() {
    const [matches, setMatches] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));
    const [selectedMatch, setSelectedMatch] = useState(null);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        // 매칭된 사용자 리스트 가져오기
        ApiService.findMatches(user.id)
            .then(response => {
                setMatches(response.data);
            })
            .catch(error => {
                console.error('매칭 목록 불러오기 실패:', error);
                setError('매칭 목록을 불러오는데 실패했습니다.');
            });
    }, [user.id]);

    const handleSelect = async (matchUser) => {
        try {
            const newMatch = {
                user1Id: user.id,
                user2Id: matchUser.id,
                status: '대기'
            };
            const response = await ApiService.createMatch(newMatch);
            if(response.data) {
                setMessage('매칭 요청이 성공적으로 전송되었습니다.');
                setError('');
            }
        } catch (error) {
            setError('매칭 요청 실패: 다시 시도해주세요.');
            console.error('매칭 요청 실패:', error);
        }
    };

    return (
        <Container maxWidth="sm">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <Box sx={{ mt: 8, p: 4, boxShadow: 3, borderRadius: 2 }}>
                    <Typography variant="h4" component="h1" align="center" gutterBottom>
                        매칭 목록
                    </Typography>
                    {message && <Alert severity="success">{message}</Alert>}
                    {error && <Alert severity="error">{error}</Alert>}
                    {matches.length === 0 ? (
                        <Typography variant="body1" align="center">
                            매칭된 사용자가 없습니다.
                        </Typography>
                    ) : (
                        <List>
                            {matches.map(match => (
                                <ListItem key={match.id} sx={{ mb: 1, border: '1px solid #ddd', borderRadius: 1 }}>
                                    <ListItemText primary={match.username} />
                                    <Button variant="contained" color="primary" onClick={() => handleSelect(match)}>
                                        매칭 요청
                                    </Button>
                                </ListItem>
                            ))}
                        </List>
                    )}
                </Box>
            </motion.div>
        </Container>
    );
}

export default Match;