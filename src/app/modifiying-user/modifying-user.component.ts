import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { UsersService } from '../services/users.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core'
import { NgIf,CommonModule } from '@angular/common'; // Import NgIf for *ngIf
import { Utilisateur } from '../models/utilisateur';


@Component({
  selector: 'app-modifying-user',
  standalone:true,
  imports: [FormsModule,
    NgIf,
    MatFormFieldModule,
    MatSelectModule,    // Ensure MatSelectModule is imported
    MatOptionModule,
    CommonModule],
  templateUrl:'./modifying-user.component.html',
  styleUrls: ['./modifying-user.component.css']
})
export class ModifyingUserComponent  {
  user: Utilisateur = {
    id: 0,
    fullName: '',
    email: '',
    role: ''
  };
  roles: string[] = ['USER', 'ADMIN'];
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    public dialogRef: MatDialogRef<ModifyingUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private userService: UsersService
  ) {}
  
  ngOnInit(): void {
    this.userService.getById(this.data.id).subscribe(user => {
      this.user = user;
    });
  }
    
  updateUser(): void {
    this.userService.updateUser(this.user.id, this.user).subscribe({
      next: (updatedUser: Utilisateur) => {
        this.successMessage = 'User updated successfully';
        this.dialogRef.close(updatedUser);
      },
      error: (error: any) => {
        this.errorMessage = 'Error updating user';
        console.error(error);
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close(); // Close the dialog without updating
  }

  /*user: Utilisateur = new Utilisateur();
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private userService: UsersService) {}

  updateUser() {
    const userId = this.user.id; // Ensure the user ID is set before calling update
    this.userService.updateUser(userId, this.user).subscribe(
      updatedUser => {
        this.successMessage = 'User updated successfully!';
        this.errorMessage = null;
      },
      error => {
        this.errorMessage = 'Error updating user: ' + error.message;
        this.successMessage = null;
      }
    );
  }*/
}
