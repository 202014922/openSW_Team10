import React, { useState, useEffect } from 'react';
import ApiService from '../../services/ApiService';
import { Container, TextField, Button, Typography, Box, Alert, Grid, MenuItem } from '@mui/material';
import { motion } from 'framer-motion';

function ProfileSettings() {
    const user = JSON.parse(localStorage.getItem('user'));
    const [travelStyle, setTravelStyle] = useState('');
    const [preferredDestination, setPreferredDestination] = useState('');
    const [hobbies, setHobbies] = useState('');
    const [interests, setInterests] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        // 사용자 프로필 가져오기
        ApiService.getUserProfile(user.id)
            .then(response => {
                const data = response.data;
                setTravelStyle(data.travelStyle || '');
                setPreferredDestination(data.preferredDestination || '');
                setHobbies(data.hobbies || '');
                setInterests(data.interests || '');
                setProfilePicture(data.profilePicture || '');
            })
            .catch(error => {
                console.error('프로필 불러오기 실패:', error);
            });
    }, [user.id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedUser = {
                ...user,
                travelStyle,
                preferredDestination,
                hobbies,
                interests,
                profilePicture
            };
            const response = await ApiService.updateUserProfile(updatedUser);
            if(response.data) {
                localStorage.setItem('user', JSON.stringify(response.data));
                setMessage('프로필이 성공적으로 업데이트되었습니다.');
                setError('');
            }
        } catch (error) {
            setError('프로필 업데이트 실패: 정보를 다시 확인해주세요.');
            console.error('프로필 업데이트 실패:', error);
        }
    };

    return (
        <Container maxWidth="sm">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Box sx={{ mt: 8, p: 4, boxShadow: 3, borderRadius: 2 }}>
                    <Typography variant="h4" component="h1" align="center" gutterBottom>
                        프로필 설정
                    </Typography>
                    {message && <Alert severity="success">{message}</Alert>}
                    {error && <Alert severity="error">{error}</Alert>}
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    select
                                    label="여행 성향"
                                    variant="outlined"
                                    fullWidth
                                    value={travelStyle}
                                    onChange={(e) => setTravelStyle(e.target.value)}
                                >
                                    <MenuItem value="모험">모험</MenuItem>
                                    <MenuItem value="휴식">휴식</MenuItem>
                                    <MenuItem value="문화">문화</MenuItem>
                                    <MenuItem value="자연">자연</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="선호 여행지"
                                    variant="outlined"
                                    fullWidth
                                    value={preferredDestination}
                                    onChange={(e) => setPreferredDestination(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="취미"
                                    variant="outlined"
                                    fullWidth
                                    value={hobbies}
                                    onChange={(e) => setHobbies(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="관심사"
                                    variant="outlined"
                                    fullWidth
                                    value={interests}
                                    onChange={(e) => setInterests(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="프로필 사진 URL"
                                    variant="outlined"
                                    fullWidth
                                    value={profilePicture}
                                    onChange={(e) => setProfilePicture(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                            업데이트
                        </Button>
                    </form>
                </Box>
            </motion.div>
        </Container>
    );
}

export default ProfileSettings;