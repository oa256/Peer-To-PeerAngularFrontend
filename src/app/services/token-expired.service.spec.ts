import { TestBed } from '@angular/core/testing';

import { TokenExpiredService } from './token-expired.service';

describe('TokenExpiredService', () => {
  let service: TokenExpiredService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenExpiredService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
