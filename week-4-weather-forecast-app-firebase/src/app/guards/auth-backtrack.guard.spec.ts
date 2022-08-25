import { TestBed } from '@angular/core/testing';

import { AuthBacktrackGuard } from './auth-backtrack.guard';

describe('AuthBacktrackGuard', () => {
  let guard: AuthBacktrackGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthBacktrackGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
