import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSiteComponent } from './updatesite.component';

describe('UpdatesiteComponent', () => {
  let component: UpdateSiteComponent;
  let fixture: ComponentFixture<UpdateSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateSiteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
