import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-recruiter-dashboard',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './recruiter-dashboard.html',
  styleUrl: './recruiter-dashboard.css'
})
export class RecruiterDashboardComponent {

  constructor(
    private router: Router
  ) {}

  // =========================
  // POST JOB
  // =========================
  // goToPostJob(): void {

  //   this.router.navigate([
  //     '/post-job'
  //   ]);
  // }

  // // =========================
  // // MY JOBS
  // // =========================
  // goToMyJobs(): void {

  //   this.router.navigate([
  //     '/recruiter-jobs'
  //   ]);
  // }

 
  

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