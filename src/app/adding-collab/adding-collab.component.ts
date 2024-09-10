import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CollaborateurService } from '../services/collaborateur.service';
import { Collaborateur } from '../models/collaborateur';
import { TechnosService } from '../services/technos.service';
import { Techno } from '../models/techno';
import { Site } from '../models/site';
import { SiteService } from '../services/site.service';
import { Grade } from '../models/grade';
import { GradeService } from '../services/grade.service';
import { Role } from '../models/role';
import { StatutCollab } from '../models/statut_collab';
import { StatutCollabService } from '../services/statut-collab.service';
import { RoleService } from '../services/role.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-adding-collab',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatRadioModule,
    MatDialogModule,
    FormsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    ReactiveFormsModule,
  ],
  templateUrl: './adding-collab.component.html',
  styleUrls: ['./adding-collab.component.css'],
})
export class AddingCollabComponent implements OnInit {
  nom: string = '';
  mail: string = '';
  site: Site[] = [];
  selectedSite!: Site;
  grade: Grade[] = [];
  selectedgrade!: Grade;
  technos: Techno[] = [];
  selectedTechnologies: Techno[] = [];
  roles: Role[] = [];
  selectedrole!: Role;
  statuts: StatutCollab[] = [];
  selectedstatut!: StatutCollab;
  srcResult: any;

  constructor(
    private router: Router,
    private technoservice: TechnosService,
    private collaborateurservice: CollaborateurService,
    public dialogRef: MatDialogRef<AddingCollabComponent>,
    private gradeservice: GradeService,
    private roleservice: RoleService,
    private statutCollabService: StatutCollabService,
    private siteservice: SiteService
  ) {}

  ngOnInit(): void {
    this.getTechnologies();
    this.getGrade();
    this.getSite();
    this.getRole();
    this.getStatut();
  }

  getRole(): void {
    this.roleservice.getAll().subscribe(data => {
      this.roles = data;
      // Optional: Initialize the first role as selected
      if (this.roles.length > 0) {
        this.selectedrole = this.roles[0];
      }
    });
  }

  getStatut(): void {
    this.statutCollabService.getAll().subscribe(data => {
      this.statuts = data;
      // Optional: Initialize the first statut as selected
      if (this.statuts.length > 0) {
        this.selectedstatut = this.statuts[0];
      }
    });
  }

  getTechnologies(): void {
    this.technoservice.getAll().subscribe(
      (data) => {
        this.technos = data;
        console.log('Technologies fetched:', this.technos);
      },
      (error) => {
        console.error('Error fetching technologies:', error);
      }
    );
  }

  getGrade(): void {
    this.gradeservice.getAll().subscribe(
      (data) => {
        this.grade = data;
        this.selectedgrade = this.grade[0];
        console.log('Grades fetched:', this.grade);
      },
      (error) => {
        console.error('Error fetching grades:', error);
      }
    );
  }

  getSite(): void {
    this.siteservice.getAll().subscribe(
      (data) => {
        this.site = data;
        this.selectedSite = this.site[0];
        console.log('Sites fetched:', this.site);
      },
      (error) => {
        console.error('Error fetching sites:', error);
      }
    );
  }

  isSelected(techno: Techno): boolean {
    return this.selectedTechnologies.some((t) => t.id === techno.id);
  }

  onCheckboxChange(techno: Techno, event: any): void {
    if (event.checked) {
      this.selectedTechnologies.push(techno);
    } else {
      this.selectedTechnologies = this.selectedTechnologies.filter((t) => t !== techno);
    }
  }

  onRadioChangeSite(s: Site): void {
    this.selectedSite = s;
  }

  onRoleChange(role: Role): void {
    this.selectedrole = role;
    console.log('Selected role:', this.selectedrole);
  }

  onStatutChange(statut: StatutCollab): void {
    this.selectedstatut = statut;
    console.log('Selected statut:', this.selectedstatut);
  }

  onRadioChange(g: Grade): void {
    this.selectedgrade = g;
  }

  onFileSelected(event: Event): void {
    const inputNode = event.target as HTMLInputElement;

    if (inputNode.files && inputNode.files[0]) {
      const file = inputNode.files[0];
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        const base64String = 'data:image/png;base64,' + btoa(e.target?.result as string);
        this.srcResult = base64String;
      };

      reader.readAsBinaryString(file);
    }
  }

  onSave(): void {
    const col = new Collaborateur();
    col.nom = this.nom;
    col.email = this.mail;
    col.site = this.selectedSite; // Ensure selectedSite is valid
    col.grade = this.selectedgrade; // Ensure selectedgrade is valid
    col.roleCollab = this.selectedrole; // Ensure selectedrole is valid
    col.statutCollab = this.selectedstatut; // Ensure selectedstatut is valid
    console.log('Selected2 role:', col.roleCollab);
    console.log('Selected2 statut:', col.statutCollab);
    col.technologies = this.selectedTechnologies;
    col.image = this.srcResult.replace(/^data:image\/\w+;base64,/, '');
    
    this.collaborateurservice.add(col).subscribe(
        response => {
            console.log('Collaborateur added successfully', response);
            this.dialogRef.close();
            setTimeout(() => {
                window.location.reload();
            }, 100);
        },
        error => {
            console.error('Error adding collaborateur', error);
        }
    );
}

}
