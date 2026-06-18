package com.example.job.dto;

public class AuthResponse {

    private String token;
    private String role;

    
    public AuthResponse() {
		
		// TODO Auto-generated constructor stub
	}

	// ✅ Constructor
    public AuthResponse(String token, String role) {
        this.token = token;
        this.role = role;
    }

    // ✅ Getters
    public String getToken() {
        return token;
    }

    public String getRole() {
        return role;
    }

    // ✅ Setters (optional)
    public void setToken(String token) {
        this.token = token;
    }

    public void setRole(String role) {
        this.role = role;
    }
}