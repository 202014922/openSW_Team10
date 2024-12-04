import ApiService from './ApiService';

class AuthService {
    login(username, password) {
        return ApiService.login({ username, password })
            .then(response => {
                if (response.data) {
                    // 사용자 정보를 로컬 스토리지에 저장
                    localStorage.setItem('user', JSON.stringify(response.data));
                }
                return response.data;
            });
    }

    logout() {
        // 로컬 스토리지에서 사용자 정보 제거
        localStorage.removeItem('user');
    }

    signup(user) {
        return ApiService.signup(user);
    }

    resetPassword(email, newPassword) {
        return ApiService.resetPassword(email, newPassword);
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }

    isAuthenticated() {
        return this.getCurrentUser() !== null;
    }
}

export default new AuthService();