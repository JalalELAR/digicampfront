import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpStatutCollabComponent } from './pop-up6.component';

describe('PopUpStatutCollabComponent', () => {
  let component: PopUpStatutCollabComponent;
  let fixture: ComponentFixture<PopUpStatutCollabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopUpStatutCollabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopUpStatutCollabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
