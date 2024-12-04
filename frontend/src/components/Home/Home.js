import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Button, Grid, Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';


function Home() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <Container maxWidth="lg">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <Box sx={{ mt: 4 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant="h4">
                                    안녕하세요, {user.username}님!
                                </Typography>
                            </Box>
                            <Box sx={{ mt: 4 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <Card>
                                            <CardContent>
                                                <Typography variant="h6" gutterBottom>
                                                    <Link to="/profile-settings">프로필 설정</Link>
                                                </Typography>
                                                <Typography variant="body2">
                                                    여행 성향 및 선호도를 설정하세요.
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Card>
                                            <CardContent>
                                                <Typography variant="h6" gutterBottom>
                                                    <Link to="/match">매칭 시작</Link>
                                                </Typography>
                                                <Typography variant="body2">
                                                    새로운 여행 파트너를 만나보세요.
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Card>
                                            <CardContent>
                                                <Typography variant="h6" gutterBottom>
                                                    <Link to="/chats">채팅 목록</Link>
                                                </Typography>
                                                <Typography variant="body2">
                                                    현재 진행 중인 채팅을 확인하세요.
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Card>
                                            <CardContent>
                                                <Typography variant="h6" gutterBottom>
                                                    <Link to="/notifications">알림</Link>
                                                </Typography>
                                                <Typography variant="body2">
                                                    새로운 알림을 확인하세요.
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box sx={{ mt: 4 }}>
                                <Button variant="contained" color="secondary" onClick={handleLogout}>
                                    로그아웃
                                </Button>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box
                                sx={{
                                    backgroundImage: 'url(https://source.unsplash.com/featured/?travel)',
                                    height: '400px',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    borderRadius: 2,
                                }}
                                component={motion.div}
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 1 }}
                            >
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </motion.div>
        </Container>
    );
}

export default Home;