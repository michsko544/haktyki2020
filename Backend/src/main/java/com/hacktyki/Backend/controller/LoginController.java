package com.hacktyki.Backend.controller;

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

    private LoginService loginService;
    private JwtService jwtService;

    public LoginController(LoginService loginService, JwtService jwtService) {
        this.loginService = loginService;
        this.jwtService = jwtService;
    }

    @PostMapping(path = "register",
            consumes = "application/json")
    public ResponseEntity<String> addUser(@RequestBody UserSignInRestModel user)
    {
        return ResponseEntity.ok(loginService.addNewUser(user));
    }

    @PostMapping(path = "login",
                consumes = "application/json")
    public ResponseEntity<String> login(@RequestBody UserSignInRestModel user){

        try {
            loginService.authenticate(user);
            return new ResponseEntity<>(jwtService.createJwt(user.getLogin()), HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
        }

    }

}
