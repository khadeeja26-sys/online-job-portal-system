// src/app/core/services/auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginRequest } from '../../models/loginrequest';
import { AuthResponse } from '../../models/authresponse';
import { RegisterRequest } from '../../models/registerrequest';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl =
    'http://localhost:8080/api/auth';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  // =========================
  // LOGIN
  // =========================
  login(
    request: LoginRequest
  ): Observable<AuthResponse> {

    return this.http.post<AuthResponse>(
      `${this.baseUrl}/login`,
      request
    );
  }

  // =========================
  // REGISTER
  // =========================
  register(
    request: RegisterRequest
  ): Observable<string> {

    return this.http.post(
      `${this.baseUrl}/register`,
      request,
      {
        responseType: 'text'
      }
    );
  }

  // =========================
  // SAVE TOKEN
  // =========================
  saveAuthData(
    response: AuthResponse
  ): void {

    localStorage.setItem(
      'token',
      response.token
    );

    localStorage.setItem(
      'role',
      response.role
    );
  }

  // =========================
  // GET TOKEN
  // =========================
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // =========================
  // GET ROLE
  // =========================
  getRole(): string | null {
    return localStorage.getItem('role');
  }

  // =========================
  // CHECK LOGIN
  // =========================
  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  // =========================
  // LOGOUT
  // =========================
  logout(): void {

    localStorage.removeItem('token');
    localStorage.removeItem('role');

    this.router.navigate(['/login']);
  }
}