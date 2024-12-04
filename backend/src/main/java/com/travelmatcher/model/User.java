package com.travelmatcher.model;

import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "users")
@Getter
@Setter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;
    private String password;
    private String name;
    private String gender;
    private Integer age;
    private String travelStyle;
    private Integer budget;

    @OneToMany(mappedBy = "userOne", cascade = CascadeType.ALL)
    private List<Match> matchesInitiated;

    @OneToMany(mappedBy = "userTwo", cascade = CascadeType.ALL)
    private List<Match> matchesReceived;

    // 'messages' 필드는 제거되었습니다.
}