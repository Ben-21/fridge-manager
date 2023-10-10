package com.bssoftwaredevelopment.backend.customexceptions;

public class ItemByIdNotFoundException extends RuntimeException{
    public ItemByIdNotFoundException(String id) {
        super("Could not find item with id: " + id);
    }
}
