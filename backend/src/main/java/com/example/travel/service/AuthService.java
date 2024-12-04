package com.example.travel.service;

import com.example.travel.entity.User;
import com.example.travel.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public User register(User user) {
        if(userRepository.findByUsername(user.getUsername()) != null) {
            throw new RuntimeException("이미 존재하는 사용자 이름입니다.");
        }
        if(userRepository.findByEmail(user.getEmail()) != null) {
            throw new RuntimeException("이미 존재하는 이메일입니다.");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public User login(String username, String password) {
        User user = userRepository.findByUsername(username);
        if(user != null && passwordEncoder.matches(password, user.getPassword())) {
            return user;
        }
        throw new RuntimeException("잘못된 사용자 이름 또는 비밀번호입니다.");
    }

    public void resetPassword(String email, String newPassword) {
        User user = userRepository.findByEmail(email);
        if(user == null) {
            throw new RuntimeException("존재하지 않는 이메일입니다.");
        }
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }
}