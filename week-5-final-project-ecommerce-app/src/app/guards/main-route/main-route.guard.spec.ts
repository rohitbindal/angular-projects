import { TestBed } from '@angular/core/testing';

import { MainRouteGuard } from './main-route.guard';

describe('MainRouteGuard', () => {
  let guard: MainRouteGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MainRouteGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
