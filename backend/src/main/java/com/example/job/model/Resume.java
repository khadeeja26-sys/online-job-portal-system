// =========================
// RESUME ENTITY
// =========================

package com.example.job.model;

import jakarta.persistence.*;

@Entity
public class Resume {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fileName;

    //  internal backend use onl
    private String filePath;

    //  one resume belongs to one user
    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getFilePath() {
		return filePath;
	}

	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Resume() {
		
		// TODO Auto-generated constructor stub
	}

	public Resume(Long id, String fileName, String filePath, User user) {
		super();
		this.id = id;
		this.fileName = fileName;
		this.filePath = filePath;
		this.user = user;
	}

    // getters and setters
}
