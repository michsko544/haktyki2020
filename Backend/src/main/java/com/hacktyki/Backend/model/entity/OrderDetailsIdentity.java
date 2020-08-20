package com.hacktyki.Backend.model.entity;

import javax.persistence.*;
import java.io.Serializable;

@Embeddable
public class OrderDetailsIdentity implements Serializable {

    @Column(name = "user_id", nullable = false)
    private long userId;
    @Column(name = "order_id", nullable = false)
    private long orderId;

    public OrderDetailsIdentity() {
    }

    public OrderDetailsIdentity(long userId, long orderId) {
        this.userId = userId;
        this.orderId = orderId;
    }

    public long getUserId() {
        return userId;
    }

    public long getOrderId() {
        return orderId;
    }
}
