import { TestBed } from '@angular/core/testing';

import { FundTransferService } from './fund-transfer.service';

describe('FundTransferService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FundTransferService = TestBed.get(FundTransferService);
    expect(service).toBeTruthy();
  });
});
