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
import { ToastService } from '../../shared/services/toast.service';

@Injectable({
  providedIn: 'root',
})
export class MainRouteGuard implements CanActivate {
  constructor(
    private _auth: FirebaseAuthService,
    private _router: Router,
    private _toast: ToastService
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
        // If the user exists
        if (user) {
          // If the user is an admin, navigate to admin route
          if (user.roles.admin) {
            return this._router.createUrlTree([
              APP_ROUTES.absolute.admin.products,
            ]);
          }
          if (user.roles.subscriber) return true;
        }
        return true;
      })
    );
  }
}
