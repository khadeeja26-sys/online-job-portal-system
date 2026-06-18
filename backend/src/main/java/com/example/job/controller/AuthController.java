package com.example.job.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.job.dto.LoginRequest;
import com.example.job.dto.RegisterRequest;
import com.example.job.dto.AuthResponse;
import com.example.job.service.AuthService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    @Autowired
    private AuthService service;

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest req) {
        return service.login(req);
    }

   
    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest req) {
        service.register(req);
        return "User registered successfully";
    }
}
