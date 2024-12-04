import axios from 'axios';

// 기본 API URL 설정
const API_URL = 'http://localhost:8080';

// Axios 인스턴스 생성
const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    // 필요 시 withCredentials 설정
    // withCredentials: true,
});

// API 호출 메서드 정의
const ApiServiceMethods = {
    signup: (user) => axiosInstance.post(`/auth/signup`, user),
    login: (credentials) => axiosInstance.post(`/auth/login`, credentials),
    resetPassword: (email, newPassword) => axiosInstance.post(`/auth/reset-password`, { email, newPassword }),
    getUserProfile: (userId) => axiosInstance.get(`/user/${userId}`),
    updateUserProfile: (user) => axiosInstance.put(`/user/update`, user),
    getAllMatches: () => axiosInstance.get(`/match/all`),
    createMatch: (match) => axiosInstance.post(`/match/create`, match),
    updateMatchStatus: (id, status) => axiosInstance.put(`/match/update-status/${id}`, { status }),
    findMatches: (userId) => axiosInstance.get(`/match/find-matches/${userId}`),
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