import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router,  RouterLink,  RouterModule } from '@angular/router';

import { Resume } from '../../models/resume.model';
import { Job } from '../../models/job.model';

import { ResumeService } from '../../core/services/resume';
import { JobService } from '../../core/services/job';
import { ApplicationService } from '../../core/services/application';

@Component({
  selector: 'app-job-application',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './job-application.html',
  styleUrl: './job-application.css'
})
export class JobApplicationComponent implements OnInit {

  job!: Job;
  resume: Resume | null = null;
  selectedFile: File | null = null;

  loading = false;
  applying = false;

  message = '';
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobService: JobService,
    private resumeService: ResumeService,
    private applicationService: ApplicationService
  ) {}

  ngOnInit(): void {
    const jobId = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.loadJob(jobId);
    this.loadResume();
  }

  loadJob(jobId: number): void {
    this.jobService.getJobById(jobId)
      .subscribe({
        next: (data: Job) => {
          this.job = data;
        },
        error: () => {
          this.error = 'Failed to load job';
        }
      });
  }

 loadResume(): void {
  this.resumeService.getMyResume()
    .subscribe({
      next: (data: Resume) => {
        this.resume = data;

        // Clear any previously selected file
        this.selectedFile = null;
      },
      error: () => {
        this.resume = null;
      }
    });
}

  // In JobApplicationComponent

// =========================
// FILE SELECTED
// =========================
onFileSelected(event: Event): void {

  const input = event.target as HTMLInputElement;

  if (!input.files || input.files.length === 0) {
    return;
  }

  const file = input.files[0];

  // PDF validation
  if (file.type !== 'application/pdf') {
    this.error = 'Only PDF files are allowed';
    this.selectedFile = null;
    input.value = '';
    return;
  }

  // Size validation (5 MB)
  if (file.size > 5 * 1024 * 1024) {
    this.error = 'File size must be less than 5 MB';
    this.selectedFile = null;
    input.value = '';
    return;
  }

  this.error = '';
  this.selectedFile = file;

  this.resumeService
    .uploadResume(file)
    .subscribe({
      next: (uploadedResume: Resume) => {

        this.resume = uploadedResume;
        this.selectedFile = null;

        this.message = 'Resume uploaded successfully';
        this.error = '';

      },
      error: () => {

        this.error = 'Failed to upload resume';

      }
    });
}

  viewResume(): void {
    if (this.resume) {
      this.resumeService.viewResume(
        this.resume.id
      );
    }
  }

  downloadResume(): void {
    if (this.resume) {
      this.resumeService.downloadResumeFile(
        this.resume.id,
        this.resume.fileName
      );
    }
  }

applyJob(): void {

  this.message = '';
  this.error = '';

  // Job loaded
  // if (!this.job || !this.job.id) {
  //   this.error = 'Job details not loaded';
  //   return;
  // }

  // Job active
  // if (!this.job.active) {
  //   this.error = 'This job is no longer accepting applications';
  //   return;
  // }

  // Already applied
  if (this.job.applied) {
    this.error = 'You have already applied for this job';
    return;
  }

  // Resume validation
  if (!this.resume && !this.selectedFile) {
    this.error = 'Please upload a resume first';
    return;
  }

  this.applying = true;

  if (this.selectedFile) {

    this.resumeService
      .uploadResume(this.selectedFile)
      .subscribe({
        next: (uploadedResume: Resume) => {

          this.resume = uploadedResume;
          this.selectedFile = null;

          this.submitApplication();

        },
        error: () => {

          this.error = 'Failed to upload resume';
          this.applying = false;

        }
      });

    return;
  }

  this.submitApplication();
}
  // Replace submitApplication() method in JobApplicationComponent

submitApplication(): void {
  this.applicationService
    .applyJob({
      jobId: this.job.id
    })
    .subscribe({
      next: () => {
        this.message = 'Application submitted successfully.';
        this.error = '';
        this.applying = false;

        setTimeout(() => {
          this.router.navigate(['/jobseeker-dashboard']);
        }, 1500);
      },
      // Replace the error block inside submitApplication()

error: (err) => {
  console.log('Application error:', err);

  // Spring Boot may return:
  // 1. err.error.message
  // 2. err.error.error
  // 3. plain text response
  // 4. status = 400

  if (err.status === 400) {
    this.error =
      err.error?.message ||
      'You have already applied for this job.';
  } else {
    this.error =
      err.error?.message ||
      err.error?.error ||
      (typeof err.error === 'string'
        ? err.error
        : null) ||
      'Failed to apply for this job.';
  }

  this.message = '';
  this.applying = false;
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