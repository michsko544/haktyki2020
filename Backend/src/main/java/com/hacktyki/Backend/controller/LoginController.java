package com.hacktyki.Backend.controller;

import com.hacktyki.Backend.model.responses.UserSignInRestModel;
import com.hacktyki.Backend.model.service.LoginService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {

    private LoginService loginService;

    public LoginController(LoginService loginService) {
        this.loginService = loginService;
    }

    @PostMapping(path = "register",
            consumes = "application/json")
    public ResponseEntity<Long> addUser(@RequestBody UserSignInRestModel user)
    {
        return ResponseEntity.ok(loginService.add(user));
    }

}
