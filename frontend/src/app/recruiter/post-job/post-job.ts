import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { JobRequest } from '../../models/jobrequest.model';
import { JobService } from '../../core/services/job';



@Component({
  selector: 'app-post-job',
  standalone: true,
  imports: [CommonModule, FormsModule , RouterLink],
  templateUrl: './post-job.html',
  styleUrl: './post-job.css'
})
export class PostJobComponent {

  jobRequest: JobRequest = {
    title: '',
    description: '',
    company: '',
    location: '',
    salary: 0
  };

  loading = false;
  message = '';
  error = '';

  constructor(
    private jobService: JobService,
    private router: Router
  ) {}

  // =========================
  // POST JOB
  // =========================
  postJob(): void {

    
    this.message = '';
    this.error = '';
     // Title validation
  if (!this.jobRequest.title.trim()) {
    this.error = 'Job title is required';
    return;
  }

  if (this.jobRequest.title.trim().length < 3) {
    this.error = 'Job title must be at least 3 characters';
    return;
  }

  // Description validation
  if (!this.jobRequest.description.trim()) {
    this.error = 'Job description is required';
    return;
  }

  if (this.jobRequest.description.trim().length < 20) {
    this.error = 'Job description must be at least 20 characters';
    return;
  }
  // Company validation
  if (!this.jobRequest.company.trim()) {
    this.error = 'Company name is required';
    return;
  }

  // Location validation
  if (!this.jobRequest.location.trim()) {
    this.error = 'Location is required';
    return;
  }

  // Salary validation
  if (!this.jobRequest.salary || this.jobRequest.salary <= 0) {
    this.error = 'Salary must be greater than 0';
    return;
  }

    this.loading = true;
    this.jobService.createJob(this.jobRequest)
      .subscribe({

        next: () => {

          this.message =
            'Job posted successfully';

          this.loading = false;

          // Reset form
          this.jobRequest = {
            title: '',
            description: '',
            company: '',
            location: '',
            salary: 0
          };

          // Redirect after 1.5 seconds
          setTimeout(() => {
            this.router.navigate([
              '/recruiter-jobs'
            ]);
          }, 1500);
        },

        error: (err) => {

          this.error =
            err.error?.message ||
            'Failed to post job';

          this.loading = false;
        }
      });
  }
  logout(): void {
    // Remove JWT token
    localStorage.removeItem('token');

    // Optional: remove role if stored separately
    localStorage.removeItem('role');

    // Redirect to login page
    this.router.navigate(['/login']);
  }
}