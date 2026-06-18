package com.example.job.dto;

public class ResumeResponse {
    private Long id;
    private String fileName;
    private String url;
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
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public ResumeResponse() {
	
		// TODO Auto-generated constructor stub
	}
	public ResumeResponse(Long id, String fileName, String url) {
		super();
		this.id = id;
		this.fileName = fileName;
		this.url = url;
	}
	
    


    // getters & setters
}