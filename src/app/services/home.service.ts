
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private baseUrl = 'http://localhost:8086/home';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    });
  }

  getProjets(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/projets`, { headers: this.getHeaders() });
  }

  getCollaborateurs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/collaborateurs`, { headers: this.getHeaders() });
  }
}
