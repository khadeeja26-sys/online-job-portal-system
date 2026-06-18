package com.example.job.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.example.job.model.Role;
import com.example.job.model.User;
import com.example.job.repository.UserRepository;

import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner init(UserRepository repo, PasswordEncoder encoder) {
        return args -> {

            if (repo.findByEmail("admin@gmail.com").isEmpty()) {

                User admin = new User();
                admin.setName("Admin");
                admin.setEmail("admin@gmail.com");
                admin.setPassword(encoder.encode("admin123")); // 🔥 IMPORTANT
                admin.setRole(Role.ADMIN);
                admin.setApproved(true);

                repo.save(admin);

                System.out.println("Admin created");
            }
        };
    }
}