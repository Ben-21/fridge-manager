package com.bssoftwaredevelopment.backend.imageupload;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/upload")
public class ImageUploadController {

    private final CloudinaryService cloudinaryService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public String addImageProfile(@RequestPart(name = "file", required = false) MultipartFile image) throws IOException {
        return cloudinaryService.uploadImage(image);
    }
}
