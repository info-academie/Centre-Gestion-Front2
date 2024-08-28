import { Route } from '@angular/router';
import { initialDataResolver } from 'app/app.resolvers';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { AuthSignInComponent } from './modules/auth/sign-in/sign-in.component';
import { SignUpComponent } from './modules/auth/sign-up/sign-up.component';
import { LandingHomeComponent } from './modules/landing/home/home.component';
import { AcceuilComponent } from './modules/landing/acceuil/acceuil.component';
import { ChatUiComponent } from './modules/admin/chat/chat.component';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [
    // Landing routes
    {
        path: '',
        component: AcceuilComponent,
    },
    {
        path: 'login',
        component: AuthSignInComponent,
    },
    {
        path: 'signUp',
        component: SignUpComponent,
    },

    // Admin routes
    {
        path: '',
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: initialDataResolver
        },
        children: [
            { path: 'admin', loadChildren: () => import('app/modules/admin/example.routes') },
        ]
    }
];
