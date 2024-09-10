import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select'; // Add this import
import { MatOptionModule } from '@angular/material/core';  // Add this import
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PopUpGradeComponent } from '../pop-up1/pop-up1.component';
import { PopUpSiteComponent } from '../pop-up2/pop-up2.component';
import { PopUpTechnoComponent } from '../pop-up3/PopUp3Component';
import { UpdateGradeComponent} from '../updategrade/updategrade.component';
import { UpdateSiteComponent} from '../updatesite/updatesite.component';
import { UpdateTechnoComponent} from '../updatetechno/updatetechno.component';
import { UpdateRoleComponent} from '../updaterole/updaterole.component';
import { UpdateStatusComponent} from '../updatestatus/updatestatus.component';
import { UpdateStatutCollabComponent} from '../updatestatutcollab/updatestatutcollab.component';
import { GradeService } from '../services/grade.service';
import { SiteService } from '../services/site.service';
import { RoleService } from '../services/role.service';
import { StatusService } from '../services/status.service';
import { StatutCollabService } from '../services/statut-collab.service';
import { TechnosService } from '../services/technos.service';
import { Grade } from '../models/grade';
import { Techno } from '../models/techno';
import { Role } from '../models/role';
import { Status } from '../models/status';
import { StatutCollab } from '../models/statut_collab';
import { Site } from '../models/site';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { PopUpStatusComponent } from '../pop-up4/pop-up4.component';
import { PopUpRoleComponent } from '../pop-up5/pop-up5.component';
import { PopUpStatutCollabComponent } from '../pop-up6/pop-up6.component';

