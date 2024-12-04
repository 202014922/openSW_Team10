package com.example.travel.service;

import com.example.travel.entity.Chat;
import com.example.travel.repository.ChatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ChatService {

    @Autowired
    private ChatRepository chatRepository;

    public Chat sendMessage(String chatId, Long senderId, String content) {
        Chat chat = new Chat();
        chat.setChatId(chatId);
        chat.setSenderId(senderId);
        chat.setContent(content);
        chat.setTimestamp(LocalDateTime.now());
        return chatRepository.save(chat);
    }

    public List<Chat> getMessages(String chatId) {
        return chatRepository.findByChatId(chatId);
    }

    /**
     * 사용자의 채팅 목록을 가져오는 메서드
     * @param userId 사용자 ID
     * @return 채팅 ID 리스트
     */
    public List<String> getUserChats(Long userId) {
        List<Chat> chats1 = chatRepository.findByChatIdStartingWith("chat_" + userId + "_");
        List<Chat> chats2 = chatRepository.findByChatIdEndingWith("_" + userId);
        List<String> chatIds1 = chats1.stream()
                .map(Chat::getChatId)
                .collect(Collectors.toList());
        List<String> chatIds2 = chats2.stream()
                .map(Chat::getChatId)
                .collect(Collectors.toList());
        // 중복 제거를 위해 두 리스트를 합칩니다.
        return chatIds1.stream()
                .distinct()
                .collect(Collectors.toList());
    }
}