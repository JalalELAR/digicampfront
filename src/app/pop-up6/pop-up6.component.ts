import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormField, MatHint } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { StatutCollabService } from '../services/statut-collab.service';
import { StatutCollab } from '../models/statut_collab';

@Component({
  selector: 'app-pop-up-statutcollab',
  standalone: true,
  imports: [MatDialogModule,
    MatFormField,
    MatInputModule,
    MatHint,
    MatLabel,
    MatIcon,
    FormsModule
  ],
  templateUrl: './pop-up6.component.html',
  styleUrls: ['./pop-up6.component.css']
})
export class PopUpStatutCollabComponent {
  
  Name!: string;

  constructor(public dialogRef: MatDialogRef<PopUpStatutCollabComponent>, private statutCollabService: StatutCollabService) { }

  onSave(): void {
    let statutCollab = new StatutCollab();
    statutCollab.statut = this.Name;
    this.statutCollabService.add(this.Name).subscribe(
      (response) => {
        console.log('StatutCollab added successfully', response);
        this.dialogRef.close();
      },
      (error) => {
        console.error('Error adding StatutCollab', error);
      }
    );
  }
}
