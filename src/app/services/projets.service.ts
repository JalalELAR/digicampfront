import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Projet } from '../models/projet';

@Injectable({
  providedIn: 'root'
})
export class ProjetsService {

  baseURL = "http://localhost:8086/projets";

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  getAll(): Observable<Projet[]> {
    return this.http.get<Projet[]>(`${this.baseURL}/list`, { headers: this.getHeaders() });
  }

  getById(id: number): Observable<Projet> {
    return this.http.get<Projet>(`${this.baseURL}/${id}`, { headers: this.getHeaders() });
  }

  add(projet: Projet, collaboratorIds: string): Observable<Projet> {
    const params = new HttpParams()
      .set('title', projet.title)
      .set('description', projet.description)
      .set('Image', projet.image)
      .set('statusId', projet.status.id.toString())
      .set('dated', projet.dated.toISOString().split('T')[0])
      .set('collaboratorIds', collaboratorIds);

    return this.http.post<Projet>(`${this.baseURL}/create`, null, { 
      params: params, 
      headers: this.getHeaders()
    });
  }

  save(projet: Projet): Observable<Projet> {
    return this.http.put<Projet>(`${this.baseURL}/${projet.id}`, projet, {
      headers: this.getHeaders()
    });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseURL}/${id}`, { headers: this.getHeaders() });
  }
}
