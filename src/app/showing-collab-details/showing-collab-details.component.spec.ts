import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowingCollabDetailsComponent } from './showing-collab-details.component';

describe('ShowingCollabDetailsComponent', () => {
  let component: ShowingCollabDetailsComponent;
  let fixture: ComponentFixture<ShowingCollabDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowingCollabDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowingCollabDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
