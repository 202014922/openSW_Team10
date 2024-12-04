package com.travelmatcher.service;

import com.travelmatcher.model.Message;
import com.travelmatcher.repository.MessageRepository;
import com.travelmatcher.repository.MatchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private MatchRepository matchRepository;

    /**
     * 특정 매칭 ID에 대한 모든 메시지를 조회합니다.
     *
     * @param matchId 매칭 ID
     * @return 메시지 목록
     */
    public List<Message> getMessagesByMatchId(Long matchId) {
        return messageRepository.findByMatchIdOrderByTimestampAsc(matchId);
    }

    /**
     * 메시지를 전송합니다.
     *
     * @param matchId 매칭 ID
     * @param sender  발신자
     * @param content 내용
     * @return 저장된 메시지
     */
    public Message sendMessage(Long matchId, String sender, String content) {
        Message message = new Message();
        message.setMatch(matchRepository.findById(matchId).orElse(null));
        message.setSender(sender);
        message.setContent(content);
        message.setTimestamp(LocalDateTime.now());
        return messageRepository.save(message);
    }
}