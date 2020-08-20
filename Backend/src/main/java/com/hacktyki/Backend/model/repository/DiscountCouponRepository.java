package com.hacktyki.Backend.model.repository;

import com.hacktyki.Backend.model.entity.DiscountCouponEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DiscountCouponRepository extends JpaRepository<DiscountCouponEntity,Long> {
}
