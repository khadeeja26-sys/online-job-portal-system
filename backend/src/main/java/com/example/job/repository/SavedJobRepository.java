package com.example.job.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.job.model.SavedJob;

public interface SavedJobRepository extends JpaRepository<SavedJob, Long> {

    // 🔹 Get all saved jobs of a user
    List<SavedJob> findByUserId(Long userId);

    // 🔹 Prevent duplicate saves
    boolean existsByUserIdAndJobId(Long userId, Long jobId);

    // 🔹 (Optional) Find specific saved job
    Optional<SavedJob> findByUserIdAndJobId(Long userId, Long jobId);
}