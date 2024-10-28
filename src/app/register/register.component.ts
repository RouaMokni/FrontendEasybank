import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule,CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {

username: string = '';
  fullName: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';  // Error message

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  register(): void {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match!';
      return;
    }

    console.log('Attempting to register user:', this.username);

    this.authService.register(this.username, this.fullName, this.password)
      .subscribe({
        next: () => {
          console.log('Registration successful');
          this.router.navigate(['/signin']);
        },
        error: (err) => {
          console.error('Registration failed:', err);
          this.errorMessage = 'Registration failed. Please try again.';
        }
      });
  }
}
