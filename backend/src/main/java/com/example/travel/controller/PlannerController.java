package com.example.travel.controller;

import com.example.travel.entity.Planner;
import com.example.travel.service.PlannerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/planner")
@CrossOrigin(origins = "http://localhost:3000")
public class PlannerController {

    @Autowired
    private PlannerService plannerService;

    @PostMapping("/create")
    public Planner createPlanner(@RequestBody Planner planner) {
        return plannerService.createPlanner(planner);
    }

    @GetMapping("/chat/{chatId}")
    public List<Planner> getPlanners(@PathVariable String chatId) {
        return plannerService.getPlanners(chatId);
    }

    @PutMapping("/update")
    public Planner updatePlanner(@RequestBody Planner planner) {
        return plannerService.updatePlanner(planner);
    }
}