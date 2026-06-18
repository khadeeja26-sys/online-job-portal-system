package com.example.job.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.job.model.Role;
import com.example.job.model.User;
import com.example.job.repository.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository repo;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        User user = repo.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Invalid credentials"));
        
        

        if (!user.isActive()) {
            throw new ResponseStatusException(
                HttpStatus.FORBIDDEN,
                "Account suspended by admin"
            );
        }

        if (user.getRole() == Role.RECRUITER && !user.isApproved()) {
            throw new ResponseStatusException(
                HttpStatus.UNAUTHORIZED,
                "Recruiter not approved by admin"
            );
        }
        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole().name()))
        );
    }
}