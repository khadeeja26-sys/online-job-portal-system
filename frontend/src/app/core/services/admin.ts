// src/app/core/services/admin.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../../models/user.model';

import { Job } from '../../models/job.model';
import { Dashboard } from '../../models/dashboard.model';




@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private readonly baseUrl =
    'http://localhost:8080/api/admin';

  constructor(
    private http: HttpClient
  ) {}

  // =========================
  // DASHBOARD
  // =========================
  getDashboard(): Observable<Dashboard> {

    return this.http.get<Dashboard>(
      `${this.baseUrl}/dashboard`
    );
  }

  // =========================
  // PENDING RECRUITERS
  // =========================
  getPendingRecruiters(): Observable<User[]> {

    return this.http.get<User[]>(
      `${this.baseUrl}/pending-recruiters`
    );
  }

  // =========================
  // APPROVE RECRUITER
  // =========================
  approveRecruiter(recruiterId: number): Observable<string> {
  return this.http.put(
    `${this.baseUrl}/recruiters/${recruiterId}/approve`,
    {},
    {
      responseType: 'text'
    }
  );

  }

  // =========================
  // ALL USERS
  // =========================
  getAllUsers(): Observable<User[]> {

    return this.http.get<User[]>(
      `${this.baseUrl}/users`
    );
  }

  // =========================
  // DELETE USER
  // =========================
 suspendUser(id: number) {
  return this.http.put(
    `${this.baseUrl}/users/${id}/suspend`,
    {}
  );
}

  // =========================
  // ALL JOBS
  // =========================
  getAllJobs(): Observable<Job[]> {

    return this.http.get<Job[]>(
      `${this.baseUrl}/jobs`
    );
  }

  // =========================
  // CLOSE JOB
  // =========================
  closeJob(id: number) {
  return this.http.put(
    'http://localhost:8080/api/admin/close/' + id,
    {}
  );
}
}