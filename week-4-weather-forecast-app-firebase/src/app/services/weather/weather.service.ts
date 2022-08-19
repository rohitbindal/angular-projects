import {Injectable} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {HttpClient} from "@angular/common/http";
import {DataTransformationService} from "../data-transformation.service";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  /**
   * Firebase API Key
   */
  readonly API_KEY = environment.FIREBASE_API_KEY;

  constructor(
    private _authService: AuthService,
    private _http: HttpClient,
    private _dataTransformation: DataTransformationService
  ) {
  }

}
