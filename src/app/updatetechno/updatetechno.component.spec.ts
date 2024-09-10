import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTechnoComponent } from './updatetechno.component';

describe('UpdatetechnoComponent', () => {
  let component: UpdateTechnoComponent;
  let fixture: ComponentFixture<UpdateTechnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateTechnoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateTechnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
