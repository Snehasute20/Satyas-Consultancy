package com.example.demo.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
//import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Entity.Enquiry;
import com.example.demo.Service.EnquiryService;

@RestController
@RequestMapping("/api") 
@CrossOrigin(origins = "*" )
public class EnquiryController {
	
	 private final EnquiryService enquiryService;

	    @Autowired
	    public EnquiryController(EnquiryService enquiryService) {
	        this.enquiryService = enquiryService;
	    }

	   
	    @PostMapping("enquiry")
	    public Enquiry saveEnquiry(@RequestBody Enquiry enquiry) {
	        return enquiryService.saveEnquiry(enquiry);
	    }

	    @GetMapping("enquiries")
	    public List<Enquiry> getAllEnquiries() {
	        return enquiryService.getAllEnquiries();
	        
	        
	    }
	    @DeleteMapping("enquiry/{id}")
	    public String deleteEnquiry(@PathVariable  int id) {
	        enquiryService.deleteEnquiryById(id);
	        return "Enquiry deleted successfully!";
	    }

}
