import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

class WebSocketService {
    constructor() {
        this.client = null;
    }

    connect() {
        this.client = new Client({
            webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
            reconnectDelay: 5000,
            onConnect: () => {
                console.log('WebSocket 연결됨');
            },
            onStompError: (frame) => {
                console.error('Broker reported error: ' + frame.headers['message']);
                console.error('Additional details: ' + frame.body);
            },
        });

        this.client.activate();
    }

    subscribe(destination, callback) {
        if (this.client && this.client.connected) {
            this.client.subscribe(destination, callback);
        }
    }

    sendMessage(destination, message) {
        if (this.client && this.client.connected) {
            this.client.publish({ destination, body: JSON.stringify(message) });
        }
    }

    disconnect() {
        if (this.client) {
            this.client.deactivate();
            console.log('WebSocket 연결 해제됨');
        }
    }
}

export default new WebSocketService();