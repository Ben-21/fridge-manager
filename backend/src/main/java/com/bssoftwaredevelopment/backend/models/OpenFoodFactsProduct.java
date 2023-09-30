package com.bssoftwaredevelopment.backend.models;

public record OpenFoodFactsProduct(
        String _id,
        String product_name,
        String image_url,
        String quantity
) {
}
