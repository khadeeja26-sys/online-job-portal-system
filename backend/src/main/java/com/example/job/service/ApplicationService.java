package com.example.job.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.job.dto.ApplicationResponse;
import com.example.job.dto.ApplyRequest;
import com.example.job.model.Application;
import com.example.job.model.Job;
import com.example.job.model.User;
import com.example.job.repository.ApplicationRepository;
import com.example.job.repository.JobRepository;
import com.example.job.repository.UserRepository;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import com.example.job.model.Resume;
import com.example.job.repository.ResumeRepository;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepository appRepo;

    @Autowired
    private JobRepository jobRepo;

    @Autowired
    private UserRepository userRepo;
    
    @Autowired
    private ResumeRepository resumeRepo;

    // =========================
    // ✅ APPLY JOB (SECURE)
    // =========================
    public ApplicationResponse apply(ApplyRequest req, Authentication auth) {

        User user = getLoggedInUser(auth);

        Job job = jobRepo.findById(req.getJobId())
                .orElseThrow(() -> new RuntimeException("Job not found"));

        // 🔥 Prevent duplicate applications
        if (appRepo.existsByUserIdAndJobId(user.getId(), req.getJobId())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "You have already applied for this job"
                );
        }

        Application app = new Application();
        app.setUser(user);
        app.setJob(job);
        app.setStatus("APPLIED");
        app.setAppliedDate(LocalDate.now());

        return toDTO(appRepo.save(app));
    }

    // =========================
    // ✅ RECRUITER VIEW (SECURE)
    // =========================
    public List<ApplicationResponse> getByJob(Long jobId, Authentication auth) {

        User recruiter = getLoggedInUser(auth);

        Job job = jobRepo.findById(jobId)
        		.orElseThrow(() -> new ResponseStatusException(
        			    HttpStatus.NOT_FOUND,
        			    "Job not found"
        			));

        // 🔥 Ownership check
        if (!job.getRecruiter().getId().equals(recruiter.getId())) {
        	throw new ResponseStatusException(
        		    HttpStatus.FORBIDDEN,
        		    "Unauthorized access"
        		);
        }

        return appRepo.findByJob_Id(jobId)
                .stream()
                .map(this::toDTO)
                .toList();
    }

    // =========================
    // ✅ JOBSEEKER VIEW (SECURE)
    // =========================
    public List<ApplicationResponse> getMyApplications(Authentication auth) {

        User user = getLoggedInUser(auth);

        return appRepo.findByUser_Id(user.getId())
                .stream()
                .map(this::toDTO)
                .toList();
    }

    
    // =========================
    // 🔧 HELPER METHODS
    // =========================

    private User getLoggedInUser(Authentication auth) {
        return userRepo.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    private ApplicationResponse toDTO(Application app) {
        ApplicationResponse dto = new ApplicationResponse();
        dto.setId(app.getId());
        dto.setJobId(app.getJob().getId());
        dto.setUserId(app.getUser().getId()); // optional
        dto.setStatus(app.getStatus());
        dto.setAppliedDate(app.getAppliedDate());
        dto.setJobTitle(app.getJob().getTitle());
        dto.setCompany(app.getJob().getCompany());
        dto.setApplicantName(app.getUser().getName());
        dto.setEmail(app.getUser().getEmail());
        dto.setActive(app.getJob().isActive());
        return dto;
    }
}