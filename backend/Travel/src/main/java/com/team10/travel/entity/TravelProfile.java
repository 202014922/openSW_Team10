package com.team10.travel.entity;

import jakarta.persistence.*;

@Entity
public class TravelProfile {
    @Id
    private String userIdentifier;

    @Column
    private String destination;

    @Column
    private String travelStyle;

    @Column
    private int budget;
}
