package com.example.travel.service;

import com.example.travel.entity.Planner;
import com.example.travel.repository.PlannerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlannerService {

    @Autowired
    private PlannerRepository plannerRepository;

    public Planner createPlanner(Planner planner) {
        return plannerRepository.save(planner);
    }

    public List<Planner> getPlanners(String chatId) {
        return plannerRepository.findByChatId(chatId);
    }

    public Planner updatePlanner(Planner updatedPlanner) {
        Planner planner = plannerRepository.findById(updatedPlanner.getId())
                .orElseThrow(() -> new RuntimeException("플래너를 찾을 수 없습니다."));
        planner.setSchedule(updatedPlanner.getSchedule());
        planner.setBudget(updatedPlanner.getBudget());
        planner.setLocation(updatedPlanner.getLocation());
        planner.setTime(updatedPlanner.getTime());
        return plannerRepository.save(planner);
    }
}