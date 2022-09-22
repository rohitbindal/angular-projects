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
/**
 * Guard used to authorize access to checkout and wishlist page.
 */
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
        // Get the current route
        const currentRoute = route.url[0].path;
        // If the user is signed-in
        if (user) {
          const isAuthenticated = !!user;
          // If the user exists, is not disabled and is a subscriber, continue navigation
          if (isAuthenticated && !user.disabled && user.roles.subscriber) {
            return true;
          }
          // If user is disabled, do nothing and show an error toast
          if (user.disabled) {
            this._toast.showErrorToast(
              HELPERS.errors.ACCOUNT_DISABLED_BY_ADMIN
            );
            return false;
          }
        }
        // If user is not signed in, show error toast, navigate to login.
        this._toast.showErrorToast(
          HELPERS.errors.ACCOUNT_NEEDED_VIEW_TEXT + currentRoute + '.'
        );
        return this._router.createUrlTree([APP_ROUTES.absolute.main.login]);
      })
    );
  }
}
