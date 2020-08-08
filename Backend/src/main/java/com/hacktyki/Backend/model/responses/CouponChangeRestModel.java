package com.hacktyki.Backend.model.responses;

public class CouponChangeRestModel {

    private Long orderId;
    private Long couponId;

    public CouponChangeRestModel() {
    }

    public CouponChangeRestModel(Long orderId, Long couponId) {
        this.orderId = orderId;
        this.couponId = couponId;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public Long getCouponId() {
        return couponId;
    }

    public void setCouponId(Long couponId) {
        this.couponId = couponId;
    }
}
