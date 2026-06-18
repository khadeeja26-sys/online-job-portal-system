package com.example.job.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.job.dto.JobResponse;
import com.example.job.dto.UserResponse;
import com.example.job.model.Job;
import com.example.job.model.Role;
import com.example.job.model.User;
import com.example.job.repository.JobRepository;
import com.example.job.repository.UserRepository;

@Service
public class AdminService {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private JobRepository jobRepo;

    // ================= USERS =================

    public List<UserResponse> getUsers() {
        return userRepo.findAll()
                .stream()
                .map(this::toUserResponseDTO)
                .toList();
    }

 // ================= SUSPEND USER =================

    public void suspendUser(Long id) {

        User user = userRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getRole() == Role.ADMIN) {
            throw new RuntimeException("Admin cannot be suspended");
        }

        user.setActive(false);

        userRepo.save(user);
    }

    // ================= JOBS =================

    public List<JobResponse> getJobs() {
        return jobRepo.findAll()
                .stream()
                .map(this::toJobResponseDTO)
                .toList();
    }

    public void closeJob(Long id) {

        Job job = jobRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found"));


        job.setActive(false);

        jobRepo.save(job);
    }

    // ================= APPROVE RECRUITER =================

    public void approveRecruiter(Long id) {

        User user = userRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 🔥 Must be recruiter
        if (user.getRole() != Role.RECRUITER) {
            throw new RuntimeException("User is not a recruiter");
        }

        // 🔥 Prevent re-approval
        if (user.isApproved()) {
            throw new RuntimeException("Recruiter already approved");
        }

        user.setApproved(true);
        userRepo.save(user);
    }

    // ================= DASHBOARD =================

    public Map<String, Long> getDashboard() {

        long users = userRepo.count();
        long jobs = jobRepo.count();
        long recruiters = userRepo.findByRole(Role.RECRUITER).size();

        return Map.of(
                "users", users,
                "jobs", jobs,
                "recruiters", recruiters
        );
    }

    // ================= DTO MAPPING =================

    private UserResponse toUserResponseDTO(User u) {
        UserResponse dto = new UserResponse();
        dto.setId(u.getId());
        dto.setName(u.getName());
        dto.setEmail(u.getEmail());
        dto.setRole(u.getRole().name());
        dto.setApproved(u.isApproved());

        dto.setActive(u.isActive());
        return dto;
    }

    private JobResponse toJobResponseDTO(Job j) {
        JobResponse dto = new JobResponse();
        dto.setId(j.getId());
        dto.setTitle(j.getTitle());
        dto.setDescription(j.getDescription());
        dto.setCompany(j.getCompany());
        dto.setLocation(j.getLocation());
        dto.setSalary(j.getSalary());
        dto.setActive(j.isActive());
        return dto;
    }
}