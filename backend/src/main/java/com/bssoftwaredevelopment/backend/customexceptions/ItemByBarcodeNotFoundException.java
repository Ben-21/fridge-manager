package com.bssoftwaredevelopment.backend.customexceptions;

public class ItemByBarcodeNotFoundException extends RuntimeException{
    public ItemByBarcodeNotFoundException(String barcode) {
        super("Could not find item with barcode: " + barcode);
    }
}
