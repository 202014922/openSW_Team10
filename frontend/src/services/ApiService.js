import axios from 'axios';
import AuthService from './AuthService';

// 기본 API URL 설정
const API_URL = 'http://localhost:8080';

// Axios 인스턴스 생성
const axiosInstance = axios.create({
    baseURL: API_URL,
});

// 요청 인터셉터 추가
axiosInstance.interceptors.request.use(
    (config) => {
        const users = AuthService.getCurrentUser();
        if (users && users.token) {
            config.headers['Authorization'] = `Bearer ${users.token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 응답 인터셉터 추가
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            AuthService.logout();
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// API 호출 메서드 정의
const ApiServiceMethods = {
    signup: (users) => axiosInstance.post(`/auth/signup`, users),
    login: (credentials) => axiosInstance.post(`/auth/login`, credentials),
    resetPassword: (email, newPassword) => axiosInstance.post(`/auth/reset-password`, { email, newPassword }),
    getUserProfile: (userId) => axiosInstance.get(`/user/${userId}`),
    updateUserProfile: (user) => axiosInstance.put(`/user/update`, user),
    uploadProfilePicture: (formData) => axiosInstance.post(`/user/upload-profile-picture`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }),
    getAllMatches: () => axiosInstance.get(`/match/all`),
    createMatch: (match) => axiosInstance.post(`/match/create`, match),
    updateMatchStatus: (id, status) => axiosInstance.put(`/match/update-status/${id}?status=${status}`),
    findMatches: (userId) => axiosInstance.get(`/match/find-matches/${userId}`),
    getNotifications: (userId) => axiosInstance.get(`/match/notifications/${userId}`), // 알림 가져오기
    acceptMatch: (matchId) => axiosInstance.post(`/match/notifications/accept/${matchId}`), // 매칭 수락
    rejectMatch: (matchId) => axiosInstance.post(`/match/notifications/reject/${matchId}`), // 매칭 거절
    sendMessage: (message) => axiosInstance.post(`/chat/send`, message),
    getMessages: (chatId) => axiosInstance.get(`/chat/messages/${chatId}`),
    getUserChats: (userId) => axiosInstance.get(`/chat/user-chats/${userId}`),
    createPlanner: (planner) => axiosInstance.post(`/planner/create`, planner),
    getPlanners: (chatId) => axiosInstance.get(`/planner/chat/${chatId}`),
    updatePlanner: (planner) => axiosInstance.put(`/planner/update`, planner),
    // 추가 API 호출 메서드 정의
};

// Axios 인스턴스와 메서드들을 내보냅니다.
export { axiosInstance };
export default ApiServiceMethods;