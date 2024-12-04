package com.team10.travel.controller;


import com.team10.travel.dto.UserDTO;
import com.team10.travel.entity.User;
import com.team10.travel.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;
import java.util.ResourceBundle;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {
    @Autowired
    private UserService userService;

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
            return ResponseEntity.ok(target.get().getName());
        }
        return ResponseEntity.status(401).body("Invalid User");
    }
}
