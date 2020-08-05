package com.hacktyki.Backend.model.service;

import com.hacktyki.Backend.model.entity.OrderDetailsEntity;
import com.hacktyki.Backend.model.entity.OrderDetailsIdentity;
import com.hacktyki.Backend.model.repository.OrderDetailsRepository;
import com.hacktyki.Backend.model.repository.OrderRepository;
import com.hacktyki.Backend.model.responses.FullOrderRestModel;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {

    private OrderRepository orderRepository;
    private OrderDetailsRepository orderDetailsRepository;
    private UserService userService;

    public OrderService(OrderRepository orderRepository, OrderDetailsRepository orderDetailsRepository, UserService userService) {
        this.orderDetailsRepository = orderDetailsRepository;
        this.orderRepository = orderRepository;
        this.userService = userService;
    }

    // Instance of FullOrderRestModel FullOrderRestModel( orderRepository.find() + orderdetails.find() + getPurchaserId())

    // Funtion to create purchaserId FullOrderRestModelu
    private long getPurchaserId(long orderId){
        return orderDetailsRepository.findOrderDetailsEntitiesById_OrderIdAndOrderOwner(orderId, true)
                                     .getId().getUserId();
    }

    public List<FullOrderRestModel> getMyOrdersList() throws Exception {

        long userId = userService.getAuthenticatedId();

        try {
            List<Long> orderIdsContainingUserId
                    = getOrderIdsContainingUsersIdList(userId);

            List<FullOrderRestModel> myOrdersList
                    = orderRepository.findAll()
                    .stream()
                    .filter(orderEntity -> { return orderIdsContainingUserId.contains(orderEntity.getId()); })
                    .map(FullOrderRestModel::new)
                    .collect(Collectors.toList());

            return myOrdersList;

        } catch (Exception ex) {

            throw ex;
        }
    }

    // Returns all orders that logged user didn't join to
    public List<FullOrderRestModel> getAllOrdersList() throws Exception {

            long userId = userService.getAuthenticatedId();

            try {
                List<Long> orderIdsContainingUserId
                        = getOrderIdsContainingUsersIdList(userId);

                List<FullOrderRestModel> allOrdersList
                        = orderRepository.findAll()
                        .stream()
                        .filter(orderEntity -> { return !orderIdsContainingUserId.contains(orderEntity.getId()); })
                        .map(FullOrderRestModel::new)
                        .collect(Collectors.toList());

                return allOrdersList;

            } catch (Exception ex) {

                throw ex;
            }
    }

    private List<Long> getOrderIdsContainingUsersIdList(long userId){
         return orderDetailsRepository.findAllById_UserId(userId)
                    .stream()
                    .map(OrderDetailsEntity::getId)
                    .map(OrderDetailsIdentity::getUserId)
                    .collect(Collectors.toList());
    }

}
