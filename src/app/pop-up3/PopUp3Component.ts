import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormField, MatHint } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { TechnosService } from '../services/technos.service';
import { Techno } from '../models/techno';

@Component({
  selector: 'app-pop-up-techno',
  standalone: true,
  imports: [MatDialogModule,
    MatFormField,
    MatInputModule,
    MatHint,
    MatLabel,
    MatIcon,
    FormsModule
  ],
  templateUrl: './pop-up3.component.html',
  styleUrls: ['./pop-up3.component.css']
})
export class PopUpTechnoComponent {
  
  Name!: string;

  constructor(public dialogRef: MatDialogRef<PopUpTechnoComponent>, private technoService: TechnosService) { }

  onSave(): void {
    let techno = new (Techno);
    techno.name = this.Name;
    this.technoService.add(this.Name).subscribe(
      (response) => {
        console.log('Techno added successfully', response);
        this.dialogRef.close();
      },
      (error) => {
        console.error('Error adding Techno', error);
      }
    );
  }
}
