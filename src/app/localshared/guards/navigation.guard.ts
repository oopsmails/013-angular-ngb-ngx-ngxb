import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NavigationService } from '../services/navigation.service';


@Injectable({
    providedIn: 'root'
})
export class NavigationGuard implements CanActivate {
    constructor(private navigationService: NavigationService, private router: Router) { }

    canActivate(): boolean {
        if (this.navigationService.getFromLinkClick()) {
            this.navigationService.setFromLinkClick(false); // Reset the flag
            return true;
        } else {
            // Redirect to home if navigation was not from link click
            this.router.navigate(['/not-allowed']);
            return false;
        }
    }
}
