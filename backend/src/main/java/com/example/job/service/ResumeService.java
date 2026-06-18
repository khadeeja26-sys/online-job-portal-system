package com.example.job.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.*;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.example.job.dto.ResumeResponse;
import com.example.job.model.Application;
import com.example.job.model.Job;
import com.example.job.model.Resume;
import com.example.job.model.User;
import com.example.job.repository.ApplicationRepository;
import com.example.job.repository.ResumeRepository;
import com.example.job.repository.UserRepository;

@Service
public class ResumeService {

    @Autowired
    private ResumeRepository resumeRepo;

    @Autowired
    private UserRepository userRepo;
    
    @Autowired
    private ApplicationRepository appRepo;

    private final String uploadDir = "uploads/";
    
    private static final String UPLOAD_DIR =
            System.getProperty("user.dir")
            + File.separator
            + "uploads";


    // =========================
    // ✅ UPLOAD
    // =========================
	    public ResumeResponse upload(MultipartFile file,
	            Authentication auth) throws IOException {
	
	// Validate file selected
	if (file == null || file.isEmpty()) {
	throw new RuntimeException("Please select a file.");
	}
	
	// Validate original filename
	String originalFileName = file.getOriginalFilename();
	
	if (originalFileName == null || originalFileName.isBlank()) {
	throw new RuntimeException("Invalid file name.");
	}
	
	// Validate PDF extension
	if (!originalFileName.toLowerCase().endsWith(".pdf")) {
	throw new RuntimeException("Only PDF files are allowed.");
	}
	
	// Validate content type (extra protection)
	String contentType = file.getContentType();
	
	if (contentType != null &&
	!contentType.equalsIgnoreCase("application/pdf")) {
	throw new RuntimeException("Invalid file type. Please upload a PDF.");
	}
	
	// Validate size (max 5 MB)
	long maxSize = 5 * 1024 * 1024;
	
	if (file.getSize() > maxSize) {
	throw new RuntimeException("File size must be less than 5 MB.");
	}
	
	// Get logged-in user
	User user = getLoggedInUser(auth);
	
	// Create uploads directory if it does not exist
	File uploadFolder = new File(UPLOAD_DIR);
	
	if (!uploadFolder.exists()) {
	uploadFolder.mkdirs();
	}
	
	// Generate unique file name
	String storedFileName =
	System.currentTimeMillis() + "_" + originalFileName;
	
	// Full file path
	String filePath =
	UPLOAD_DIR + File.separator + storedFileName;
	
	// Check if resume already exists
	Resume existingResume =
	resumeRepo.findByUser_Id(user.getId()).orElse(null);
	
	// Delete old file if replacing resume
	if (existingResume != null) {
	deleteFile(existingResume.getFilePath());
	}
	
	// Save file to disk
	file.transferTo(new File(filePath));
	
	// Use existing or create new Resume entity
	Resume resume =
	existingResume != null ? existingResume : new Resume();
	
	// Save data
	resume.setFileName(originalFileName); // original name for display
	resume.setFilePath(filePath);         // full file path
	resume.setUser(user);
	
	// Save to database
	Resume savedResume = resumeRepo.save(resume);
	
	// Return DTO
	return toDTO(savedResume);
	}


    // =========================
    // ✅ GET MY RESUME
    // =========================
    public ResumeResponse getMyResume(Authentication auth) {
        User user = getLoggedInUser(auth);

        Resume r = resumeRepo.findByUser_Id(user.getId())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Resume not found"
                ));
        return toDTO(r);
    }

    // =========================
    // ✅ DELETE
    // =========================
    public void delete(Authentication auth) {
        User user = getLoggedInUser(auth);

        Resume r = resumeRepo.findByUser_Id(user.getId())
                .orElseThrow(() -> new RuntimeException("Not found"));

        deleteFile(r.getFilePath());
        resumeRepo.delete(r);
    }

    // =========================
    // ✅ DOWNLOAD / PREVIEW
    // =========================
    public ResponseEntity<Resource> download(Long id, Authentication auth) throws IOException {

        User user = getLoggedInUser(auth);

        Resume r = resumeRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Not found"));

        // 🔥 SECURITY CHECK
        if (!r.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        Path path = Paths.get(r.getFilePath());
        Resource resource = new UrlResource(path.toUri());

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "inline; filename=\"" + r.getFileName() + "\"")
                .body(resource);
    }
    

    //  RECRUITER DOWLOAD RESUME
             
	    public ResponseEntity<Resource> downloadForRecruiter(Long applicationId,
	            Authentication auth) throws IOException {
	
	User recruiter = getLoggedInUser(auth);
	
	// ✅ 1. Get application
	Application app = appRepo.findById(applicationId)
			.orElseThrow(() -> new ResponseStatusException(
				    HttpStatus.NOT_FOUND,
				    "Application not found"
				));
	
	Job job = app.getJob();
	
	// ✅ 2. Ownership check (VERY IMPORTANT)
	if (!job.getRecruiter().getId().equals(recruiter.getId())) {
		throw new ResponseStatusException(
			    HttpStatus.FORBIDDEN,
			    "Unauthorized"
			);
	}
	
	// ✅ 3. Get applicant resume
	User applicant = app.getUser();
	
	Resume resume = resumeRepo.findByUser_Id(applicant.getId())
			.orElseThrow(() -> new ResponseStatusException(
				    HttpStatus.NOT_FOUND,
				    "Resume not found"
				));
	
	// ✅ 4. Load file
	Path path = Paths.get(resume.getFilePath());
	Resource resource = new UrlResource(path.toUri());
	
	return ResponseEntity.ok()
	.contentType(MediaType.APPLICATION_PDF)
	.header(HttpHeaders.CONTENT_DISPOSITION,
	"inline; filename=\"" + resume.getFileName() + "\"")
	.body(resource);
	}
	    

    // =========================
    // 🔧 HELPERS
    // =========================
    private User getLoggedInUser(Authentication auth) {
        return userRepo.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    private void deleteFile(String path) {
        try {
            Files.deleteIfExists(Paths.get(path));
        } catch (IOException e) {
            System.out.println("File delete failed");
        }
    }

    private ResumeResponse toDTO(Resume r) {
        ResumeResponse dto = new ResumeResponse();
        dto.setId(r.getId());
        dto.setFileName(r.getFileName());
        dto.setUrl("http://localhost:8080/api/resume/download/" + r.getId()); // 🔥 important
        return dto;
    }
}