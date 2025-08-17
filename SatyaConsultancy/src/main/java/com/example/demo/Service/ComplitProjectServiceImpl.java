package com.example.demo.Service;



import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.Entity.ComplitedProject;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class ComplitProjectServiceImpl {

    private static final String UPLOAD_DIR = System.getProperty("user.dir") + File.separator + "gallery-images";
    private final List<ComplitedProject> complitedProjectslist = new ArrayList<>();

    // Method to save the uploaded image along with metadata
    public String saveImage(MultipartFile file, String title, String description) throws IOException {
        File uploadPath = new File(UPLOAD_DIR);
        if (!uploadPath.exists()) {
            boolean created = uploadPath.mkdirs();
            if (!created) {
                throw new IOException("Failed to create upload directory");
            }
        }

        String fileName = file.getOriginalFilename();
        if (fileName == null || fileName.isEmpty()) {
            throw new IOException("File name is null or empty");
        }

        File destination = new File(uploadPath, fileName);
        file.transferTo(destination);

        // Store metadata (fileName, title, description)
        complitedProjectslist.add(new ComplitedProject(fileName, title, description));
        return fileName;
    }

    // Method to retrieve all image metadata
    public List<ComplitedProject> getAllImages() {
        return complitedProjectslist;
    }
    // ✅ DELETE method to remove image and metadata
    public boolean deleteImage(String fileName) {
        File file = new File(UPLOAD_DIR, fileName);

        if (file.exists()) {
            boolean deletedFile = file.delete();
            if (deletedFile) {
                // Also remove from metadata list
                complitedProjectslist.removeIf(project -> project.getFileName().equals(fileName));
                return true;
            }
        }
        return false;
    
}
}
