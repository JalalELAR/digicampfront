import { Component ,Inject} from '@angular/core';
import { MatDialogModule, MatDialogRef ,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { GradeService } from '../services/grade.service';
import { Grade } from '../models/grade';

@Component({
  selector: 'app-pop-update-grade',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
  ],
  templateUrl: './updategrade.component.html',
  styleUrls: ['./updategrade.component.css']
})
export class UpdateGradeComponent {
  grade: Grade={
    id:0,
    gradeName:''
  };
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    public dialogRef: MatDialogRef<UpdateGradeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private gradeService: GradeService
  ) {}
    
  ngOnInit(): void {
    this.gradeService.getById(this.data.id).subscribe(grade => {
      this.grade = grade;
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
        this.gradeService.save(this.grade.id,this.grade).subscribe({
          next: (save: Grade) => {
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
