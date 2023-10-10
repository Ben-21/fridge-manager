package com.bssoftwaredevelopment.backend;

import com.bssoftwaredevelopment.backend.customexceptions.EmptyItemException;
import com.bssoftwaredevelopment.backend.customexceptions.ItemByBarcodeNotFoundException;
import com.bssoftwaredevelopment.backend.models.*;
import com.bssoftwaredevelopment.backend.services.UuIdService;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;


class FridgeManagerServiceTest {

    FridgeManagerRepo fridgeManagerRepo = mock(FridgeManagerRepo.class);
    UuIdService uuIdService = mock(UuIdService.class);
    FridgeManagerWebclient fridgeManagerWebclient = mock(FridgeManagerWebclient.class);
    FridgeManagerService fridgeManagerService = new FridgeManagerService(fridgeManagerRepo, uuIdService, fridgeManagerWebclient);

    private final ItemToCreate itemToCreate = new ItemToCreate(
            "737628064502",
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
    void returnItem_whenFetchItemByBarcode() {
        //Given
        String barcode = "737628064502";
        Item expectedItem = new Item(
                "0123",
                "737628064502",
                "Thai peanut noodle kit includes stir-fry rice noodles & thai peanut seasoning",
                "https://images.openfoodfacts.org/images/products/073/762/806/4502/front_en.6.400.jpg",
                StorageLocation.FRIDGE,
                1,
                1,
                StockUnit.PIECE,
                "155 g"
        );

        //When
        when(fridgeManagerRepo.findByBarcode(barcode))
                .thenReturn(expectedItem);
        Item actualItem = fridgeManagerService.fetchItemByBarcode(barcode);

        //Then
        assertEquals(expectedItem, actualItem);
    }

    @Test
    void return_Exceptions_whenBarcodeIsNull() {
        //Then
        assertThrows(ItemByBarcodeNotFoundException.class, () -> fridgeManagerService.fetchItemByBarcode(null));
    }

    @Test
    void returnItem_whenCreateItem() {
        //Given
        Item expectedItem = new Item(
                "0123",
                "737628064502",
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

    @Test
    void throwExceptionIfItemIsEmptyWithMessageCheck() {
        // Given
        ItemToCreate emptyItem = new ItemToCreate(
                "",
                "",
                "",
                StorageLocation.FRIDGE,
                1,
                1,
                StockUnit.PIECE,
                ""
        );

        // When and Then
        EmptyItemException exception = assertThrows(EmptyItemException.class, () -> fridgeManagerService.createItem(emptyItem));
        assertEquals("Empty item can not be saved", exception.getMessage());
    }

    @Test
    void returnAllItems_whenGetAllItems(){
        //Given
        Item expectedItem = new Item(
                "0123",
                "737628064502",
                "Thai peanut noodle kit includes stir-fry rice noodles & thai peanut seasoning",
                "https://images.openfoodfacts.org/images/products/073/762/806/4502/front_en.6.400.jpg",
                StorageLocation.FRIDGE,
                1,
                1,
                StockUnit.PIECE,
                "155 g"
        );

        //When
        when(fridgeManagerRepo.findAll())
                .thenReturn(List.of(expectedItem));
        List<Item> actualItems = fridgeManagerService.getAllItems();

        //Then
        assertEquals(List.of(expectedItem), actualItems);
    }

    @Test
    void returnItem_whenUpdateItem(){
        //Given
        String id = "0123";
        Item itemToUpdate = new Item(
                "0123",
                "737628064502",
                "Thai peanut noodle kit includes stir-fry rice noodles & thai peanut seasoning",
                "https://images.openfoodfacts.org/images/products/073/762/806/4502/front_en.6.400.jpg",
                StorageLocation.FRIDGE,
                1,
                1,
                StockUnit.PIECE,
                "155 g"
        );

        ItemToCreate itemToCreate = new ItemToCreate(
                "737628064502",
                "Thai peanut noodle kit includes stir-fry rice noodles & thai peanut seasoning",
                "https://images.openfoodfacts.org/images/products/073/762/806/4502/front_en.6.400.jpg",
                StorageLocation.FRIDGE,
                1,
                1,
                StockUnit.PIECE,
                "155 g"
        );

        //When
        when(fridgeManagerRepo.existsById(id))
                .thenReturn(true);
        when(fridgeManagerRepo.save(itemToUpdate))
                .thenReturn(itemToUpdate);

        Item actualItem = fridgeManagerService.updateItem(id, itemToCreate);

        //Then
        verify(fridgeManagerRepo).existsById(id);
        verify(fridgeManagerRepo).save(itemToUpdate);
        assertEquals(itemToUpdate, actualItem);
    }
}