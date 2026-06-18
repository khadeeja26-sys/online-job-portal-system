import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Router } from '@angular/router';
import { AuthService } from '../services/auth';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    // ✅ Skip authentication APIs (login/register)
    if (req.url.includes('/api/auth')) {
      return next.handle(req);
    }

    const token = this.auth.getToken();

    let clonedReq = req;

    // ✅ Attach JWT token if exists
    if (token) {
      clonedReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
    }

    // ✅ Handle response errors globally
    return next.handle(clonedReq).pipe(

      catchError((error: HttpErrorResponse) => {

        // 🔴 Handle Unauthorized (token expired / invalid)
        if (error.status === 401) {

          // Prevent multiple redirects
          if (this.auth.getToken()) {
            this.auth.logout();

            // redirect to login page
            this.router.navigate(['/login']); 
            // OR use '/login' if you have that route
          }

        }

        // 🔴 Optional: handle forbidden
        if (error.status === 403) {
          alert("Access Denied");
        }

        return throwError(() => error);
      })

    );
  }

}