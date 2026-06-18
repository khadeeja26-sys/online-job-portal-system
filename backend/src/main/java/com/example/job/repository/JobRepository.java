package com.example.job.repository;

import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;


import com.example.job.model.Job;





public interface JobRepository extends JpaRepository<Job, Long> {
    List<Job> findByTitleContainingIgnoreCase(String keyword);
    List<Job> findByRecruiterId(Long recruiterId);
    List<Job> findByActiveTrue();

    List<Job> findByTitleContainingIgnoreCaseAndActiveTrue(String keyword);
    }






