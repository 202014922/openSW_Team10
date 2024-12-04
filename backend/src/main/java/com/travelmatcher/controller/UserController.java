package com.travelmatcher.controller;

import com.travelmatcher.model.User;
import com.travelmatcher.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*", allowCredentials = "true")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/profile")
    public User getProfile(Principal principal) {
        return userService.findByEmail(principal.getName()).orElse(null);
    }

    @PostMapping("/travel-preference")
    public User setTravelPreference(Principal principal, @RequestBody TravelPreferenceRequest request) {
        User user = userService.findByEmail(principal.getName()).orElse(null);
        if(user != null) {
            return userService.updateTravelPreference(user.getId(), request.getTravelStyle(), request.getBudget());
        }
        return null;
    }

    static class TravelPreferenceRequest {
        private String travelStyle;
        private Integer budget;

        public String getTravelStyle() {
            return travelStyle;
        }

        public void setTravelStyle(String travelStyle) {
            this.travelStyle = travelStyle;
        }

        public Integer getBudget() {
            return budget;
        }

        public void setBudget(Integer budget) {
            this.budget = budget;
        }
    }
}