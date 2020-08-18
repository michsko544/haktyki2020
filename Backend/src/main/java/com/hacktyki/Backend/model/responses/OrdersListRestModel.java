package com.hacktyki.Backend.model.responses;

import java.util.List;

public class OrdersListRestModel {

    private List<FullOrderRestModel> myOrders;
    private List<FullOrderRestModel> allOrders;

    public OrdersListRestModel() {
    }

    public OrdersListRestModel(List<FullOrderRestModel> myOrders, List<FullOrderRestModel> allOrders) {
        this.myOrders = myOrders;
        this.allOrders = allOrders;
    }

    public List<FullOrderRestModel> getMyOrders() {
        return myOrders;
    }

    public void setMyOrders(List<FullOrderRestModel> myOrders) {
        this.myOrders = myOrders;
    }

    public List<FullOrderRestModel> getAllOrders() {
        return allOrders;
    }

    public void setAllOrders(List<FullOrderRestModel> allOrders) {
        this.allOrders = allOrders;
    }
}
