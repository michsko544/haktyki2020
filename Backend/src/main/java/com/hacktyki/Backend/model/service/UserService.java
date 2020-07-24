package com.hacktyki.Backend.model.service;

import com.hacktyki.Backend.model.entity.UserEntity;
import com.hacktyki.Backend.model.repository.UserRepository;
import com.hacktyki.Backend.model.responses.UserDetailsRestModel;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    private UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<UserDetailsRestModel> getAll() {
        return userRepository.findAll().stream()
                .map(UserDetailsRestModel::new)
                .collect(Collectors.toList());
    }

    public UserDetailsRestModel getMyDetails() {
        return new UserDetailsRestModel(userRepository.findByLogin(getAuthenticatedLogin()));
    }

    @Transactional
    public boolean changeDetails(UserDetailsRestModel userDetails){
        if(userDetails != null){

            userRepository.save(mapDetailsRestModel(userDetails));
            return true;
        }

        return false;
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
        UserEntity user = userRepository.findByLogin(getAuthenticatedLogin());

        user.setFullName(userDetails.getFullName());
        user.setPhoneNumber(userDetails.getPhoneNumber());
        user.setCreditCardNumber(userDetails.getCreditCardNumber());

        return user;
    }
}