import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { APP_ROUTES } from '../../shared/constants/app-routes';
import { FirebaseAuthService } from '../../shared/services/firebase/auth.firebase.service';

@Injectable({
  providedIn: 'root',
})
/**
 * Stop a signed-in user from accessing login or signup page.
 */
export class BackTrackGuard implements CanActivate {
  constructor(
    private _auth: FirebaseAuthService,
    private _router: Router,
    private _location: Location
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this._auth.user.pipe(
      take(1),
      map((user) => {
        // If user in signed-in
        if (user) {
          // Navigate based on roles
          if (user.roles.subscriber)
            return this._router.createUrlTree([APP_ROUTES.absolute.main.home]);

          if (user.roles.admin)
            return this._router.createUrlTree([
              APP_ROUTES.absolute.admin.products,
            ]);
        }
        // If user is not signed-in, continue navigation
        return true;
      })
    );
  }
}
