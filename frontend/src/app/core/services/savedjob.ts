// src/app/core/services/saved-job.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SavedJob } from '../../models/savedjob.model';



@Injectable({
  providedIn: 'root'
})
export class SavedJobService {

  private readonly baseUrl =
    'http://localhost:8080/api/saved-jobs';

  constructor(
    private http: HttpClient
  ) {}

  // =========================
  // SAVE JOB
  // =========================
  saveJob(
    jobId: number
  ): Observable<string> {
    return this.http.post(
      `${this.baseUrl}/${jobId}`,
      {},
      {
        responseType: 'text'
      }
    );
  }

  // =========================
  // GET SAVED JOBS
  // =========================
  getSavedJobs(): Observable<SavedJob[]> {
    return this.http.get<SavedJob[]>(
      this.baseUrl
    );
  }

  // =========================
  // REMOVE SAVED JOB
  // =========================
  removeSavedJob(
    savedJobId: number
  ): Observable<string> {
    return this.http.delete(
      `${this.baseUrl}/${savedJobId}`,
      {
        responseType: 'text'
      }
    );
  }
}