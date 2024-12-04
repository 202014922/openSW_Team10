package com.team10.travel.dto;

import com.team10.travel.entity.User;

public class UserDTO {

    private String identifier;
    private String password;
    private String name;
    private String sex;
    private int age;

    public UserDTO(String identifier, String password, String name, String sex, int age) {
        this.identifier = identifier;
        this.password = password;
        this.name = name;
        this.sex = sex;
        this.age = age;
    }

    public String getIdentifier() {
        return identifier;
    }

    public void setIdentifier(String identifier) {
        this.identifier = identifier;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public User toUser() {
        User user = new User();
        user.setIdentifier(identifier);
        user.setPassword(password);
        user.setName(name);
        user.setSex(sex);
        user.setAge(age);
        return user;
    }
}
