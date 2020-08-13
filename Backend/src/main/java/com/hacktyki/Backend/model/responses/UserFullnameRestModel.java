package com.hacktyki.Backend.model.responses;

public class UserFullnameRestModel {

    private String fullname;

    public UserFullnameRestModel() {
    }

    public UserFullnameRestModel(String fullname) {
        this.fullname = fullname;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }
}
