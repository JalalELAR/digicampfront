import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProjetsService } from '../services/projets.service';
import { Projet } from '../models/projet';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select'; // Add this import
import { MatOptionModule } from '@angular/material/core';  // Add this import
import { AddingPopUpComponent } from '../adding-pop-up/adding-pop-up.component';
import { ShowingProjectDetailsComponent } from '../showing-project-details/showing-project-details.component';
import { ModifyingProjectsComponent } from '../modifiyng-projects/modifying-projects.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,  // Ensure MatSelectModule is imported
    MatOptionModule,  // Ensure MatOptionModule is imported
    NavbarComponent,
    FooterComponent
  ],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit, AfterViewInit {
 
  displayedColumns: string[] = ['id', 'nom', 'debut', 'statut', 'nbrColab', 'actions'];
  dataSource = new MatTableDataSource<Projet>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  projets!: Projet[];
  statuses: { name: string }[] = [];  // List of status for the filter
  selectedStatus: string | null = null;  // Selected status for filtering

  constructor(private router: Router, private projetService: ProjetsService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getProjets();
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
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Method to fetch all projects
  getProjets(): void {
    this.projetService.getAll().subscribe(
      (data: Projet[]) => {
        this.projets = data;
        this.dataSource.data = this.projets;

        // Extract unique status values from projects
        this.statuses = [...new Set(this.projets.map(projet => projet.status))];
      },
      (error) => {
        console.log('There was an issue while fetching data', error);
      }
    );
  }

  // Method to filter by selected status
  filterByStatus(): void {
    if (this.selectedStatus) {
      this.dataSource.data = this.projets.filter(projet => projet.status.name === this.selectedStatus);
    } else {
      this.dataSource.data = this.projets;  // Reset filter if no status is selected
    }
  }

  onDeleteClick(id: number) {
    this.projetService.delete(id).subscribe(
      () => {
        console.log(`Project with id ${id} deleted successfully`);
        this.getProjets();
      },
      (error) => {
        console.error(`Failed to delete project with id ${id}: `, error);
      }
    );
  }

  openPopup(): void {
    const dialogRef = this.dialog.open(AddingPopUpComponent, {
      width: '90vw',
      height: '90vh',
      maxWidth: '90vw',
      maxHeight: '90vh'
    });
    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
      window.location.reload();  // Reload the page to reflect changes
    });
  }

  onIconClick(id: number): void {
    const dialogRef = this.dialog.open(ModifyingProjectsComponent, {
      width: '60vw',
      height: 'auto',
      maxWidth: '90vw',
      maxHeight: '90vh',
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
      this.getProjets();


      // window.location.reload();  // Reload the page to reflect changes
    });
  }

  onClick(id: number): void {
    const dialogRef = this.dialog.open(ShowingProjectDetailsComponent, {
      width: '60vw',
      height: 'auto',
      maxWidth: '80vw',
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getProjets();

      //window.location.reload();
    });
  }
}
