package com.fcater.fcGames.controllers;

import org.jetbrains.annotations.NotNull;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Objects;
import java.util.UUID;

@RestController
@RequestMapping("/api")
public class FileUploadController {

    private final ResourceLoader resourceLoader;

    public FileUploadController(ResourceLoader resourceLoader) {
        this.resourceLoader = resourceLoader;
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") @NotNull MultipartFile file) {
        try {
            var filename = UUID.randomUUID() + "_" + Objects.requireNonNull(file.getOriginalFilename());
            var staticPath = resourceLoader.getResource("classpath:").getFile().getAbsolutePath();
            var path = staticPath + "/static/gamePoster/";

            var directory = new File(path);
            if (!directory.exists()) directory.mkdirs();

            file.transferTo(new File(path + filename));
            return new ResponseEntity<>("gamePoster/" + filename, HttpStatus.OK);
        } catch (IOException e) {
            return new ResponseEntity<>("上传失败: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
