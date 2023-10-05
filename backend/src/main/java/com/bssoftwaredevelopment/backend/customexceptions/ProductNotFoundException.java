package com.bssoftwaredevelopment.backend.customexceptions;

public class ProductNotFoundException extends RuntimeException{
    public ProductNotFoundException(String barcode) {
        super("Could not find item with barcode: " + barcode);
    }
}
