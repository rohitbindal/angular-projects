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
export class AdminGuard implements CanActivate {
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
        if (user) {
          const isAdmin = !!user.roles.admin;
          if (isAdmin) {
            return route.url[0].path == APP_ROUTES.relative.admin.admin
              ? true
              : this._router.createUrlTree([APP_ROUTES.absolute.admin.admin]);
          }
        }
        this._toast.showErrorToast(HELPERS.errors.UNAUTHORIZED);
        return this._router.createUrlTree([APP_ROUTES.absolute.main.home]);
      })
    );
  }
}
