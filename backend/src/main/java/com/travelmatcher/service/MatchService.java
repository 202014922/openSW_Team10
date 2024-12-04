
package com.travelmatcher.service;

import com.travelmatcher.model.Match;
import com.travelmatcher.model.User;
import com.travelmatcher.repository.MatchRepository;
import com.travelmatcher.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MatchService {
    @Autowired
    private MatchRepository matchRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Match> getMatchesForUser(Long userId) {
        List<Match> initiated = matchRepository.findByUserOneId(userId);
        List<Match> received = matchRepository.findByUserTwoId(userId);
        initiated.addAll(received);
        return initiated;
    }

    public Match createMatch(Long userOneId, Long userTwoId) {
        User userOne = userRepository.findById(userOneId).orElse(null);
        User userTwo = userRepository.findById(userTwoId).orElse(null);
        if(userOne != null && userTwo != null) {
            // 이미 매칭되었는지 확인
            boolean alreadyMatched = matchRepository.findAll().stream()
                    .anyMatch(m ->
                            (m.getUserOne().getId().equals(userOneId) && m.getUserTwo().getId().equals(userTwoId)) ||
                                    (m.getUserOne().getId().equals(userTwoId) && m.getUserTwo().getId().equals(userOneId))
                    );
            if(alreadyMatched) {
                return null;
            }
            Match match = new Match();
            match.setUserOne(userOne);
            match.setUserTwo(userTwo);
            return matchRepository.save(match);
        }
        return null;
    }
}