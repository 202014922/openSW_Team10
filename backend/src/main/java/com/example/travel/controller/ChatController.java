package com.example.travel.controller;

import com.example.travel.entity.Chat;
import com.example.travel.entity.ChatRoom;
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

    /**
     * 메시지를 보내고 브로드캐스트합니다.
     *
     * @param chat 메시지 객체
     * @return 저장된 메시지
     */
    @PostMapping("/send")
    public Chat sendMessage(@RequestBody Chat chat) {
        Chat savedMessage = chatService.sendMessage(chat.getChatId(), chat.getSenderId(), chat.getContent());
        messagingTemplate.convertAndSend("/topic/chat/" + chat.getChatId(), savedMessage);
        return savedMessage;
    }

    /**
     * 특정 채팅 방의 메시지들을 가져옵니다.
     *
     * @param chatId 채팅 방 ID
     * @return 메시지 리스트
     */
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

    /**
     * 채팅 방을 생성하는 엔드포인트
     *
     * @param chatRoom 채팅 방 정보
     * @return 생성된 채팅 방
     */
    @PostMapping("/create-room")
    public ChatRoom createChatRoom(@RequestBody ChatRoom chatRoom) {
        return chatService.createChatRoom(chatRoom.getChatId(), chatRoom.getUser1Id(), chatRoom.getUser2Id());
    }
}