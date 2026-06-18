package com.example.job.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.job.model.Resume;


	public interface ResumeRepository extends JpaRepository<Resume, Long> { 
		Optional<Resume> findByUser_Id(Long userId);

}

