import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, Observable, take } from 'rxjs';
import { AuthService } from './auth.service';

/**
 * A class to intercept and modify the http calls
 */
@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private _authService: AuthService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this._authService.userSubject.pipe(
      // We only need to subscribe for one event
      take(1),
      exhaustMap((user) => {
        // If the user does not exists, continue with the request
        if (!user) {
          return next.handle(req);
        }
        // If the user exists (signed in user), Modify the request to include the auth token
        // The auth token is required to access the database
        const modifiedRequest = req.clone({
          params: new HttpParams().set('auth', user.token),
        });
        // Continue on with the modified request.
        return next.handle(modifiedRequest);
      })
    );
  }
}
