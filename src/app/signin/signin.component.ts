import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [RouterModule,CommonModule, FormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {

username: string = '';  // Now this is used to input the email
password: string = '';
errorMessage: string = '';

constructor(
  private authService: AuthService,
  private router: Router,
  private activatedRoute: ActivatedRoute,
  @Inject(PLATFORM_ID) private platformId: Object
) {}

ngOnInit(): void {
  if (isPlatformBrowser(this.platformId)) {
    this.activatedRoute.data.subscribe((data: any) => {
      const title = data.title || 'Titre par défaut';
      document.title = ` ${title}`;
    });
    if (this.authService.isAuthenticated()) {
      this.redirectUserBasedOnRole();
    }
  }
}

signIn(): void {
  this.authService.login(this.username, this.password)
    .subscribe({
      next: () => {
        console.log('Login successful');
        this.redirectUserBasedOnRole();
      },
      error: (err) => {
        this.errorMessage = 'Login failed. Please check your credentials and try again.';
      }
    });
}

private redirectUserBasedOnRole(): void {
  const role = this.authService.getUserRole();
  if (role === 'admin') {
    this.router.navigate(['/admin']);
  } else {
    this.router.navigate(['/profile']);
  }
}
}