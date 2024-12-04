function loadSignUp() {
    const app = document.getElementById('app');
    const container = document.createElement('div');
    container.className = 'container';
    container.innerHTML = `
        <h2>회원가입</h2>
        <form id="signupForm">
            <input type="email" id="email" placeholder="이메일" required />
            <input type="password" id="password" placeholder="비밀번호" required />
            <input type="text" id="name" placeholder="이름" required />
            <select id="gender" required>
                <option value="">성별 선택</option>
                <option value="male">남성</option>
                <option value="female">여성</option>
                <option value="other">기타</option>
            </select>
            <input type="number" id="age" placeholder="나이" required />
            <button type="submit">가입하기</button>
        </form>
    `;
    app.appendChild(container);

    document.getElementById('signupForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = {
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            name: document.getElementById('name').value,
            gender: document.getElementById('gender').value,
            age: parseInt(document.getElementById('age').value)
        };
        try {
            const response = await fetch('http://localhost:8080/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if(response.ok) {
                alert('회원가입 성공');
                navigate('login');
            } else {
                const error = await response.text();
                alert('회원가입 실패: ' + error);
            }
        } catch (error) {
            console.error('회원가입 오류:', error);
            alert('회원가입 중 오류가 발생했습니다.');
        }
    });
}