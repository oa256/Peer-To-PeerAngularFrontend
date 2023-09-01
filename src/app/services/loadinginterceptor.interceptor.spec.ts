import { TestBed } from '@angular/core/testing';

import { LoadinginterceptorInterceptor } from './loadinginterceptor.interceptor';

describe('LoadinginterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      LoadinginterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: LoadinginterceptorInterceptor = TestBed.inject(LoadinginterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
