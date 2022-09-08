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
import { HELPERS } from '../../shared/constants/helpers';
import { FirebaseAuthService } from '../../shared/services/firebase/auth.firebase.service';
import { ToastService } from '../../shared/services/toast.service';

@Injectable({
  providedIn: 'root',
})
export class SubscriberGuard implements CanActivate {
  constructor(
    private _auth: FirebaseAuthService,
    private _toast: ToastService,
    private _router: Router
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
        const currentRoute = route.url[0].path;
        if (user) {
          const isAuthenticated = !!user;
          if (isAuthenticated && !user.disabled) {
            return true;
          }
          if (user.disabled) {
            this._toast.showErrorToast(
              HELPERS.errors.ACCOUNT_DISABLED_BY_ADMIN
            );
            return false;
          }
        }
        this._toast.showErrorToast(
          HELPERS.errors.ACCOUNT_NEEDED_VIEW_TEXT + currentRoute + '.'
        );
        return this._router.createUrlTree([APP_ROUTES.absolute.main.login]);
      })
    );
  }
}
