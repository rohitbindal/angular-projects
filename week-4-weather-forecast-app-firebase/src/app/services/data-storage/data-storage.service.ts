import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, map, Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

interface DatabaseResponse {
  cities: string[];
}

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  private readonly DB_URL: string;

  constructor(private _http: HttpClient, private _auth: AuthService) {
    this.DB_URL =
      'https://weather-app-angular-14-default-rtdb.asia-southeast1.firebasedatabase.app/savedCities/';
  }

  writeDataToDatabase(city: string) {
    const DB_URL =
      this.DB_URL + `${this._auth.USER_SUBJECT.getValue()!.uid}.json`;
    return this._http
      .get<DatabaseResponse>(DB_URL)
      .pipe(
        exhaustMap((response) => {
          if (response) {
            return this._http.put(DB_URL, {
              cities: [...response['cities'], city],
            });
          }
          return this._http.patch(DB_URL, { cities: [city] });
        })
      )
      .subscribe();
  }

  fetchData(): Observable<string[]> {
    const DB_URL =
      this.DB_URL + `${this._auth.USER_SUBJECT.getValue()!.uid}.json`;
    return this._http.get<DatabaseResponse>(DB_URL).pipe(
      map((response) => {
        if (response) return response['cities'];
        return [];
      })
    );
  }

  deleteData(index: number) {
    const DB_URL =
      this.DB_URL + `${this._auth.USER_SUBJECT.getValue()!.uid}.json`;
    this.fetchData()
      .pipe(
        exhaustMap((response: string[]) => {
          response.splice(index, 1);
          return this._http.put(DB_URL, {
            cities: [...response],
          });
        })
      )
      .subscribe();
  }
}
