package com.example.travel.controller;

import com.example.travel.entity.Chat;
import com.example.travel.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/chat")
@CrossOrigin(origins = "http://localhost:3000")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @PostMapping("/send")
    public Chat sendMessage(@RequestBody Chat chat) {
        Chat savedMessage = chatService.sendMessage(chat.getChatId(), chat.getSenderId(), chat.getContent());
        messagingTemplate.convertAndSend("/topic/chat/" + chat.getChatId(), savedMessage);
        return savedMessage;
    }

    @GetMapping("/messages/{chatId}")
    public List<Chat> getMessages(@PathVariable String chatId) {
        return chatService.getMessages(chatId);
    }

    /**
     * 사용자의 채팅 목록을 가져오는 엔드포인트
     * @param userId 사용자 ID
     * @return 채팅 ID 리스트
     */
    @GetMapping("/user-chats/{userId}")
    public List<String> getUserChats(@PathVariable Long userId) {
        return chatService.getUserChats(userId);
    }
}