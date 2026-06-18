package com.example.job.dto;

public class ApplyRequest {
	 private Long jobId;
	 public Long getJobId() {
	        return jobId;
	    }

	    public void setJobId(Long jobId) {
	        this.jobId = jobId;
	    }

		public ApplyRequest() {
			
			// TODO Auto-generated constructor stub
		}

		public ApplyRequest(Long jobId) {
			super();
			this.jobId = jobId;
		}
		
	    
}
