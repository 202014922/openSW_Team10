package com.team10.travel.service;

import com.team10.travel.dto.UserDTO;
import com.team10.travel.entity.User;
import com.team10.travel.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User register(UserDTO userDTO) {
        if (userDTO.getIdentifier() == null ||
                userDTO.getPassword() == null ||
                userDTO.getName() == null ||
                userDTO.getSex() == null) {
            return null; // 정보 입력을 다 하지 않은 경우 회원가입 실패
        }

        if (userRepository.findByIdentifier(userDTO.getIdentifier()).isPresent()) {
            return null; // 이미 사용자 존재하므로 회원가입 실패
        }

        return userRepository.save(userDTO.toUser());
    }

    public Optional<User> authenticate(String identifier, String password) {
        return userRepository.findByIdentifier(identifier)
                .filter(user -> user.getPassword().equals(password));
    }

    public Optional<User> getInformation(String identifier) {
        return userRepository.findByIdentifier(identifier);
    }
}
