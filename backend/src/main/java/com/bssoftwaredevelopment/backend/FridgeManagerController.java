package com.bssoftwaredevelopment.backend;

import com.bssoftwaredevelopment.backend.models.Item;
import com.bssoftwaredevelopment.backend.models.OpenFoodFactsItem;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/items")
public class FridgeManagerController {

    private final FridgeManagerService fridgeManagerService;


    @GetMapping("/openfoodapi/{barcode}")
    public OpenFoodFactsItem fetchOpenFoodFactsItem(@PathVariable String barcode){
        return fridgeManagerService.fetchOpenFoodFactsItem(barcode);
    }

    @GetMapping("/{barcode}")
    public Item fetchItemByBarcode(@PathVariable String barcode){
        return fridgeManagerService.fetchItemByBarcode(barcode);
    }
}
