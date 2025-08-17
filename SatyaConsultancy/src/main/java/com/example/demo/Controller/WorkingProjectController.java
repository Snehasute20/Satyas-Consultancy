package com.example.demo.Controller;

import java.util.List;
import java.util.jar.Attributes.Name;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.Entity.ComplitedProject;
import com.example.demo.Entity.WorkingProject;
import com.example.demo.Service.ComplitProjectServiceImpl;
import com.example.demo.Service.WorkingProjectService;


@RestController
@RequestMapping("/api/project")
@CrossOrigin(origins = "*")
public class WorkingProjectController {
	
	   private final WorkingProjectService workingProjectService;

	    public WorkingProjectController(WorkingProjectService workingProjectService) {
	        this.workingProjectService = workingProjectService;
	    }

	    // POST endpoint to upload image with title and description
	    @PostMapping("/logo")
	    public ResponseEntity<String> uploadImage(
	            @RequestParam("image") MultipartFile file,
	            @RequestParam("title") String title,
	            @RequestParam("description") String description) {

	        if (file.isEmpty()) {
	            return ResponseEntity.badRequest().body("Please select a file to upload.");
	        }
	        try {
	            String fileName = workingProjectService.saveImage(file, title, description);
	            return ResponseEntity.ok("Image uploaded successfully: " + fileName);
	        } catch (Exception e) {
	            return ResponseEntity.internalServerError()
	                    .body("Could not upload the image: " + e.getMessage());
	        }
	    }

	    // GET endpoint to retrieve all images with metadata (title and description)
	    @GetMapping("/working")
	    public ResponseEntity<List<WorkingProject>> getAllImages() {
	        try {
	            List<WorkingProject> imageMetadata = workingProjectService.getAllImages();
	            return ResponseEntity.ok(imageMetadata);
	        } catch (Exception e) {
	            return ResponseEntity.internalServerError().body(null);
	        }
	    }
	    
	 // DELETE endpoint to delete a project by ID
	    @DeleteMapping("/delete/{name}")
	    public ResponseEntity<String> deleteProject(@PathVariable String name) {
	        try {
	            boolean deleted = workingProjectService.deleteProjectByFileName(name);
	            if (deleted) {
	                return ResponseEntity.ok("Project deleted successfully.");
	            } else {
	                return ResponseEntity.status(404).body("Project not found.");
	            }
	        } catch (Exception e) {
	            return ResponseEntity.internalServerError().body("Error deleting project: " + e.getMessage());
	        }
	    }

	}



