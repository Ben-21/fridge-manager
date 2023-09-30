package com.bssoftwaredevelopment.backend;


import pl.coderion.model.ProductResponse;
import pl.coderion.service.OpenFoodFactsWrapper;
import pl.coderion.service.impl.OpenFoodFactsWrapperImpl;

public class GetAllImageInfos {


    public String getProductImageUrl(String barcode) {
        OpenFoodFactsWrapper wrapper = new OpenFoodFactsWrapperImpl();
        ProductResponse productResponse = wrapper.fetchProductByCode(barcode);
        return productResponse.getProduct().getImageUrl();
    }
}
