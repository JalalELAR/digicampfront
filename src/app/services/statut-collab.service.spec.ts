import { TestBed } from '@angular/core/testing';

import { StatutCollabService } from './statut-collab.service';

describe('ProjetsService', () => {
  let service: StatutCollabService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatutCollabService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
