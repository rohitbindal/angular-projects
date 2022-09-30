import { TestBed } from '@angular/core/testing';

import { BackTrackGuard } from './back-track.guard';

describe('BackTrackGuard', () => {
  let guard: BackTrackGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(BackTrackGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
