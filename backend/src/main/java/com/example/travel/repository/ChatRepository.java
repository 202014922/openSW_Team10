package com.example.travel.repository;

import com.example.travel.entity.Chat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatRepository extends JpaRepository<Chat, Long>{
    List<Chat> findByChatId(String chatId);
    List<Chat> findBySenderId(Long senderId);
}