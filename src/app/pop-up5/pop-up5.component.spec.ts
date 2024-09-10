import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpRoleComponent } from './pop-up5.component';

describe('PopUpRoleComponent', () => {
  let component: PopUpRoleComponent;
  let fixture: ComponentFixture<PopUpRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopUpRoleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopUpRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
