import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpTechnoComponent } from './PopUp3Component';

describe('PopUp3Component', () => {
  let component: PopUpTechnoComponent;
  let fixture: ComponentFixture<PopUpTechnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopUpTechnoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopUpTechnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