@Component({
  selector: 'app-parametres',
  standalone: true,
  imports: [
    MatSelectModule,
    MatOptionModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    NavbarComponent,
    FooterComponent,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './parametres.component.html',
  styleUrls: ['./parametres.component.css']
})
export class ParametresComponent implements OnInit, AfterViewInit {
  // Grades Table
  displayedColumns: string[] = ['id', 'nom', 'actions'];
  dataSource: MatTableDataSource<Grade> = new MatTableDataSource<Grade>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  grades: Grade[] = [];  // List of status for the filter
  selectedgrade: string | null = null;  // Selected status for filtering
  
  // Technos Table
  displayedColumns2: string[] = ['id', 'nom', 'actions'];
  dataSource2: MatTableDataSource<Techno> = new MatTableDataSource<Techno>();
  @ViewChild('paginator2') paginator2!: MatPaginator;
  @ViewChild('sort2') sort2!: MatSort;
  technos: Techno[] = [];  // List of status for the filter
  selectedtechno: string | null = null;  // Selected status for filtering
  
  // Sites Table
  displayedColumns3: string[] = ['id', 'nom', 'actions'];
  dataSource3: MatTableDataSource<Site> = new MatTableDataSource<Site>();
  @ViewChild('paginator3') paginator3!: MatPaginator;
  @ViewChild('sort3') sort3!: MatSort;
  sites: Site[] = [];  // List of status for the filter
  selectedSite: string | null = null;  // Selected status for filtering

    // Status Table
    displayedColumns4: string[] = ['id', 'nom', 'actions'];
    dataSource4: MatTableDataSource<Status> = new MatTableDataSource<Status>();
    @ViewChild('paginator4') paginator4!: MatPaginator;
    @ViewChild('sort4') sort4!: MatSort;
    status: Status[] = [];  // List of status for the filter
    selectedStatus: string | null = null;  // Selected status for filtering
    

      // Role Table
  displayedColumns5: string[] = ['id', 'nom', 'actions'];
  dataSource5: MatTableDataSource<Role> = new MatTableDataSource<Role>();
  @ViewChild('paginator5') paginator5!: MatPaginator;
  @ViewChild('sort5') sort5!: MatSort;
  roles: Role[] = [];  // List of status for the filter
  selectedrole: string | null = null;  // Selected status for filtering

    // StatutCollab Table
    displayedColumns6: string[] = ['id', 'nom', 'actions'];
    dataSource6: MatTableDataSource<StatutCollab> = new MatTableDataSource<StatutCollab>();
    @ViewChild('paginator6') paginator6!: MatPaginator;
    @ViewChild('sort6') sort6!: MatSort;
    statuts: StatutCollab[] = [];  // List of status for the filter
    selectedStatut: string | null = null;  // Selected status for filtering
  

  constructor(private router: Router, 
              private gradeservice: GradeService, 
              public dialog: MatDialog,
              private technoservice: TechnosService,
              private roleservice : RoleService,
              private statusservice : StatusService,
              private statutcollabservice : StatutCollabService,
              private siteservice: SiteService) { }

  ngOnInit(): void {
    this.getgrades();
    this.getTechnos();
    this.getSites();
    this.getRoles();
    this.getStatus();
    this.getStatutCollab();
    const token = localStorage.getItem('authToken');
    if (!token) {
      this.router.navigate(['/login']);
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource2.paginator = this.paginator2;
    this.dataSource2.sort = this.sort2;
    this.dataSource3.paginator = this.paginator3;
    this.dataSource3.sort = this.sort3;
    this.dataSource4.paginator = this.paginator4;
    this.dataSource4.sort = this.sort4;
    this.dataSource5.paginator = this.paginator5;
    this.dataSource5.sort = this.sort5;
    this.dataSource6.paginator = this.paginator6;
    this.dataSource6.sort = this.sort6;
  }

  applyFilter(event: Event, dataSource: MatTableDataSource<any>) {
    const filterValue = (event.target as HTMLInputElement).value;
    dataSource.filter = filterValue.trim().toLowerCase();
    if (dataSource.paginator) {
      dataSource.paginator.firstPage();
    }
  }

  getgrades(): void {
    this.gradeservice.getAll().subscribe(
      (data: Grade[]) => {
        this.dataSource.data = data;
        this.grades=data;
      },
      (error: any) => {
        console.log('There was an issue while fetching grades', error);
      }
    );
  }

  getTechnos(): void {
    this.technoservice.getAll().subscribe(
      (data: Techno[]) => {
        this.dataSource2.data = data;
        this.technos=data;
      },
      (error: any) => {
        console.log('There was an issue while fetching technos', error);
      }
    );
  }

  getSites(): void {
    this.siteservice.getAll().subscribe(
      (data: Site[]) => {
        this.dataSource3.data = data;
        this.sites=data;
      },
      (error: any) => {
        console.log('There was an issue while fetching sites', error);
      }
    );
  }

  getStatus(): void {
    this.statusservice.getAll().subscribe(
      (data: Status[]) => {
        this.dataSource4.data = data;
        this.status=data;
      },
      (error: any) => {
        console.log('There was an issue while fetching sites', error);
      }
    );
  }

  getRoles(): void {
    this.roleservice.getAll().subscribe(
      (data: Role[]) => {
        this.dataSource5.data = data;
        this.roles=data;
        console.log(' roles',this.roleservice.getAll());
      },
      (error: any) => {
        console.log('There was an issue while fetching sites', error);
      }
    );
  }

  getStatutCollab(): void {
    this.statutcollabservice.getAll().subscribe(
      (data: StatutCollab[]) => {
        this.dataSource6.data = data;
        this.statuts=data;
      },
      (error: any) => {
        console.log('There was an issue while fetching sites', error);
      }
    );
  }

  openPopup1(): void {
    const dialogRef= this.dialog.open(PopUpGradeComponent, {
      width: '50vw',
      height: '40vh',
    });
    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
      window.location.reload();  // Reload the page to reflect changes
    });
  }
  onEditGrade(id: number): void {
    const dialogRef = this.dialog.open(UpdateGradeComponent, {
        width: '50vw',
        height: '40vh',
        data: { id: id }
    });
    dialogRef.afterClosed().subscribe(() => {
        this.getgrades();
    });
}
  onDeleteGrade(id: number) {
    this.gradeservice.delete(id).subscribe(
      () => {
        console.log(`Grade with id ${id} deleted successfully`);
        window.location.reload(); // Refresh the data after deletion
      },
      (error) => {
        console.error(`Failed to delete Grade with id ${id}: `, error);
      }
    );
  }
  filterGrades(): void {
    if (this.selectedgrade) {
      this.dataSource.data = this.grades.filter(grade => grade.gradeName === this.selectedgrade);
    } else {
      this.dataSource.data = this.grades;  // Reset filter if no grades is selected
    }
  }

  openPopup2(): void {
    const dialogRef= this.dialog.open(PopUpSiteComponent, {
      width: '50vw',
      height: '40vh',
    });
    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
      window.location.reload();  // Reload the page to reflect changes
    });
  }
  onEditSite(id: number): void {
    const dialogRef = this.dialog.open(UpdateSiteComponent, {
      width: '50vw',
      height: '40vh',
      data: { id: id }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getSites();
    });
  }
  onDeleteSite(id: number) {
    this.siteservice.delete(id).subscribe(
      () => {
        console.log(`Site with id ${id} deleted successfully`);
        this.getSites(); // Refresh the data after deletion
      },
      (error) => {
        console.error(`Failed to delete Site with id ${id}: `, error);
      }
    );
  }
  filterSites(): void {
    if (this.selectedSite) {
      this.dataSource3.data = this.sites.filter(site => site.city === this.selectedSite);
    } else {
      this.dataSource3.data = this.sites;  // Reset filter if no grades is selected
    }
  }

  openPopup3(): void {
    const dialogRef= this.dialog.open(PopUpTechnoComponent, {
      width: '50vw',
      height: '40vh',
    });
    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
      window.location.reload();  // Reload the page to reflect changes
    });
  }
  onEditTechno(id: number): void {
    const dialogRef = this.dialog.open(UpdateTechnoComponent, {
      width: '50vw',
      height: '40vh',
      data: { id: id }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getTechnos();
    });
  }
  onDeleteTechno(id: number) {
    this.technoservice.delete(id).subscribe(
      () => {
        console.log(`Techno with id ${id} deleted successfully`);
        this.getTechnos(); // Refresh the data after deletion
      },
      (error) => {
        console.error(`Failed to delete Techno with id ${id}: `, error);
      }
    );
  }
  filterTechno(): void {
    if (this.selectedtechno) {
      this.dataSource2.data = this.technos.filter(techno => techno.name === this.selectedtechno);
    } else {
      this.dataSource2.data = this.technos;  // Reset filter if no grades is selected
    }
  }

    openPopup4(): void {
    const dialogRef= this.dialog.open(PopUpStatusComponent, {
      width: '50vw',
      height: '40vh',
    });
    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
      window.location.reload();  // Reload the page to reflect changes
    });
  }
  onEditStatus(id: number): void {
    const dialogRef = this.dialog.open(UpdateStatusComponent, {
      width: '50vw',
      height: '40vh',
      data: { id: id }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getStatus();
    });
  }
  onDeleteStatus(id: number) {
    this.statusservice.delete(id).subscribe(
      () => {
        console.log(`Status with id ${id} deleted successfully`);
        this.getStatus(); // Refresh the data after deletion
      },
      (error) => {
        console.error(`Failed to delete Status with id ${id}: `, error);
      }
    );
  }
  filterStatus(): void {
    if (this.selectedStatus) {
      this.dataSource4.data = this.status.filter(stats => stats.name === this.selectedStatus);
    } else {
      this.dataSource4.data = this.status;  // Reset filter if no grades is selected
    }
  }

  openPopup5(): void {
    const dialogRef= this.dialog.open(PopUpRoleComponent, {
      width: '50vw',
      height: '40vh',
    });
    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
      window.location.reload();  // Reload the page to reflect changes
    });
  }
  onEditRole(id: number): void {
    const dialogRef = this.dialog.open(UpdateRoleComponent, {
      width: '50vw',
      height: '40vh',
      data: { id: id }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getRoles();
    });
  }
  onDeleteRole(id: number) {
    this.roleservice.delete(id).subscribe(
      () => {
        console.log(`Role with id ${id} deleted successfully`);
        this.getRoles(); // Refresh the data after deletion
      },
      (error) => {
        console.error(`Failed to delete Role with id ${id}: `, error);
      }
    );
  }
  filterRole(): void {
    if (this.selectedrole) {
      this.dataSource5.data = this.roles.filter(role => role.role === this.selectedrole);
    } else {
      this.dataSource5.data = this.roles;  // Reset filter if no grades is selected
    }
  }

  openPopup6(): void {
    const dialogRef= this.dialog.open(PopUpStatutCollabComponent, {
      width: '50vw',
      height: '40vh',
    });
    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
      window.location.reload();  // Reload the page to reflect changes
    });
  }
  onEditStatutCollab(id: number): void {
    const dialogRef = this.dialog.open(UpdateStatutCollabComponent, {
      width: '50vw',
      height: '40vh',
      data: { id: id }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getStatutCollab();
    });
  }
  onDeleteStatutCollab(id: number) {
    this.statutcollabservice.delete(id).subscribe(
      () => {
        console.log(`Statutcollab with id ${id} deleted successfully`);
        this.getStatutCollab(); // Refresh the data after deletion
      },
      (error) => {
        console.error(`Failed to delete Statutcollab with id ${id}: `, error);
      }
    );
  }
  filterStatutCollab(): void {
    if (this.selectedStatut) {
      this.dataSource6.data = this.statuts.filter(statut => statut.statut === this.selectedStatut);
    } else {
      this.dataSource6.data = this.statuts;  // Reset filter if no grades is selected
    }
  }
  
}
