function loadPreferences() {
    const app = document.getElementById('app');
    const container = document.createElement('div');
    container.className = 'container';
    container.innerHTML = `
        <h2>여행 성향 및 예산 설정</h2>
        <form id="preferencesForm">
            <select id="travelStyle" required>
                <option value="">여행 스타일 선택</option>
                <option value="adventure">모험</option>
                <option value="relaxation">휴식</option>
                <option value="cultural">문화</option>
                <option value="party">파티</option>
            </select>
            <input type="number" id="budget" placeholder="여행 경비 (USD)" required />
            <button type="submit">저장하기</button>
        </form>
    `;
    app.appendChild(container);

    document.getElementById('preferencesForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = {
            travelStyle: document.getElementById('travelStyle').value,
            budget: parseInt(document.getElementById('budget').value)
        };
        try {
            const response = await fetch('http://localhost:8080/api/user/travel-preference', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify(data)
            });
            if(response.ok) {
                alert('설정 저장 완료');
                navigate('calendar');
            } else {
                const error = await response.text();
                alert('설정 실패: ' + error);
            }
        } catch (error) {
            console.error('설정 오류:', error);
            alert('설정 중 오류가 발생했습니다.');
        }
    });
}