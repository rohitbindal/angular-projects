import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { APP_ROUTES } from '../shared/constants/Routes';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private _authService: AuthService, private _router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // Returns either a boolean or UrlTree based on the authentication status.
    return this._authService.USER_SUBJECT.pipe(
      take(1),
      map((user) => {
        const isAuthenticated = !!user;
        if (isAuthenticated) return true;
        // If the user is not signed in, navigate to the Login Component.
        return this._router.createUrlTree([APP_ROUTES.absolute.LOGIN]);
      })
    );
  }
}
