package com.travelmatcher.repository;

import com.travelmatcher.model.Match;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MatchRepository extends JpaRepository<Match, Long> {
    List<Match> findByUserOneId(Long userOneId);
    List<Match> findByUserTwoId(Long userTwoId);
}