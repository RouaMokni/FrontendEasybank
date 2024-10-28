import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private baseUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

public sendMessage(message: string): Observable<any> {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
    'Content-Type': 'application/json'
  });
  return this.http.post(`${this.baseUrl}/chat/`, { message }, { headers }).pipe(
    catchError(this.handleError)
  );
}


public getMessages(): Observable<any> {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
  });
  return this.http.get(`${this.baseUrl}/messages`, { headers }).pipe(
    catchError(this.handleError)
  );
}

public saveChatHistory(userId: string, messages: any[]): Observable<any> {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
    'Content-Type': 'application/json'
  });
  return this.http.post(`${this.baseUrl}/chat/history`, { userId, messages }, { headers }).pipe(
    catchError(this.handleError)
  );
}

public getChatHistory(userId: string): Observable<any[]> {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
  });
  return this.http.get<any[]>(`${this.baseUrl}/chat/history/${userId}`, { headers }).pipe(
    catchError(this.handleError)
  );
}

private handleError(error: HttpErrorResponse) {
  console.error('An error occurred:', error);
  return throwError('Something bad happened; please try again later.');
}
}