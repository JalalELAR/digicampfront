import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateGradeComponent } from './updategrade.component';

describe('UpdategradeComponent', () => {
  let component: UpdateGradeComponent;
  let fixture: ComponentFixture<UpdateGradeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateGradeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateGradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
