import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';


import { Application } from '../../models/application.model';
import { ApplicationService } from '../../core/services/application';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-jobseeker-applied-jobs',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './applied-jobs.html',
  styleUrl: './applied-jobs.css'
})
export class JobseekerAppliedJobsComponent implements OnInit {

  applications: Application[] = [];

  loading = false;

  error = '';

  constructor(
    private applicationService: ApplicationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadApplications();
  }

  // =========================
  // LOAD MY APPLICATIONS
  // =========================
  loadApplications(): void {

    this.loading = true;

    this.applicationService.getMyApplications()
      .subscribe({

        next: (data: Application[]) => {

          this.applications = data;

          this.loading = false;
        },

        error: () => {

          this.error = 'Failed to load applications';

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