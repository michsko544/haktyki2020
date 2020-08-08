package com.hacktyki.Backend.model.service;

import com.hacktyki.Backend.model.entity.*;
import com.hacktyki.Backend.model.repository.OrderDetailsRepository;
import com.hacktyki.Backend.model.repository.OrderRepository;
import com.hacktyki.Backend.model.repository.PaymentFormRepository;
import com.hacktyki.Backend.model.responses.EditOrderRestModel;
import com.hacktyki.Backend.model.responses.FullOrderRestModel;
import com.hacktyki.Backend.model.responses.JoinOrderRestModel;
import com.hacktyki.Backend.model.responses.OrderCouponsRestModel;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
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

    // Returns all orders logged user joined to
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
            ex.printStackTrace();
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
                ex.printStackTrace();
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

    // Tries to add new order with order owners details
    @Transactional
    public void addNewOrder(FullOrderRestModel fullOrderRestModel) throws NullPointerException, Exception {
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

            // return orderEntity.getId(); optional created orders Id
        }
        catch(Exception ex){
            ex.printStackTrace();
            throw ex;
        }

    }

    // Tries to add joining user order details to order
    @Transactional
    public void joinToOrder(JoinOrderRestModel joinOrderRestModel) throws NullPointerException, Exception {
        try {
            OrderDetailsEntity orderDetailsEntity = new OrderDetailsEntity(joinOrderRestModel);
            Long couponId = couponService.addCoupon(joinOrderRestModel.getCoupon());
            if(couponId != null){
                orderDetailsEntity.setCouponId(couponId);
            }
            orderDetailsEntity = orderDetailsRepository.save(orderDetailsEntity);
            // return orderDetailsEntity.getId(); optional order and user Ids pack to send
        }
        catch(Exception ex){
            ex.printStackTrace();
            throw ex;
        }
    }

    // Tries to edit user order details description, coupon code and description, owners date, time, payment type in order
    @Transactional
    public void editOrder(EditOrderRestModel editOrderRestModel ) throws NoSuchElementException, Exception {
        try {
            OrderDetailsEntity orderDetailsEntity = orderDetailsRepository.findAllById_UserIdAndId_OrderId(editOrderRestModel.getUserOrderDetails().getUserId(), editOrderRestModel.getOrderId());

            boolean isDescription = editOrderRestModel.getUserOrderDetails().getDescription() != null;
            boolean isCoupon = editOrderRestModel.getUserOrderDetails().getCoupon() != null;
            boolean isCouponCode = isCoupon && editOrderRestModel.getUserOrderDetails().getCoupon().getCode() != null;
            boolean isCouponDescription = isCoupon && editOrderRestModel.getUserOrderDetails().getCoupon().getDescription() != null;
            boolean isOwner = orderDetailsEntity.isOrderOwner();
            boolean isDate = editOrderRestModel.getDate() != null;
            boolean isTime = editOrderRestModel.getTime() != null;
            boolean isPaymentType = editOrderRestModel.getPaymentForm() != null;

            if (isDescription) {
                orderDetailsEntity.setDescription(editOrderRestModel.getUserOrderDetails().getDescription());
            }

            if (isCoupon) {
                if (orderDetailsEntity.getDiscountCoupon() != null) {
                    if (isCouponCode) {
                        orderDetailsEntity.getDiscountCoupon().setCodeToUse(editOrderRestModel.getUserOrderDetails().getCoupon().getCode());
                    }
                    if (isCouponDescription) {
                        orderDetailsEntity.getDiscountCoupon().setDescription(editOrderRestModel.getUserOrderDetails().getCoupon().getDescription());
                    }
                } else {
                    if (isCouponCode && isCouponDescription) {
                        orderDetailsEntity.setCouponId(couponService.addCoupon(editOrderRestModel.getUserOrderDetails().getCoupon()));
                    }
                }
            }

            if (isCoupon || isDescription) {
                orderDetailsEntity = orderDetailsRepository.save(orderDetailsEntity);
            }

            if (isOwner) {
                Optional<OrderEntity> optOrderEntity = orderRepository.findById(editOrderRestModel.getOrderId());
                if(optOrderEntity.isPresent()) {
                    if (isDate) {
                        optOrderEntity.get().setOrderDate(editOrderRestModel.getDate());
                    }
                    if (isTime) {
                        optOrderEntity.get().setOrderTime(editOrderRestModel.getTime());
                    }
                    if (isPaymentType) {
                        optOrderEntity.get().setPaymentFormId(paymentFormRepository.findByPaymentFormName(editOrderRestModel.getPaymentForm()).getId());
                    }
                    orderRepository.save(optOrderEntity.get());
                }
                else{
                    throw new NoSuchElementException();
                }
            }
        }
        catch(NoSuchElementException ex){
            throw ex;
        }
        catch(Exception ex){
            ex.printStackTrace();
            throw ex;
        }
    }

    public OrderCouponsRestModel getOrderCouponsList(Long orderId) throws Exception{
        try {
            OrderEntity orderEntity = orderRepository.getOne(orderId);

            List<Long> couponIdList = orderDetailsRepository.findAllById_OrderId(orderId)
                    .stream()
                    .map(OrderDetailsEntity::getCouponId)
                    .collect(Collectors.toList());
            List<DiscountCouponEntity> couponList = couponService.getAllByIds(couponIdList);

            OrderCouponsRestModel orderCouponsRestModel = new OrderCouponsRestModel(orderId, orderEntity.getDiscountCouponId(), couponList);
            return orderCouponsRestModel;
        }
        catch(Exception ex){
            ex.printStackTrace();
            throw ex;
        }
    }
}
