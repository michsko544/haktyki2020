package com.hacktyki.Backend.controller;

import com.hacktyki.Backend.model.repository.OrderDetailsRepository;
import org.springframework.web.bind.annotation.*;


@RestController()
@RequestMapping("orders")
public class OrderController {

    private OrderDetailsRepository orderDetailsRepository;

    OrderController (OrderDetailsRepository orderDetailsRepository){
        this.orderDetailsRepository = orderDetailsRepository;
    }

//    @PostMapping(path = "add-details",
//                consumes = "application/json")
//    public void addOrderDetails(@RequestBody OrderEntity orderDetails){
//        orderDetailsRepository.save(orderDetails);
//    }
//
//    @GetMapping(path = "all")
//    public ResponseEntity<List<OrderEntity>> getAllOrders(){
//
//        return null;
//    }

}
