import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from '../models/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private baseURL = "http://localhost:8086/rolescollab";  // Corrected baseURL

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
  getAll(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.baseURL}/list`, { headers: this.getHeaders() });
  }

  // Get a role by ID
  getById(id: number): Observable<Role> {
    return this.http.get<Role>(`${this.baseURL}/${id}`, { headers: this.getHeaders() });
  }

  // Add a new Role
  add(role: string): Observable<Role> {
    const params = new HttpParams().set('role', role);
    return this.http.post<Role>(`${this.baseURL}/create`, null, { 
      params,
      headers: this.getHeaders()
    });
  }

  // Update a role by ID
  save(id: number, role: Role): Observable<Role> {
    return this.http.put<Role>(`${this.baseURL}/${id}`, role, {
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
