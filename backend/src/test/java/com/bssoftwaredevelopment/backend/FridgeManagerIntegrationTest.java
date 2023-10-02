package com.bssoftwaredevelopment.backend;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@SpringBootTest
@AutoConfigureMockMvc
class FridgeManagerIntegrationTest {

    @Autowired
    MockMvc mockMvc;


    FridgeManagerService fridgeManagerService;


    @Test
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
}