import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'http://localhost:8080/api/auth/'; // Backend URL

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(this.apiUrl + 'login', credentials, { withCredentials: true });
  }

  logout() {
    return this.http.post(this.apiUrl + 'logout', {}, { withCredentials: true }).subscribe(
      () => {
        sessionStorage.removeItem('username');
        this.router.navigate(['/login']); // Redirect to login page after logout
      },
      (error) => console.error('Logout failed:', error)
    );
  }
}
