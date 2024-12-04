package com.example.travel.controller;

import com.example.travel.entity.User;
import com.example.travel.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

    private final String uploadDir = "./uploads/";

    @PostMapping("/upload-profile-picture")
    public ResponseEntity<String> uploadProfilePicture(@RequestParam("file") MultipartFile file, @RequestParam("userId") Long userId) {
        if (file.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("파일이 비어있습니다.");
        }

        try {
            // 업로드 디렉토리 생성
            File directory = new File(uploadDir);
            if (!directory.exists()) {
                directory.mkdirs();
            }

            // 고유 파일명 생성
            String originalFilename = file.getOriginalFilename();
            String fileExtension = "";
            if (originalFilename != null && originalFilename.contains(".")) {
                fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
            }
            String uniqueFilename = UUID.randomUUID().toString() + fileExtension;

            // 파일 저장
            Path filePath = Paths.get(uploadDir + uniqueFilename);
            Files.write(filePath, file.getBytes());

            // 사용자 프로필에 파일 URL 업데이트
            String fileUrl = "/uploads/" + uniqueFilename;
            userService.updateProfilePicture(userId, fileUrl);

            return ResponseEntity.ok(fileUrl);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("파일 업로드에 실패했습니다.");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserProfile(@PathVariable Long id) {
        User user = userService.getUserProfile(id);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/update")
    public ResponseEntity<User> updateUserProfile(@RequestBody User updatedUser) {
        User user = userService.updateUserProfile(updatedUser);
        return ResponseEntity.ok(user);
    }

    // 기존 메서드들...
}