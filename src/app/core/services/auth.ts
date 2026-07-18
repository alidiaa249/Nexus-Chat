import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly _http = inject(HttpClient);
  signup(data: any): Observable<any> {
    return this._http.post(environment.baseurl + '/auth/signup', data, );
  }
  signin(data: any): Observable<any> {
    return this._http.post(environment.baseurl + '/auth/login', data, );
  }
  refreshToken(): Observable<any> {
    return this._http.post(
      environment.baseurl + '/auth/refresh-token',
      {},
      { withCredentials: true },
    );
  }
  logout(): Observable<any> {
    return this._http.post(environment.baseurl + '/auth/logout', {}, { withCredentials: true });
  }
}
