import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService, AppFormData, User } from '../api.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admindashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admindashboard.component.html',
  styleUrl: './admindashboard.component.css'
})

export class AdmindashboardComponent implements OnInit {
  forms: AppFormData[] = [];
  selectedForm: AppFormData | null = null;

  constructor(
    private apiService: ApiService,
    private authService:AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}
  
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('access_token');
      if (token) {
        this.apiService.getForms(token).subscribe({
          next: (data) => {
            console.log('Data received:', data);
            this.forms = data;
          },
          error: (error) => console.error('Error fetching forms:', error)
        });
      } else {
        console.error('Token not found or token is invalid');
      }
    }
  }
  goHome(): void {
    this.router.navigate(['/']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/signin']);
  }
  editForm(form: AppFormData): void {
    this.selectedForm = { ...form };
    this.openModal('editFormModal');
  }

  saveChanges(): void {
    if (this.selectedForm) {
      const index = this.forms.findIndex(f => f.email === this.selectedForm!.email);
      if (index !== -1) {
        this.forms[index] = { ...this.selectedForm };
        // Add API call to save changes here
      }
      this.closeModal('editFormModal');
    }
  }

  viewForm(form: AppFormData): void {
    this.selectedForm = { ...form };
    this.openModal('viewFormModal');
  }

  openModal(modalId: string): void {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'block';
    }
  }

  closeModal(modalId: string): void {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'none';
      this.selectedForm = null;
    }
  }

  toggleStatus(form: AppFormData): void {
    const newStatus = this.getNextStatus(form.statusA, form.statusB);
    const token = localStorage.getItem('access_token');
    if (token) {
      this.apiService.updateFormStatus(form.id, newStatus.statusA, newStatus.statusB, token).subscribe({
        next: updatedForm => {
          form.statusA = newStatus.statusA;
          form.statusB = newStatus.statusB;
          console.log('Status updated:', updatedForm);
        },
        error: error => console.error('Error updating status:', error)
      });
    } else {
      console.error('No access token found');
    }
}

getNextStatus(statusA: boolean, statusB: boolean): { statusA: boolean, statusB: boolean } {
    if (!statusA && !statusB) return { statusA: true, statusB: true }; // Accepted
    if (statusA && statusB) return { statusA: true, statusB: false }; // Refused
    return { statusA: false, statusB: false }; // Pending
}
}