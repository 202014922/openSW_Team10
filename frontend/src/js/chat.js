function loadChat(matchId) {
    const app = document.getElementById('app');
    const container = document.createElement('div');
    container.className = 'container';
    container.innerHTML = `
        <h2>대화방</h2>
        <div class="messages" id="messages"></div>
        <div class="chat-input">
            <input type="text" id="messageInput" placeholder="메시지를 입력하세요" />
            <button id="sendBtn">전송</button>
        </div>
    `;
    app.appendChild(container);

    // WebSocket 설정
    const socket = new SockJS('http://localhost:8080/chat-websocket');
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, () => {
        stompClient.subscribe(`/topic/messages/${matchId}`, (msg) => {
            const message = JSON.parse(msg.body);
            displayMessage(message);
        });
    });

    async function fetchMessages() {
        try {
            const response = await fetch(`http://localhost:8080/api/chat/${matchId}`, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            });
            if(response.ok) {
                const messages = await response.json();
                messages.forEach(displayMessage);
            } else {
                const error = await response.text();
                alert('메시지 로드 실패: ' + error);
            }
        } catch (error) {
            console.error('메시지 로드 오류:', error);
            alert('메시지 로드 중 오류가 발생했습니다.');
        }
    }

    function displayMessage(message) {
        const messagesDiv = document.getElementById('messages');
        const msgDiv = document.createElement('div');
        msgDiv.className = 'message';
        msgDiv.innerHTML = `<strong>${message.sender}:</strong> ${message.content}`;
        messagesDiv.appendChild(msgDiv);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    document.getElementById('sendBtn').addEventListener('click', () => {
        const content = document.getElementById('messageInput').value;
        if(content.trim() === '') return;
        stompClient.send("/app/sendMessage", {}, JSON.stringify({
            matchId: matchId,
            sender: getUserEmail(),
            content: content
        }));
        document.getElementById('messageInput').value = '';
    });

    async function getUserEmail() {
        try {
            const response = await fetch('http://localhost:8080/api/user/profile', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            });
            if(response.ok) {
                const user = await response.json();
                return user.email;
            }
            return 'Unknown';
        } catch (error) {
            console.error('사용자 정보 조회 오류:', error);
            return 'Unknown';
        }
    }

    fetchMessages();
}