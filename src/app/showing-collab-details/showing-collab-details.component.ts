import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CollaborateurService } from '../services/collaborateur.service';
import { Collaborateur } from '../models/collaborateur';
import { Techno } from '../models/techno';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatFormField } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-collaborateur-dialog',
  templateUrl: './showing-collab-details.component.html',
  styleUrls: ['./showing-collab-details.component.css'],
  standalone: true,
  imports: [
    MatFormField,
    MatInputModule,
    FormsModule,
    MatCheckboxModule,
    CommonModule,
    MatIconModule,
  ],
})
export class ShowingCollabDetailsComponent implements OnInit {
  collaborateur!: Collaborateur;
  technosName!: string[];
  selectedTechnologies: Techno[] = [];
  srcResult!: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private collaborateurService: CollaborateurService,
    public dialogRef: MatDialogRef<ShowingCollabDetailsComponent>
  ) {}

  ngOnInit(): void {
    this.fetchCollaborateurDetails(this.data?.id);
  }

  onClose(): void {
    this.dialogRef.close();
  }

  fetchCollaborateurDetails(id: number): void {
    this.collaborateurService.getById(id).subscribe({
      next: (data: Collaborateur) => {
        console.log(data);
        this.collaborateur = data;
        this.srcResult = `data:image/jpeg;base64,${data?.image}`;
        this.technosName = data?.technologies.map((t) => t.name);
        
      },
      error: (error: any) => {
        console.error('Error fetching collaborateur details', error);
      },
    });
  }

  containstechno(techno: string) {
    return this.technosName.includes(techno);
  }
}
