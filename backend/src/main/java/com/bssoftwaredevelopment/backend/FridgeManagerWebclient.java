package com.bssoftwaredevelopment.backend;

import com.bssoftwaredevelopment.backend.models.TestModelProduct;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Objects;

@Component
public class FridgeManagerWebclient {

    private final WebClient webClient = WebClient.create("https://world.openfoodfacts.org/api/v2/product/");

    public String getProductImageUrl(String barcode) {
        ResponseEntity<TestModelProduct> responseEntity = webClient.get()
                .uri(barcode)
                .retrieve()
                .toEntity(TestModelProduct.class)
                .block();

        assert responseEntity != null;
        return Objects.requireNonNull(responseEntity.getBody()).product().image_url();
    }
}
