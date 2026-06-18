package com.example.job.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.example.job.dto.ApplicationResponse;
import com.example.job.dto.ApplyRequest;
import com.example.job.service.ApplicationService;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = "http://localhost:4200")
public class ApplicationController {

    @Autowired
    private ApplicationService service;

    
    @PostMapping
    @PreAuthorize("hasRole('JOBSEEKER')")
    public ApplicationResponse apply(@RequestBody ApplyRequest req, Authentication auth) {
        return service.apply(req, auth);
    }

  
    @GetMapping("/job/{jobId}")
    @PreAuthorize("hasRole('RECRUITER')")
    public List<ApplicationResponse> getByJob(@PathVariable Long jobId, Authentication auth) {
        return service.getByJob(jobId, auth);
    }

   
    @GetMapping("/my")
    @PreAuthorize("hasRole('JOBSEEKER')")
    public List<ApplicationResponse> getMyApplications(Authentication auth) {
        return service.getMyApplications(auth);
    }
    
}
