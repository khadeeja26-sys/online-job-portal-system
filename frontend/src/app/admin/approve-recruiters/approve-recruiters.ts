import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';


import { User } from '../../models/user.model';
import { AdminService } from '../../core/services/admin';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-approve-recruiters',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './approve-recruiters.html',
  styleUrl: './approve-recruiters.css'
})
export class AdminApproveRecruitersComponent implements OnInit {

  recruiters: User[] = [];

  loading = false;

  message = '';

  error = '';

  constructor(
    private adminService: AdminService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadRecruiters();
  }


  loadRecruiters(): void {
  this.loading = true;
  this.message = '';
  this.error = '';

  this.adminService.getAllUsers().subscribe({
    next: (users: User[]) => {
      this.recruiters = users.filter(
        user => user.role === 'RECRUITER'
      );

      this.loading = false;
    },
    error: () => {
      this.error = 'Failed to load recruiters';
      this.loading = false;
    }
  });
}

 approveRecruiter(recruiterId: number): void {

  this.adminService.approveRecruiter(recruiterId)
    .subscribe({

      next: () => {

        this.message =
          'Recruiter approved successfully';

      
        const recruiter =
          this.recruiters.find(
            r => r.id === recruiterId
          );

        if (recruiter) {
          recruiter.approved = true;
        }
      },

      error: (err) => {

        console.error('Approve error:', err);

        this.error =
          `Failed to approve recruiter (Status: ${err.status})`;
      }
    });
}
logout(): void {
   
    localStorage.removeItem('token');

    localStorage.removeItem('role');

    this.router.navigate(['/login']);
  }
}