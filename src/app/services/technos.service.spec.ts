import { TestBed } from '@angular/core/testing';

import { TechnosService } from './technos.service';

describe('TechnosService', () => {
  let service: TechnosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TechnosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
