package com.hacktyki.Backend.model.entity;

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

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
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
