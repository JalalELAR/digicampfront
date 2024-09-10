import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Site } from '../models/site';

@Injectable({
  providedIn: 'root'
})
export class SiteService {
  private baseURL = "http://localhost:8086/sites";  // Corrected baseURL

  constructor(private http: HttpClient) {}

  // Method to get headers with the authorization token
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  // Get all roles
  getAll(): Observable<Site[]> {
    return this.http.get<Site[]>(`${this.baseURL}/list`, { headers: this.getHeaders() });
  }

  // Get a role by ID
  getById(id: number): Observable<Site> {
    return this.http.get<Site>(`${this.baseURL}/${id}`, { headers: this.getHeaders() });
  }

  // Add a new Role
  add(site: string): Observable<Site> {
    const params = new HttpParams().set('name', site);
    return this.http.post<Site>(`${this.baseURL}/create`, null, { 
      params,
      headers: this.getHeaders()
    });
  }

  // Update a role by ID
  save(id: number, site: Site): Observable<Site> {
    return this.http.put<Site>(`${this.baseURL}/${id}`, site, {
      headers: this.getHeaders()
    });
  }

  // Delete a role by ID
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseURL}/${id}`, {
      headers: this.getHeaders()
    });
  }
}
