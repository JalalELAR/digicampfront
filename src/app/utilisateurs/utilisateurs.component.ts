import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsersService } from '../services/users.service';
import { Utilisateur } from '../models/utilisateur';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddUserComponent } from '../adding-user/adding-user.component';
import { NavbarComponent } from '../navbar/navbar.component'; // Assurez-vous que le chemin est correct
import { FooterComponent } from '../footer/footer.component'; // Assurez-vous que le chemin est correct
import { ModifyingUserComponent } from '../modifiying-user/modifying-user.component';

declare let bootstrap: any;

@Component({
  selector: 'app-utilisateurs',
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
    NavbarComponent, // Ajoutez NavbarComponent ici
    FooterComponent  // Ajoutez FooterComponent ici
  ],
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.css']
})
export class UtilisateursComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'fullName', 'email', 'role', 'actions'];
  dataSource: MatTableDataSource<Utilisateur> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  utilisateurs!: Utilisateur[];
  selectedUser: Utilisateur | null = null;

  constructor(
    private router: Router, 
    private userService: UsersService, 
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getUsers();
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
  onEditClick(id: number): void {
    const dialogRef = this.dialog.open(ModifyingUserComponent, {
      width: 'vw',
      height: 'vh',
      maxWidth: '95vw',
      maxHeight: '95vh',
      data: { id: id }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getUsers(); // Refresh the data after closing the dialog
    });
  }

  getUsers(): void {
    this.userService.getAll().subscribe(
      (data: Utilisateur[]) => {
        this.utilisateurs = data;
        this.dataSource.data = data;
      },
      (error) => {
        console.log('There was an issue while fetching data', error);
      }
    );
  }

  openPopup(): void {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '70vw',
      height: '80vh',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getUsers(); // Refresh the user list after closing the dialog
    });
  }

  openModal(utilisateur: Utilisateur): void {
    this.selectedUser = utilisateur;
    const myModal = new bootstrap.Modal(document.getElementById('detailsModal'), {
      keyboard: false
    });
    myModal.show();
  }

 

  onDeleteClick(id: number) {
    console.log("The button is clicked");

    this.userService.delete(id).subscribe(
      () => {
        // Update the dataSource to remove the deleted user
        this.dataSource.data = this.dataSource.data.filter(user => user.id !== id);
        this.snackBar.open(`Utilisateur with id ${id} deleted successfully`, 'Close', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });
      },
      (error) => {
        console.error(`Failed to delete utilisateur with id ${id}: `, error);
        this.snackBar.open('Failed to delete utilisateur', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
      }
    );
  }
}
