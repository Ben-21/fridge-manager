package com.bssoftwaredevelopment.backend;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class FridgeManagerWebclientTest {

    private final FridgeManagerWebclient fridgeManagerWebclient = new FridgeManagerWebclient();

    @Test
    void getImageUrl_whenSendBarcode() {
        //Given
        String barcode = "737628064502";
        String expectedImageUrl = "https://images.openfoodfacts.org/images/products/073/762/806/4502/front_en.6.400.jpg";

        //When
        String actual = fridgeManagerWebclient.getProductImageUrl(barcode);

        //Then
        assertEquals(expectedImageUrl, actual);
    }

}