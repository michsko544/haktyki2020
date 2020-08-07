package com.hacktyki.Backend.model.service;

import com.hacktyki.Backend.model.entity.OrderDetailsEntity;
import com.hacktyki.Backend.model.entity.OrderDetailsIdentity;
import com.hacktyki.Backend.model.entity.OrderEntity;
import com.hacktyki.Backend.model.entity.PaymentFormEntity;
import com.hacktyki.Backend.model.repository.OrderDetailsRepository;
import com.hacktyki.Backend.model.repository.OrderRepository;
import com.hacktyki.Backend.model.repository.PaymentFormRepository;
import com.hacktyki.Backend.model.responses.FullOrderRestModel;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {

    private OrderRepository orderRepository;
    private OrderDetailsRepository orderDetailsRepository;
    private UserService userService;
    private CouponService couponService;
    private PaymentFormRepository paymentFormRepository;

    public OrderService(OrderRepository orderRepository, OrderDetailsRepository orderDetailsRepository, UserService userService, CouponService couponService, PaymentFormRepository paymentFormRepository) {
        this.orderDetailsRepository = orderDetailsRepository;
        this.orderRepository = orderRepository;
        this.userService = userService;
        this.couponService = couponService;
        this.paymentFormRepository = paymentFormRepository;
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
                    .map(OrderDetailsIdentity::getOrderId)
                    .collect(Collectors.toList());
    }
    
    @Transactional
    public Long addNewOrder(FullOrderRestModel fullOrderRestModel) throws NullPointerException, Exception {
        try {
            OrderEntity orderEntity = new OrderEntity(fullOrderRestModel);

            Long couponId = couponService.addCoupon(fullOrderRestModel.getOrderDetails().get(0).getCoupon());
            if(couponId != null) {
                orderEntity.setDiscountCouponId(couponId);
            }

            if(fullOrderRestModel.getPaymentForm() != null){
                PaymentFormEntity paymentFormEntity = paymentFormRepository.findByPaymentFormName(fullOrderRestModel.getPaymentForm());
                orderEntity.setPaymentFormId(paymentFormEntity.getId());
            }

            orderEntity = orderRepository.save(orderEntity);

            OrderDetailsEntity orderDetailsEntity = new OrderDetailsEntity(fullOrderRestModel.getOrderDetails().get(0), orderEntity.getId());
            if(couponId != null){
                orderDetailsEntity.setCouponId(couponId);
            }
            orderDetailsRepository.save(orderDetailsEntity);

            return orderEntity.getId();
        }
        catch(Exception ex){
            System.out.println("Error happened while tried to add new order:\n" + ex.getMessage());
            throw ex;
        }

    }
}
