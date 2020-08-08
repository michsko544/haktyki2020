package com.hacktyki.Backend.model.responses;

import com.sun.istack.NotNull;

public class UserSignInRestModel {

    @NotNull
    private String login;
    @NotNull
    private String password;

    public UserSignInRestModel() {
    }

    public UserSignInRestModel(String login, String password) {
        this.login = login;
        this.password = password;
    }

    public String getLogin() {
        return login;
    }

    public String getPassword() {
        return password;
    }

}
