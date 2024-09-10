import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddingPopUpComponent } from './adding-pop-up.component';

describe('AddingPopUpComponent', () => {
  let component: AddingPopUpComponent;
  let fixture: ComponentFixture<AddingPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddingPopUpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddingPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
