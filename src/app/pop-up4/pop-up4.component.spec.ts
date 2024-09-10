import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpStatusComponent } from './pop-up4.component';

describe('PopUp4Component', () => {
  let component: PopUpStatusComponent;
  let fixture: ComponentFixture<PopUpStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopUpStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopUpStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
