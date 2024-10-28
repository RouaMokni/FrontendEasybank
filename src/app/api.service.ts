import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

export interface User {
  username: string;
  full_name: string;
  email: string;
}

export interface AppFormData {
  id: string;  
  fullName: string;
  email: string;
  fulladd: string;
  residence: string;
  phoneNumber: number;
  seniorityy?: number;
  situation?: string;
  profession: string;
  country?: string;
  state?: string;
  mablegh?: number;
  why?: string;
  madkhoull?: number;
  charik1bank?: string;
  salaire?: number;
  loanType?: string;
  score: number;  // Add the score field
  status: string;
  statusA: boolean;  // Status as boolean
  statusB: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  getUsersMe(token: string): Observable<User> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<User>(`${this.apiUrl}/users/me`, { headers });
  }

  getUsers(token: string): Observable<User[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<User[]>(`${this.apiUrl}/users`, { headers });
  }

  getForms(token: string): Observable<AppFormData[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<AppFormData[]>(`${this.apiUrl}/forms`, { headers });
  }

  updateFormStatus(formId: string, statusA: boolean, statusB: boolean, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.put(`${this.apiUrl}/forms/${formId}`, { statusA, statusB }, { headers });
  }
}
  



