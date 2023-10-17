package com.bssoftwaredevelopment.backend.models;

public record OpenFoodFactsProduct(
        String _id,
        String product_name,
        String product_name_de,
        String image_url,
        String quantity
) {
}
