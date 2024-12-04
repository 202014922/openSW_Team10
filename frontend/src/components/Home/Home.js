// Home.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Button, Grid, Card, CardContent, Avatar, CircularProgress, Alert } from '@mui/material';
import { motion } from 'framer-motion';
import AuthService from '../../services/AuthService';
import ApiService from '../../services/ApiService';

function Home() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const currentUser = AuthService.getCurrentUser();
                if (!currentUser || !currentUser.id) {
                    throw new Error('사용자 정보가 없습니다.');
                }
                const response = await ApiService.getUserProfile(currentUser.id);
                setUser(response.data);
                setLoading(false);
            } catch (err) {
                console.error('사용자 정보를 불러오는 중 오류 발생:', err);
                setError('사용자 정보를 불러오는 데 실패했습니다.');
                setLoading(false);
                if (err.response && err.response.status === 401) {
                    AuthService.logout();
                    navigate('/login');
                }
            }
        };

        fetchUserProfile();
    }, [navigate]);

    const handleLogout = () => {
        AuthService.logout();
        navigate('/login');
    };

    if (loading) {
        return (
            <Container style={{ textAlign: 'center', marginTop: '50px' }}>
                <CircularProgress />
            </Container>
        );
    }

    if (error) {
        return (
            <Container style={{ textAlign: 'center', marginTop: '50px' }}>
                <Alert severity="error">{error}</Alert>
            </Container>
        );
    }

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
                                {user && user.profilePicture ? (
                                    <Avatar
                                        alt={user.username}
                                        src={`http://localhost:8080${user.profilePicture}`}
                                        sx={{ width: 80, height: 80, mr: 2 }}
                                    />
                                ) : (
                                    <Avatar sx={{ width: 80, height: 80, mr: 2 }}>
                                        {user && user.username ? user.username.charAt(0).toUpperCase() : 'U'}
                                    </Avatar>
                                )}
                                <Typography variant="h4">
                                    안녕하세요, {user && user.username ? user.username : 'User'}님!
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
                                                    <Link to="/match">매칭</Link>
                                                </Typography>
                                                <Typography variant="body2">
                                                    여행 동반자를 찾아보세요.
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Card>
                                            <CardContent>
                                                <Typography variant="h6" gutterBottom>
                                                    <Link to="/chats">채팅</Link>
                                                </Typography>
                                                <Typography variant="body2">
                                                    친구들과 채팅을 나눠보세요.
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