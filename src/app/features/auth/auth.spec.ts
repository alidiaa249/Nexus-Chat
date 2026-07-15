import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { Auth } from '../../core/services/auth';

describe('Auth', () => {
  let service: Auth;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(Auth);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});