package com.team10.travel.entity;

import jakarta.persistence.*;

@Entity
public class TravelProfile {
    @Id
    @Column(nullable = false, unique = true)
    private String userIdentifier;

    @Column
    private String destination;

    @Column
    private String travelStyle;

    @Column
    private int budget;

    public String getUserIdentifier() {
        return userIdentifier;
    }

    public void setUserIdentifier(String userIdentifier) {
        this.userIdentifier = userIdentifier;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public String getTravelStyle() {
        return travelStyle;
    }

    public void setTravelStyle(String travelStyle) {
        this.travelStyle = travelStyle;
    }

    public int getBudget() {
        return budget;
    }

    public void setBudget(int budget) {
        this.budget = budget;
    }
}
