import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './core/auth/auth.service';

@Component({
    selector   : 'app-root',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss'],
    standalone : true,
    imports    : [RouterOutlet],
})
export class AppComponent
{
    constructor(private authService: AuthService, private router: Router) {}

    // ngOnInit(): void {
    //     const token = localStorage.getItem('token');
    //     if (token) {
    //         this.authService.setToken(token);
    //     } else {
    //         // Redirect to login page if no token found
    //         this.router.navigate(['/login']);
    //     }
    // }
}
