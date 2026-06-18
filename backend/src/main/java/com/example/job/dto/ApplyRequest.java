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
			
			
		}

		public ApplyRequest(Long jobId) {
			super();
			this.jobId = jobId;
		}
		
	    
}
