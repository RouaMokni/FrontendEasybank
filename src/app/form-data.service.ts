import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {
  private apiBaseUrl = 'http://localhost:8000';  

  constructor(private http: HttpClient) {}

  getForms(): Observable<FormData[]> {
    return this.http.get<FormData[]>(`${this.apiBaseUrl}/forms`);
  }

  getUsers(): Observable<{username: string; full_name: string; email?: string; role?: string; disabled?: boolean}[]> {
    return this.http.get<{username: string; full_name: string; email?: string; role?: string; disabled?: boolean}[]>(`${this.apiBaseUrl}/users`);
  }}
