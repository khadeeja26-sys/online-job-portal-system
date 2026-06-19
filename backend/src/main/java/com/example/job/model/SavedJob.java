// =========================
// SAVED JOB ENTITY
// =========================

package com.example.job.model;

import jakarta.persistence.*;

@Entity
@Table(
	    uniqueConstraints = @UniqueConstraint(
	        columnNames = {"user_id", "job_id"}
	    )
	)
public class SavedJob {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //  jobseeker
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    //  saved job
    @ManyToOne
    @JoinColumn(name = "job_id")
    private Job job;
    
    

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

	public SavedJob() {
		
		// TODO Auto-generated constructor stub
	}

	public SavedJob(Long id, User user, Job job) {
		super();
		this.id = id;
		this.user = user;
		this.job = job;
	}

    // getters and setters
}
