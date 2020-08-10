package com.hacktyki.Backend.model.responses;

import com.hacktyki.Backend.model.entity.DiscountCouponEntity;

import java.util.List;

public class OrderCouponsRestModel {

    private Long orderId;
    private Long actualCouponId;
    private List<DiscountCouponEntity> couponsList;

    public OrderCouponsRestModel() {
    }

    public OrderCouponsRestModel(Long orderId, Long actualCouponId, List<DiscountCouponEntity> couponsList) {
        this.orderId = orderId;
        this.actualCouponId = actualCouponId;
        this.couponsList = couponsList;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public Long getActualCouponId() {
        return actualCouponId;
    }

    public void setActualCouponId(Long actualCouponId) {
        this.actualCouponId = actualCouponId;
    }

    public List<DiscountCouponEntity> getCouponsList() {
        return couponsList;
    }

    public void setCouponsList(List<DiscountCouponEntity> couponsList) {
        this.couponsList = couponsList;
    }
}
