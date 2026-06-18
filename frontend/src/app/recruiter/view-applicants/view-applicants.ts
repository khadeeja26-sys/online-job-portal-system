import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Application } from '../../models/application.model';
import { ApplicationService } from '../../core/services/application';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-view-applicants',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './view-applicants.html',
  styleUrl: './view-applicants.css'
})
export class ViewApplicantsComponent implements OnInit {

  applications: Application[] = [];

  loading = false;
  message = '';
  error = '';

  constructor(
    private applicationService: ApplicationService,
  private route: ActivatedRoute,
   private router: Router
  ) {}

  ngOnInit(): void {
  const jobId = Number(
    this.route.snapshot.paramMap.get('id')
  );

  this.loadApplications(jobId);
}

  // =========================
  // LOAD APPLICATIONS
  // =========================
 loadApplications(jobId: number): void {
  this.loading = true;

  this.applicationService
    .getApplicantsByJob(jobId)
    .subscribe({
      next: (data: Application[]) => {
        this.applications = data;
        this.loading = false;
      },
      error: (err) => {
        
        this.loading = false;
        // this.error = '';

        // // If no applications found, do not show error
        // if (err.status === 404 || err.status === 204) {
        //   this.applications = [];
        //   return;
        // }
       

        this.error =
          err.error?.message ||
          'Failed to load applications';
      }
    });
}
// =========================
// VIEW RESUME
// =========================
viewResume(applicationId: number): void {
  this.applicationService
    .downloadResume(applicationId)
    .subscribe({
      next: (blob: Blob) => {
        const fileURL = window.URL.createObjectURL(blob);
        window.open(fileURL, '_blank');
      },
      error: () => {
        this.error = 'Failed to open resume';
      }
    });
}

// =========================
// DOWNLOAD RESUME
// =========================
downloadResume(applicationId: number): void {
  this.applicationService
    .downloadResume(applicationId)
    .subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'resume.pdf';
        link.click();

        window.URL.revokeObjectURL(url);
      },
      error: () => {
        this.error = 'Failed to download resume';
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