import { TestBed } from '@angular/core/testing';

import { RfcGeneratorService } from './rfc-generator.service';

describe('RfcGeneratorService', () => {
  let service: RfcGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RfcGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
