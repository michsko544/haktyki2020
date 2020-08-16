package com.hacktyki.Backend.controller;

import com.hacktyki.Backend.model.responses.InformationStatusRestModel;
import com.hacktyki.Backend.model.responses.UserDetailsRestModel;
import com.hacktyki.Backend.model.responses.UserFullnameRestModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import com.hacktyki.Backend.model.service.UserService;

@RestController
@PreAuthorize("hasRole('USER')")
@RequestMapping("users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

//    @GetMapping(path = "all")
//    public ResponseEntity<List<UserDetailsRestModel>> listAllUsers(){
//        final List<UserDetailsRestModel> allUsersList = userService.getAll();
//        return ResponseEntity.ok(allUsersList);
//    }

//    @GetMapping(path = "me")
//    public ResponseEntity<String> getMyLogin(){
//
//        final String username = userService.getAuthenticatedLogin();
//
//        if(username != null) {
//            return new ResponseEntity<>(username, HttpStatus.OK);
//        }
//        return new ResponseEntity<>("Idk who I am", HttpStatus.NOT_FOUND);
//    }

    @GetMapping(path = "my-fullname")
    public ResponseEntity<UserFullnameRestModel> getMyFullname() {
        return ResponseEntity.ok(new UserFullnameRestModel(userService.getMyFullname()));
    }

    @PostMapping(path = "my-fullname",
                consumes = "application/json")
    public ResponseEntity<InformationStatusRestModel> setMyFullname(@RequestBody UserFullnameRestModel person) {

        if(userService.setMyFullname(person.getFullname())){
            return ResponseEntity.ok(new InformationStatusRestModel("Added your fullname successfully"));
        }
        return new ResponseEntity<>(new InformationStatusRestModel("Could not add your fullname"), HttpStatus.NOT_MODIFIED);
    }

    @GetMapping(path = "my-details")
    public ResponseEntity<UserDetailsRestModel> getMyDetails(){
        return ResponseEntity.ok(userService.getMyDetails());
    }

    @PostMapping(path = "my-details",
                consumes = "application/json")
    public ResponseEntity<InformationStatusRestModel> setMyDetails(@RequestBody UserDetailsRestModel userDetails){

        if(userService.changeMyDetails(userDetails)){
            return ResponseEntity.ok(new InformationStatusRestModel("Added new details"));
        }
        return new ResponseEntity<>(new InformationStatusRestModel("Could not add new details"), HttpStatus.NOT_MODIFIED);
    }

}
