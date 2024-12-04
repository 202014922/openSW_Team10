import axios from 'axios';

const API_URL = 'http://localhost:8080';

const ApiService = {
    signup: (user) => axios.post(`${API_URL}/auth/signup`, user),
    login: (credentials) => axios.post(`${API_URL}/auth/login`, credentials),
    resetPassword: (email, newPassword) => axios.post(`${API_URL}/auth/reset-password`, null, { params: { email, newPassword } }),
    getUserProfile: (userId) => axios.get(`${API_URL}/user/${userId}`),
    updateUserProfile: (user) => axios.put(`${API_URL}/user/update`, user),
    getAllMatches: () => axios.get(`${API_URL}/match/all`),
    createMatch: (match) => axios.post(`${API_URL}/match/create`, match),
    updateMatchStatus: (id, status) => axios.put(`${API_URL}/match/update-status/${id}`, null, { params: { status } }),
    findMatches: (userId) => axios.get(`${API_URL}/match/find-matches/${userId}`),
    sendMessage: (message) => axios.post(`${API_URL}/chat/send`, message),
    getMessages: (chatId) => axios.get(`${API_URL}/chat/messages/${chatId}`),
    getUserChats: (userId) => axios.get(`${API_URL}/chat/user-chats/${userId}`),
    createPlanner: (planner) => axios.post(`${API_URL}/planner/create`, planner),
    getPlanners: (chatId) => axios.get(`${API_URL}/planner/chat/${chatId}`),
    updatePlanner: (planner) => axios.put(`${API_URL}/planner/update`, planner),
    // 추가 API 호출 메서드 정의
};

export default ApiService;