package com.hacktyki.Backend.model.entity;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table( name = "order_details")
public class OrderDetailsEntity implements Serializable {

    // properties
    @EmbeddedId
    private OrderDetailsIdentity id;
    @Column(name = "coupon_id")
    private long couponId;
    @Column(name = "description", nullable = false, length = 200)
    private String description;
    @Column(name = "order_owner", nullable = false)
    private boolean orderOwner;
    @ManyToOne // fetch eager
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    private UserEntity userEntity;

    // joined coupon entity
    @OneToOne
    @JoinColumn(name = "coupon_id", insertable = false, updatable = false)
    private DiscountCouponEntity discountCoupon;


    public OrderDetailsEntity() {
    }

    public OrderDetailsIdentity getId() {
        return id;
    }

    public long getCouponId() {
        return couponId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isOrderOwner() {
        return orderOwner;
    }

    public void setOrderOwner(boolean ownerOrder) {
        this.orderOwner = ownerOrder;
    }

    public UserEntity getUserEntity() {
        return userEntity;
    }

    public DiscountCouponEntity getDiscountCoupon() {
        return discountCoupon;
    }
}
