import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ApiService, AppFormData, User } from '../api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule,isPlatformBrowser} from '@angular/common';
import { ChatService } from '../chat.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent implements OnInit {

users: User[] = [];
forms: AppFormData[] = [];
currentUserEmail: string = '';

  constructor(
    private apiService: ApiService,
    private chatService: ChatService,
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('access_token');
      console.log('Token:', token); // Vérifiez si le token est récupéré correctement
      if (token) {
        this.apiService.getUsersMe(token).subscribe(
          response => {
            console.log('Users:', response);
            this.users = Array.isArray(response) ? response : [response];
            if (this.users.length > 0) {
              this.currentUserEmail = this.users[0].username;
              console.log('Current User Email:', this.currentUserEmail);
              this.loadUserForms(token);
            }
          },
          error => {
            console.error('Error fetching users:', error);
          }
        );
      } else {
        console.error('No token found or token is invalid');
      }
    } else {
      console.error('localStorage is not available');
    }
  }

  loadUserForms(token: string): void {
    this.apiService.getForms(token).subscribe(
      data => {
        console.log('Forms received:', data);
        console.log('Example form data:', data[0]); // Pour voir un exemple de données de formulaire
        this.forms = data.filter((form: any) => form.email === this.currentUserEmail);
        this.forms.forEach(form => form.status = this.getStatusText(form.statusA, form.statusB));
        console.log('Filtered forms:', this.forms);
      },
      error => {
        console.error('Error fetching forms:', error);
      }
    );
  }
  getStatusText(statusA: boolean, statusB: boolean): string {
    if (!statusA && !statusB) return 'Pending';
    if (statusA && statusB) return 'Accepted';
    if (statusA && !statusB) return 'Rejected';
    return 'Unknown'; // In case of an unexpected combination
  }

  goHome(): void {
    this.router.navigate(['/']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/signin']);
  }
}