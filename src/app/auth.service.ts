import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable,of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import jwtDecode from 'jwt-decode';


export interface AuthToken {
  access_token: string;
  token_type: string;
}

export interface DecodedToken {
  username: string;
  role: string;
  exp: number;
  iat: number;
}

 export interface User {
   username: string;
   full_name: string;
    email?: string;
    role:string;
 }

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private readonly API_URL = 'http://127.0.0.1:8000';


private userRole: string | null = null;
private username: string | null = null;

  constructor(private http: HttpClient) {
    if (typeof localStorage !== 'undefined') {
      this.loadUserRoleFromToken();
    }
  }

  login(username: string, password: string): Observable<AuthToken> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    const body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);

    return this.http.post<AuthToken>(`${this.API_URL}/token`, body.toString(), { headers }).pipe(
      tap(response => {
        if (typeof localStorage !== 'undefined') {
          this.saveToken(response.access_token);
          this.userRole = this.decodeJwt(response.access_token).role;
          this.username = this.decodeJwt(response.access_token).username;
        }
      }),
      catchError(this.handleError)
    );
  }

  register(username: string, full_name: string, password: string): Observable<User> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const body = { username, full_name, password };

    return this.http.post<User>(`${this.API_URL}/users`, body, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  private decodeJwt(token: string): any {
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('JWT must have 3 parts');
    }
    const decodedPayload = atob(parts[1]);
    return JSON.parse(decodedPayload);
  }

  saveToken(token: string): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('access_token', token);
      this.loadUserRoleFromToken();
    }
  }

  isAuthenticated(): boolean {
    return typeof localStorage !== 'undefined' && !!localStorage.getItem('access_token');
  }

  logout(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('access_token');
      this.userRole = null;
    }
  }

  getUserRole(): string {
    return this.userRole ? this.userRole : 'client';
  }

  getUsername(): string | null {
    return this.username;
  }
  private loadUserRoleFromToken(): void {
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('access_token');
      if (token) {
        this.userRole = this.decodeJwt(token).role;
      }
    }
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something bad happened; please try again later.');
  }
}