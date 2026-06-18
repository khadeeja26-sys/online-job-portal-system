import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Resume } from '../../models/resume.model';
import { ResumeService } from '../../core/services/resume';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-manage-resume',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './manage-resume.html',
  styleUrl: './manage-resume.css'
})
export class ManageResumeComponent implements OnInit {

  resume: Resume | null = null;

  loading = false;
  message = '';
  error = '';

  selectedFile: File | null = null;

  constructor(
    private resumeService: ResumeService,
     private router: Router
  ) {}

  ngOnInit(): void {
    this.loadResume();
  }

  // =========================
  // LOAD MY RESUME
  // =========================
  loadResume(): void {
    this.loading = true;
    this.message = '';
    this.error = '';

    this.resumeService.getMyResume()
      .subscribe({
        next: (data: Resume) => {
          this.resume = data;
          this.loading = false;
        },
        error: (err) => {
          this.loading = false;

          // If user has not uploaded a resume yet
          if (err.status === 404) {
            this.resume = null;
            return;
          }

          this.error =
            err.error?.message ||
            'Failed to load resume';
        }
      });
  }

  // =========================
  // FILE SELECT
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

  // 5 MB size validation
  if (file.size > 5 * 1024 * 1024) {
    this.error = 'File size must be less than 5 MB';
    this.selectedFile = null;
    input.value = '';
    return;
  }

  this.error = '';
  this.selectedFile = file;
}

  // =========================
  // UPLOAD / REPLACE RESUME
  // =========================
  uploadResume(): void {
    this.message = '';
    this.error = '';

    if (!this.selectedFile) {
      this.error =
        'Please select a PDF file.';
      return;
    }

    this.loading = true;

    this.resumeService
      .uploadResume(this.selectedFile)
      .subscribe({
        next: () => {
          this.message =
            'Resume uploaded successfully.';

          this.selectedFile = null;
          this.loading = false;

          this.loadResume();
        },
        error: (err) => {
          this.loading = false;
 console.log('Upload error:', err);
          this.error =
            err.error?.message ||
            'Failed to upload resume.';
        }
      });
  }

  // =========================
  // VIEW RESUME
  // =========================
 // manage-resume.ts
// Add these methods inside ManageResumeComponent

viewResume(): void {
  if (this.resume?.id) {
    this.resumeService.viewResume(this.resume.id);
  }
}


  // =========================
  // DOWNLOAD RESUME
  // =========================
 // manage-resume.component.ts
// Replace your current downloadResume() method with this

downloadResume(): void {
  if (!this.resume) {
    return;
  }

  this.resumeService
    .downloadResumeFile(
      this.resume.id,
      this.resume.fileName
    );
}

  // =========================
  // DELETE RESUME
  // =========================
  deleteResume(): void {
    if (!this.resume) {
      return;
    }

    const confirmDelete = confirm(
      'Are you sure you want to delete your resume?'
    );

    if (!confirmDelete) {
      return;
    }

    this.message = '';
    this.error = '';
    this.loading = true;

    this.resumeService
      .deleteResume()
      .subscribe({
        next: () => {
          this.message =
            'Resume deleted successfully.';

          this.resume = null;
          this.selectedFile = null;
          this.loading = false;
        },
        error: (err) => {
          this.loading = false;

          this.error =
            err.error?.message ||
            'Failed to delete resume.';
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