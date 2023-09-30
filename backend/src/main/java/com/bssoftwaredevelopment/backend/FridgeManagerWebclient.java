package com.bssoftwaredevelopment.backend;

import com.bssoftwaredevelopment.backend.models.OpenFoodFactsItem;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Objects;

@Component
public class FridgeManagerWebclient {

    private final WebClient webClient = WebClient.create("https://world.openfoodfacts.org/api/v2/product/");

      public OpenFoodFactsItem getOpenFoodFactsProduct(String barcode) {
        ResponseEntity<OpenFoodFactsItem> responseEntity = webClient.get()
                .uri(barcode)
                .retrieve()
                .toEntity(OpenFoodFactsItem.class)
                .block();

        assert responseEntity != null;
        return Objects.requireNonNull(responseEntity.getBody());
    }
}
