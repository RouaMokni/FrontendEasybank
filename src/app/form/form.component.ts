
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { FormDataService } from '../form-data.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
declare function disableOtherDivs(exceptId: string): void;
declare function checkNameAndToggleRadios(): void;
declare function showForm0(formId: string): void;
declare function enableProfessionRadios(): void;
declare function verifForign(): void;
declare function verifForign1(): void;
declare function reloadPage(): void;


@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})

export class FormComponent implements OnInit {
  isAuthenticated = false;
   isProfessionEnabled = false;
   isResidenceDisabled = true;
  
   constructor(private authService: AuthService, private router: Router) { }
  
   ngOnInit(): void {  
     this.isAuthenticated = this.authService.isAuthenticated();
    if (!this.isAuthenticated) {
      this.router.navigate(['/signin']);
    }
  }
  
   onSubmit(): void {
     console.log('Form submitted!');
   }
  
   toggleElementVisibility(id: string): void {
     const element = document.getElementById(id);
     if (element) {
       element.style.display = element.style.display === 'none' ? 'block' : 'none';
    } else {
       console.error(`Element with ID: ${id} not found.`);
     }
   }
  
   checkNameAndToggleRadios(): void {
     const nameInput = (document.getElementById('fullName') as HTMLInputElement)?.value;
     this.isResidenceDisabled = nameInput?.trim() === '';
     this.toggleElementVisibility('residenceOptions');
   }
  
   submitSection(id: string): void {
    this.toggleElementVisibility(id);
     this.scrollToBottomSmooth();
   }
  
   scrollToBottomSmooth(): void {
     window.scrollTo({
       top: document.body.scrollHeight,
       behavior: 'smooth'
     });
   }
 }  
