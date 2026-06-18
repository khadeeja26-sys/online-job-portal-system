import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { User } from '../../models/user.model';
import { AdminService } from '../../core/services/admin';
import { Router, RouteReuseStrategy, RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-manage-users',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './manage-users.html',
  styleUrl: './manage-users.css'
})
export class AdminManageUsersComponent implements OnInit {

  users: User[] = [];

  loading = false;

  message = '';

  error = '';

  constructor(
    private adminService: AdminService,
     private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  // =========================
  // LOAD USERS
  // =========================
 loadUsers(): void {

  this.loading = true;

  this.adminService.getAllUsers().subscribe({

    next: (data: User[]) => {

      // SHOW ONLY JOBSEEKERS
      this.users = data.filter(
        user => user.role === 'JOBSEEKER'
      );

      this.loading = false;
    },

    error: () => {

      this.error = 'Failed to load users';

      this.loading = false;
    }
  });
}

 // =========================
// SUSPEND USER
// =========================

suspendUser(userId: number): void {

  const confirmSuspend = confirm(
    'Are you sure you want to suspend this user?'
  );

  if (!confirmSuspend) {
    return;
  }

  this.adminService.suspendUser(userId).subscribe({

    next: () => {

      this.message = 'User suspended successfully';

      this.error = '';

      const user = this.users.find(
        u => u.id === userId
      );

      if (user) {
        user.active = false;
      }
    },

    error: () => {

      this.message = '';

      this.error = 'Failed to suspend user';
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