import { TestBed } from '@angular/core/testing';

import { VerbalProcessService } from './verbal-process.service';

describe('VerbalProcessService', () => {
  let service: VerbalProcessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerbalProcessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
