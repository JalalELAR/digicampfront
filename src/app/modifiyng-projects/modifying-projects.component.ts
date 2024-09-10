import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { Projet } from '../models/projet';
import { ProjetsService } from '../services/projets.service';
import { StatusService } from '../services/status.service';
import { Status } from '../models/status';
import { CollaborateurService } from '../services/collaborateur.service';
import { Collaborateur } from '../models/collaborateur';

@Component({
  selector: 'app-modifying-projects',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatCheckboxModule,
    MatSelectModule,
    MatOptionModule,
    MatIconModule
  ],
  templateUrl: './modifying-projects.component.html',
  styleUrls: ['./modifying-projects.component.css']
})
export class ModifyingProjectsComponent implements OnInit {
  statuses: Status[] = [];
  project: Projet = { id: 0, title: '', description: '', image: '', status: { id: 0, name: '' }, dated: new Date(), collaborateurs: [] };
  srcResult: any = '';
  collaborators: Collaborateur[] = [];
  filteredCollaborators: Collaborateur[] = [];
  selectedCollaborators: number[] = [];
  displayedColumns: string[] = ['select', 'id', 'nom', 'site', 'grade', 'role', 'statutCollab'];
  filters = { site: '', grade: '', role: '', statut: '' };
  distinctSites: string[] = [];
  distinctGrades: string[] = [];
  distinctRoles: string[] = [];
  distinctStatuts: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<ModifyingProjectsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private projetService: ProjetsService,
    private statusService: StatusService,
    private collaboratorService: CollaborateurService

  ) {

  }

  ngOnInit() {
    this.projetService.getById(this.data.id).subscribe(proj => {
      this.project = proj;
      this.srcResult = `data:image/png;base64,${proj.image}`;
      this.selectedCollaborators = proj.collaborateurs.map(collab => collab.id);
    });
    this.statusService.getAll().subscribe(statuses => {
      this.statuses = statuses;
    });
    this.loadCollaborators();
  }

  loadCollaborators() {
    this.collaboratorService.getAll().subscribe((data: Collaborateur[]) => {
      this.collaborators = data;
      this.filteredCollaborators = [...this.collaborators];
      this.distinctSites = [...new Set(this.collaborators.map(collab => collab.site?.city))].filter(site => site);
      this.distinctGrades = [...new Set(this.collaborators.map(collab => collab.grade?.gradeName))].filter(grade => grade);
      this.distinctRoles = [...new Set(this.collaborators.map(collab => collab.roleCollab?.role))].filter(role => role);
      this.distinctStatuts = [...new Set(this.collaborators.map(collab => collab.statutCollab?.statut))].filter(statut => statut);
    });
  }

  applyFilters() {
    this.filteredCollaborators = this.collaborators.filter(collab => {
      return (
        (this.filters.site ? collab.site?.city === this.filters.site : true) &&
        (this.filters.grade ? collab.grade?.gradeName === this.filters.grade : true) &&
        (this.filters.role ? collab.roleCollab?.role === this.filters.role : true) &&
        (this.filters.statut ? collab.statutCollab?.statut === this.filters.statut : true)
      );
    });
  }

  onFileSelected(event: Event): void {
    const inputNode = event.target as HTMLInputElement;
    if (inputNode.files && inputNode.files[0]) {
      const file = inputNode.files[0];
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.srcResult = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onCollabSelectChange(collab: Collaborateur): void {
    if (this.selectedCollaborators.includes(collab.id)) {
      this.selectedCollaborators = this.selectedCollaborators.filter(id => id !== collab.id);
    } else {
      this.selectedCollaborators.push(collab.id);
    }
    console.log('Selected Collaborators:', this.selectedCollaborators); // Vérification des changements
  }


  onSave(): void {
    // Met à jour la liste des collaborateurs sélectionnés dans le projet
    this.project.collaborateurs = this.collaborators.filter(collab => this.selectedCollaborators.includes(collab.id));
    console.log('Collaborateurs affectés au projet:', this.project.collaborateurs); // Vérifiez que les collaborateurs sont bien sélectionnés

    // Enregistrez le projet
    this.projetService.save(this.project).subscribe(() => {
      console.log('Project updated successfully');
      // Recharge le projet pour afficher les dernières modifications
      this.projetService.getById(this.project.id).subscribe(updatedProj => {
        this.project = updatedProj;
        this.selectedCollaborators = updatedProj.collaborateurs.map(collab => collab.id);
      });
      this.dialogRef.close();
    });

  }


  onCancel(): void {
    this.dialogRef.close();
  }
}
 