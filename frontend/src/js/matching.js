function loadMatching() {
    const app = document.getElementById('app');
    const container = document.createElement('div');
    container.className = 'container';
    container.innerHTML = `
        <h2>매칭된 사용자</h2>
        <ul id="matchesList"></ul>
        <button onclick="navigate('home')">홈으로</button>
    `;
    app.appendChild(container);

    async function fetchMatches() {
        try {
            const response = await fetch('http://localhost:8080/api/match', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            });
            if(response.ok) {
                const matches = await response.json();
                const matchesList = document.getElementById('matchesList');
                if(matches.length === 0) {
                    matchesList.innerHTML = '<li>매칭된 사용자가 없습니다.</li>';
                } else {
                    matches.forEach(match => {
                        const li = document.createElement('li');
                        li.textContent = `${match.userTwo.name} (${match.userTwo.travelStyle})`;
                        const chatBtn = document.createElement('button');
                        chatBtn.textContent = '대화하기';
                        chatBtn.onclick = () => {
                            navigate(`chat?matchId=${match.id}`);
                        };
                        li.appendChild(chatBtn);
                        matchesList.appendChild(li);
                    });
                }
            } else {
                const error = await response.text();
                alert('매칭 조회 실패: ' + error);
            }
        } catch (error) {
            console.error('매칭 조회 오류:', error);
            alert('매칭 조회 중 오류가 발생했습니다.');
        }
    }

    fetchMatches();
}