package com.example.demo.Controller;



import com.example.demo.Entity.ComplitedProject;
import com.example.demo.Service.ComplitProjectServiceImpl;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/gallery")
@CrossOrigin(origins = "*")
public class ComplittedProjectController {

    private final ComplitProjectServiceImpl project;

    public ComplittedProjectController(ComplitProjectServiceImpl galleryService) {
        this.project = galleryService;
    }

    // POST endpoint to upload image with title and description
    @PostMapping("/upload")
    public ResponseEntity<String> uploadImage(
            @RequestParam("image") MultipartFile file,
            @RequestParam("title") String title,
            @RequestParam("description") String description) {

        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("Please select a file to upload.");
        }
        try {
            String fileName = project.saveImage(file, title, description);
            return ResponseEntity.ok("Image uploaded successfully: " + fileName);
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body("Could not upload the image: " + e.getMessage());
        }
    }

    // GET endpoint to retrieve all images with metadata (title and description)
    @GetMapping("/images")
    public ResponseEntity<List<ComplitedProject>> getAllImages() {
        try {
            List<ComplitedProject> imageMetadata = project.getAllImages();
            return ResponseEntity.ok(imageMetadata);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(null);
        }
        
    }
    @DeleteMapping("/delete/{fileName}")
    public ResponseEntity<String> deleteImage(@PathVariable String fileName) {
        try {
            boolean deleted = project.deleteImage(fileName);
            if (deleted) {
                return ResponseEntity.ok("Image deleted successfully: " + fileName);
            } else {
                return ResponseEntity.status(404).body("Image not found: " + fileName);
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Could not delete the image: " + e.getMessage());
        }
    }}
