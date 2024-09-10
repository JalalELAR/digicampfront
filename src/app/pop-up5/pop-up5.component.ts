import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormField, MatHint } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { RoleService } from '../services/role.service';
import { Role } from '../models/role';

@Component({
  selector: 'app-pop-up-role',
  standalone: true,
  imports: [MatDialogModule,
    MatFormField,
    MatInputModule,
    MatHint,
    MatLabel,
    MatIcon,
    FormsModule
  ],
  templateUrl: './pop-up5.component.html',
  styleUrls: ['./pop-up5.component.css']
})
export class PopUpRoleComponent {
  
  Name!: string;

  constructor(public dialogRef: MatDialogRef<PopUpRoleComponent>, private roleService: RoleService) { }

  onSave(): void {
    let role = new Role();
    role.role = this.Name;
    this.roleService.add(this.Name).subscribe(
      (response) => {
        console.log('Role added successfully', response);
        this.dialogRef.close();
      },
      (error) => {
        console.error('Error adding Role', error);
      }
    );
  }
}
