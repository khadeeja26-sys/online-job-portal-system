package com.example.job.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.job.model.Application;


	public interface ApplicationRepository extends JpaRepository<Application, Long> {
	    List<Application> findByJob_Id(Long jobId);
	    List<Application> findByUser_Id(Long userId);
	    boolean existsByUserIdAndJobId(Long userId, Long jobId);
	}

