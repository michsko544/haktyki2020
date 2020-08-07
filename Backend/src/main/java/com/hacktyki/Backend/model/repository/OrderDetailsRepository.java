package com.hacktyki.Backend.model.repository;

import com.hacktyki.Backend.model.entity.OrderDetailsEntity;
import com.hacktyki.Backend.model.entity.OrderDetailsIdentity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderDetailsRepository extends JpaRepository<OrderDetailsEntity, OrderDetailsIdentity> {
    public OrderDetailsEntity findOrderDetailsEntitiesById_OrderIdAndOrderOwner(long Id_OrderId, boolean OrderOwner);
    public List<OrderDetailsEntity> findAllById_UserId(long Id_UserId);
    public OrderDetailsEntity findAllById_UserIdAndId_OrderId(Long Id_UserId, Long Id_OrderId);
}
