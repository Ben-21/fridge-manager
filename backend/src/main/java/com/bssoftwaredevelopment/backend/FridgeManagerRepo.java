package com.bssoftwaredevelopment.backend;

import com.bssoftwaredevelopment.backend.models.Item;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface FridgeManagerRepo extends MongoRepository<Item, String> {
     Item findByBarcode(String barcode);
}
