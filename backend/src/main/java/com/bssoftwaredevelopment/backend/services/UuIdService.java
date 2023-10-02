package com.bssoftwaredevelopment.backend.services;

import org.springframework.stereotype.Component;

@Component
public class UuIdService {

    public String createId(){
        return java.util.UUID.randomUUID().toString();
    }



}
