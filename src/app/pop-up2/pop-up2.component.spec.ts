import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpSiteComponent } from './pop-up2.component';

describe('PopUp2Component', () => {
  let component: PopUpSiteComponent;
  let fixture: ComponentFixture<PopUpSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopUpSiteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopUpSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
