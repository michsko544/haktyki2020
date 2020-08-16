package com.hacktyki.Backend.model.responses;

public class NotificationDeviceRestModel {

    private String token;
    private Long userId;

    public NotificationDeviceRestModel() {
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
