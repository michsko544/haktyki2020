package com.hacktyki.Backend.model.service;

import com.hacktyki.Backend.model.entity.UserEntity;
import com.hacktyki.Backend.model.repository.UserRepository;
import com.hacktyki.Backend.model.responses.UserDetailsRestModel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class UserService {

    private final UserRepository userRepository;

    private final Logger logger;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.logger = LoggerFactory.getLogger(UserService.class);
    }

    public Boolean setMyFullname(String fullname) {
        logger.info("DB-shot find.");
        UserEntity user = userRepository.findByLogin(getAuthenticatedLogin());
        if(user != null){
            user.setFullName(fullname);
            logger.info("DB-shot save.");
            userRepository.save(user);
            return true;
        }
        return false;
    }

    public UserDetailsRestModel getMyDetails() {
        logger.info("DB-shot find.");
        return new UserDetailsRestModel(userRepository.findByLogin(getAuthenticatedLogin()));
    }

    @Transactional
    public boolean changeMyDetails(UserDetailsRestModel userDetails){
        if(userDetails != null){
            logger.info("DB-shot save.");
            userRepository.save(mapDetailsRestModel(userDetails));
            return true;
        }

        return false;
    }

    protected long getAuthenticatedId(){
        String userLogin = getAuthenticatedLogin();
        if(null != userLogin) {
            logger.info("DB-shot find.");
            return userRepository.findByLogin(userLogin).getId();
        } else {
            throw new NullPointerException("User is not logged in.");
        }
    }

    public String getAuthenticatedLogin(){
        SecurityContext securityContext = SecurityContextHolder.getContext();

        if(null != securityContext.getAuthentication()) {
            final String username = securityContext.getAuthentication().getName();
            return username;
        }
        return null;
    }

    private UserEntity mapDetailsRestModel(UserDetailsRestModel userDetails){

        logger.info("DB-shot find.");
        UserEntity user = userRepository.findByLogin(getAuthenticatedLogin());
        user.setFullName(userDetails.getFullName());
        user.setPhoneNumber(userDetails.getPhoneNumber());
        user.setCreditCardNumber(userDetails.getCreditCardNumber());
        user.setSwiftBicCode(userDetails.getSwiftBicCode());

        return user;

    }
}
