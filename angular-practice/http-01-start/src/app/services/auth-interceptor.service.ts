import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Observable } from "rxjs";

export class AuthInterceptorService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Modifying a request.
    const modifiedRequest = req.clone({
      headers: req.headers.append("Auth", "abc"),
    });

    // Response
    return next.handle(modifiedRequest);
  }
}
