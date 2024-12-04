function loadLogin() {
    const app = document.getElementById('app');
    const container = app.querySelector('.container');

    document.getElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            if(response.ok) {
                const token = await response.json();
                localStorage.setItem('token', token);
                alert('로그인 성공!');
                loadPreferences();
            } else {
                const error = await response.text();
                alert('로그인 실패: ' + error);
            }
        } catch (error) {
            console.error('로그인 오류:', error);
            alert('로그인 중 오류가 발생했습니다.');
        }
    });

    // 회원가입 페이지로 이동하는 버튼 이벤트 리스너 추가
    document.getElementById('navigateToSignup').addEventListener('click', () => {
        navigate('signup');
    });
}