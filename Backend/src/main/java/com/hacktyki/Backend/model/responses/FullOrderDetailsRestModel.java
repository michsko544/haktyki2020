package com.hacktyki.Backend.model.responses;

import com.hacktyki.Backend.model.entity.OrderDetailsEntity;

public class FullOrderDetailsRestModel {

    private Long userId;
    private String userFullname;
    private String description;
    private CouponRestModel coupon;

    public FullOrderDetailsRestModel() {
    }

    public FullOrderDetailsRestModel(OrderDetailsEntity orderDetailsEntity) {
        this.userId = orderDetailsEntity.getId().getUserId();
        this.userFullname = orderDetailsEntity.getUserEntity().getFullName();
        this.description = orderDetailsEntity.getDescription();
        this.coupon = orderDetailsEntity.getDiscountCoupon() != null ? new CouponRestModel(orderDetailsEntity.getDiscountCoupon()) : null;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUserFullname() {
        return userFullname;
    }

    public void setUserFullname(String userFullname) {
        this.userFullname = userFullname;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public CouponRestModel getCoupon() {
        return coupon;
    }

    public void setCoupon(CouponRestModel coupon) {
        this.coupon = coupon;
    }
}
