import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { ProjetsService } from '../services/projets.service';
import { StatusService } from '../services/status.service';
import { CollaborateurService } from '../services/collaborateur.service'; // Service to fetch collaborators
import { Projet } from '../models/projet';
import { Status } from '../models/status';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-adding-pop-up',
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
  templateUrl: './adding-pop-up.component.html',
  styleUrls: ['./adding-pop-up.component.css']
})
export class AddingPopUpComponent implements OnInit {
  title: string = '';
  description: string = '';
  date!: Date ;
  srcResult: any;
  collaborators: any[] = [];
  filteredCollaborators: any[] = [];
  selectedCollaborators: number[] = [];
  displayedColumns: string[] = ['select', 'id', 'nom', 'site', 'grade', 'role', 'statutCollab'];
  statuses: Status[] = [];
  selectedstatus!: Status ;

  // Filtres
  filters = {
    site: '',
    grade: '',
    role: '',
    statut: ''
  };

  // Valeurs distinctes pour les filtres
  distinctSites: string[] = [];
  distinctGrades: string[] = [];
  distinctRoles: string[] = [];
  distinctStatuts: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddingPopUpComponent>,
    private projetService: ProjetsService,
    private collaboratorService: CollaborateurService,
    private statusService: StatusService,
  ) {}

  ngOnInit() {
    this.statusService.getAll().subscribe(statuses => {
      this.statuses = statuses;
    });
    this.loadCollaborators();
  }

  loadCollaborators() {
    this.collaboratorService.getAll().subscribe((data: any[]) => {
      this.collaborators = data.map(collab => ({ ...collab, selected: false }));
      this.filteredCollaborators = [...this.collaborators];

      // Extraire les valeurs distinctes pour les filtres
      this.distinctSites = [...new Set(this.collaborators.map(collab => collab.site?.city))].filter(site => site);
      this.distinctGrades = [...new Set(this.collaborators.map(collab => collab.grade?.gradeName))].filter(grade => grade);
      this.distinctRoles = [...new Set(this.collaborators.map(collab => collab.roleCollab?.role))].filter(role => role);
      this.distinctStatuts = [...new Set(this.collaborators.map(collab => collab.statutCollab?.statut))].filter(statut => statut);
    });
  }

  // Méthode pour appliquer les filtres
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
  onStatusChange(status: Status): void {
    this.selectedstatus = status;
    console.log('Selected status:', this.selectedstatus);
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

  onCollabSelectChange(collab: any): void {
    if (collab.selected) {
      this.selectedCollaborators.push(collab.id);
    } else {
      this.selectedCollaborators = this.selectedCollaborators.filter(id => id !== collab.id);
    }
  }
  onCancel(): void {
    this.dialogRef.close(); // Close the dialog without updating
  }

  onSave(): void {
    const projet = new Projet();
    projet.title = this.title;
    projet.description = this.description;

    if (this.srcResult) {
      projet.image = this.srcResult.replace(/^data:image\/\w+;base64,/, '');
    } else {
      projet.image = '';
    }

    projet.status = this.selectedstatus;
    projet.dated = new Date();

    // Convert the selected collaborators array to a comma-separated string
    const collaboratorIds = this.selectedCollaborators.join(',');

    this.projetService.add(projet, collaboratorIds).subscribe(
      (response) => {
        console.log('Project added successfully', response);
        this.dialogRef.close();
        setTimeout(() => {
          window.location.reload();
        }, 100);
      },
      (error) => {
        console.error('Error adding project', error);
      }
    );
  }
}
 