import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CollaborateurService } from '../services/collaborateur.service';
import { Collaborateur } from '../models/collaborateur';
import { NavbarComponent } from '../navbar/navbar.component';
import { AddingCollabComponent } from '../adding-collab/adding-collab.component';
import { ModifyingCollabComponent } from '../modifying-collab/modifying-collab.component';
import { ShowingCollabDetailsComponent } from '../showing-collab-details/showing-collab-details.component';
import { FooterComponent } from '../footer/footer.component';
import { GradeService } from '../services/grade.service';
import { RoleService } from '../services/role.service';
import { SiteService } from '../services/site.service';
import { StatutCollabService } from '../services/statut-collab.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core'; 

@Component({
  selector: 'app-collaborateur',
  standalone: true,
  imports: [
    MatSelectModule,
    MatOptionModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatDialogModule,
    NavbarComponent,
    FooterComponent
  ],
  templateUrl: './collaborateur.component.html',
  styleUrls: ['./collaborateur.component.css']
})
export class CollaborateurComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'nom', 'site', 'grade', 'role', 'statut', 'projectCount', 'actions'];
  dataSource = new MatTableDataSource<Collaborateur>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  collaborateurs: Collaborateur[] = [];
  sites: any[] = [];
  grades: any[] = [];
  roles: any[] = [];
  statuts: any[] = [];

  selectedSite: number = 0;
  selectedGrade: number = 0;
  selectedRole: number = 0;
  selectedStatut: number = 0;

  constructor(
    private router: Router,
    private collaborateurService: CollaborateurService,
    private gradeservice: GradeService,
    private roleservice: RoleService,
    private siteservice: SiteService,
    private statutservice: StatutCollabService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getCollaborateurs();
    this.getFilterOptions();
    const token = localStorage.getItem('authToken');
    if (!token) {
      this.router.navigate(['/login']);
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applySiteFilter(siteId: number) {
    this.selectedSite = +siteId;
    this.filterData();
  }

  applyGradeFilter(gradeId: number) {
    this.selectedGrade = +gradeId;
    this.filterData();
  }

  applyRoleFilter(roleId: number) {
    this.selectedRole = +roleId;
    this.filterData();
  }

  applyStatutFilter(statutId: number) {
    this.selectedStatut = +statutId;
    this.filterData();
  }

  filterData() {
    this.dataSource.data = this.collaborateurs.filter(c => 
      (this.selectedSite === 0 || c.site.id === this.selectedSite) &&
      (this.selectedGrade === 0 || c.grade.id === this.selectedGrade) &&
      (this.selectedRole === 0 || c.roleCollab.id === this.selectedRole) &&
      (this.selectedStatut === 0 || c.statutCollab.id === this.selectedStatut)
    );
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getCollaborateurs(): void {
    this.collaborateurService.getAll().subscribe(
      (data: Collaborateur[]) => {
        this.collaborateurs = data;
        this.filterData(); // Apply initial filters
      },
      (error) => {
        console.log('There was an issue while fetching data', error);
      }
    );
  }

  getFilterOptions(): void {
    this.siteservice.getAll().subscribe(sites => this.sites = sites);
    this.gradeservice.getAll().subscribe(grades => this.grades = grades);
    this.roleservice.getAll().subscribe(roles => this.roles = roles);
    this.statutservice.getAll().subscribe(statuts => this.statuts = statuts);
  }

  openPopup(): void {
    this.dialog.open(AddingCollabComponent, {
      width: '90vw',
      height: '90vh',
      maxWidth: '90vw',
      maxHeight: '90vh'
    });
  }

  onIconClick(id: number): void {
    const dialogRef = this.dialog.open(ShowingCollabDetailsComponent, {
      width: '65vw',
      height: '90vh',
      maxWidth: '90vw',
      maxHeight: '90vh',
      data: { id: id }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getCollaborateurs(); // Refresh the data after closing the dialog
    });
  }

  onEditClick(id: number): void {
    const dialogRef = this.dialog.open(ModifyingCollabComponent, {
      width: '75vw',
      height: '90vh',
      maxWidth: '90vw',
      maxHeight: '90vh',
      data: { id: id }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getCollaborateurs(); // Refresh the data after closing the dialog
    });
  }

  onDeleteClick(id: number) {
    this.collaborateurService.delete(id).subscribe(
      () => {
        console.log(`Collaborateur with id ${id} deleted successfully`);
        this.getCollaborateurs(); // Refresh the data after deletion
      },
      (error) => {
        console.error(`Failed to delete collaborateur with id ${id}: `, error);
      }
    );
  }
}
