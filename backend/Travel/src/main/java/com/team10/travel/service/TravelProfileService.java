package com.team10.travel.service;

import com.team10.travel.entity.TravelProfile;
import com.team10.travel.repository.TravelProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TravelProfileService {

    private final TravelProfileRepository travelProfileRepository;

    @Autowired
    public TravelProfileService(TravelProfileRepository travelProfileRepository) {
        this.travelProfileRepository = travelProfileRepository;
    }

    // 사용자 ID로 여행 프로필 조회
    public Optional<TravelProfile> getProfileByUserIdentifier(String userIdentifier) {
        return travelProfileRepository.findByUserIdentifier(userIdentifier);
    }

    // 새로운 여행 프로필 저장
    public TravelProfile saveProfile(TravelProfile travelProfile) {
        return travelProfileRepository.save(travelProfile);
    }
}