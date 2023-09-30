package com.bssoftwaredevelopment.backend.models;

public record OpenFoodFactsProduct(
        String id,
        String product_name,
        String image_url,
        String quantity
) {
}
