import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { GradeService } from '../services/grade.service';
import { Grade } from '../models/grade';

@Component({
  selector: 'app-pop-up-grade',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
  ],
  templateUrl: './pop-up1.component.html',
  styleUrls: ['./pop-up1.component.css']
})
export class PopUpGradeComponent {
  name!: string;

  constructor(
    public dialogRef: MatDialogRef<PopUpGradeComponent>,
    private gradeService: GradeService
  ) {}

  onSave(): void {
    let grade= new Grade();
    grade.gradeName=this.name;
    this.gradeService.add(this.name).subscribe(
      (response) => {
        console.log('Grade added successfully', response);
        this.dialogRef.close();
      },
      (error) => {
        console.error('Error adding grade', error);
      }
    );
  }
}
