package com.hacktyki.Backend.model.service;

import com.hacktyki.Backend.model.repository.UserRepository;
import com.hacktyki.Backend.model.responses.UserSignInRestModel;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    private UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Change to UserRestModel ASAP
    public List<UserSignInRestModel> getAll() {
        return userRepository.findAll().stream()
                .map(UserSignInRestModel::new)
                .collect(Collectors.toList());
    }

}
