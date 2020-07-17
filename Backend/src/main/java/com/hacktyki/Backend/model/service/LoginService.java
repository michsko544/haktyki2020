package com.hacktyki.Backend.model.service;

import com.hacktyki.Backend.model.entity.UserEntity;
import com.hacktyki.Backend.model.repository.UserRepository;
import com.hacktyki.Backend.model.responses.UserSignInRestModel;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

    private UserRepository userRepository;

    public LoginService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Long add(UserSignInRestModel user) {
        return userRepository.save(mapSignInRestModel(user)).getId();
    }

    private UserEntity mapSignInRestModel(final UserSignInRestModel model) {
        return new UserEntity(model.getLogin(), model.getPassword());
    }
}
