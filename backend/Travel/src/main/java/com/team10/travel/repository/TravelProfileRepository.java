package com.team10.travel.repository;

import com.team10.travel.entity.TravelProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TravelProfileRepository extends JpaRepository<TravelProfile, Long> {
    Optional<TravelProfile> findByUserIdentifier(String userIdentifier);

    List<TravelProfile> findByDestinationAndTravelStyle(String destination, String travelStyle);
}