// login.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule, FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = {
    email: '',
    password: ''
  };

  constructor(private router: Router, private snackBar: MatSnackBar, private http: HttpClient) { }

  onSubmit() {
    if (this.user.email && this.user.password) {
      console.log('User:', this.user);
      // Endpoint for authentication
      const loginEndpoint = 'http://localhost:8086/auth/login';

      this.http.post<{ token: string }>(loginEndpoint, this.user)
        .subscribe(
          response => {
            console.log('Login successful:', response);
            // Store the token
            localStorage.setItem('authToken', response.token);

            // Show success snackbar and change its color to green
            const successSnackbarRef = this.snackBar.open('Login successful!', 'Close', {
              duration: 3000,
            });
            successSnackbarRef.afterOpened().subscribe(() => {
              const snackbarElement = document.querySelector('.mat-snack-bar-container') as HTMLElement;
              if (snackbarElement) {
                snackbarElement.style.backgroundColor = 'green';
                snackbarElement.style.color = 'white';
              }
            });
            
            this.router.navigate(['/home']);
          },
          error => {
            console.error('Login failed:', error);

            // Show error snackbar and change its color to red
            const errorSnackbarRef = this.snackBar.open('Login failed. Please check your credentials.', 'Close', {
              duration: 3000,
            });
            errorSnackbarRef.afterOpened().subscribe(() => {
              const snackbarElement = document.querySelector('.mat-snack-bar-container') as HTMLElement;
              if (snackbarElement) {
                snackbarElement.style.backgroundColor = 'red';
                snackbarElement.style.color = 'white';
              }
            });
          }
        );
    } else {
      // Show error snackbar and change its color to red
      const errorSnackbarRef = this.snackBar.open('Please enter both email and password.', 'Close', {
        duration: 3000,
      });
      errorSnackbarRef.afterOpened().subscribe(() => {
        const snackbarElement = document.querySelector('.mat-snack-bar-container') as HTMLElement;
        if (snackbarElement) {
          snackbarElement.style.backgroundColor = 'red';
          snackbarElement.style.color = 'white';
        }
      });
    }
  }

  togglePasswordVisibility(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const passwordField = document.getElementById('password') as HTMLInputElement;
    if (passwordField) {
      passwordField.type = checkbox.checked ? 'text' : 'password';
    }
  }

  Logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']).then(() => {
      window.location.reload(); // Recharge la page pour forcer l'invalidation du cache du navigateur
    });
  }
}
