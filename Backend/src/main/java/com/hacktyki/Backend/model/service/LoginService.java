package com.hacktyki.Backend.model.service;

import com.hacktyki.Backend.model.entity.UserEntity;
import com.hacktyki.Backend.model.repository.UserRepository;
import com.hacktyki.Backend.model.responses.UserSignInRestModel;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class LoginService {

    private UserRepository userRepository;

    public LoginService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional
    public String addNewUser(UserSignInRestModel user) {
        try {
            if(emailExists(user)){
                return "Email address is already used.";
            }
            else{
                userRepository.save(mapSignInRestModel(user));
                return "Successfully registered. Now you can log in.";
            }
        }
        catch(Exception ex){
            return "Something unexpected happened";
        }
    }

    public void authenticate(UserSignInRestModel userDTO) throws Exception {

        UserEntity user = userRepository.findByLogin(userDTO.getLogin());

        if( user == null || !user.getPassword().equals(userDTO.getPassword()) ) {
            throw new Exception("Used bad credentials or user doesn't exists.");
        }
    }

    private UserEntity mapSignInRestModel(final UserSignInRestModel model) {
        return new UserEntity(model.getLogin(), model.getPassword());
    }

    private boolean emailExists(UserSignInRestModel user) {
        return userRepository.findByLogin(user.getLogin()) != null;
    }

}
