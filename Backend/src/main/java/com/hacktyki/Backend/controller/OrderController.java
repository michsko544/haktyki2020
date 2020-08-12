package com.hacktyki.Backend.controller;

import com.hacktyki.Backend.model.responses.*;
import com.hacktyki.Backend.model.service.OrderService;
import com.hacktyki.Backend.model.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;


@RestController()
@PreAuthorize("hasRole('USER')")
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

    @PostMapping(path = "add-order",
                consumes = "application/json")
    public ResponseEntity<String> addNewOrder(@RequestBody FullOrderRestModel fullOrderRestModel){
        try {
            if (fullOrderRestModel != null) {
                orderService.addNewOrder(fullOrderRestModel);
                return new ResponseEntity<>("Successfully added new order", HttpStatus.CREATED);
            }
            return new ResponseEntity<>("Cannot add new order", HttpStatus.BAD_REQUEST);
        }
        catch(Exception ex){
            return new ResponseEntity<>("Cannot add new order, error", HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @PostMapping(path = "join",
            consumes = "application/json")
    public ResponseEntity<String> joinToOrder(@RequestBody JoinOrderRestModel joinOrderRestModel){
        try {
            if (joinOrderRestModel != null) {
                orderService.joinToOrder(joinOrderRestModel);
                return new ResponseEntity<>("Joined successfully", HttpStatus.CREATED);
            }
            return new ResponseEntity<>("Cannot join to order", HttpStatus.BAD_REQUEST);
        }
        catch(Exception ex){
            return new ResponseEntity<>("Cannot join to order, error", HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @PostMapping(path = "edit",
                consumes = "application/json")
    public ResponseEntity<String> editOrder(@RequestBody EditOrderRestModel editOrderRestModel ) {
        try{
            if (editOrderRestModel != null) {
                orderService.editOrder(editOrderRestModel);
                return new ResponseEntity<>("Successfully edited order", HttpStatus.ACCEPTED);
            }
            return new ResponseEntity<>("Nothing to edit", HttpStatus.BAD_REQUEST);
        }
        catch(NoSuchElementException e){
            return new ResponseEntity<>("Not found order to edit", HttpStatus.NOT_FOUND);
        }
        catch (Exception e) {
            return new ResponseEntity<>("Cannot edit order, error", HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @GetMapping(path = "coupons",
                consumes = "application/json")
    public ResponseEntity<OrderCouponsRestModel> getAllCoupons(@RequestBody IdRestModel orderIdRestModel) {
        try {
            if (orderIdRestModel != null && orderIdRestModel.getId() != null) {

                OrderCouponsRestModel orderCouponsRestModel = orderService.getOrderCouponsList(orderIdRestModel.getId());
                return new ResponseEntity<>(orderCouponsRestModel, HttpStatus.OK);
            }
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);

        } catch (Exception ex){
        return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping(path = "change-coupon",
                 consumes = "application/json")
    public ResponseEntity<String> setChoosenCoupon(@RequestBody CouponChangeRestModel couponChangeRestModel){
        try {
            if (couponChangeRestModel != null
                    && couponChangeRestModel.getOrderId() != null
                    && couponChangeRestModel.getCouponId() != null) {
                orderService.setNewCoupon(couponChangeRestModel);
                return new ResponseEntity<>("Changed successfully", HttpStatus.OK);
            }
            return new ResponseEntity<>("Not changed, bad request", HttpStatus.BAD_REQUEST);

        } catch (NoSuchElementException ex){
            return new ResponseEntity<>("Not changed. " + ex.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception ex){
            return new ResponseEntity<>("Not changed, server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
