// collaborateur.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CollaborateurComponent } from './collaborateur.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { CollaborateurService } from '../services/collaborateur.service';

describe('CollaborateurComponent', () => {
  let component: CollaborateurComponent;
  let fixture: ComponentFixture<CollaborateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        NavbarComponent,
        CollaborateurComponent
      ],
      providers: [CollaborateurService],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollaborateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
