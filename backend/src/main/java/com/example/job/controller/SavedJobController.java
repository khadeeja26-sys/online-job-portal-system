package com.example.job.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.example.job.dto.JobResponse;
import com.example.job.dto.SavedJobResponse;
import com.example.job.service.SavedJobService;

@RestController
@RequestMapping("/api/saved-jobs")
@CrossOrigin(origins = "http://localhost:4200")
public class SavedJobController {

    @Autowired
    private SavedJobService service;

    
    @PreAuthorize("hasRole('JOBSEEKER')")
    @PostMapping("/{jobId}")
    public void save(@PathVariable Long jobId, Authentication auth) {
        service.saveJob(jobId, auth);
    }

    
    @PreAuthorize("hasRole('JOBSEEKER')")
    @GetMapping
    public List<SavedJobResponse> getSavedJobs(Authentication auth) {
        return service.getSavedJobs(auth);
    }

   
    @PreAuthorize("hasRole('JOBSEEKER')")
    @DeleteMapping("/{id}")
    public void remove(@PathVariable Long id, Authentication auth) {
        service.removeSavedJob(id, auth);
    }
}
