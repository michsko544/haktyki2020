package com.hacktyki.Backend.model.entity;

import javax.persistence.*;

@Entity
@Table(name = "user")
public class UserEntity {

    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private long id;
    @Column(nullable = false)
    private String login;
    @Column(nullable = false)
    private String password;
    private String fullName;
    private String phoneNumber;
    private String creditCardNumber;

    public UserEntity() {
    }

    public UserEntity(String login, String password) {
        this.login = login;
        this.password = password;
    }

    public UserEntity(String login, String password, String fullName, String phoneNumber, String creditCardNumber) {
        this.login = login;
        this.password = password;
        this.fullName = fullName;
        this.phoneNumber = phoneNumber;
        this.creditCardNumber = creditCardNumber;
    }

    public long getId() {
        return id;
    }

    public String getLogin() {
        return login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getCreditCardNumber() {
        return creditCardNumber;
    }

    public void setCreditCardNumber(String creditCardNumber) {
        this.creditCardNumber = creditCardNumber;
    }
}
