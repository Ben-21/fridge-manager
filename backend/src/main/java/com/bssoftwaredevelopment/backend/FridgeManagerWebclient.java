package com.bssoftwaredevelopment.backend;

import com.bssoftwaredevelopment.backend.models.OpenFoodFactsItem;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import java.util.Objects;

@Component
public class FridgeManagerWebclient {

    private final WebClient webClient = WebClient.create("https://world.openfoodfacts.org/api/v2/product/");

    public OpenFoodFactsItem getOpenFoodFactsItem(String barcode) {
        try {
            ResponseEntity<OpenFoodFactsItem> responseEntity = webClient.get()
                    .uri(barcode)
                    .retrieve()
                    .toEntity(OpenFoodFactsItem.class)
                    .block();

            assert responseEntity != null;
            return Objects.requireNonNull(responseEntity.getBody());

        } catch (WebClientResponseException e) {
            return new OpenFoodFactsItem(barcode, null, 0, "product not found");
        }
    }
}
