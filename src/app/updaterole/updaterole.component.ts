import { Component ,Inject} from '@angular/core';
import { MatDialogModule, MatDialogRef ,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { RoleService } from '../services/role.service';
import { Role } from '../models/role';

@Component({
  selector: 'app-pop-update-role',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
  ],
  templateUrl: './updaterole.component.html',
  styleUrls: ['./updaterole.component.css']
})
export class UpdateRoleComponent {
  role: Role={
    id:0,
    role:''
  };
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    public dialogRef: MatDialogRef<UpdateRoleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private roleService: RoleService
  ) {}
    
  ngOnInit(): void {
    this.roleService.getById(this.data.id).subscribe(role => {
      this.role = role;
    });
  }
  /*onSubmit(): void {
    this.projetService.save(this.project).subscribe(() => {
      console.log('Project updated successfully');
      this.dialogRef.close(); // Close the dialog after updating
      setTimeout(() => {
        window.location.reload();
      }, 100);
    });
  }*/
    onSave(): void {
        this.roleService.save(this.role.id,this.role).subscribe({
          next: (save: Role) => {
            this.successMessage = 'Grade updated successfully';
            this.dialogRef.close(save);
          },
          error: (error: any) => {
            this.errorMessage = 'Error updating Grade';
            console.error(error);
          }
        });
      }
  
  /*onSave(): void {
    this.gradeService.save(this.grade.id,this.grade).subscribe(() => {
        console.log('grade updated successfully');
        this.dialogRef.close(); // Close the dialog after updating
        setTimeout(() => {
          window.location.reload();
        }, 100);
      });
  }*/
}
