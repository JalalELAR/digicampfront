import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CollaborateurService } from '../services/collaborateur.service';
import { SiteService } from '../services/site.service';
import { GradeService } from '../services/grade.service';
import { TechnosService } from '../services/technos.service';
import { RoleService } from '../services/role.service';
import { StatutCollabService } from '../services/statut-collab.service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { Collaborateur } from '../models/collaborateur';
import { Techno } from '../models/techno';
import { Site } from '../models/site';
import { Grade } from '../models/grade';
import { Role } from '../models/role';
import { StatutCollab } from '../models/statut_collab';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-modifying-collab',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatRadioModule,
    MatSelectModule,
    MatOptionModule,
    MatIconModule,
  ],
  templateUrl:'./modifying-collab.component.html',
  styleUrls: ['./modifying-collab.component.css'],
})
export class ModifyingCollabComponent implements OnInit {
  
  collaborateur!: Collaborateur;
  technosName: string[] = [];
  selectedTechnologies: Techno[] = [];
  site: Site[] = [];
  technos: Techno[] = [];
  grade: Grade[] = [];
  role: Role[] = [];
  statut: StatutCollab[] = [];
  srcResult: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private collaborateurService: CollaborateurService,
    private siteService: SiteService,
    private gradeService: GradeService,
    private technoService: TechnosService,
    private roleService: RoleService,
    private statutCollabService: StatutCollabService,
    public dialogRef: MatDialogRef<ModifyingCollabComponent>
  ) {}

  ngOnInit(): void {
    this.fetchCollaborateurDetails(this.data.id);
    this.getTechnologies();
    this.getGrade();
    this.getSite();
    this.getRole();
    this.getStatut();
  }

  getTechnologies(): void {
    this.technoService.getAll().subscribe({
      next: (data) => {
        this.technos = data;
        this.updateSelectedTechnologies();
      },
      error: (err) => console.error('Error loading technologies', err),
    });
  }

  getGrade(): void {
    this.gradeService.getAll().subscribe({
      next: (data) => (this.grade = data),
      error: (err) => console.error('Error loading grades', err),
    });
  }

  getSite(): void {
    this.siteService.getAll().subscribe({
      next: (data) => (this.site = data),
      error: (err) => console.error('Error loading sites', err),
    });
  }

  getRole(): void {
    this.roleService.getAll().subscribe({
      next: (data) => (this.role = data),
      error: (err) => console.error('Error loading roles', err),
    });
  }

  getStatut(): void {
    this.statutCollabService.getAll().subscribe({
      next: (data) => (this.statut = data),
      error: (err) => console.error('Error loading status', err),
    });
  }

  fetchCollaborateurDetails(id: number): void {
    this.collaborateurService.getById(id).subscribe({
      next: (data: Collaborateur) => {
        this.collaborateur = data;
        this.srcResult = `data:image/jpeg;base64,${data.image}`;
        this.technosName = data.technologies ? data.technologies.map((t) => t.name) : [];
        this.selectedTechnologies = data.technologies || [];
        this.collaborateur.grade = this.grade.find(g => g.id === data.grade?.id) || { id: 0, gradeName: '' };
        this.collaborateur.site = this.site.find(s => s.id === data.site?.id) || { id: 0, city: '' };
        this.collaborateur.roleCollab = this.role.find(r => r.id === data.roleCollab?.id) || { id: 0, role: '' };
        this.collaborateur.statutCollab = this.statut.find(s => s.id === data.statutCollab?.id) || { id: 0, statut: '' };
      },
      error: (err) => console.error('Error fetching collaborateur details', err),
    });
  }

  updateSelectedTechnologies(): void {
    if (this.collaborateur && this.technos) {
      this.selectedTechnologies = this.technos.filter(techno => 
        this.collaborateur.technologies?.some(t => t.id === techno.id)
      );
    }
  }

  onCheckboxChange(techno: Techno, event: any): void {
    if (event.checked) {
      this.selectedTechnologies.push(techno);
    } else {
      this.selectedTechnologies = this.selectedTechnologies.filter((t) => t.id !== techno.id);
    }
  }

  onSave(): void {
    if (!this.collaborateur || !this.srcResult) {
      console.error('Collaborateur or image data is missing');
      return;
    }

    this.srcResult = this.srcResult.replace(/^data:image\/\w+;base64,/, '');
    this.collaborateur.image = this.srcResult;
    this.collaborateur.technologies = this.selectedTechnologies;

    this.collaborateurService.save(this.collaborateur.id, this.collaborateur).subscribe({
      next: () => {
        console.log('Collaborateur updated successfully');
        this.dialogRef.close(true);
      },
      error: (err) => console.error('Error updating collaborateur', err),
    });
  }

  isPresent(techno: Techno): boolean {
    return this.selectedTechnologies.some((t) => t.id === techno.id);
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
}
