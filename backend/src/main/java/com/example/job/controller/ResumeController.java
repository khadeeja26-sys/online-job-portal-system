package com.example.job.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.job.dto.ResumeResponse;
import com.example.job.service.ResumeService;

@RestController
@RequestMapping("/api/resume")
@CrossOrigin(origins = "http://localhost:4200")
public class ResumeController {

    @Autowired
    private ResumeService service;

    // ✅ Upload (JOBSEEKER)
    @PostMapping("/upload")
    @PreAuthorize("hasRole('JOBSEEKER')")
    public ResumeResponse upload(@RequestParam("file") MultipartFile file,
                                 Authentication auth) throws IOException {
        return service.upload(file, auth);
    }
//
//     ✅ Get my resume
    @GetMapping("/my")
    @PreAuthorize("hasRole('JOBSEEKER')")
    public ResumeResponse getMy(Authentication auth) {
        return service.getMyResume(auth);
    }

    // ✅ Delete
    @DeleteMapping("/delete")
    @PreAuthorize("hasRole('JOBSEEKER')")
    public void delete(Authentication auth) {
        service.delete(auth);
    }

    // ✅ Preview / Download
    @GetMapping("/download/{id}")
    @PreAuthorize("hasRole('JOBSEEKER')")
    public ResponseEntity<Resource> download(@PathVariable Long id,
                                             Authentication auth) throws IOException {
        return service.download(id, auth);
    }
    
//    Recruiter Dowload Applicants Resume
    @GetMapping("/recruiter/download/{applicationId}")
    @PreAuthorize("hasRole('RECRUITER')")
    public ResponseEntity<Resource> downloadForRecruiter(
            @PathVariable Long applicationId,
            Authentication auth) throws IOException {

        return service.downloadForRecruiter(applicationId, auth);
    }
}