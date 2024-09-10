// navbar.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private router: Router) {}

  redirecthome(): void {
    this.router.navigate(['/home']);
  }
  redirectProjects(): void {
    this.router.navigate(['/projects']);
  }

  redirectUsers(): void {
    this.router.navigate(['/utilisateurs']);
  }

  redirectParametres(): void {
    this.router.navigate(['/parametres']);
  }

  redirectCollab() {
    this.router.navigate(['/collaborateur']);
  }
  
  Logout(): void {
    // Supprime le token
    localStorage.removeItem('authToken');
    
    // Redirige vers la page de login
    this.router.navigate(['/login']);
  }
}
