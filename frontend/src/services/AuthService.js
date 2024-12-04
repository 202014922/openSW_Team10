import ApiServiceMethods, { axiosInstance } from './ApiService';

class AuthService {
    // 로그인 메서드 수정: credentials 객체 받음
    login(credentials) {
        return ApiServiceMethods.login(credentials)
            .then(response => {
                if (response.data) {
                    // 사용자 정보를 로컬 스토리지에 저장
                    localStorage.setItem('user', JSON.stringify(response.data));
                    // Authorization 헤더에 토큰 추가
                    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
                }
                return response.data;
            });
    }

    logout() {
        // 로컬 스토리지에서 사용자 정보 제거
        localStorage.removeItem('user');
        // Authorization 헤더 제거
        delete axiosInstance.defaults.headers.common['Authorization'];
    }

    signup(user) {
        return ApiServiceMethods.signup(user);
    }

    resetPassword(email, newPassword) {
        return ApiServiceMethods.resetPassword(email, newPassword);
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }

    isAuthenticated() {
        return this.getCurrentUser() !== null;
    }
}

export default new AuthService();