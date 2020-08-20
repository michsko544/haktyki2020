package com.hacktyki.Backend.model.responses;

import com.hacktyki.Backend.model.entity.OrderDetailsEntity;
import com.hacktyki.Backend.model.entity.OrderEntity;
import com.hacktyki.Backend.model.entity.UserEntity;
import com.hacktyki.Backend.utils.PaymentFormEnum;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

public class FullOrderRestModel {

    private Long id;
    private Long purchaserId;
    private String restaurant;
    private String image;
    private LocalDate date;
    private LocalTime time;
    private boolean isDelivered;
    private PaymentFormEnum paymentForm;
    private String paymentNumber;
    private String swiftBicCode;
    private List<FullOrderDetailsRestModel> orderDetails;

    public FullOrderRestModel() {
    }

    public FullOrderRestModel(OrderEntity orderEntity) {
        this.id = orderEntity.getId();
        this.purchaserId = (Long) getPaymentOrder(orderEntity)
                                            .getId()
                                            .getUserId();
        this.restaurant = orderEntity.getRestaurant();
        this.image = orderEntity.getImageSource();
        this.date = orderEntity.getOrderDate();
        this.time = orderEntity.getOrderTime();
        this.isDelivered = orderEntity.isDelivered();
        this.paymentForm = orderEntity.getPaymentForm() != null ? orderEntity.getPaymentForm().getPaymentFormName() : null;

        UserEntity paymentUser = getPaymentOrder(orderEntity).getUserEntity();
        this.paymentNumber = paymentForm.toString().equals("BLIK")
                                                ? paymentUser.getPhoneNumber()
                                                : paymentForm.toString().equals("TRANSFER")
                                                    ? paymentUser.getCreditCardNumber()
                                                    : null;
        this.swiftBicCode = paymentForm.toString().equals("TRANSFER")
                                                ? paymentUser.getSwiftBicCode()
                                                : null;
        this.orderDetails = orderEntity.getOrderDetailsList()
                                        .stream()
                                        .map(FullOrderDetailsRestModel::new)
                                        .collect(Collectors.toList());
    }

    private OrderDetailsEntity getPaymentOrder(OrderEntity orderEntity){
        return orderEntity.getOrderDetailsList()
                .stream()
                .filter(OrderDetailsEntity::isOrderOwner)
                .findFirst()
                .get();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getPurchaserId() {
        return purchaserId;
    }

    public void setPurchaserId(Long purchaserId) {
        this.purchaserId = purchaserId;
    }

    public String getRestaurant() {
        return restaurant;
    }

    public void setRestaurant(String restaurant) {
        this.restaurant = restaurant;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
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

    public boolean isDelivered() {
        return isDelivered;
    }

    public void setDelivered(boolean delivered) {
        isDelivered = delivered;
    }

    public PaymentFormEnum getPaymentForm() {
        return paymentForm;
    }

    public void setPaymentForm(PaymentFormEnum paymentForm) {
        this.paymentForm = paymentForm;
    }

    public String getPaymentNumber() {
        return paymentNumber;
    }

    public void setPaymentNumber(String paymentNumber) {
        this.paymentNumber = paymentNumber;
    }

    public String getSwiftBicCode() {
        return swiftBicCode;
    }

    public void setSwiftBicCode(String swiftBicCode) {
        this.swiftBicCode = swiftBicCode;
    }

    public List<FullOrderDetailsRestModel> getOrderDetails() {
        return orderDetails;
    }

    public void setOrderDetails(List<FullOrderDetailsRestModel> orderDetails) {
        this.orderDetails = orderDetails;
    }
}
