package com.example.travel.service;

import com.example.travel.entity.User;
import com.example.travel.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User getUserProfile(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));
    }

    public User updateUserProfile(User updatedUser) {
        User user = userRepository.findById(updatedUser.getId())
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));
        user.setTravelStyle(updatedUser.getTravelStyle());
        user.setPreferredDestination(updatedUser.getPreferredDestination());
        user.setHobbies(updatedUser.getHobbies());
        user.setInterests(updatedUser.getInterests());
        user.setProfilePicture(updatedUser.getProfilePicture());
        user.setAvailableTravelDates(updatedUser.getAvailableTravelDates());
        return userRepository.save(user);
    }

    /**
     * 사용자의 여행 가능 날짜를 추가하는 메서드
     * @param userId 사용자 ID
     * @param date 여행 가능 날짜
     * @return 업데이트된 사용자 정보
     */
    public User addAvailableTravelDate(Long userId, LocalDate date) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));
        List<LocalDate> dates = user.getAvailableTravelDates();
        dates.add(date);
        user.setAvailableTravelDates(dates);
        return userRepository.save(user);
    }
}