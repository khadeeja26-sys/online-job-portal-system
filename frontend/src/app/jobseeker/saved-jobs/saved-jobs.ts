import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { SavedJob } from '../../models/savedjob.model';
import { SavedJobService } from '../../core/services/savedjob';

@Component({
  selector: 'app-saved-jobs',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './saved-jobs.html',
  styleUrl: './saved-jobs.css'
})
export class SavedJobsComponent implements OnInit {

  savedJobs: SavedJob[] = [];

  loading = false;
  message = '';
  error = '';

  constructor(
    private savedJobService: SavedJobService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadSavedJobs();
  }

  // =========================
  // LOAD SAVED JOBS
  // =========================
  loadSavedJobs(): void {
    this.loading = true;
    this.message = '';
    this.error = '';

    this.savedJobService
      .getSavedJobs()
      .subscribe({
        next: (data: SavedJob[]) => {
          this.savedJobs = data;
          this.loading = false;
        },
        error: (err) => {
          this.loading = false;
          this.error =
            err.error?.message ||
            'Failed to load saved jobs';
        }
      });
  }

  // =========================
  // GO TO APPLY PAGE
  // =========================
  goToApplyPage(jobId: number): void {
    this.router.navigate([
      '/apply',
      jobId
    ]);
  }

  // =========================
  // REMOVE SAVED JOB
  // =========================
  removeSavedJob(savedJobId: number): void {
    this.message = '';
    this.error = '';

    this.savedJobService
      .removeSavedJob(savedJobId)
      .subscribe({
        next: () => {
          this.message =
            'Saved job removed successfully';

          this.savedJobs =
            this.savedJobs.filter(
              job => job.savedJobId !== savedJobId
            );
        },
        error: (err) => {
          this.error =
            err.error?.message ||
            'Failed to remove saved job';
        }
      });
  }
  logout(): void {

    localStorage.removeItem('token');

    localStorage.removeItem('role');

    this.router.navigate([
      '/login'
    ]);
  }
}