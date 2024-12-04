document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');

    function loadPage(page) {
        // 현재 URL을 변경하지만 페이지를 새로고침하지 않음
        window.history.pushState({}, page, `/${page}`);
        // 페이지 로드 로직
        switch(page) {
            case 'home':
                loadHome();
                break;
            case 'signup':
                loadSignUp();
                break;
            case 'login':
                loadLogin();
                break;
            case 'preferences':
                loadPreferences();
                break;
            case 'calendar':
                loadCalendar();
                break;
            case 'matching':
                loadMatching();
                break;
            case 'chat':
                loadChat();
                break;
            default:
                loadHome();
        }
    }

    function handlePopState(event) {
        const path = window.location.pathname.replace('/', '');
        loadPage(path);
    }

    window.navigate = loadPage; // navigate 함수를 전역으로 설정

    window.onpopstate = handlePopState;

    loadPage('login'); // 초기 페이지를 로그인으로 설정
});