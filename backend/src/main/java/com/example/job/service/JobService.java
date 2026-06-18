package com.example.job.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.example.job.dto.JobRequest;
import com.example.job.dto.JobResponse;
import com.example.job.model.Job;
import com.example.job.model.User;
import com.example.job.repository.ApplicationRepository;
import com.example.job.repository.JobRepository;
import com.example.job.repository.UserRepository;

@Service
public class JobService {

    @Autowired
    private JobRepository jobRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private ApplicationRepository appRepo;

    // =========================
    // ✅ GET ALL / SEARCH JOBS
    // =========================
    public List<JobResponse> getJobs(String keyword,Authentication auth) {

        List<Job> jobs = (keyword != null && !keyword.isEmpty())
            ? jobRepo.findByTitleContainingIgnoreCaseAndActiveTrue(keyword)
            : jobRepo.findByActiveTrue();

        if (auth != null && auth.isAuthenticated()
                && !"anonymousUser".equals(auth.getName())) {

            User user = getLoggedInUser(auth);

            return jobs.stream()
                    .map(job -> toDTO(job, user))
                    .toList();
        }

        return jobs.stream()
                .map(this::toDTO)
                .toList();
    }

    // =========================
    // ✅ GET JOB BY ID
    // =========================
   

    public JobResponse getById(Long id, Authentication auth) {
        Job job = jobRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        if (auth != null && auth.isAuthenticated()
                && !"anonymousUser".equals(auth.getName())) {

            User user = getLoggedInUser(auth);
            return toDTO(job, user);
        }

        return toDTO(job);
    }
    // =========================
    // ✅ CREATE JOB (RECRUITER)
    // =========================
    public JobResponse save(JobRequest dto, Authentication auth) {

        User recruiter = getLoggedInUser(auth);

        Job job = new Job();
        job.setTitle(dto.getTitle());
        job.setDescription(dto.getDescription());
        job.setCompany(dto.getCompany());
        job.setLocation(dto.getLocation());
        job.setSalary(dto.getSalary());
        job.setRecruiter(recruiter);
        job.setActive(true);

        return toDTO(jobRepo.save(job));
    }
    
    
 // =========================
 // ✅ GET MY JOBS (RECRUITER)
 // =========================
 public List<JobResponse> getMyJobs(Authentication auth) {

     // Get logged-in recruiter
     User recruiter = getLoggedInUser(auth);

     // Fetch only jobs posted by this recruiter
     List<Job> jobs = jobRepo.findByRecruiterId(recruiter.getId());

     // Convert entities to DTOs
     return jobs.stream()
             .map(this::toDTO)
             .toList();
 }
    
    
    // =========================
    // ✅ UPDATE JOB
    // =========================
    public JobResponse update(Long id, JobRequest dto, Authentication auth) {

        User recruiter = getLoggedInUser(auth);
        Job job = getJobById(id);

        checkOwnership(job, recruiter);

        job.setTitle(dto.getTitle());
        job.setDescription(dto.getDescription());
        job.setCompany(dto.getCompany());
        job.setLocation(dto.getLocation());
        job.setSalary(dto.getSalary());

        return toDTO(jobRepo.save(job));
    }

    // =========================
    // ✅ DELETE JOB
    // =========================
    public void closeJob(Long id, Authentication auth) {

        User recruiter = getLoggedInUser(auth);
        Job job = getJobById(id);

        checkOwnership(job, recruiter);

        job.setActive(false);
        jobRepo.save(job);
    }

    // =========================
    // 🔧 HELPER METHODS
    // =========================

    private User getLoggedInUser(Authentication auth) {
        return userRepo.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    private Job getJobById(Long id) {
        return jobRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found"));
    }

    private void checkOwnership(Job job, User recruiter) {
        if (!job.getRecruiter().getId().equals(recruiter.getId())) {
            throw new RuntimeException("Unauthorized");
        }
    }

    private JobResponse toDTO(Job job) {
        JobResponse dto = new JobResponse();
        dto.setId(job.getId());
        dto.setTitle(job.getTitle());
        dto.setDescription(job.getDescription());
        dto.setCompany(job.getCompany());
        dto.setLocation(job.getLocation());
        dto.setSalary(job.getSalary());
        dto.setActive(job.isActive());
        return dto;
    }
    private JobResponse toDTO(Job job, User user) {
        JobResponse dto = toDTO(job);

        boolean applied =
            appRepo.existsByUserIdAndJobId(
                user.getId(),
                job.getId()
            );

        dto.setApplied(applied);

        return dto;
    }
   
}