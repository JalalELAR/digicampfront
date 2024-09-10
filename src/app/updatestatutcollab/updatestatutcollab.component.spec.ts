import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStatutCollabComponent} from './updatestatutcollab.component';

describe('UpdateStatutCollabComponent', () => {
  let component: UpdateStatutCollabComponent;
  let fixture: ComponentFixture<UpdateStatutCollabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateStatutCollabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateStatutCollabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
