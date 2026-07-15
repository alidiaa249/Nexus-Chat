import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { Auth } from './auth';

describe('Auth (Core)', () => {
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