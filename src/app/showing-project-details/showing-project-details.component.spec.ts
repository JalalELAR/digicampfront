import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowingProjectDetailsComponent } from './showing-project-details.component';

describe('ShowingProjectDetailsComponent', () => {
  let component: ShowingProjectDetailsComponent;
  let fixture: ComponentFixture<ShowingProjectDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowingProjectDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowingProjectDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
