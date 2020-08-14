package com.hacktyki.Backend.model.responses;

import java.util.List;

public class OrdersListRestModel {

    private List<FullOrderRestModel> orders;

    public OrdersListRestModel() {
    }

    public OrdersListRestModel(List<FullOrderRestModel> orders) {
        this.orders = orders;
    }

    public List<FullOrderRestModel> getOrders() {
        return orders;
    }

    public void setOrders(List<FullOrderRestModel> orders) {
        this.orders = orders;
    }
}
