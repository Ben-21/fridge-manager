package com.bssoftwaredevelopment.backend;

import com.bssoftwaredevelopment.backend.customexceptions.EmptyItemException;
import com.bssoftwaredevelopment.backend.customexceptions.ItemByBarcodeNotFoundException;
import com.bssoftwaredevelopment.backend.customexceptions.ItemByIdNotFoundException;
import com.bssoftwaredevelopment.backend.models.*;
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

    public Item fetchItemById(String id){
        if(fridgeManagerRepo.existsById(id)){
            return fridgeManagerRepo.findById(id).orElseThrow(() -> new ItemByIdNotFoundException(id));
        }
        throw new ItemByIdNotFoundException(id);
    }

    public Item createItem(ItemToCreate itemToCreate) {
        if(isItemEmpty(itemToCreate)){
            throw new EmptyItemException();
        }
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
    private boolean isItemEmpty(ItemToCreate itemToCreate) {
        return itemToCreate.barcode().isEmpty() ||
                itemToCreate.name().isEmpty() ||
                itemToCreate.imageUrl().isEmpty() ||
                itemToCreate.quantity().isEmpty();
    }

    public List<Item> getAllItems() {
        return fridgeManagerRepo.findAll();
    }
}
