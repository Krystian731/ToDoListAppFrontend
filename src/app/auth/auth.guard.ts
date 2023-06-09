import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  createUrlTreeFromSnapshot,
  Router
} from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard = (next: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  return (inject(AuthService).isLoggedIn() ? true : router.parseUrl('/loginPage'));
};
