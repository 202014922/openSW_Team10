package com.team10.travel.controller;


import com.team10.travel.dto.UserDTO;
import com.team10.travel.entity.TravelProfile;
import com.team10.travel.entity.User;
import com.team10.travel.repository.TravelProfileRepository;
import com.team10.travel.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class Controller {
    @Autowired
    private UserService userService;

    @Autowired
    private TravelProfileRepository travelProfileRepository;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserDTO userDTO) {
        User savedUser = userService.register(userDTO);
        if (savedUser != null) {
            return ResponseEntity.ok(savedUser);
        }
        return ResponseEntity.status(401).body("Invalid username or password");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        String identifier = request.get("identifier");
        String password = request.get("password");
        Optional<User> authenticatedUser = userService.authenticate(identifier, password);

        if (authenticatedUser.isPresent()) {
            return ResponseEntity.ok(authenticatedUser.get());
        }
        return ResponseEntity.status(401).body("Invalid credentials");
    }

    @PostMapping("/user")
    public ResponseEntity<?> getName(@RequestBody Map<String, String> request) {
        String identifier = request.get("identifier");
        System.out.println("idd:" + identifier);
        Optional<User> target = userService.getInformation(identifier);

        System.out.println(target);
        if (target.isPresent()) {
            return ResponseEntity.ok(target.get());
        }
        return ResponseEntity.status(401).body("Invalid username or password");
    }

    @PostMapping("/settings")
    public ResponseEntity<?> saveTravelProfile(@RequestBody TravelProfile travelProfile) {
        System.out.println(travelProfile.getDestination());// 유저 식별자가 반드시 설정되어 있어야 하므로, 이미 존재하는 식별자 값이 필요
        if (travelProfile.getUserIdentifier() == null || travelProfile.getUserIdentifier().isEmpty()) {
            return ResponseEntity.status(400).body("User identifier is required.");
        }

        return ResponseEntity.ok(travelProfileRepository.save(travelProfile));
    }

    @PostMapping("/matching")
    public ResponseEntity<?> findMatchingUsers(@RequestBody Map<String, String> request) {
        String identifier = request.get("identifier");
        System.out.println(identifier);
        // 현재 사용자의 여행 프로필을 찾음
        TravelProfile currentUserProfile = travelProfileRepository.findByUserIdentifier(identifier).orElse(null);

        if (currentUserProfile == null) {
            return ResponseEntity.status(404).body("User not found.");
        }

        // 현재 사용자의 destination과 travelStyle을 가져옴
        String destination = currentUserProfile.getDestination();
        String travelStyle = currentUserProfile.getTravelStyle();

        // destination과 travelStyle이 같은 다른 사용자들 찾기
        List<TravelProfile> matchedProfiles = travelProfileRepository.findByDestinationAndTravelStyle(destination, travelStyle);

        // 현재 사용자와 매칭된 사람들의 ID 목록 추출
        List<String> matchedUserIds = matchedProfiles.stream()
                .filter(profile -> !profile.getUserIdentifier().equals(identifier)) // 자기 자신 제외
                .map(TravelProfile::getUserIdentifier) // ID만 추출
                .collect(Collectors.toList());

        if (matchedUserIds.isEmpty()) {
            return ResponseEntity.status(404).body("No matching users found.");
        }

        return ResponseEntity.ok(matchedUserIds);
    }
}
