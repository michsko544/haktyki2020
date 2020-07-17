package com.hacktyki.Backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.hacktyki.Backend.model.responses.UserSignInRestModel;
import com.hacktyki.Backend.model.service.UserService;

import java.util.List;

@RestController
@RequestMapping("users")
public class UserController {

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping(path = "all")
    public ResponseEntity<List<UserSignInRestModel>> listAllUsers(){
        final List<UserSignInRestModel> allUsersList = userService.getAll();
        return ResponseEntity.ok(allUsersList);
    }


}
