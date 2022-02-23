import { TestBed } from '@angular/core/testing';

import { BeneficiaryServiceService } from './beneficiary-service.service';

describe('BeneficiaryServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BeneficiaryServiceService = TestBed.get(BeneficiaryServiceService);
    expect(service).toBeTruthy();
  });
});
