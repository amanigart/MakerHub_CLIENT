import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment.dev';
import { LoginInfos } from '../models/login-infos';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API_URL: string = environment.baseUrl;

  constructor(private _http: HttpClient) { }

  login(model: LoginInfos): void {
    this._http.post<string>(this.API_URL + 'auth', model).subscribe({
      next: (data: string) => {
        this.decodeToken(data);
      }
    })
  }

  decodeToken(token: string) {
    const jwt = new JwtHelperService();
    const decodedToken = jwt.decodeToken(token);

    console.log(decodedToken);
  }
}
