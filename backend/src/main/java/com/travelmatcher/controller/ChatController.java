package com.travelmatcher.controller;

import com.travelmatcher.model.Message;
import com.travelmatcher.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {
    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private MessageService messageService;

    @MessageMapping("/sendMessage")
    public void sendMessage(@Payload ChatMessage chatMessage) {
        // 메시지 저장
        Message message = messageService.sendMessage(chatMessage.getMatchId(), chatMessage.getSender(), chatMessage.getContent());
        // 메시지 브로드캐스팅
        messagingTemplate.convertAndSend("/topic/messages/" + chatMessage.getMatchId(), message);
    }

    static class ChatMessage {
        private Long matchId;
        private String sender;
        private String content;

        public Long getMatchId() {
            return matchId;
        }

        public void setMatchId(Long matchId) {
            this.matchId = matchId;
        }

        public String getSender() {
            return sender;
        }

        public void setSender(String sender) {
            this.sender = sender;
        }

        public String getContent() {
            return content;
        }

        public void setContent(String content) {
            this.content = content;
        }
    }
}