import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StatutCollab } from '../models/statut_collab';

@Injectable({
  providedIn: 'root'
})
export class StatutCollabService {

  baseURL = "http://localhost:8086/statutscollab";  // Corrected baseURL
  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  getAll(): Observable<StatutCollab[]> {
    return this.http.get<StatutCollab[]>(`${this.baseURL}/list`,{headers : this.getHeaders()});
  }

  // Get by id
  getById(id: number): Observable<StatutCollab> {
    return this.http.get<StatutCollab>(`${this.baseURL}/${id}`,{headers : this.getHeaders()});
  }

 // Add a new Statutcollab
 add(statut: string): Observable<StatutCollab> {
  const params = new HttpParams().set('statut', statut);
  return this.http.post<StatutCollab>(`${this.baseURL}/create`, null, { params,
  headers: this.getHeaders()
});
}

  // Save (update) a StatutCollab
  save(id:number,statut: StatutCollab): Observable<StatutCollab> {
    return this.http.put<StatutCollab>(`${this.baseURL}/${id}`, statut, { headers: this.getHeaders()
    });
  }
  // Delete a status by ID
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseURL}/${id}`, { headers: this.getHeaders() });
}
}
