package com.hacktyki.Backend.model.entity;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Entity
@Table( name = "order_base" )
public class OrderEntity {

    // properties
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "restaurant", nullable = false, length = 50)
    private String restaurant;
    @Column(name = "order_date", nullable = false)
    private LocalDate orderDate;
    @Column(name = "order_time", nullable = false)
    private LocalTime orderTime;
    @Column(name = "order_closed", nullable = false)
    private boolean orderClosed;
    @Column(name = "payment_form_id", nullable = false)
    private long paymentFormId;
    @Column(name = "discount_coupon_id") // temporary without other table connection
    private long DiscountCouponId;
    @Column(name = "image_source")
    private String imageSource;

    // joined column of payment, list of discount coupons and list of orders
    @ManyToOne // eager
    @JoinColumn(name = "payment_form_id", insertable = false, updatable = false)
    private PaymentFormEntity paymentForm;
    @OneToMany // lazy
    @JoinColumn(name = "order_id", referencedColumnName = "id")
    private List<OrderDetailsEntity> orderDetailsList;

    public OrderEntity() {
    }

    public long getId() {
        return id;
    }

    public String getRestaurant() {
        return restaurant;
    }

    public LocalDate getOrderDate() {
        return orderDate;
    }

    public LocalTime getOrderTime() {
        return orderTime;
    }

    public boolean isOrderClosed() {
        return orderClosed;
    }

    public void setOrderClosed(boolean orderClosed) {
        this.orderClosed = orderClosed;
    }

    public void setPaymentFormId(long paymentFormId) {
        this.paymentFormId = paymentFormId;
    }

    public long getDiscountCouponId() {
        return DiscountCouponId;
    }

    public void setDiscountCouponId(long discountCouponId) {
        DiscountCouponId = discountCouponId;
    }

    public String getImageSource() {
        return imageSource;
    }

    public void setImageSource(String imageSource) {
        this.imageSource = imageSource;
    }

    public PaymentFormEntity getPaymentForm() {
        return paymentForm;
    }

    public List<OrderDetailsEntity> getOrderDetailsList() {
        return orderDetailsList;
    }

}
