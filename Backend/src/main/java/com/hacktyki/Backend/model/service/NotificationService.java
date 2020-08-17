package com.hacktyki.Backend.model.service;

import com.google.firebase.messaging.*;
import com.hacktyki.Backend.model.entity.NotificationDeviceEntity;
import com.hacktyki.Backend.model.repository.NotificationDeviceRepository;
import com.hacktyki.Backend.model.responses.InformationStatusRestModel;
import com.hacktyki.Backend.model.responses.NotificationDeviceRestModel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class NotificationService {

    private final NotificationDeviceRepository notificationDeviceRepository;
    private final Logger logger;
    private final OrderService orderService;

    public NotificationService(NotificationDeviceRepository notificationDeviceRepository, OrderService orderService) {
        this.notificationDeviceRepository = notificationDeviceRepository;
        this.orderService = orderService;
        this.logger = LoggerFactory.getLogger(NotificationService.class);
    }

    public InformationStatusRestModel notifyOrderParticipants(Long orderId) throws IOException, EntityNotFoundException,NullPointerException, Exception {

        try {
            String messageTitle = orderService.getOrderById(orderId).getRestaurant();
            String messageBody = "Twoje zamówienie już na ciebie czeka :)";

            ArrayList<String> tokensList = getTokensForOrderNotification(orderId);

            MulticastMessage multicastMessage = MulticastMessage.builder()
                    .setNotification(Notification
                                    .builder()
                                    .setTitle(messageTitle)
                                    .setBody(messageBody)
                                    .build())
//                    .setWebpushConfig(WebpushConfig
//                            .builder()
//                            .setNotification(WebpushNotification
//                                    .builder()
//                                    .setTitle(messageTitle)
//                                    .setBody(messageBody)
//                                    .build())
//                            .build())
                    .addAllTokens(tokensList)
                    .build();

            try {
                BatchResponse response = FirebaseMessaging.getInstance().sendMulticast(multicastMessage);
                logger.info("Notification sent successfully. " + response.getSuccessCount() + " messages were sent successfully");
                return new InformationStatusRestModel("Notification sent successfully.");
            }
            catch (FirebaseMessagingException ex) {
                logger.error("Firebase messaging error.", ex);
                throw new IOException();
            }
        }
        catch (EntityNotFoundException ex){
            logger.error("Client provided not existing orderId: " + orderId, ex);
            throw ex;
        }
        catch (NullPointerException ex){
            logger.error("Got no tokens to notify", ex);
            throw ex;
        }
        catch (Exception ex){
            logger.error("Unexpected exception in notifyOrderParticipants occurred.",ex);
            throw ex;
        }
    }

    public boolean addDevice(NotificationDeviceRestModel notificationDevice) throws Exception {
        try {
            NotificationDeviceEntity notificationDeviceEntity = notificationDeviceRepository.getByTokenAndUserId(notificationDevice.getToken(), notificationDevice.getUserId());
            if(notificationDeviceEntity == null) {
                notificationDeviceEntity = new NotificationDeviceEntity(notificationDevice.getToken(), notificationDevice.getUserId());
                notificationDeviceRepository.save(notificationDeviceEntity);
                return true;
            }
            return false;
        }
        catch (Exception ex){
            logger.error("Unexpected exception", ex);
            throw ex;
        }
    }

    private ArrayList<String> getTokensForOrderNotification(Long orderId) throws Exception{
        List<Long> userIds = orderService.getOrderUsersIdsByOrderIdWithoutOwner(orderId);
        if (userIds != null && userIds.size() > 0) {
            ArrayList<String> tokenList = new ArrayList<String>();
            List<NotificationDeviceEntity> notificationDeviceList;
            for (Long userId : userIds) {
                notificationDeviceList = notificationDeviceRepository.findAllByUserId(userId);
                if (notificationDeviceList != null) {
                    for(NotificationDeviceEntity notificationDeviceEntity : notificationDeviceList)
                    tokenList.add(notificationDeviceEntity.getToken());
                }
                notificationDeviceList = null;
            }
            if (tokenList.size() > 0) {
                return tokenList;
            }
        }
        throw new NullPointerException("No devices to notify.");
    }

}
