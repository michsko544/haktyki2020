package com.hacktyki.Backend.model.repository;

import com.hacktyki.Backend.model.entity.PaymentFormEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentFormRepository extends JpaRepository<PaymentFormEntity, Long> {
}
