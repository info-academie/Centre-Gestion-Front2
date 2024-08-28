import { CommonModule } from '@angular/common';
import { Component, HostListener, ViewEncapsulation, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';

@Component({
    selector     : 'landing-home',
    templateUrl  : './home.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone   : true,
    imports      : [MatButtonModule, RouterLink, MatIconModule,CommonModule],
})
export class LandingHomeComponent
{
    /**
     * Constructor
     */
    private router=inject(Router)

    isAuthenticated:boolean
    isShowen:boolean=false
    constructor()
    {
    }
    ngOnInit():void{
        const token = localStorage.getItem('token');
        token?  this.isAuthenticated=true :   this.isAuthenticated=false

    }
    profileOptions() {
        event.stopPropagation();

        this.isShowen = !this.isShowen;
    }
    @HostListener('document:click', ['$event'])
    onClick(event: Event): void {
        console.log("hello2")

        const target = event.target as HTMLElement;
        const isClickInside = target.closest('.menu-container');
        if (!isClickInside && this.isShowen) {
            this.isShowen = false;
        }
    }
    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.isAuthenticated=false

        this.router.navigate(['/']);

    }

}
