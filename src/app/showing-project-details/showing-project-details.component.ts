import { Component, Inject, OnInit,NgModule } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Collaborateur } from '../models/collaborateur';
import { Projet } from '../models/projet';
import { ProjetsService } from '../services/projets.service';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-showing-project-details',
  standalone: true,
  imports: [MatFormField, MatInputModule,FormsModule,MatCheckboxModule,CommonModule],
  templateUrl: './showing-project-details.component.html',
  styleUrl: './showing-project-details.component.css'
})
export class ShowingProjectDetailsComponent implements OnInit {
  projet!:Projet;
  collaborateurName!:string[];
  srcResult!:string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: { id: number },
  public dialogRef: MatDialogRef<ShowingProjectDetailsComponent>,
  private projetservice: ProjetsService){}
  ngOnInit(): void {
    this.fetchProjectDetails(this.data?.id);
  }
  onClose(): void {
    this.dialogRef.close();
  }
  fetchProjectDetails(id: number) {
    this.projetservice.getById(id).subscribe({
      next: (data: Projet) => {
        this.projet = data;
        this.srcResult=`data:image/jpeg;base64,${data?.image}`;
        this.collaborateurName=data.collaborateurs.map(t => t.nom)
      },
      error: (error: any) => {
        console.error('Error fetching collaborateur details', error);
      }
    });
  }
}
