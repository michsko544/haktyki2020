package com.hacktyki.Backend.model.responses;

import com.hacktyki.Backend.model.entity.DiscountCouponEntity;

public class CouponRestModel {
    private String code;
    private String description;

    public CouponRestModel() {
    }

    public CouponRestModel(DiscountCouponEntity discountCouponEntity) {
        this.code = discountCouponEntity.getCodeToUse();
        this.description = discountCouponEntity.getDescription();
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
