import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { VerbalProcessService } from './verbal-process.service';

describe('VerbalProcessService', () => {
  let service: VerbalProcessService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports : [HttpClientModule, RouterTestingModule]});
    service = TestBed.inject(VerbalProcessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
