package com.hacktyki.Backend.controller;

import com.hacktyki.Backend.model.responses.InformationStatusRestModel;
import com.hacktyki.Backend.model.responses.LoginRestModel;
import com.hacktyki.Backend.model.responses.UserSignInRestModel;
import com.hacktyki.Backend.model.service.JwtService;
import com.hacktyki.Backend.model.service.LoginService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {

    private final LoginService loginService;

    public LoginController(LoginService loginService) {
        this.loginService = loginService;
    }

    @PostMapping(path = "register",
            consumes = "application/json")
    public ResponseEntity<InformationStatusRestModel> signUp(@RequestBody UserSignInRestModel user) {
        try {
            return new ResponseEntity<>(new InformationStatusRestModel(loginService.addNewUser(user)), HttpStatus.CREATED);
        }
        catch(Exception e){
            return new ResponseEntity<>(new InformationStatusRestModel(e.getMessage()),HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping(path = "login",
                consumes = "application/json", produces = "application/json")
    public ResponseEntity<LoginRestModel> login(@RequestBody UserSignInRestModel user){

        try {
            loginService.authenticate(user);
            LoginRestModel responseBody = loginService.getLoginBody(user.getLogin());
            return new ResponseEntity<>(responseBody, HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

    }

}
