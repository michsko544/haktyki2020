package com.hacktyki.Backend.model.responses;

public class IdRestModel {

    private Long id;

    public IdRestModel() {
    }

    public IdRestModel(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
