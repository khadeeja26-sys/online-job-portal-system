import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { Job } from '../../models/job.model';


import { JobService } from '../../core/services/job';
import { SavedJobService } from '../../core/services/savedjob';

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './job-details.html',
  styleUrl: './job-details.css'
})
export class JobDetailsComponent implements OnInit {

  job!: Job;
 

  loading = false;


  message = '';
  error = '';

  // Controls whether the apply section is visible
  showApplySection = false;

  constructor(
    private route: ActivatedRoute,
     private router: Router,
    private jobService: JobService,
    
    private savedJobService: SavedJobService
  ) {}

  ngOnInit(): void {
    const jobId = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.loadJob(jobId);
   
  }

  // =========================
  // LOAD JOB
  // =========================
  loadJob(jobId: number): void {
    this.loading = true;

    this.jobService.getJobById(jobId)
      .subscribe({
        next: (data: Job) => {
          this.job = data;
          this.loading = false;
        },
        error: () => {
          this.error = 'Failed to load job details';
          this.loading = false;
        }
      });
  }

 // =========================
  // SHOW APPLY SECTION
  // =========================
   goToApplyPage(): void {
  this.router.navigate([
    '/apply',
    this.job.id
  ]);
}
  

  // =========================
  // SAVE JOB
  // =========================
  saveJob(): void {
    this.message = '';
    this.error = '';

    this.savedJobService.saveJob(this.job.id)
      .subscribe({
        next: (msg: string) => {
          this.message = msg || 'Job saved successfully';
        },
        error: (err) => {
          if (err.status === 400) {
          this.error =
            err.error?.message ||
            err.error?.error ||
            'Job already saved';
        } else {
          this.error = 'Failed to save job';
        }
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