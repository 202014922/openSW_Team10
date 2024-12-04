function loadCalendar() {
    const app = document.getElementById('app');
    const container = document.createElement('div');
    container.className = 'container';
    container.innerHTML = `
        <h2>여행 일정 선택</h2>
        <div class="calendar">
            <input type="date" id="datePicker" />
            <button id="addDateBtn">일정 추가</button>
            <ul id="selectedDatesList"></ul>
            <button id="submitDatesBtn">선택 완료</button>
        </div>
    `;
    app.appendChild(container);

    let selectedDates = [];

    document.getElementById('addDateBtn').addEventListener('click', () => {
        const date = document.getElementById('datePicker').value;
        if(date && !selectedDates.includes(date)) {
            selectedDates.push(date);
            const li = document.createElement('li');
            li.textContent = date;
            document.getElementById('selectedDatesList').appendChild(li);
        }
    });

    document.getElementById('submitDatesBtn').addEventListener('click', async () => {
        if(selectedDates.length === 0) {
            alert('일정을 하나 이상 선택해주세요.');
            return;
        }
        try {
            const response = await fetch('http://localhost:8080/api/schedule/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify(selectedDates.map(date => ({ date })))
            });
            if(response.ok) {
                alert('일정 저장 완료');
                navigate('matching');
            } else {
                const error = await response.text();
                alert('일정 저장 실패: ' + error);
            }
        } catch (error) {
            console.error('일정 저장 오류:', error);
            alert('일정 저장 중 오류가 발생했습니다.');
        }
    });
}