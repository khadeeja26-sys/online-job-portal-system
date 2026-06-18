import { inject } from '@angular/core';

import {
  CanActivateFn,
  Router
} from '@angular/router';

export const authGuard: CanActivateFn = () => {

  const router = inject(Router);

  // ✅ Get token
  const token = localStorage.getItem('token');

  // ✅ If token exists -> allow
  if (token) {
    return true;
  }

  // ❌ Otherwise redirect
  router.navigate(['/login']);

  return false;
};