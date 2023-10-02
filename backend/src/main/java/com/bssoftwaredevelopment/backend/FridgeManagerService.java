package com.bssoftwaredevelopment.backend;

import com.bssoftwaredevelopment.backend.models.OpenFoodFactsItem;
import com.bssoftwaredevelopment.backend.services.UuIdService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class FridgeManagerService {

    private final FridgeManagerRepo fridgeManagerRepo;
    private final UuIdService uuIdService;
    private final FridgeManagerWebclient fridgeManagerWebclient;

    public OpenFoodFactsItem fetchOpenFoodFactsItem(String barcode) {

        return fridgeManagerWebclient.getOpenFoodFactsItem(barcode);
    }
}
