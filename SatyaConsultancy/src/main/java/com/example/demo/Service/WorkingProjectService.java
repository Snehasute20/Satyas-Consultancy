package com.example.demo.Service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.Entity.ComplitedProject;
import com.example.demo.Entity.WorkingProject;

@Service

public class WorkingProjectService {
	

    private static final String UPLOAD_DIR = System.getProperty("user.dir") + File.separator + "gallery-images";
    private final List<WorkingProject> workingProjectslist = new ArrayList<>();

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
        workingProjectslist.add(new WorkingProject(fileName, title, description));
        return fileName;
    }

    // Method to retrieve all image metadata
    public List<WorkingProject> getAllImages() {
        return workingProjectslist;
        
    }
    
    public boolean deleteProjectByFileName(String fileName) {
        // Find the project by fileName
        WorkingProject projectToDelete = null;
        for (WorkingProject project : workingProjectslist) {
            if (project.getFileName().equals(fileName)) {
                projectToDelete = project;
                break;
            }
        }

        if (projectToDelete != null) {
            // Remove from list
            workingProjectslist.remove(projectToDelete);

            // Delete the file from disk
            File file = new File(UPLOAD_DIR + File.separator + fileName);
            if (file.exists()) {
                file.delete();
            }

            return true;
        } else {
            return false; // not found
        }
    }

}
