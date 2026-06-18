// src/app/core/services/resume.service.ts

import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { Resume } from '../../models/resume.model';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {

  private readonly baseUrl =
    'http://localhost:8080/api/resume';

  constructor(
    private http: HttpClient
  ) {}

  // =========================
  // GET AUTH HEADERS
  // =========================
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');

    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  // =========================
  // UPLOAD RESUME
  // =========================
  uploadResume(file: File): Observable<Resume> {

    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<Resume>(
      `${this.baseUrl}/upload`,
      formData,
      {
        headers: this.getHeaders()
      }
    );
  }

  // =========================
  // GET MY RESUME
  // =========================
  getMyResume(): Observable<Resume> {
    return this.http.get<Resume>(
      `${this.baseUrl}/my`,
      {
        headers: this.getHeaders()
      }
    );
  }

  // =========================
  // DELETE RESUME
  // =========================
  deleteResume(): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/delete`,
      {
        headers: this.getHeaders()
      }
    );
  }

  // =========================
  // DOWNLOAD RESUME (BLOB)
  // =========================
  downloadResume(resumeId: number): Observable<Blob> {
    return this.http.get(
      `${this.baseUrl}/download/${resumeId}`,
      {
        headers: this.getHeaders(),
        responseType: 'blob'
      }
    );
  }

  // =========================
  // VIEW RESUME IN NEW TAB
  // =========================
  viewResume(resumeId: number): void {
    this.downloadResume(resumeId)
      .subscribe({
        next: (blob: Blob) => {

          const fileUrl =
            window.URL.createObjectURL(blob);

          window.open(fileUrl, '_blank');
        }
      });
  }

  // =========================
  // DOWNLOAD RESUME FILE
  // =========================
  downloadResumeFile(
    resumeId: number,
    fileName: string
  ): void {

    this.downloadResume(resumeId)
      .subscribe({
        next: (blob: Blob) => {

          const fileUrl =
            window.URL.createObjectURL(blob);

          const a =
            document.createElement('a');

          a.href = fileUrl;
          a.download = fileName;
          a.click();

          window.URL.revokeObjectURL(fileUrl);
        }
      });
  }

  // =========================
  // OPTIONAL URL METHOD
  // =========================
  getDownloadUrl(resumeId: number): string {
    return `${this.baseUrl}/download/${resumeId}`;
  }
}