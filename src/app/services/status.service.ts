import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Status } from '../models/status';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  private baseURL = "http://localhost:8086/status";  // Corrected baseURL

  constructor(private http: HttpClient) {}

  // Method to get headers with the authorization token
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  // Get all Status
  getAll(): Observable<Status[]> {
    return this.http.get<Status[]>(`${this.baseURL}/list`, { headers: this.getHeaders() });
  }

  // Get a Status by ID
  getById(id: number): Observable<Status> {
    return this.http.get<Status>(`${this.baseURL}/${id}`, { headers: this.getHeaders() });
  }

  // Add a new Status
  add(status: string): Observable<Status> {
    const params = new HttpParams().set('name', status);
    return this.http.post<Status>(`${this.baseURL}/create`, null, { 
      params,
      headers: this.getHeaders()
    });
  }

  // Update a Status by ID
  save(id: number, status: Status): Observable<Status> {
    return this.http.put<Status>(`${this.baseURL}/${id}`, status, {
      headers: this.getHeaders()
    });
  }

  // Delete a Status by ID
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseURL}/${id}`, {
      headers: this.getHeaders()
    });
  }
}
