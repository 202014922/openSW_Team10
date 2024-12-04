package com.example.travel.repository;

import com.example.travel.entity.Match;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MatchRepository extends JpaRepository<Match, Long>{
    List<Match> findByUser1IdOrUser2Id(Long user1Id, Long user2Id);
}