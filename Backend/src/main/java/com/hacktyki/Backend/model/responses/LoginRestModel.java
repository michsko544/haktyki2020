package com.hacktyki.Backend.model.responses;

public class LoginRestModel {
    private Long userId;
    private String fullname;
    private String authToken;

    public LoginRestModel(Long userId, String fullname, String authToken) {
        this.userId = userId;
        this.fullname = fullname;
        this.authToken = authToken;
    }

    public Long getUserId() {
        return userId;
    }

    public String getFullname() {
        return fullname;
    }

    public String getAuthToken() {
        return authToken;
    }
}
