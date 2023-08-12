import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard = () => {
  const router = inject(Router);
  console.log('guard');
  return (inject(AuthService).isLoggedIn() ? true : router.parseUrl('/loginPage'));
};
