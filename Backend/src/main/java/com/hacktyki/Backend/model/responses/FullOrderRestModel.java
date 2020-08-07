package com.hacktyki.Backend.model.responses;

import com.hacktyki.Backend.model.entity.OrderDetailsEntity;
import com.hacktyki.Backend.model.entity.OrderEntity;
import com.hacktyki.Backend.utils.PaymentFormEnum;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

public class FullOrderRestModel {

    private long id;
    private long purchaserId;
    private String restaurant;
    private String image;
    private LocalDate date;
    private LocalTime time;
    private PaymentFormEnum paymentForm;
    private List<FullOrderDetailsRestModel> orderDetails;

    public FullOrderRestModel() {
    }

    public FullOrderRestModel(OrderEntity orderEntity) {
        this.id = orderEntity.getId();
        this.purchaserId = (long) orderEntity.getOrderDetailsList()
                                            .stream()
                                            .filter(OrderDetailsEntity::isOrderOwner)
                                            .findFirst()
                                            .get()
                                            .getId()
                                            .getUserId();
        this.restaurant = orderEntity.getRestaurant();
        this.image = orderEntity.getImageSource();
        this.date = orderEntity.getOrderDate();
        this.time = orderEntity.getOrderTime();
        this.paymentForm = orderEntity.getPaymentForm().getPaymentFormName();
        this.orderDetails = orderEntity.getOrderDetailsList()
                                        .stream()
                                        .map(FullOrderDetailsRestModel::new)
                                        .collect(Collectors.toList());
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getPurchaserId() {
        return purchaserId;
    }

    public void setPurchaserId(long purchaserId) {
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

    public PaymentFormEnum getPaymentForm() {
        return paymentForm;
    }

    public void setPaymentForm(PaymentFormEnum paymentForm) {
        this.paymentForm = paymentForm;
    }

    public List<FullOrderDetailsRestModel> getOrderDetails() {
        return orderDetails;
    }

    public void setOrderDetails(List<FullOrderDetailsRestModel> orderDetails) {
        this.orderDetails = orderDetails;
    }
}


/* JSON
order: {
        id: 0,
        restaurant: 'Zdrowa Krowa',
        purchaserId: 0,
        date: '2021-07-21',
        time: '14:30',
        image: 'https://scx2.b-cdn.net/gfx/news/hires/2016/howcuttingdo.jpg',
        orderDetails: [
                    {
                    userId: 0,
                    userFullname: 'Grzegorz',
                    description: 'Duży mcBurger z frytkami i kalafiorem',
                    coupon: {
                            code: '123',
                            description: 'Daje 12% zniżki'
                            },
                    },
        }
*/
