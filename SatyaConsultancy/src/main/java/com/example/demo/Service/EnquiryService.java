package com.example.demo.Service;

import java.util.List;

import com.example.demo.Entity.Enquiry;

public interface EnquiryService {
	  Enquiry saveEnquiry(Enquiry enquiry);
	    List<Enquiry> getAllEnquiries();
	    void deleteEnquiryById(int id);

}
