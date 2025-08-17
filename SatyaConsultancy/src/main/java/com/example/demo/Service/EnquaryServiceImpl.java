package com.example.demo.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Entity.Enquiry;
import com.example.demo.Repositry.EnquiryRepo;

@Service
public class EnquaryServiceImpl implements EnquiryService {

    @Autowired
    private EnquiryRepo enquiryRepo;

    @Override
    public Enquiry saveEnquiry(Enquiry enquiry) {
        return enquiryRepo.save(enquiry); 
    }

    @Override
    public List<Enquiry> getAllEnquiries() {
        return enquiryRepo.findAll(); 
    }

	@Override
	public void deleteEnquiryById(int id) {
		  enquiryRepo.deleteById(id);
		
	}
}
