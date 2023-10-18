package com.bssoftwaredevelopment.backend.imageupload;

import com.cloudinary.Cloudinary;
import com.cloudinary.Uploader;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import java.io.File;
import java.util.Map;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class ImageUploadIntegrationTest {
    @Autowired
    MockMvc mockMvc;

    @MockBean
    Cloudinary cloudinary;

    Uploader uploader = mock(Uploader.class);


    @Test
    @DirtiesContext
    void expectSuccessfulPost() throws Exception {
        MockMultipartFile file = new MockMultipartFile("file",
                "testImage.png",
                MediaType.IMAGE_PNG_VALUE,
                "testImage".getBytes()
        );

        File fileToUpload = File.createTempFile("image", null);
        file.transferTo(fileToUpload);


        when(cloudinary.uploader()).thenReturn(uploader);
        when(uploader.upload(any(), any())).thenReturn(Map.of("url", "test-url"));

        mockMvc.perform(multipart("/api/upload")
                        .file(file))

                .andExpect(status().isCreated())
                .andExpect(content().string("test-url"));
    }
}
