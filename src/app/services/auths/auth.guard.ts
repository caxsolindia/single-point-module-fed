import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const isLoggedIn = authService.getisLoggedIn();

  if (state.url === '/authapp') {
    if (isLoggedIn) {
      router.navigate(['/profile']);
      return false;
    } else {
      return true;
    }
  } else {
    if (isLoggedIn) {
      const user = authService.getUser();
      const requiredRoles = route.data?.['roles'] as string[] | undefined;

      if (!requiredRoles || (user && requiredRoles.includes(user.role))) {
        return true;
      } else {
        alert(
          'You do not have access to this page. Please check with your Administrator.'
        );
        router.navigate(['/pagenotfound']);
        return false;
      }
    } else {
      router.navigate(['/pagenotfound']);
      return false;
    }
  }
};
