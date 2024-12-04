package com.example.travel.controller;

import com.example.travel.entity.Match;
import com.example.travel.entity.User;
import com.example.travel.service.MatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/match")
@CrossOrigin(origins = "http://localhost:3000")
public class MatchController {

    @Autowired
    private MatchService matchService;

    @GetMapping("/all")
    public List<Match> getAllMatches() {
        return matchService.getAllMatches();
    }

    @PostMapping("/create")
    public Match createMatch(@RequestBody Match match) {
        return matchService.createMatch(match);
    }

    @PutMapping("/update-status/{id}")
    public Match updateMatchStatus(@PathVariable Long id, @RequestParam String status) {
        return matchService.updateMatchStatus(id, status);
    }

    /**
     * 매칭을 요청한 사용자에 기반하여 매칭된 사용자 리스트를 반환하는 엔드포인트
     * @param userId 매칭 요청자의 사용자 ID
     * @return 매칭된 사용자 리스트
     */
    @GetMapping("/find-matches/{userId}")
    public List<User> findMatches(@PathVariable Long userId) {
        return matchService.findMatches(userId);
    }
}