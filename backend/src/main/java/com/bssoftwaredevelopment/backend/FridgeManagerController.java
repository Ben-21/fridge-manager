package com.bssoftwaredevelopment.backend;

import com.bssoftwaredevelopment.backend.models.Item;
import com.bssoftwaredevelopment.backend.models.ItemToCreate;
import com.bssoftwaredevelopment.backend.models.OpenFoodFactsItem;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/items")
public class FridgeManagerController {

    private final FridgeManagerService fridgeManagerService;


    @GetMapping("/openfoodapi/{barcode}")
    public OpenFoodFactsItem fetchOpenFoodFactsItem(@PathVariable String barcode) {
        return fridgeManagerService.fetchOpenFoodFactsItem(barcode);
    }

    @GetMapping("/{barcode}")
    public Item fetchItemByBarcode(@PathVariable String barcode) {
        return fridgeManagerService.fetchItemByBarcode(barcode);
    }

    @PostMapping
    public Item createItem(@RequestBody ItemToCreate itemToCreate) {
        return fridgeManagerService.createItem(itemToCreate);
    }

    @PutMapping
    public Item updateItem(@RequestBody Item item){
        return fridgeManagerService.updateItem(item);
    }
}
