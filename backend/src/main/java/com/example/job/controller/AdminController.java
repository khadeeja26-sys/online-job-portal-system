package com.example.job.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.job.dto.JobResponse;
import com.example.job.dto.UserResponse;
import com.example.job.service.AdminService;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:4200")
@PreAuthorize("hasRole('ADMIN')") // 🔥 JWT role check
public class AdminController {

    @Autowired
    private AdminService service;

    // ================= USERS =================

    @GetMapping("/users")
    public List<UserResponse> getUsers() {
        return service.getUsers();
    }

    @PutMapping("/users/{id}/suspend")
    public void suspendUser(@PathVariable Long id) {
        service.suspendUser(id);
    }

    // ================= JOBS =================

    @GetMapping("/jobs")
    public List<JobResponse> getJobs() {
        return service.getJobs();
    }

    @PutMapping("/close/{id}")
    public void closeJob(@PathVariable Long id) {
        service.closeJob(id);
    }

    // ================= APPROVE =================

    @PutMapping("/recruiters/{id}/approve")
    public void approveRecruiter(@PathVariable Long id) {
        service.approveRecruiter(id);
    }

    // ================= DASHBOARD =================

    @GetMapping("/dashboard")
    public Map<String, Long> dashboard() {
        return service.getDashboard();
    }
}