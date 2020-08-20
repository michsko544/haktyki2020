package com.hacktyki.Backend.model.service;

import com.hacktyki.Backend.model.entity.*;
import com.hacktyki.Backend.model.repository.OrderDetailsRepository;
import com.hacktyki.Backend.model.repository.OrderRepository;
import com.hacktyki.Backend.model.responses.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderDetailsRepository orderDetailsRepository;
    private final UserService userService;
    private final CouponService couponService;

    private final Logger logger;

    public OrderService(OrderRepository orderRepository, OrderDetailsRepository orderDetailsRepository, UserService userService, CouponService couponService) {
        this.orderDetailsRepository = orderDetailsRepository;
        this.orderRepository = orderRepository;
        this.userService = userService;
        this.couponService = couponService;
        this.logger = LoggerFactory.getLogger(OrderService.class);
    }

    public OrdersListRestModel getOrdersLists() throws Exception {
        try {
            checkOrdersTime();

            long userId = userService.getAuthenticatedId();
            List<Long> orderIdsContainingUserId = getOrderIdsContainingUsersId(userId);
            List<OrderEntity> ordersList = orderRepository.findAll();

            return new OrdersListRestModel(
                    getMyOrdersList(orderIdsContainingUserId, ordersList),
                    getAllOrdersList(orderIdsContainingUserId, ordersList));
        }
        catch (Exception ex){
            logger.error("Getting orders Lists exception happened.", ex);
            throw ex;
        }
    }

    // Returns all orders logged user joined to or created
    private List<FullOrderRestModel> getMyOrdersList(List<Long> orderIdsContainingUserId, List<OrderEntity> ordersList) throws Exception {

        try {
            return ordersList
            .stream()
            .filter(orderEntity -> (orderIdsContainingUserId.contains(orderEntity.getId()) && !orderEntity.isPaid()))
            .map(FullOrderRestModel::new)
            .collect(Collectors.toList());

        } catch (Exception ex) {
            logger.error("Getting my orders list error happened.", ex);
            throw ex;
        }
    }

    // Returns all orders that logged user didn't join to
    private List<FullOrderRestModel> getAllOrdersList(List<Long> orderIdsContainingUserId, List<OrderEntity> ordersList) throws Exception {

        try {
            return ordersList
            .stream()
            .filter(orderEntity -> (!orderIdsContainingUserId.contains(orderEntity.getId()) && !orderEntity.isOrderClosed()))
            .map(FullOrderRestModel::new)
            .collect(Collectors.toList());

        } catch (Exception ex) {
            logger.error("Getting all orders list error happened.",ex);
            throw ex;
        }
    }

    private List<Long> getOrderIdsContainingUsersId(long userId){
         return orderDetailsRepository.findAllById_UserId(userId)
                    .stream()
                    .map(OrderDetailsEntity::getId)
                    .map(OrderDetailsIdentity::getOrderId)
                    .collect(Collectors.toList());
    }

    private void checkOrdersTime(){
        List<OrderEntity> openOrders = orderRepository.findAllByOrderClosed(false);
        boolean hasAnyChanges = false;
        for( OrderEntity order : openOrders){
            if(order.getOrderDate().isBefore(LocalDate.now())
                    || ( order.getOrderDate().isEqual(LocalDate.now())
                    && order.getOrderTime().isBefore(LocalTime.now()) ) ){
                order.setOrderClosed(true);
                hasAnyChanges = true;
            }
        }
        if(hasAnyChanges) {
            orderRepository.saveAll(openOrders);
        }
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
//                PaymentFormEntity paymentFormEntity = paymentFormRepository.findByPaymentFormName(fullOrderRestModel.getPaymentForm());
                logger.info("PaymentFormEnum: " + fullOrderRestModel.getPaymentForm().toString() + " and its value: " + fullOrderRestModel.getPaymentForm().getValue());
                orderEntity.setPaymentFormId((long) fullOrderRestModel.getPaymentForm().getValue());
            }
            else {
                throw new NullPointerException("Provided payment variable with null value.");
            }
            orderEntity = orderRepository.save(orderEntity);

            OrderDetailsEntity orderDetailsEntity = new OrderDetailsEntity(fullOrderRestModel.getOrderDetails().get(0), orderEntity.getId());
            if(couponId != null){
                orderDetailsEntity.setCouponId(couponId);
            }
            orderDetailsRepository.save(orderDetailsEntity);

        }
        catch(Exception ex){
            logger.error("When adding new order error happened.",ex);
            throw ex;
        }

    }

    // Tries to add joining user order details to order
    @Transactional
    public void joinToOrder(JoinOrderRestModel joinOrderRestModel) throws Exception {
        try {
            OrderDetailsEntity orderDetailsEntity = new OrderDetailsEntity(joinOrderRestModel);
            Long couponId = couponService.addCoupon(joinOrderRestModel.getCoupon());
            if(couponId != null){
                orderDetailsEntity.setCouponId(couponId);
            }
            orderDetailsRepository.save(orderDetailsEntity);

        }
        catch(Exception ex){
            logger.error("When joining order error happened.",ex);
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
                orderDetailsRepository.save(orderDetailsEntity);
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
//                        optOrderEntity.get().setPaymentFormId(paymentFormRepository.findByPaymentFormName(editOrderRestModel.getPaymentForm()).getId());
                        optOrderEntity.get().setPaymentFormId(editOrderRestModel.getPaymentForm().getValue());
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
            logger.error("While editing order error happened.",ex);
            throw ex;
        }
    }

    protected OrderEntity getOrderById(Long orderId) throws EntityNotFoundException {
        try {
            return orderRepository.getOne(orderId);
        }
        catch (EntityNotFoundException ex){
            throw ex;
        }
    }

    protected List<Long> getOrderUsersIdsByOrderIdWithoutOwner(Long orderId){
        return orderDetailsRepository.findAllById_OrderId(orderId)
                .stream()
                .filter(orderDetailsEntity -> !orderDetailsEntity.isOrderOwner())
                .map(OrderDetailsEntity::getId)
                .map(OrderDetailsIdentity::getUserId)
                .collect(Collectors.toList());
    }

    public void changeOrderToDelivered(Long orderId) {
        OrderEntity orderEntity = orderRepository.getOne(orderId);
        orderEntity.setDelivered(true);
        orderRepository.save(orderEntity);
    }

    public void changeOrderToPaid(Long orderId) {
        try {
            OrderEntity orderEntity = orderRepository.getOne(orderId);
            orderEntity.setPaid(true);
            orderRepository.save(orderEntity);
        }
        catch( EntityNotFoundException ex){
            logger.error("Not found any entity with that id.", ex);
        }
    }
}
