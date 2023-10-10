package com.bssoftwaredevelopment.backend;

import com.bssoftwaredevelopment.backend.models.Item;
import com.bssoftwaredevelopment.backend.models.ItemToCreate;
import com.bssoftwaredevelopment.backend.models.OpenFoodFactsItem;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/items")
public class FridgeManagerController {

    private final FridgeManagerService fridgeManagerService;

    @GetMapping
    public List<Item> getAllItems() {
        return fridgeManagerService.getAllItems();
    }

    @GetMapping("/id/{id}")
    public Item fetchItemById (@PathVariable String id){
    return fridgeManagerService.fetchItemById(id);
    }

    @GetMapping("/openfoodapi/{barcode}")
    public OpenFoodFactsItem fetchOpenFoodFactsItem(@PathVariable String barcode) {
        return fridgeManagerService.fetchOpenFoodFactsItem(barcode);
    }

    @GetMapping("/barcode/{barcode}")
    public Item fetchItemByBarcode(@PathVariable String barcode) {
        return fridgeManagerService.fetchItemByBarcode(barcode);
    }

    @PostMapping
    public Item createItem(@RequestBody ItemToCreate itemToCreate) {
        return fridgeManagerService.createItem(itemToCreate);
    }


}
