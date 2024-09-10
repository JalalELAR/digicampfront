import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Collaborateur } from '../models/collaborateur';

@Injectable({
  providedIn: 'root'
})
export class CollaborateurService {

  baseURL = "http://localhost:8086/collaborateurs";

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  // Get all collaborateurs
  getAll(): Observable<Collaborateur[]> {
    return this.http.get<Collaborateur[]>(`${this.baseURL}/list`, { headers: this.getHeaders() });
  }

  // Get a collaborateur by ID
  getById(id: number): Observable<Collaborateur> {
    return this.http.get<Collaborateur>(`${this.baseURL}/${id}`, { headers: this.getHeaders() });
  }

  // Add a new collaborateur
  add(collaborateur: Collaborateur): Observable<Collaborateur> {
    console.log("selected role "+ collaborateur.roleCollab.id);
    console.log("selected statut "+ collaborateur.statutCollab.id);
    const params = new HttpParams()
      .set('nom', collaborateur.nom)
      .set('email', collaborateur.email)
      .set('Image', collaborateur.image)
      .set('gradeId', collaborateur.grade.id.toString())
      .set('roleId', collaborateur.roleCollab.id.toString())
      .set('statutId', collaborateur.statutCollab.id.toString())
      .set('siteId', collaborateur.site.id.toString());

    const technologieIds = collaborateur.technologies.map(t => t.id);

    return this.http.post<Collaborateur>(`${this.baseURL}/create`, technologieIds, { 
      params: params, 
      headers: this.getHeaders()
    });
  }

  // Update a collaborateur
  save(collaborateurId: number, collaborateur: Collaborateur): Observable<Collaborateur> {
    return this.http.put<Collaborateur>(`${this.baseURL}/${collaborateurId}`, collaborateur, {
      headers: this.getHeaders()
    });
  }

  // Delete a collaborateur by ID
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseURL}/${id}`, { headers: this.getHeaders() });
  }
}
