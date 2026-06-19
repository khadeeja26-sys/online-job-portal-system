// =========================
// JOB ENTITY
// =========================

package com.example.job.model;

import jakarta.persistence.*;

@Entity
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(length = 2000)
    private String description;

    private String company;

    private String location;

    private Double salary;

    //  recruiter who posted the job
    @ManyToOne
    @JoinColumn(name = "recruiter_id")
    private User recruiter;
    
    @Column(nullable = false)
    private boolean active = true;
    
    private boolean applied;
    
    
    public boolean isApplied() {
		return applied;
	}

	public void setApplied(boolean applied) {
		this.applied = applied;
	}

	public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
    

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public User getRecruiter() {
		return recruiter;
	}

	public void setRecruiter(User recruiter) {
		this.recruiter = recruiter;
	}

	public Job() {
	
		// TODO Auto-generated constructor stub
	}

	public Job(Long id, String title, String description, String company, String location, Double salary,
			User recruiter, boolean active, boolean applied) {
		super();
		this.id = id;
		this.title = title;
		this.description = description;
		this.company = company;
		this.location = location;
		this.salary = salary;
		this.recruiter = recruiter;
		this.active = active;
		this.applied = applied;
	}

	
    // getters and setters
}
