import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyingCollabComponent } from './modifying-collab.component';

describe('ModifyingCollabComponent', () => {
  let component: ModifyingCollabComponent;
  let fixture: ComponentFixture<ModifyingCollabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyingCollabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyingCollabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
