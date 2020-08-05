package com.hacktyki.Backend.controller;

import com.hacktyki.Backend.model.responses.FullOrderRestModel;
import com.hacktyki.Backend.model.service.OrderService;
import com.hacktyki.Backend.model.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController()
@RequestMapping("orders")
public class OrderController {

    private OrderService orderService;
    private UserService userService;

    OrderController(OrderService orderService, UserService userService){
        this.orderService = orderService;
        this.userService = userService;
    }

    @GetMapping(path = "my",
            produces = "application/json")
    public ResponseEntity<List<FullOrderRestModel>> getMyOrders(){
        try {
            List<FullOrderRestModel> ordersList = orderService.getMyOrdersList();
            return new ResponseEntity<>(ordersList, HttpStatus.OK);
        }
        catch(Exception ex){
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(path = "all",
                produces = "application/json")
    public ResponseEntity<List<FullOrderRestModel>> getAllOrders(){
        try {
            List<FullOrderRestModel> ordersList = orderService.getAllOrdersList();
            return new ResponseEntity<>(ordersList, HttpStatus.OK);
        }
        catch(Exception ex){
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

}
