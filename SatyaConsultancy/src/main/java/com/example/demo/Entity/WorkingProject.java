package com.example.demo.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class WorkingProject {
	

	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

   private String fileName;
   private String title;
   private String description;

   // Constructor
   public WorkingProject(String fileName, String title, String description) {
       this.fileName = fileName;
       this.title = title;
       this.description = description;
   }

   // Getters and Setters
   public String getFileName() {
       return fileName;
   }

   public void setFileName(String fileName) {
       this.fileName = fileName;
   }

   public String getTitle() {
       return title;
   }

   public void setTitle(String title) {
       this.title = title;
   }

   public String getDescription() {
       return description;
   }

   public void setDescription(String description) {
       this.description = description;
   }
}



