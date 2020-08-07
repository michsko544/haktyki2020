package com.hacktyki.Backend.model.entity;

import com.hacktyki.Backend.model.responses.CouponRestModel;

import javax.persistence.*;

@Entity
@Table( name = "discount_coupon" )
public class DiscountCouponEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column( name = "code_to_use", nullable = false, length = 20)
    private String codeToUse;
    @Column( name = "description", nullable = false, length = 200)
    private String description;

    public DiscountCouponEntity() {
    }

    public DiscountCouponEntity(CouponRestModel couponRestModel) {
        this.codeToUse = couponRestModel.getCode();
        this.description = couponRestModel.getDescription();
    }

    public long getId() {
        return id;
    }

    public String getCodeToUse() {
        return codeToUse;
    }

    public void setCodeToUse(String codeToUse) {
        this.codeToUse = codeToUse;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
