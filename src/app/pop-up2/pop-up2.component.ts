import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormField, MatHint } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { SiteService } from '../services/site.service';
import { Site } from '../models/site';
@Component({
  selector: 'app-pop-up-site',
  standalone: true,
  imports: [MatDialogModule,
    MatFormField,
    MatHint,
    MatLabel,
    MatInputModule,
    MatIcon, 
    FormsModule
  ],
  templateUrl: './pop-up2.component.html',
  styleUrls: ['./pop-up2.component.css']
})
export class PopUpSiteComponent {
  Name!: string;

  constructor(
    public dialogRef: MatDialogRef<PopUpSiteComponent>,
    private siteService: SiteService
  ) {}
  onSave(): void {
    let site = new Site();
    site.city=this.Name;
    this.siteService.add(this.Name).subscribe(
      (response) => {
        console.log('site added successfully', response);
        this.dialogRef.close();
      },
      (error) => {
        console.error('Error adding site', error);
      }
    );
}
}
