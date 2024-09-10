import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormField, MatHint } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { StatusService } from '../services/status.service';
import { Status } from '../models/status';

@Component({
  selector: 'app-pop-up-status',
  standalone: true,
  imports: [MatDialogModule,
    MatFormField,
    MatInputModule,
    MatHint,
    MatLabel,
    MatIcon,
    FormsModule
  ],
  templateUrl: './pop-up4.component.html',
  styleUrls: ['./pop-up4.component.css']
})
export class PopUpStatusComponent {
  
  Name!: string;

  constructor(public dialogRef: MatDialogRef<PopUpStatusComponent>, private statusService: StatusService) { }

  onSave(): void {
    let status = new (Status);
    status.name = this.Name;
    this.statusService.add(this.Name).subscribe(
      (response) => {
        console.log('Status added successfully', response);
        this.dialogRef.close();
      },
      (error) => {
        console.error('Error adding Status', error);
      }
    );
  }
}
