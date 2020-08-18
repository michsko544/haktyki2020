package com.hacktyki.Backend.controller;

import com.hacktyki.Backend.model.responses.IdRestModel;
import com.hacktyki.Backend.model.responses.InformationStatusRestModel;
import com.hacktyki.Backend.model.responses.NotificationDeviceRestModel;
import com.hacktyki.Backend.model.service.NotificationService;
import com.hacktyki.Backend.model.service.OrderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.persistence.EntityNotFoundException;
import java.io.IOException;

@RestController()
@PreAuthorize("hasRole('USER')")
@RequestMapping("notifications")
public class NotificationController {

    private final NotificationService notificationService;
    private final OrderService orderService;

    public NotificationController(NotificationService notificationService, OrderService orderService) {
        this.notificationService = notificationService;
        this.orderService = orderService;
    }

    @PostMapping(value = "payment-remind",
            consumes = "application/json")
    public ResponseEntity<InformationStatusRestModel> sendNotificationOnPaymentReminder(@RequestBody IdRestModel orderId) {
        try {
            InformationStatusRestModel response = notificationService.notifyPaymentReminder(orderId.getId());
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
        catch(IOException ex){
            return new ResponseEntity<>(new InformationStatusRestModel("Notification server error."), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        catch(EntityNotFoundException ex){
            return new ResponseEntity<>(new InformationStatusRestModel("Order with this orderId does not exists."), HttpStatus.NOT_FOUND);
        }
        catch(NullPointerException ex){
            return new ResponseEntity<>(new InformationStatusRestModel("Order has no users to notify."), HttpStatus.OK);
        }
        catch(Exception ex){
            return new ResponseEntity<>(new InformationStatusRestModel("Unexpected internal server error occurred."), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping(value = "order-delivered",
                 consumes = "application/json")
    public ResponseEntity<InformationStatusRestModel> sendNotificationOnOrderDelivering(@RequestBody IdRestModel orderId) {
        try {
            InformationStatusRestModel response = notificationService.notifyOrderIsDelivered(orderId.getId());
            orderService.changeOrderToDelivered(orderId.getId());
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
        catch(IOException ex){
            return new ResponseEntity<>(new InformationStatusRestModel("Notification server error."), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        catch(EntityNotFoundException ex){
            return new ResponseEntity<>(new InformationStatusRestModel("Order with this orderId does not exists."), HttpStatus.NOT_FOUND);
        }
        catch(NullPointerException ex){
            return new ResponseEntity<>(new InformationStatusRestModel("Order has no users to notify."), HttpStatus.OK);
        }
        catch(Exception ex){
            return new ResponseEntity<>(new InformationStatusRestModel("Unexpected internal server error occurred."), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping(value = "add-device",
                 consumes = "application/json")
    public ResponseEntity<InformationStatusRestModel> addDevice(@RequestBody NotificationDeviceRestModel notificationDeviceRestModel) {
        try {
            if (notificationDeviceRestModel != null
                    && notificationDeviceRestModel.getToken() != null
                    && notificationDeviceRestModel.getUserId() != null) {
                if(notificationService.addDevice(notificationDeviceRestModel)) {
                    return new ResponseEntity<>(new InformationStatusRestModel("Adding successful."), HttpStatus.CREATED);
                }
                else{
                    return new ResponseEntity<>(new InformationStatusRestModel("Device is already added."), HttpStatus.OK);
                }
            }
            return new ResponseEntity<>(new InformationStatusRestModel("Bad request."), HttpStatus.BAD_REQUEST);
        }
        catch(Exception ex){
            return new ResponseEntity<>(new InformationStatusRestModel("Internal server error occurred."), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
