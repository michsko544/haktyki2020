package com.hacktyki.Backend.model.responses;

public class UserRestModel {

    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String creditCardNumber;

    public UserRestModel() {
    }

    public UserRestModel(String firstName, String lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public UserRestModel(String firstName, String lastName, String phoneNumber, String creditCardNumber) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.creditCardNumber = creditCardNumber;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
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
