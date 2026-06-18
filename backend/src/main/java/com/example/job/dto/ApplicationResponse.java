package com.example.job.dto;

import java.time.LocalDate;

public class ApplicationResponse {
    private Long id;
    private Long jobId;
    private Long userId;
    private String status;
    private LocalDate appliedDate;
    private String jobTitle;
    private String company;
    private String applicantName;
    private String email;
    private boolean active;
    
    
	public boolean isActive() {
		return active;
	}
	public void setActive(boolean active) {
		this.active = active;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getJobTitle() {
		return jobTitle;
	}
	public void setJobTitle(String jobTitle) {
		this.jobTitle = jobTitle;
	}
	public String getCompany() {
		return company;
	}
	public void setCompany(String company) {
		this.company = company;
	}
	public String getApplicantName() {
		return applicantName;
	}
	public void setApplicantName(String applicantName) {
		this.applicantName = applicantName;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getJobId() {
		return jobId;
	}
	public void setJobId(Long jobId) {
		this.jobId = jobId;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public LocalDate getAppliedDate() {
		return appliedDate;
	}
	public void setAppliedDate(LocalDate appliedDate) {
		this.appliedDate = appliedDate;
	}
	
	public ApplicationResponse() {
		
		}
	public ApplicationResponse(Long id, Long jobId, Long userId, String status, LocalDate appliedDate, String jobTitle,
			String company, String applicantName, String email, boolean active) {
		super();
		this.id = id;
		this.jobId = jobId;
		this.userId = userId;
		this.status = status;
		this.appliedDate = appliedDate;
		this.jobTitle = jobTitle;
		this.company = company;
		this.applicantName = applicantName;
		this.email = email;
		this.active = active;
	}
	
	}
