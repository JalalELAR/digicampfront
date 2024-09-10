import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Grade } from '../models/grade';

@Injectable({
  providedIn: 'root'
})
export class GradeService {
  private baseURL = "http://localhost:8086/grades";  // Corrected baseURL

  constructor(private http: HttpClient) {}

  // Method to get headers with the authorization token
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  // Get all grades
  getAll(): Observable<Grade[]> {
    return this.http.get<Grade[]>(`${this.baseURL}/list`, { headers: this.getHeaders() });
  }

  // Get a role by ID
  getById(id: number): Observable<Grade> {
    return this.http.get<Grade>(`${this.baseURL}/${id}`, { headers: this.getHeaders() });
  }

  // Add a new Role
  add(grade: string): Observable<Grade> {
    const params = new HttpParams().set('name', grade);
    return this.http.post<Grade>(`${this.baseURL}/create`, null, { 
      params,
      headers: this.getHeaders()
    });
  }

  // Update a role by ID
  save(id: number, grade: Grade): Observable<Grade> {
    return this.http.put<Grade>(`${this.baseURL}/${id}`, grade, {
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
