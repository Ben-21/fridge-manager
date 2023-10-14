package com.bssoftwaredevelopment.backend.models;

public record OpenFoodFactsItem(
        String code,
        OpenFoodFactsProduct product,
        int status,
        String status_verbose
) {
}
