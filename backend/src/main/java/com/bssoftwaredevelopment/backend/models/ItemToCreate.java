package com.bssoftwaredevelopment.backend.models;



public record ItemToCreate(
        String name,
        String imageUrl,
        StorageLocation storageLocation,
        int stockAmount,
        int warnStockAmount,
        StockUnit stockUnit,
        String quantity
) {
}
