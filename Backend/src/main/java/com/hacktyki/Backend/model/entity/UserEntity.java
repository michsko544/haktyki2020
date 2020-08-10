package com.hacktyki.Backend.model.entity;

import javax.persistence.*;

@Entity
@Table( name = "user" )
public class UserEntity {

    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "login", nullable = false, length = 50)
    private String login;
    @Column(name = "password", nullable = false, length = 30)
    private String password;
    @Column(name = "fullname", length = 80)
    private String fullName;
    @Column(name = "phone_number", length = 20)
    private String phoneNumber;
    @Column(name = "credit_card_number", length = 40)
    private String creditCardNumber;

    public UserEntity() {
    }

    public UserEntity(String login, String password) {
        this.login = login;
        this.password = password;
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
