import { TestBed } from '@angular/core/testing';

import { KycServiceService } from './kyc-service.service';

describe('KycServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KycServiceService = TestBed.get(KycServiceService);
    expect(service).toBeTruthy();
  });
});
