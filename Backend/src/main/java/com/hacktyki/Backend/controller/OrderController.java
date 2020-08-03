package com.hacktyki.Backend.controller;

import com.hacktyki.Backend.model.responses.FullOrderRestModel;
import com.hacktyki.Backend.model.service.OrderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController()
@RequestMapping("orders")
public class OrderController {

    private OrderService orderService;

    OrderController (OrderService orderService){
        this.orderService = orderService;
    }

    @GetMapping(path = "all")
    public ResponseEntity<List<FullOrderRestModel>> getAllOrders(@RequestBody long userId){
        try {
            List<FullOrderRestModel> ordersList = orderService.getAllOrdersList(userId);
            return new ResponseEntity<>(ordersList, HttpStatus.OK);
        }
        catch(Exception ex){
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

}
