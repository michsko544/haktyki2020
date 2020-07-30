package com.hacktyki.Backend.model.responses;

import com.sun.istack.NotNull;

public class UserSignInRestModel {

    @NotNull
    private String login;
    @NotNull
    private String password;

    public UserSignInRestModel() {
    }

    public String getLogin() {
        return login;
    }

    public String getPassword() {
        return password;
    }

}
