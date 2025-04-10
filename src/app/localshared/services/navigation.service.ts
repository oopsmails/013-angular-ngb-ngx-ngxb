import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class NavigationService {
    private fromLinkClick = false;

    setFromLinkClick(value: boolean) {
        this.fromLinkClick = value;
    }

    getFromLinkClick(): boolean {
        return this.fromLinkClick;
    }
}

