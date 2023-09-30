package com.bssoftwaredevelopment.backend.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("products")
public record Item(
        @Id
        String id,
        String name,
        String imageUrl,
        StorageLocation storageLocation,
        int stockAmount,
        int warnStockAmount,
        StockUnit StockUnit
) {
}
