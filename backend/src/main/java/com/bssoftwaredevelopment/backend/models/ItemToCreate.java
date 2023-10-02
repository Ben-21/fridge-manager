package com.bssoftwaredevelopment.backend.models;

import org.springframework.data.mongodb.core.mapping.Document;

@Document("products")
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
