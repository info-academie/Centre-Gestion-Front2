import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { of, switchMap } from 'rxjs';

export const AuthGuard: CanActivateFn | CanActivateChildFn = (route, state) =>
{
    const router: Router = inject(Router);

  

    const token = localStorage.getItem('token');

            if (token) {
                return true;
              } else {
                const redirectURL = state.url === '/auth/sign-out' ? '' : `redirectURL=${state.url}`;
                const urlTree = router.parseUrl(`login?${redirectURL}`);
                return of(urlTree);
                return false;
              }
    
    
};
 

