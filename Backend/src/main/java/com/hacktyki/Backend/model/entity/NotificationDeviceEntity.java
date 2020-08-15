package com.hacktyki.Backend.model.entity;

import javax.persistence.*;

@Entity
@Table( name = "notification_device" )
public class NotificationDeviceEntity {

    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "token", nullable = false)
    private String token;
    @Column(name = "user_id", nullable = false)
    private Long userId;

    public NotificationDeviceEntity() {
    }

    public NotificationDeviceEntity(String token, Long userId) {
        this.token = token;
        this.userId = userId;
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
