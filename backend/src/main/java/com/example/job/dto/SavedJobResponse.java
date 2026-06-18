package com.example.job.dto;
public class SavedJobResponse {

    private Long savedJobId;

    private Long jobId;
    private String title;
    private String description;
    private String company;
    private String location;
    private Double salary;
    private boolean active;
    public boolean isActive() {
		return active;
	}
	public void setActive(boolean active) {
		this.active = active;
	}
	private boolean applied; 
    
	public boolean isApplied() {
		return applied;
	}
	public void setApplied(boolean applied) {
		this.applied = applied;
	}
	public Long getSavedJobId() {
		return savedJobId;
	}
	public void setSavedJobId(Long savedJobId) {
		this.savedJobId = savedJobId;
	}
	public Long getJobId() {
		return jobId;
	}
	public void setJobId(Long jobId) {
		this.jobId = jobId;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getCompany() {
		return company;
	}
	public void setCompany(String company) {
		this.company = company;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public Double getSalary() {
		return salary;
	}
	public void setSalary(Double salary) {
		this.salary = salary;
	}
	public SavedJobResponse() {
		
		// TODO Auto-generated constructor stub
	}
	public SavedJobResponse(Long savedJobId, Long jobId, String title, String description, String company,
			String location, Double salary, boolean active, boolean applied) {
		super();
		this.savedJobId = savedJobId;
		this.jobId = jobId;
		this.title = title;
		this.description = description;
		this.company = company;
		this.location = location;
		this.salary = salary;
		this.active = active;
		this.applied = applied;
	}
	
	

    // getters & setters
}