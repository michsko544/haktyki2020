package com.hacktyki.Backend.model.responses;

import com.hacktyki.Backend.model.entity.UserEntity;
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

    // used only to test if adding works (TO DELETE)
    public UserSignInRestModel(UserEntity userEntity) {
        this.login = userEntity.getLogin();
        this.password = userEntity.getPassword();
    }

    public String getLogin() {
        return login;
    }

    public String getPassword() {
        return password;
    }

}
