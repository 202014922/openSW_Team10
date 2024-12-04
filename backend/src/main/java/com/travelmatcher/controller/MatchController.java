package com.travelmatcher.controller;

import com.travelmatcher.model.Match;
import com.travelmatcher.model.User;
import com.travelmatcher.service.MatchService;
import com.travelmatcher.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/match")
@CrossOrigin(origins = "*", allowCredentials = "true")
public class MatchController {
    @Autowired
    private MatchService matchService;

    @Autowired
    private UserService userService;

    @GetMapping
    public List<Match> getMatches(Principal principal) {
        User user = userService.findByEmail(principal.getName()).orElse(null);
        if(user != null) {
            return matchService.getMatchesForUser(user.getId());
        }
        return List.of();
    }

    @PostMapping("/find")
    public List<User> findPotentialMatches(Principal principal) {
        User user = userService.findByEmail(principal.getName()).orElse(null);
        if(user != null) {
            return userService.findPotentialMatches(user);
        }
        return List.of();
    }

    @PostMapping("/create")
    public Match createMatch(@RequestParam Long userTwoId, Principal principal) {
        User userOne = userService.findByEmail(principal.getName()).orElse(null);
        if(userOne != null) {
            return matchService.createMatch(userOne.getId(), userTwoId);
        }
        return null;
    }
}