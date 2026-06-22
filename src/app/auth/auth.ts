import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthApi } from '../services/auth-api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [FormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})

export class Auth {
  private authApi = inject(AuthApi);
  private router = inject(Router);

  username = '';
  password = '';
  mode: 'login' | 'register' = 'login';
  message = '';

  submit() {

    const request = {
      username: this.username,
      password: this.password
    }

    if (this.mode == 'login') {
      this.authApi.login(request).subscribe({
        next: (response) => {
          this.message = response.message;
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.message = error.error.message;
        }
      });

      return;
    }

    // this.mode is register
    this.authApi.register(request).subscribe({
      next: (response) => {
        this.message = response.message;
        this.mode = 'login';
      },
      error: (error) => {
        this.message = error.error.message;
      }
    })
    
  }
}
