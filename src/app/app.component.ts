import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Router, NavigationEnd } from '@angular/router';
@Component({
    selector: 'app-root',
    providers: [MessageService], 
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    standalone: false
})
export class AppComponent {
  title = 'printing-press-orders';
  isLoginPage = false;

  constructor(private router: Router) {
    // Subscribe to router events to detect route changes
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isLoginPage = this.router.url === '/login';  // Hide navbar on login page
      }
    });
  }
}
