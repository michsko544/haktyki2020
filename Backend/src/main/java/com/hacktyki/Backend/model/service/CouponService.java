package com.hacktyki.Backend.model.service;

import com.hacktyki.Backend.model.entity.DiscountCouponEntity;
import com.hacktyki.Backend.model.repository.DiscountCouponRepository;
import com.hacktyki.Backend.model.responses.CouponRestModel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CouponService {

    private final DiscountCouponRepository discountCouponRepository;

    private final Logger logger;

    public CouponService(DiscountCouponRepository discountCouponRepository) {
        this.discountCouponRepository = discountCouponRepository;
        this.logger = LoggerFactory.getLogger(CouponService.class);
    }

    public Long addCoupon(CouponRestModel couponRestModel){
        if(couponRestModel != null && couponRestModel.getDescription() != null && couponRestModel.getCode() != null) {
            logger.info("DB-shot save.");
            DiscountCouponEntity couponEntity = discountCouponRepository.save(new DiscountCouponEntity(couponRestModel));
            return couponEntity.getId();
        }
        else {
            return null;
        }
    }

}
