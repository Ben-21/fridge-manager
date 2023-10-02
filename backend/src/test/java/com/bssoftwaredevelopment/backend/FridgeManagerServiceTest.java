package com.bssoftwaredevelopment.backend;

import com.bssoftwaredevelopment.backend.models.*;
import com.bssoftwaredevelopment.backend.services.UuIdService;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;


class FridgeManagerServiceTest {

    FridgeManagerRepo fridgeManagerRepo = mock(FridgeManagerRepo.class);
    UuIdService uuIdService = mock(UuIdService.class);
    FridgeManagerWebclient fridgeManagerWebclient = mock(FridgeManagerWebclient.class);
    FridgeManagerService fridgeManagerService = new FridgeManagerService(fridgeManagerRepo, uuIdService, fridgeManagerWebclient);

    private final ItemToCreate itemToCreate = new ItemToCreate(
            "Thai peanut noodle kit includes stir-fry rice noodles & thai peanut seasoning",
            "https://images.openfoodfacts.org/images/products/073/762/806/4502/front_en.6.400.jpg",
            StorageLocation.FRIDGE,
            1,
            1,
            StockUnit.PIECE,
            "155 g"
    );

    @Test
    void returnOpenFoodFactsItem_whenFetchItem() {
        //Given
        String barcode = "737628064502";
        OpenFoodFactsItem openFoodFactsItem = new OpenFoodFactsItem(
                "0737628064502", new OpenFoodFactsProduct("0737628064502",
                "Thai peanut noodle kit includes stir-fry rice noodles & thai peanut seasoning",
                "https://images.openfoodfacts.org/images/products/073/762/806/4502/front_en.6.400.jpg",
                "155 g")
        );

        //When
        when(fridgeManagerWebclient.getOpenFoodFactsItem(barcode))
                .thenReturn(openFoodFactsItem);
        OpenFoodFactsItem actualItem = fridgeManagerService.fetchOpenFoodFactsItem(barcode);

        //Then
        assertEquals(openFoodFactsItem, actualItem);
    }

    @Test
    void returnItem_whenCreateItem() {
        //Given
       Item expectedItem = new Item(
               "0123",
               "Thai peanut noodle kit includes stir-fry rice noodles & thai peanut seasoning",
               "https://images.openfoodfacts.org/images/products/073/762/806/4502/front_en.6.400.jpg",
               StorageLocation.FRIDGE,
               1,
               1,
               StockUnit.PIECE,
               "155 g"
       );

       //When
        when(uuIdService.createId())
                .thenReturn("0123");
        when(fridgeManagerRepo.insert(expectedItem))
                .thenReturn(expectedItem);
        Item actualItem = fridgeManagerService.createItem(itemToCreate);

        //Then
        assertEquals(expectedItem, actualItem);
    }
}