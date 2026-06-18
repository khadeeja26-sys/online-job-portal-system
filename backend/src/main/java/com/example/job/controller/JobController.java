package com.example.job.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.example.job.dto.JobRequest;
import com.example.job.dto.JobResponse;
import com.example.job.service.JobService;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin(origins = "http://localhost:4200")
public class JobController {

    @Autowired
    private JobService service;

    // ✅ GET all jobs + search
    @GetMapping("/search")
    public List<JobResponse> getJobs(@RequestParam(required = false ,  defaultValue = "") String keyword, Authentication auth) {
        return service.getJobs(keyword,auth);
    }

    // ✅ GET single job
    @GetMapping("/{id}")
    public JobResponse getById(@PathVariable Long id, Authentication auth) {
        return service.getById(id,auth);
    }

    // ✅ POST job (Recruiter only)
    @PostMapping
    @PreAuthorize("hasRole('RECRUITER')")
    public JobResponse post(@RequestBody JobRequest dto, Authentication auth) {
        return service.save(dto, auth); // ✅ FIXED
    }
    
    @GetMapping("/my-jobs")
    @PreAuthorize("hasRole('RECRUITER')")
    public List<JobResponse> getMyJobs(Authentication auth) {
        return service.getMyJobs(auth);
    }

    // ✅ UPDATE job
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('RECRUITER')")
    public JobResponse update(@PathVariable Long id,
                         @RequestBody JobRequest dto,
                         Authentication auth) {
        return service.update(id, dto, auth);
    }

    // ✅  close job
    @PutMapping("/close/{id}")
    @PreAuthorize("hasRole('RECRUITER')")
    public void closeJob(@PathVariable Long id, Authentication auth) {
        service.closeJob(id, auth); // ✅ FIXED
    }
}