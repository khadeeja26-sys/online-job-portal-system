import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { Job } from '../../models/job.model';
import { JobService } from '../../core/services/job';

@Component({
  selector: 'app-job-search',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './job-search.html',
  styleUrl: './job-search.css'
})
export class JobSearchComponent implements OnInit {

  jobs: Job[] = [];
  keyword = '';
  loading = false;
  error = '';

  constructor(
    private jobService: JobService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.searchJobs();
  }

 searchJobs(): void {

  this.error = '';

  // Prevent only spaces
  this.keyword = this.keyword.trim();

  // Optional: limit search length
  if (this.keyword.length > 50) {
    this.error = 'Search keyword cannot exceed 50 characters';
    return;
  }

  this.loading = true;

  this.jobService.searchJobs(this.keyword).subscribe({
    next: (data: Job[]) => {
      this.jobs = data;
      this.loading = false;
    },
    error: () => {
      this.error = 'Failed to load jobs';
      this.loading = false;
    }
  });
}
viewDetails(jobId: number): void {

  if (!jobId || jobId <= 0) {
    this.error = 'Invalid job selected';
    return;
  }

  this.router.navigate(['/job-details', jobId]);
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