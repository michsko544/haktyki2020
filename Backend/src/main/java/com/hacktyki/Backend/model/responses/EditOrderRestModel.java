package com.hacktyki.Backend.model.responses;

import com.hacktyki.Backend.utils.PaymentFormEnum;

import java.time.LocalDate;
import java.time.LocalTime;

public class EditOrderRestModel {

    private Long orderId;
    private FullOrderDetailsRestModel userOrderDetails;
    private LocalDate date;
    private LocalTime time;
    private PaymentFormEnum paymentForm;

    public EditOrderRestModel() {
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public FullOrderDetailsRestModel getUserOrderDetails() {
        return userOrderDetails;
    }

    public void setUserOrderDetails(FullOrderDetailsRestModel userOrderDetails) {
        this.userOrderDetails = userOrderDetails;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LocalTime getTime() {
        return time;
    }

    public void setTime(LocalTime time) {
        this.time = time;
    }

    public PaymentFormEnum getPaymentForm() {
        return paymentForm;
    }

    public void setPaymentForm(PaymentFormEnum paymentForm) {
        this.paymentForm = paymentForm;
    }
}
