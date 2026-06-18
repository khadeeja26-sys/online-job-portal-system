import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../core/services/admin';
import { Router, RouterModule, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'

})
export class AdminDashboardComponent implements OnInit {

  stats:any = {};

  constructor(private adminService: AdminService,
     private router: Router
  ){}

  ngOnInit(){
    this.adminService.getDashboard().subscribe(res => {
      this.stats = res;
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