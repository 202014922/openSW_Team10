package com.travelmatcher.service;

import com.travelmatcher.model.User;
import com.travelmatcher.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User registerUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User updateTravelPreference(Long userId, String travelStyle, Integer budget) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if(optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setTravelStyle(travelStyle);
            user.setBudget(budget);
            return userRepository.save(user);
        }
        return null;
    }

    public List<User> findPotentialMatches(User user) {
        return userRepository.findAll().stream()
                .filter(u -> !u.getId().equals(user.getId()))
                .filter(u -> u.getTravelStyle().equals(user.getTravelStyle()))
                .filter(u -> Math.abs(u.getBudget() - user.getBudget()) <= 100) // 예산 차이 100 이내
                .collect(Collectors.toList());
    }
}