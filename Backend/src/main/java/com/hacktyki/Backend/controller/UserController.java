package com.hacktyki.Backend.controller;

import com.hacktyki.Backend.model.responses.UserDetailsRestModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
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
    public ResponseEntity<List<UserDetailsRestModel>> listAllUsers(){
        final List<UserDetailsRestModel> allUsersList = userService.getAll();
        return ResponseEntity.ok(allUsersList);
    }

    @GetMapping(path = "me")
    public ResponseEntity<String> getMyLogin(){

        final String username = userService.getAuthenticatedLogin();

        if(username != null) {
            return new ResponseEntity<>(username, HttpStatus.OK);
        }
        return new ResponseEntity<>("Idk who I am", HttpStatus.NOT_FOUND);
    }

    @GetMapping(path = "details")
    public ResponseEntity<UserDetailsRestModel> getMyDetails(){
        return ResponseEntity.ok(userService.getMyDetails());
    }

    @PostMapping(path = "details",
                consumes = "application/json")
    public ResponseEntity<String> setMyDetails(@RequestBody UserDetailsRestModel userDetails){

        if(userService.changeDetails(userDetails)){
            return ResponseEntity.ok("Added new details");
        }
        return new ResponseEntity<>("Could not add new details", HttpStatus.NOT_MODIFIED);
    }

}
