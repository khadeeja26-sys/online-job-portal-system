package com.example.job.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.job.model.User;
import com.example.job.model.Role;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    //  for recruiter approval
    List<User> findByRole(Role role);
}
