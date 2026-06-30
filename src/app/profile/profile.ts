import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthApi } from '../services/auth-api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})

export class Profile implements OnInit {
  private authApi = inject(AuthApi);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  userId = '';
  username = '';
  editUsername = '';
  role = '';

  isEditing = false;
  message = '';
  messageType: 'success' | 'error' | '' = '';

  ngOnInit() {
    const user = this.authApi.getCurrentUserFromToken()!;

    this.userId = user.id;
    this.username = user.username;
    this.editUsername = user.username;
    this.role = user.role;
  }

  startEdit() {
    this.editUsername = this.username;
    this.isEditing = true;
    this.message = '';
  }

  cancelEdit() {
    this.editUsername = this.username;
    this.isEditing = false;
  }

  saveProfile() {

    if (!this.editUsername.trim()) {
      return;
    }

    this.authApi.editUser(this.userId, this.editUsername).subscribe({
      next: (response) => {
        this.message = response.message;
        this.messageType = 'success';
        this.username = this.editUsername;
        this.isEditing = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.message = error.error.message;
        this.messageType = 'error';
        this.cdr.detectChanges();
      }
    })
  }

  deleteAccount() {
    this.authApi.deleteUser(this.userId).subscribe({
      next: () => {
        this.authApi.logout();
        this.router.navigate(['/auth']);
      },
      error: (error) => {
        this.message = error.error.message;
        this.messageType = 'error';
        this.cdr.detectChanges();
      }
    })
  }

}
