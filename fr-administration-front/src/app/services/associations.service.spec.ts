import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { AssociationsService } from './associations.service';

describe('AssociationsService', () => {
  let service: AssociationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports : [HttpClientModule]});
    service = TestBed.inject(AssociationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
