package com.hacktyki.Backend.model.responses;

import com.hacktyki.Backend.model.entity.UserEntity;

public class UserDetailsRestModel {

    private String fullName;
    private String phoneNumber;
    private String creditCardNumber;
    private String swiftBicCode;

    public UserDetailsRestModel() {
    }

    public UserDetailsRestModel(UserEntity userEntity) {
        this.fullName = userEntity.getFullName();
        this.phoneNumber = userEntity.getPhoneNumber();
        this.creditCardNumber = userEntity.getCreditCardNumber();
        this.swiftBicCode = userEntity.getSwiftBicCode();
    }

    public String getFullName() {
        return fullName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public String getCreditCardNumber() {
        return creditCardNumber;
    }

    public String getSwiftBicCode() {
        return swiftBicCode;
    }
}
