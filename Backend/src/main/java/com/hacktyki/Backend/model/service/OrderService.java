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

    public OrderService(OrderRepository orderRepository, OrderDetailsRepository orderDetailsRepository) {
        this.orderDetailsRepository = orderDetailsRepository;
        this.orderRepository = orderRepository;
    }

    // Instance of FullOrderRestModel FullOrderRestModel( orderRepository.find() + orderdetails.find() + getPurchaserId())

    // Funtion to create purchaserId FullOrderRestModelu
    private long getPurchaserId(long orderId){
        return orderDetailsRepository.findOrderDetailsEntitiesById_OrderIdAndOrderOwner(orderId, true)
                                     .getId().getUserId();
    }

    public List<FullOrderRestModel> getAllOrdersList(long userId) throws Exception {
            if(userId < 1){
                throw new NullPointerException("UserId is expected to be value higher than 0.");
            }
            else
                try {
                List<Long> orderIdsContainingUserId
                        = orderDetailsRepository.findAllById_UserId(userId)
                        .stream()
                        .map(OrderDetailsEntity::getId)
                        .map(OrderDetailsIdentity::getUserId)
                        .collect(Collectors.toList());

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
}
