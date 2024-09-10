import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UsersService } from '../services/users.service';
import { Utilisateur } from '../models/utilisateur';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule
  ],
  templateUrl: './adding-user.component.html',  // Ensure this path is correct
  styleUrls: ['./adding-user.component.css']
})
export class AddUserComponent {
  email!:string;
  password!: string;
  fullName!: string;
 
  constructor(
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AddUserComponent>,
    private usersService: UsersService
  ) {}
 
  onSave(): void {
    let Admin = new Utilisateur();
    Admin.email = this.email;
    console.log(this.email);
    Admin.fullName = this.fullName;
    console.log(this.fullName);
 
    this.usersService.add(Admin).subscribe(
      (response) => {
        console.log('User added successfully', response);
        setTimeout(() => {
          window.location.reload();
        }, 100); // délai court pour assurer la fermeture du dialog
        this.snackBar.open('User added successfully', 'Close', {panelClass: ['snackbar-success'],
          duration: 3000
          
        });
        this.dialogRef.close();
      },
      (error) => {
        console.error('Error adding user', error);
        this.snackBar.open('Error adding user', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
      }
    );
  }
}
