import { inject } from '@angular/core';

import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router
} from '@angular/router';
import { AuthService } from '../services/auth';

export const roleGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot
) => {

  const router = inject(Router);
  const authService = inject(AuthService);

  

  // ✅ Get expected role from route
  const expectedRole = route.data['role'];

  // ✅ Get logged-in role
  const userRole = authService.getRole();

  // ✅ Allow if matched
  if (userRole === expectedRole) {
    return true;
  }

  // ❌ Redirect if unauthorized
  router.navigate(['/login']);

  return false;
};