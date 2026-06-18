// src/app/core/services/job.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Job } from '../../models/job.model';
import { JobRequest } from '../../models/jobrequest.model';


@Injectable({
  providedIn: 'root'
})
export class JobService {

  private readonly baseUrl =
    'http://localhost:8080/api/jobs';

  constructor(
    private http: HttpClient
  ) {}

  // =========================
  // GET ALL JOBS
  // =========================
  getAllJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(
      this.baseUrl
    );
  }

  // =========================
  // GET JOB BY ID
  // =========================
  getJobById(
    id: number
  ): Observable<Job> {
    return this.http.get<Job>(
      `${this.baseUrl}/${id}`
    );
  }

   // =========================
  // GET JOB by recruiter for manage jobs 
  // =========================

  getMyJobs(): Observable<Job[]> {
  return this.http.get<Job[]>(
    'http://localhost:8080/api/jobs/my-jobs'
  );
}


  // =========================
  // CREATE JOB
  // =========================
  createJob(
    request: JobRequest
  ): Observable<Job> {
    return this.http.post<Job>(
      this.baseUrl,
      request
    );
  }

  // =========================
  // UPDATE JOB
  // =========================
  updateJob(
    id: number,
    request: JobRequest
  ): Observable<Job> {
    return this.http.put<Job>(
      `${this.baseUrl}/${id}`,
      request
    );
  }

  // =========================
  // DELETE JOB
  // =========================
  closeJob(
    id: number
  ): Observable<void> {
    return this.http.put<void>(
      'http://localhost:8080/api/jobs/close/' + id,
      {}
    );
  }

  // =========================
  // SEARCH JOBS
  // =========================
  searchJobs(
    keyword: string
  ): Observable<Job[]> {
    return this.http.get<Job[]>(
      `${this.baseUrl}/search?keyword=${keyword}`
    );
  }
}