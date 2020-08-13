package com.hacktyki.Backend.model.responses;

public class InformationStatusRestModel {

    private String message;

    public InformationStatusRestModel() {
    }

    public InformationStatusRestModel(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
