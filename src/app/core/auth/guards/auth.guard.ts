import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { of } from 'rxjs';

export const AuthGuard: CanActivateFn | CanActivateChildFn = (route, state) => {
    const router: Router = inject(Router);
    const token = localStorage.getItem('token');

    if (token) {
        // Token exists, proceed to the requested route
        return true;
    } else {
        // Token does not exist
        if (state.url === '/' || state.url === '') {
            // Allow access to the home route ("/")
            return true;
        } else {
            // Redirect to login for any other protected routes
            const redirectURL = state.url === '/auth/sign-out' ? '' : `redirectURL=${state.url}`;
            const urlTree = router.parseUrl(`login?${redirectURL}`);
            return of(urlTree);
        }
    }
};
