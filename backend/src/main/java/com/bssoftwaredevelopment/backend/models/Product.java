package com.bssoftwaredevelopment.backend.models;

public record Product(
        String id,
        String name,
        String imageUrl,
        StorageLocation storageLocation,
        int stockAmount,
        int warnStockAmount,
        StockUnit StockUnit
) {
}
