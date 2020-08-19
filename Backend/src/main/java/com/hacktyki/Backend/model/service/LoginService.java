package com.hacktyki.Backend.model.service;

import com.hacktyki.Backend.model.entity.UserEntity;
import com.hacktyki.Backend.model.repository.UserRepository;
import com.hacktyki.Backend.model.responses.LoginRestModel;
import com.hacktyki.Backend.model.responses.UserSignInRestModel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class LoginService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    private final Logger logger;

    public LoginService(UserRepository userRepository, JwtService jwtService, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
        this.logger = LoggerFactory.getLogger(LoginService.class);
    }

    @Transactional
    public String addNewUser(UserSignInRestModel user) throws Exception{
        if(emailExists(user)){
            throw new Exception("Email address is already used.");
        }
        else{
            logger.info("DB-shot save.");
            userRepository.save(mapSignInRestModel(user));
            return "Successfully registered. Now you can log in.";
        }
    }

    public void authenticate(UserSignInRestModel userDTO) throws Exception {

        logger.info("DB-shot find.");
        UserEntity user = userRepository.findByLogin(userDTO.getLogin());
        if( user == null || !passwordEncoder.matches(userDTO.getPassword(), user.getPassword()) ) {
            throw new Exception("Used bad credentials or user doesn't exists.");
        }
    }

    public LoginRestModel getLoginBody(String userLogin) {
        logger.info("DB-shot find.");
        UserEntity userEntity = userRepository.findByLogin(userLogin);

        LoginRestModel loginResponseBody = new LoginRestModel(userEntity.getId(),
                                                            userEntity.getFullName(),
                                                            jwtService.createJwt(userLogin));

        return loginResponseBody;
    }

    private UserEntity mapSignInRestModel(final UserSignInRestModel model) {
        return new UserEntity(model.getLogin(), passwordEncoder.encode(model.getPassword()));
    }

    private boolean emailExists(UserSignInRestModel user) {
        logger.info("DB-shot find.");
        return userRepository.findByLogin(user.getLogin()) != null;
    }

}
