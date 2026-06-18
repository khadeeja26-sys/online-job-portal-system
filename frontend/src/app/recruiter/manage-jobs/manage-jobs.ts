import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';

import { Job } from '../../models/job.model';
import { JobService } from '../../core/services/job';

@Component({
  selector: 'app-manage-jobs',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './manage-jobs.html',
  styleUrl: './manage-jobs.css'
})
export class ManageJobsComponent implements OnInit {

  jobs: Job[] = [];
  loading = false;
  message = '';
  error = '';

  constructor(private jobService: JobService,
  private router: Router) {}
  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs(): void {
    this.loading = true;

    this.jobService.getMyJobs().subscribe({
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

 // recruiter-manage-jobs.ts

closeJob(jobId: number): void {
  const confirmClose = confirm(
    'Are you sure you want to close this job?'
  );

  if (!confirmClose) {
    return;
  }

  this.jobService.closeJob(jobId).subscribe({
    next: () => {
      this.message = 'Job closed successfully';
      this.error = '';

      // Update UI immediately
      const job = this.jobs.find(j => j.id === jobId);

      if (job) {
        job.active = false;
      }
    },
    error: (err) => {
      this.message = '';
      this.error =
        err.error?.message || 'Failed to close job';
    }
  });
}
  viewApplicants(jobId: number): void {
  this.router.navigate(['/recruiter-applications', jobId]);
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