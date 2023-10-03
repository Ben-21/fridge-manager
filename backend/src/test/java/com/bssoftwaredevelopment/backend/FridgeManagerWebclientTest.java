package com.bssoftwaredevelopment.backend;

import com.bssoftwaredevelopment.backend.models.OpenFoodFactsItem;
import com.bssoftwaredevelopment.backend.models.OpenFoodFactsProduct;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class FridgeManagerWebclientTest {

    private final FridgeManagerWebclient fridgeManagerWebclient = new FridgeManagerWebclient();

    @Test
    void getProduct_whenSendBarcode() {
        //Given
        String barcode = "737628064502";

        OpenFoodFactsItem expectedItem = new OpenFoodFactsItem("0737628064502", new OpenFoodFactsProduct("0737628064502",
                "Thai peanut noodle kit includes stir-fry rice noodles & thai peanut seasoning",
                "https://images.openfoodfacts.org/images/products/073/762/806/4502/front_en.6.400.jpg",
                "155 g"));


        //When
        OpenFoodFactsItem actualItem = fridgeManagerWebclient.getOpenFoodFactsItem(barcode);

        //Then
        assertEquals(expectedItem, actualItem);
    }

}