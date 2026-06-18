import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';


import { Job } from '../../models/job.model';
import { AdminService } from '../../core/services/admin';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-manage-jobs',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './manage-jobs.html',
  styleUrl: './manage-jobs.css'
})
export class AdminManageJobsComponent implements OnInit {

  jobs: Job[] = [];

  loading = false;

  message = '';

  error = '';

  constructor(
    private adminService: AdminService,
     private router: Router
  ) {}

  ngOnInit(): void {
    this.loadJobs();
  }

  // =========================
  // LOAD JOBS
  // =========================
  loadJobs(): void {

    this.loading = true;

    this.adminService.getAllJobs().subscribe({

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

  // =========================
  // DELETE JOB
  // =========================
  // =========================
// CLOSE JOB
// =========================

closeJob(jobId: number): void {

  const confirmClose = confirm(
    'Are you sure you want to close this job?'
  );

  if (!confirmClose) {
    return;
  }

  this.adminService.closeJob(jobId).subscribe({

    next: () => {

      this.message = 'Job closed successfully';

      this.error = '';

      // Update UI instantly
      const job = this.jobs.find(
        j => j.id === jobId
      );

      if (job) {
        job.active = false;
      }
    },

    error: () => {

      this.message = '';

      this.error = 'Failed to close job';
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