import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddingCollabComponent } from './adding-collab.component';

describe('AddingCollabComponent', () => {
  let component: AddingCollabComponent;
  let fixture: ComponentFixture<AddingCollabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddingCollabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddingCollabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
