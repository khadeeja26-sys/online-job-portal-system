package com.example.job.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.job.dto.JobResponse;
import com.example.job.dto.SavedJobResponse;
import com.example.job.model.Job;
import com.example.job.model.SavedJob;
import com.example.job.model.User;
import com.example.job.repository.ApplicationRepository;
import com.example.job.repository.JobRepository;
import com.example.job.repository.SavedJobRepository;
import com.example.job.repository.UserRepository;

@Service
public class SavedJobService {

    @Autowired
    private SavedJobRepository savedRepo;

    @Autowired
    private JobRepository jobRepo;

    @Autowired
    private UserRepository userRepo;
    
    @Autowired
    private ApplicationRepository appRepo;
    
    

    // SAVE JOB
    public void saveJob(Long jobId, Authentication auth) {

        String email = auth.getName();
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Job job = jobRepo.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        // 🔥 Prevent duplicate save
        if (savedRepo.existsByUserIdAndJobId(user.getId(), jobId)) {
        	throw new ResponseStatusException(
        	        HttpStatus.BAD_REQUEST,
        	        "Job already saved"
        	    );
        }

        SavedJob saved = new SavedJob();
        saved.setUser(user);
        saved.setJob(job);

        savedRepo.save(saved);
    }

    // GET SAVED JOBS
    public List<SavedJobResponse> getSavedJobs(Authentication auth) {

        // 🔥 Get logged-in user from JWT
        String email = auth.getName();

        User user = userRepo.findByEmail(email)
        		.orElseThrow(() -> new ResponseStatusException(
					    HttpStatus.NOT_FOUND,
					    "User not found"
					));

        // 🔥 Fetch saved jobs for this user only
        return savedRepo.findByUserId(user.getId())
                .stream()
                .map(saved -> toDTO(saved, user)) 
                .toList();
    }

    public void removeSavedJob(Long id, Authentication auth) {

        String email = auth.getName();
        User user = userRepo.findByEmail(email)
        		.orElseThrow(() -> new ResponseStatusException(
					    HttpStatus.NOT_FOUND,
					    "User not found"
					));

        SavedJob saved = savedRepo.findById(id)
        		.orElseThrow(() -> new ResponseStatusException(
					    HttpStatus.NOT_FOUND,
					    "Saved job not found"
					));
        // 🔥 SECURITY CHECK
        if (!saved.getUser().getId().equals(user.getId())) {
        	throw new ResponseStatusException(
        	        HttpStatus.BAD_REQUEST,
        	        "Unauthorized"
        	    );
        }

        savedRepo.delete(saved);
    }
    private SavedJobResponse toDTO(SavedJob saved,User user) {
    	 Job job = saved.getJob();
        SavedJobResponse dto = new SavedJobResponse();
        
        dto.setSavedJobId(saved.getId());
        dto.setJobId(job.getId());
        dto.setTitle(job.getTitle());
        dto.setDescription(job.getDescription());
        dto.setCompany(job.getCompany());
        dto.setLocation(job.getLocation());
        dto.setSalary(job.getSalary());
        
        dto.setActive(job.isActive());

        // ✅ Check whether current user already applied
        boolean applied =
            appRepo.existsByUserIdAndJobId(
                user.getId(),
                job.getId()
            );

        dto.setApplied(applied);
        return dto;
    }
}