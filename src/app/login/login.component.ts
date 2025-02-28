// login.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone:false
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  showPassword: boolean = false; // Password visibility toggle

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) {
    if (sessionStorage.getItem('username')) {
      this.router.navigate(['/home']);
    }
  
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  

  onSubmit() {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value).subscribe(
        (response) => {
          if (response.success) {
            sessionStorage.setItem('username', response.username);
            this.router.navigate(['/home']);  // Redirect to home after login
          } else {
            this.errorMessage = 'Invalid username or password';
          }
        },
        () => this.errorMessage = 'Login failed. Try again.'
      );
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  
}
