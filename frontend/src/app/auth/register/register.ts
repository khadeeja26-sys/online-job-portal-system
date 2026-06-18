import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RegisterRequest } from '../../models/registerrequest';
import { AuthService } from '../../core/services/auth';
import { Role } from '../../models/shared/role.model';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule , RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {

  registerData: RegisterRequest = {
    name: '',
    email: '',
    password: '',
    role: 'JOBSEEKER'
  };

  roles: Role[] = [
    'JOBSEEKER',
    'RECRUITER'
  ];

  loading = false;

  message = '';

  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  // =========================
  // REGISTER
  // =========================
  register(): void {


    this.message = '';

    this.error = '';
// Name required
  if (!this.registerData.name.trim()) {
    this.error = 'Name is required';
    return;
  }

  // Name validation
  const namePattern = /^[A-Za-z ]+$/;

  if (!namePattern.test(this.registerData.name)) {
    this.error = 'Name can contain only letters';
    return;
  }

  if (this.registerData.name.trim().length < 3) {
    this.error = 'Name must be at least 3 characters';
    return;
  }

  // Email required
  if (!this.registerData.email.trim()) {
    this.error = 'Email is required';
    return;
  }

  // Email format
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(this.registerData.email)) {
    this.error = 'Enter a valid email address';
    return;
  }

  // Password required
  if (!this.registerData.password.trim()) {
    this.error = 'Password is required';
    return;
  }

  // Password length
  if (this.registerData.password.length < 6) {
    this.error = 'Password must be at least 6 characters';
    return;
  }

  // Role required
  if (!this.registerData.role) {
    this.error = 'Please select a role';
    return;
  }

    
    this.loading = true;

    this.authService.register(this.registerData)
      .subscribe({

        next: (response: string) => {

          // ✅ Recruiter message
          if (this.registerData.role === 'RECRUITER') {

            this.message =
              'Registration successful. Wait for admin approval.';

          } else {

            this.message =
              'Registration successful.';
          }

          this.loading = false;

          // ✅ Redirect to login after 2 sec
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        },

        error: (err) => {

          this.error =
            err.error?.message ||
            'Registration failed';

          this.loading = false;
        }
      });
  }
}