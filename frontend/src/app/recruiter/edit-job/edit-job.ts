import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { JobRequest } from '../../models/jobrequest.model';
import { JobService } from '../../core/services/job';

@Component({
  selector: 'app-edit-job',
  standalone: true,
  imports: [CommonModule, FormsModule , RouterLink],
  templateUrl: './edit-job.html',
  styleUrl: './edit-job.css'
  
})
export class EditJobComponent implements OnInit {

  jobId!: number;

  loading = false;
  message = '';
  error = '';

  jobRequest: JobRequest = {
    title: '',
    description: '',
    company: '',
    location: '',
    salary: 0
  };
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobService: JobService
  ) {}

  ngOnInit(): void {
    this.jobId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadJob();
  }

  loadJob(): void {
    this.loading = true;

    this.jobService.getJobById(this.jobId).subscribe({
      next: (job) => {
        this.jobRequest = {
          title: job.title,
          description: job.description,
          company: job.company,
          location: job.location,
          salary: job.salary
        };

        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load job details';
        this.loading = false;
      }
    });
  }

  updateJob(): void {
 
    this.message = '';
    this.error = '';
     // Title validation
  if (!this.jobRequest.title.trim()) {
    this.error = 'Job title is required';
    return;
  }

  if (this.jobRequest.title.length < 3) {
    this.error = 'Job title must be at least 3 characters';
    return;
  }

  // Description validation
  if (!this.jobRequest.description.trim()) {
    this.error = 'Job description is required';
    return;
  }

  if (this.jobRequest.description.length < 20) {
    this.error = 'Description must be at least 20 characters';
    return;
  }

  // Company validation
  if (!this.jobRequest.company.trim()) {
    this.error = 'Company name is required';
    return;
  }

  // Location validation
  if (!this.jobRequest.location.trim()) {
    this.error = 'Location is required';
    return;
  }

  // Salary validation
  if (!this.jobRequest.salary || this.jobRequest.salary <= 0) {
    this.error = 'Salary must be greater than 0';
    return;
  }

   this.loading = true;
    this.jobService.updateJob(this.jobId, this.jobRequest).subscribe({
      next: () => {
        this.message = 'Job updated successfully';
         this.loading = false;

        setTimeout(() => {
          this.router.navigate(['/recruiter-jobs']);
        }, 1000);
         },
      error: () => {
        this.error = 'Failed to update job';
           this.loading = false;
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/recruiter-jobs']);
  }
  logout(): void {

    localStorage.removeItem('token');

    localStorage.removeItem('role');

    this.router.navigate([
      '/login'
    ]);
  }
}