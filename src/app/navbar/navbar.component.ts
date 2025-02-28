import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css',
    standalone: false
})
export class NavbarComponent {
    constructor(private loginService: LoginService,private router: Router){}

    logout() {
        this.loginService.logout();  // Call logout method
      }
}
