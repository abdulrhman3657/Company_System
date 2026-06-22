import { ChangeDetectorRef, Component, inject } from '@angular/core';
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
  private cdr = inject(ChangeDetectorRef)

  // form variables
  username = '';
  password = '';

  mode: 'login' | 'register' = 'login';
  message = '';
  messageType: 'success' | 'error' | '' = '';
  isLoading = false;

  // this method is used in form submit
  submit() {
    this.message = '';
    this.messageType = '';
    this.isLoading = true;

    // build the request
    const request = {
      username: this.username,
      password: this.password
    }

    // mode is set from html button
    if (this.mode == 'login') {
      this.authApi.login(request).subscribe({
        next: (response) => {
          this.message = response.message;
          this.messageType = 'success';
          this.isLoading = false;
          this.cdr.detectChanges();

          // setTimeout(() => {
          //   this.router.navigate(['/']);
          // }, 800)

        },
        error: (error) => {
          this.message = error.error.message;
          this.messageType = 'error';
          this.isLoading = false;
          this.cdr.detectChanges();
        }
      });

      return;
    }

    // this.mode is register
    this.authApi.register(request).subscribe({
      next: (response) => {
        this.message = response.message;
        this.messageType = 'success';
        this.mode = 'login';
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.message = error.error.message;
        this.messageType = 'error';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    })
    
  }
}
