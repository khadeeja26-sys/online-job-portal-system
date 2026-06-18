import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { LoginRequest } from '../../models/loginrequest';
import { AuthService } from '../../core/services/auth';
import { AuthResponse } from '../../models/authresponse';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  loginData: LoginRequest= {
    email: '',
    password: ''
  };

  loading = false;

  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  // =========================
  // LOGIN
  // =========================
  login(): void {


    this.error = '';

     if (!this.loginData.email.trim()) {
    this.error = 'Email is required';
    return;
  }

  // Email format
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(this.loginData.email)) {
    this.error = 'Enter a valid email address';
    return;
  }

  // Password required
  if (!this.loginData.password.trim()) {
    this.error = 'Password is required';
    return;
  }

  // Password length
  if (this.loginData.password.length < 6) {
    this.error = 'Password must be at least 6 characters';
    return;
  }
    
    this.loading = true;

    this.authService.login(this.loginData)
      .subscribe({

        next: (response: AuthResponse) => {

          // ✅ Store token
          localStorage.setItem(
            'token',
            response.token
          );

          // ✅ Store role
          localStorage.setItem(
            'role',
            response.role
          );

          // ✅ Navigate by role
          if (response.role === 'ADMIN') {

            this.router.navigate(['/admin-dashboard']);

          } else if (response.role === 'RECRUITER') {

            this.router.navigate(['/recruiter-dashboard']);

          } else {

            this.router.navigate(['/jobseeker-dashboard']);
          }

          this.loading = false;
        },

        error: (err) => {

  if (err.status === 403) {

    this.error = 'Account suspended by admin';

  } else if (err.status === 401) {

    this.error = 'Recruiter not approved by admin';

  } else {

    this.error = 'Invalid email or password';
  }

  localStorage.clear();

  this.loginData = {
    email: '',
    password: ''
  };

  this.loading = false;

  setTimeout(() => {
    this.error = '';
  }, 3000);
}
});
}
      
  
}