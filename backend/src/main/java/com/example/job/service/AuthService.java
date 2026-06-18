package com.example.job.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import com.example.job.dto.LoginRequest;
import com.example.job.dto.RegisterRequest;
import com.example.job.dto.AuthResponse;
import com.example.job.model.Role;
import com.example.job.model.User;
import com.example.job.repository.UserRepository;
import com.example.job.security.JwtUtil;

import org.springframework.security.crypto.password.PasswordEncoder;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository repo;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private JwtUtil jwtUtil;

    // =========================
    // 🔐 LOGIN
    // =========================
    public AuthResponse login(LoginRequest req) {

        // ✅ Authenticate user
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        req.getEmail(),
                        req.getPassword()
                )
        );

        // ✅ Fetch user
        User user = repo.findByEmail(req.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        // ✅ Recruiter approval check
        if (user.getRole() == Role.RECRUITER && !user.isApproved()) {
            throw new RuntimeException("Your account is pending admin approval");
        }

        // ✅ Generate token
        String token = jwtUtil.generateToken(
                user.getEmail(),
                user.getRole().name()
        );

        return new AuthResponse(token, user.getRole().name());
    }

    // =========================
    // 🆕 REGISTER
    // =========================
    public void register(RegisterRequest req) {

        // ✅ Duplicate email check
        if (repo.findByEmail(req.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        // ✅ Role validation (IMPORTANT)
        if (req.getRole() == null ||
            (!req.getRole().equalsIgnoreCase("JOBSEEKER") &&
             !req.getRole().equalsIgnoreCase("RECRUITER"))) {
            throw new RuntimeException("Invalid role");
        }

        if (req.getPassword() == null || req.getPassword().length() < 6) {
            throw new RuntimeException("Password must be at least 6 characters");
        }
        
        // ✅ Create user
        User user = new User();
        user.setName(req.getName());
        user.setEmail(req.getEmail());
        user.setPassword(encoder.encode(req.getPassword()));
        user.setRole(Role.valueOf(req.getRole().toUpperCase()));

        // ✅ Approval logic
        if (user.getRole() == Role.RECRUITER) {
            user.setApproved(false);
            
        } else {
            user.setApproved(true);
           
        }

        repo.save(user);
    }
}