import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpGradeComponent } from './pop-up1.component';

describe('PopUp1Component', () => {
  let component: PopUpGradeComponent;
  let fixture: ComponentFixture<PopUpGradeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopUpGradeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopUpGradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
