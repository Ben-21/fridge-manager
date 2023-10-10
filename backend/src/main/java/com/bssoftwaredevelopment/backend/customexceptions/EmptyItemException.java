package com.bssoftwaredevelopment.backend.customexceptions;

public class EmptyItemException extends RuntimeException{
    public EmptyItemException() {
        super("Empty item can not be saved");
    }
}
