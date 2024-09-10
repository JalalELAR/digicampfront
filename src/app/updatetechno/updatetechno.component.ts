import { Component ,Inject} from '@angular/core';
import { MatDialogModule, MatDialogRef ,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { TechnosService } from '../services/technos.service';
import { Techno } from '../models/techno';

@Component({
  selector: 'app-pop-update-techno',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
  ],
  templateUrl: './updatetechno.component.html',
  styleUrls: ['./updatetechno.component.css']
})
export class UpdateTechnoComponent {
    techno: Techno={
    id:0,
    name:''
  };

  constructor(
    public dialogRef: MatDialogRef<UpdateTechnoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private techosService: TechnosService
  ) {}

  ngOnInit(): void {
    this.techosService.getById(this.data.id).subscribe(techno => {
      this.techno = techno;
    });
  }
  onSave(): void {
    this.techosService.save(this.techno.id,this.techno).subscribe(
      (response) => {
        console.log('Grade updated successfully', response);
        this.dialogRef.close();
      },
      (error) => {
        console.error('Error updating grade', error);
      }
    );
  }
}
