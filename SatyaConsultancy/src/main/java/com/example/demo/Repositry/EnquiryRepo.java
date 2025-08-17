package com.example.demo.Repositry;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entity.Enquiry;

public interface EnquiryRepo extends JpaRepository<Enquiry, Integer>{

}
