package com.hacktyki.Backend.model.repository;

import com.hacktyki.Backend.model.entity.NotificationDeviceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationDeviceRepository  extends JpaRepository<NotificationDeviceEntity, Long> {
    NotificationDeviceEntity findByTokenAndUserId(String Token, Long UserId);
    List<NotificationDeviceEntity> findAllByUserId(Long UserId);
}
