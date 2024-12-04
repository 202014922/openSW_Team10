import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, List, ListItem, ListItemText } from '@mui/material';
import { motion } from 'framer-motion';

function Notifications() {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        // 알림 데이터를 가져오는 로직 구현
        // 현재는 실제 알림 데이터를 가져오는 API가 없으므로, 추후 구현 필요
        // 예시로 더미 데이터를 사용
        setNotifications([
            { id: 1, message: '새로운 매칭 요청이 도착했습니다.' },
            { id: 2, message: '여행 계획이 업데이트되었습니다.' },
        ]);
    }, []);

    return (
        <Container maxWidth="sm">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <Box sx={{ mt: 8, p: 4, boxShadow: 3, borderRadius: 2 }}>
                    <Typography variant="h4" component="h1" align="center" gutterBottom>
                        알림
                    </Typography>
                    {notifications.length === 0 ? (
                        <Typography variant="body1" align="center">
                            알림이 없습니다.
                        </Typography>
                    ) : (
                        <List>
                            {notifications.map(notif => (
                                <ListItem key={notif.id}>
                                    <ListItemText primary={notif.message} />
                                </ListItem>
                            ))}
                        </List>
                    )}
                </Box>
            </motion.div>
        </Container>
    );
}

export default Notifications;