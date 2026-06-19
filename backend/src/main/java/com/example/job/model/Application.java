// =========================
// APPLICATION ENTITY
// =========================

package com.example.job.model;

import java.time.LocalDate;

import jakarta.persistence.*;

@Entity
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //  applicant
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    //  applied job
    @ManyToOne
    @JoinColumn(name = "job_id")
    private Job job;

    private String status;

    private LocalDate appliedDate;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Job getJob() {
		return job;
	}

	public void setJob(Job job) {
		this.job = job;
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

	
	public Application() {
		
		// TODO Auto-generated constructor stub
	}

	public Application(Long id, User user, Job job, String status, LocalDate appliedDate) {
		super();
		this.id = id;
		this.user = user;
		this.job = job;
		this.status = status;
		this.appliedDate = appliedDate;
	}

    // getters and setters
}
