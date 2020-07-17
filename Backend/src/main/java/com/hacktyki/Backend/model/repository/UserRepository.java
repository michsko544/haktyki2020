package com.hacktyki.Backend.model.repository;

import com.hacktyki.Backend.model.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
}
