package com.example.travel.service;

import com.example.travel.entity.Match;
import com.example.travel.entity.User;
import com.example.travel.repository.MatchRepository;
import com.example.travel.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MatchService {

    @Autowired
    private MatchRepository matchRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Match> getAllMatches() {
        return matchRepository.findAll();
    }

    public Match createMatch(Match match) {
        return matchRepository.save(match);
    }

    public Match updateMatchStatus(Long matchId, String status) {
        Match match = matchRepository.findById(matchId)
                .orElseThrow(() -> new RuntimeException("매칭을 찾을 수 없습니다."));
        match.setStatus(status);
        return matchRepository.save(match);
    }

    /**
     * 사용자 프로필에 기반하여 매칭을 수행하는 메서드
     * @param userId 매칭을 요청한 사용자 ID
     * @return 매칭된 사용자 리스트
     */
    public List<User> findMatches(Long userId) {
        User requestingUser = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

        List<User> allUsers = userRepository.findAll();

        return allUsers.stream()
                .filter(user -> !user.getId().equals(userId))
                .filter(user -> user.getTravelStyle() != null && user.getTravelStyle().equals(requestingUser.getTravelStyle()))
                .filter(user -> user.getPreferredDestination() != null && user.getPreferredDestination().equals(requestingUser.getPreferredDestination()))
                .filter(user -> user.getBudget() != null && user.getBudget().equals(requestingUser.getBudget()))
                .filter(user -> {
                    List<LocalDate> userDates = requestingUser.getAvailableTravelDates();
                    List<LocalDate> otherDates = user.getAvailableTravelDates();
                    if (userDates == null || otherDates == null || userDates.isEmpty() || otherDates.isEmpty()) {
                        return false;
                    }
                    // 날짜 겹치는지 확인
                    return userDates.stream().anyMatch(otherDates::contains);
                })
                .collect(Collectors.toList());
    }
}