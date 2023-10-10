package com.bssoftwaredevelopment.backend;

import com.bssoftwaredevelopment.backend.models.Item;
import com.bssoftwaredevelopment.backend.models.ItemToCreate;
import com.bssoftwaredevelopment.backend.models.StockUnit;
import com.bssoftwaredevelopment.backend.models.StorageLocation;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.List;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@SpringBootTest
@AutoConfigureMockMvc
class FridgeManagerIntegrationTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    FridgeManagerService fridgeManagerService;

    @Autowired
    ObjectMapper objectMapper;


    @Test
    @DirtiesContext
    void whenFetchOpenFoodFactsItem_thenReturnOpenFoodFactsItem() throws Exception {
        //Given
        String barcode = "737628064502";

        //When
        mockMvc.perform(
                        MockMvcRequestBuilders.get("/api/items/openfoodapi/" + barcode)
                                .contentType(MediaType.APPLICATION_JSON)
                )
                //Then
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("product._id").isNotEmpty());
    }

    @Test
    @DirtiesContext
    void whenFetchItemByBarcode_thenReturnItem() throws Exception {
        //Given
        String barcode = "737628064502";
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

        String itemToCreateJson = objectMapper.writeValueAsString(itemToCreate);

        mockMvc.perform(
                MockMvcRequestBuilders.post("/api/items")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(itemToCreateJson)
        );

        //When
        mockMvc.perform(
                        MockMvcRequestBuilders.get("/api/items/barcode/" + barcode)
                                .contentType(MediaType.APPLICATION_JSON)
                )
                //Then
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("barcode").value(barcode))
                .andExpect(jsonPath("name").value("Thai peanut noodle kit includes stir-fry rice noodles & thai peanut seasoning"))
                .andExpect(jsonPath("imageUrl").value("https://images.openfoodfacts.org/images/products/073/762/806/4502/front_en.6.400.jpg"))
                .andExpect(jsonPath("storageLocation").value("FRIDGE"))
                .andExpect(jsonPath("stockAmount").value(1))
                .andExpect(jsonPath("warnStockAmount").value(1))
                .andExpect(jsonPath("stockUnit").value("PIECE"))
                .andExpect(jsonPath("quantity").value("155 g"));
    }

    @Test
    @DirtiesContext
    void whenFetchItemById_thenReturnItem() throws Exception {
        //Given
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

        String itemToCreateJson = objectMapper.writeValueAsString(itemToCreate);

        mockMvc.perform(
                MockMvcRequestBuilders.post("/api/items")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(itemToCreateJson)
        );
        List<Item> items = fridgeManagerService.getAllItems();
        String id = items.get(0).id();

        //When
        mockMvc.perform(
                        MockMvcRequestBuilders.get("/api/items/id/" + id)
                                .contentType(MediaType.APPLICATION_JSON)
                )
                //Then
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("id").value(id))
                .andExpect(jsonPath("barcode").value("737628064502"))
                .andExpect(jsonPath("name").value("Thai peanut noodle kit includes stir-fry rice noodles & thai peanut seasoning"))
                .andExpect(jsonPath("imageUrl").value("https://images.openfoodfacts.org/images/products/073/762/806/4502/front_en.6.400.jpg"))
                .andExpect(jsonPath("storageLocation").value("FRIDGE"))
                .andExpect(jsonPath("stockAmount").value(1))
                .andExpect(jsonPath("warnStockAmount").value(1))
                .andExpect(jsonPath("stockUnit").value("PIECE"))
                .andExpect(jsonPath("quantity").value("155 g"));
    }

    @Test
    @DirtiesContext
    void returnAllItems_whenGetAllItems() throws Exception {
        //Given
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

        String itemToCreateJson = objectMapper.writeValueAsString(itemToCreate);

        mockMvc.perform(
                MockMvcRequestBuilders.post("/api/items")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(itemToCreateJson)
        );


        //When
        mockMvc.perform(
                        MockMvcRequestBuilders.get("/api/items")
                                .contentType(MediaType.APPLICATION_JSON)
                )
                //Then
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].id").isNotEmpty())
                .andExpect(jsonPath("$[0].barcode").value("737628064502"))
                .andExpect(jsonPath("$[0].name").value("Thai peanut noodle kit includes stir-fry rice noodles & thai peanut seasoning"))
                .andExpect(jsonPath("$[0].imageUrl").value("https://images.openfoodfacts.org/images/products/073/762/806/4502/front_en.6.400.jpg"))
                .andExpect(jsonPath("$[0].storageLocation").value("FRIDGE"))
                .andExpect(jsonPath("$[0].stockAmount").value(1))
                .andExpect(jsonPath("$[0].warnStockAmount").value(1))
                .andExpect(jsonPath("$[0].stockUnit").value("PIECE"))
                .andExpect(jsonPath("$[0].quantity").value("155 g"));
    }

    @Test
    @DirtiesContext
    void returnUpdatedItem_whenUpdateItem() throws Exception {
        //Given
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
        String itemToCreateJson = objectMapper.writeValueAsString(itemToCreate);

        MvcResult result = mockMvc.perform(
                MockMvcRequestBuilders.post("/api/items")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(itemToCreateJson)
        ).andReturn();
        String content = result.getResponse().getContentAsString();
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode responseJson = objectMapper.readTree(content);
        String itemId = responseJson.get("id").asText();
        Item itemUpdated = new Item(
                itemId,
                "737628064502",
                "Changed Name",
                "https://images.openfoodfacts.org/images/products/073/762/806/4502/front_en.6.400.jpg",
                StorageLocation.FRIDGE,
                1,
                1,
                StockUnit.PIECE,
                "155 g"
        );
        String itemUpdatedJson = objectMapper.writeValueAsString(itemUpdated);



        //When
        mockMvc.perform(
                MockMvcRequestBuilders.put("/api/items/" + itemId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(itemUpdatedJson)
        )
                //Then
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("id").value(itemId))
                .andExpect(jsonPath("barcode").value("737628064502"))
                .andExpect(jsonPath("name").value("Changed Name"))
                .andExpect(jsonPath("imageUrl").value("https://images.openfoodfacts.org/images/products/073/762/806/4502/front_en.6.400.jpg"))
                .andExpect(jsonPath("storageLocation").value("FRIDGE"))
                .andExpect(jsonPath("stockAmount").value(1))
                .andExpect(jsonPath("warnStockAmount").value(1))
                .andExpect(jsonPath("stockUnit").value("PIECE"))
                .andExpect(jsonPath("quantity").value("155 g"));
    }
}