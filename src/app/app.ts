import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthApi } from './services/auth-api';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  private authApi = inject(AuthApi);
  private router = inject(Router);

  isLoggedIn() {
    return this.authApi.isLoggedIn();
  }

  logout() {
    this.authApi.logout();
    this.router.navigate(['/auth']);
  }
}
