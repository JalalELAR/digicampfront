import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError ,from} from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Utilisateur } from '../models/utilisateur';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseURL = "http://localhost:8086/users"; // Base URL of the backend

  constructor(private http: HttpClient) { }

  private getHeaders(): Observable<HttpHeaders> {
    // Retrieve token from local storage or any other storage method
    const token = localStorage.getItem('authToken');
    
    // Create headers
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
    
    // Return headers wrapped in an observable
    return from([headers]);
  }

  private buildUrl(path: string): string {
    const url = `${this.baseURL}${path}`;
    console.log(`Constructed URL: ${url}`);
    return url;
  }

  // Fetch all users (ADMIN only)
  getAll(): Observable<Utilisateur[]> {
    const url = this.buildUrl('/');
    return this.getHeaders().pipe(
      switchMap(headers => this.http.get<Utilisateur[]>(url, { headers, responseType: 'json' as 'json' })),
      catchError(this.handleError)
    );
  }

  // Fetch a user by ID (ADMIN only)
  getById(id: number): Observable<Utilisateur> {
    const url = this.buildUrl(`/${id}`);
    return this.getHeaders().pipe(
      switchMap(headers => this.http.get<Utilisateur>(url, { headers, responseType: 'json' as 'json' })),
      catchError(this.handleError)
    );
  }

  // Add a new user (ADMIN only)
  add(utilisateur: Utilisateur): Observable<Utilisateur> {
    const url = this.buildUrl('/adding-user');
    return this.getHeaders().pipe(
      switchMap(headers => this.http.post<Utilisateur>(url, utilisateur, { headers, responseType: 'json' as 'json' })),
      catchError(this.handleError)
    );
  }

  // Update a user by ID (ADMIN only)
  updateUser(id: number, user: Utilisateur): Observable<Utilisateur> {
    const url = this.buildUrl(`/${id}`);
    return this.getHeaders().pipe(
    switchMap(headers => this.http.put<Utilisateur>(url, user, {headers,responseType:'json' as 'json'} )) ,
      catchError(this.handleError)
    );
    
  }

  /*save(utilisateur: Utilisateur): Observable<Utilisateur> {
    const url = this.buildUrl(`/${utilisateur.id}`);
    return this.getHeaders().pipe(
      switchMap(headers => this.http.put<Utilisateur>(url, utilisateur, { headers, responseType: 'json' as 'json' })),
      catchError(this.handleError)
    );
  }*/

  // Delete a user by ID (ADMIN only)
  delete(id: number): Observable<void> {
    const url = this.buildUrl(`/${id}`);
    return this.getHeaders().pipe(
      switchMap(headers => this.http.delete<void>(url, { headers, responseType: 'text' as 'json' })),
      catchError(this.handleError)
    );
  }
  
  // Handle HTTP errors
  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Server Error: Code ${error.status}, Message: ${error.message}`;
      console.error('Response body:', error.error);
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
