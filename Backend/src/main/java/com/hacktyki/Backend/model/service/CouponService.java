package com.hacktyki.Backend.model.service;

import com.hacktyki.Backend.model.entity.DiscountCouponEntity;
import com.hacktyki.Backend.model.repository.DiscountCouponRepository;
import com.hacktyki.Backend.model.responses.CouponRestModel;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CouponService {

    private DiscountCouponRepository discountCouponRepository;

    public CouponService(DiscountCouponRepository discountCouponRepository) {
        this.discountCouponRepository = discountCouponRepository;
    }

    public Long addCoupon(CouponRestModel couponRestModel){
        if(couponRestModel != null && couponRestModel.getDescription() != null && couponRestModel.getCode() != null) {
            DiscountCouponEntity couponEntity = discountCouponRepository.save(new DiscountCouponEntity(couponRestModel));
            return couponEntity.getId();
        }
        else {
            return null;
        }
    }

    public List<DiscountCouponEntity> getAllByIds(List<Long> couponIdList) {
        if(couponIdList != null) {
        return discountCouponRepository.findAllById(couponIdList);
        }
        return null;
    }

}
