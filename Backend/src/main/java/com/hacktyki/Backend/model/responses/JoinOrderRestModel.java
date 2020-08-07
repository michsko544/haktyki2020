package com.hacktyki.Backend.model.responses;

public class JoinOrderRestModel {

    private Long userId;
    private Long orderId;
    private String description;
    private CouponRestModel coupon;

    public JoinOrderRestModel() {
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
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
