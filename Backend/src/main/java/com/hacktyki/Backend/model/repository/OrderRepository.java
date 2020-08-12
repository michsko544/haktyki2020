package com.hacktyki.Backend.model.repository;

import com.hacktyki.Backend.model.entity.OrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<OrderEntity, Long> {
    public List<OrderEntity> findAllByOrderClosed(boolean OrderClosed);
}
