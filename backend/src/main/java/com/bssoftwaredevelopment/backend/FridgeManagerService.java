package com.bssoftwaredevelopment.backend;

import com.bssoftwaredevelopment.backend.customexceptions.ItemByBarcodeNotFoundException;
import com.bssoftwaredevelopment.backend.models.Item;
import com.bssoftwaredevelopment.backend.models.ItemToCreate;
import com.bssoftwaredevelopment.backend.models.OpenFoodFactsItem;
import com.bssoftwaredevelopment.backend.services.UuIdService;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class FridgeManagerService {

    private final FridgeManagerRepo fridgeManagerRepo;
    private final UuIdService uuIdService;
    private final FridgeManagerWebclient fridgeManagerWebclient;


    public FridgeManagerService(FridgeManagerRepo fridgeManagerRepo, UuIdService uuIdService, FridgeManagerWebclient fridgeManagerWebclient) {
        this.fridgeManagerRepo = fridgeManagerRepo;
        this.uuIdService = uuIdService;
        this.fridgeManagerWebclient = fridgeManagerWebclient;
    }

    public OpenFoodFactsItem fetchOpenFoodFactsItem(String barcode) {

        return fridgeManagerWebclient.getOpenFoodFactsItem(barcode);
    }

    public Item fetchItemByBarcode(String barcode){
        if(fridgeManagerRepo.findByBarcode(barcode) != null){
            return fridgeManagerRepo.findByBarcode(barcode);
        }
        throw new ItemByBarcodeNotFoundException(barcode);
    }

    public Item createItem(ItemToCreate itemToCreate) {
        Item newItem = new Item(
                uuIdService.createId(),
                itemToCreate.barcode(),
                itemToCreate.name(),
                itemToCreate.imageUrl(),
                itemToCreate.storageLocation(),
                itemToCreate.stockAmount(),
                itemToCreate.warnStockAmount(),
                itemToCreate.stockUnit(),
                itemToCreate.quantity()
        );
        return fridgeManagerRepo.insert(newItem);
    }

    public List<Item> getAllItems() {
        return fridgeManagerRepo.findAll();
    }
}
