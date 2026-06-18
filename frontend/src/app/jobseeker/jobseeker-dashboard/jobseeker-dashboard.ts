import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-jobseeker-dashboard',
  standalone: true,
  imports: [CommonModule , RouterLink],
  templateUrl: './jobseeker-dashboard.html',
  styleUrl: './jobseeker-dashboard.css'
})
export class JobseekerDashboardComponent {

  constructor(
    private router: Router
  ) {}

  // =========================
  // SEARCH JOBS
  // =========================
  goToSearchJobs(): void {

    this.router.navigate([
      '/job-search'
    ]);
  }

  // =========================
  // APPLIED JOBS
  // =========================
  goToAppliedJobs(): void {

    this.router.navigate([
      '/jobseeker-applied-jobs'
    ]);
  }

  // =========================
  // SAVED JOBS
  // =========================
  goToSavedJobs(): void {

    this.router.navigate([
      '/saved-jobs'
    ]);
  }

  // =========================
  // RESUME
  // =========================
  goToResume(): void {

    this.router.navigate([
      '/manage-resume'
    ]);
  }

  // =========================
  // LOGOUT
  // =========================
  logout(): void {

    localStorage.removeItem('token');

    localStorage.removeItem('role');

    this.router.navigate([
      '/login'
    ]);
  }
}