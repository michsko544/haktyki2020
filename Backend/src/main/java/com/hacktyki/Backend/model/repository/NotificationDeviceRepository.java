package com.hacktyki.Backend.model.repository;

import com.hacktyki.Backend.model.entity.NotificationDeviceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationDeviceRepository  extends JpaRepository<NotificationDeviceEntity, Long> {
    public NotificationDeviceEntity getByTokenAndUserId(String Token, Long UserId);
    public NotificationDeviceEntity getByUserId( Long UserId);
    public List<NotificationDeviceEntity> findAllByUserId(Long UserId);
}
