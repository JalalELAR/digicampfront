import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyingProjectsComponent } from './modifying-projects.component';

describe('ModifyingProjectsComponent', () => {
  let component: ModifyingProjectsComponent;
  let fixture: ComponentFixture<ModifyingProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyingProjectsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyingProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
