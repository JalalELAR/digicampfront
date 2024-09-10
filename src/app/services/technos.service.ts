import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Techno } from '../models/techno';

@Injectable({
  providedIn: 'root'
})
export class TechnosService {
  private baseURL = "http://localhost:8086/technologies";  // Corrected baseURL

  constructor(private http: HttpClient) {}

  // Method to get headers with the authorization token
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  // Get all Techno
  getAll(): Observable<Techno[]> {
    return this.http.get<Techno[]>(`${this.baseURL}/list`, { headers: this.getHeaders() });
  }

  // Get a Techno by ID
  getById(id: number): Observable<Techno> {
    return this.http.get<Techno>(`${this.baseURL}/${id}`, { headers: this.getHeaders() });
  }

  // Add a new Techno
  add(techno: string): Observable<Techno> {
    const params = new HttpParams().set('name', techno);
    return this.http.post<Techno>(`${this.baseURL}/create`, null, { 
      params,
      headers: this.getHeaders()
    });
  }

  // Update a Techno by ID
  save(id: number, techno: Techno): Observable<Techno> {
    return this.http.put<Techno>(`${this.baseURL}/${id}`, techno, {
      headers: this.getHeaders()
    });
  }

  // Delete a Techno by ID
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseURL}/${id}`, {
      headers: this.getHeaders()
    });
  }
}
