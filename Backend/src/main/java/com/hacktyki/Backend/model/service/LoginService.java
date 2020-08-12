package com.hacktyki.Backend.model.service;

import com.hacktyki.Backend.model.entity.UserEntity;
import com.hacktyki.Backend.model.repository.UserRepository;
import com.hacktyki.Backend.model.responses.LoginRestModel;
import com.hacktyki.Backend.model.responses.UserSignInRestModel;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class LoginService {

    private UserRepository userRepository;
    private JwtService jwtService;

    public LoginService(UserRepository userRepository, JwtService jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    @Transactional
    public String addNewUser(UserSignInRestModel user) throws Exception{
        if(emailExists(user)){
            throw new Exception("Email address is already used.");
        }
        else{
            userRepository.save(mapSignInRestModel(user));
            return "Successfully registered. Now you can log in.";
        }
    }

    public void authenticate(UserSignInRestModel userDTO) throws Exception {

        UserEntity user = userRepository.findByLogin(userDTO.getLogin());

        if( user == null || !user.getPassword().equals(userDTO.getPassword()) ) {
            throw new Exception("Used bad credentials or user doesn't exists.");
        }
    }

    public LoginRestModel getLoginBody(String userLogin) {
        UserEntity userEntity = userRepository.findByLogin(userLogin);

        LoginRestModel loginResponseBody = new LoginRestModel(userEntity.getId(),
                                                            userEntity.getFullName(),
                                                            jwtService.createJwt(userLogin));

        return loginResponseBody;
    }

    private UserEntity mapSignInRestModel(final UserSignInRestModel model) {
        return new UserEntity(model.getLogin(), model.getPassword());
    }

    private boolean emailExists(UserSignInRestModel user) {
        return userRepository.findByLogin(user.getLogin()) != null;
    }

}