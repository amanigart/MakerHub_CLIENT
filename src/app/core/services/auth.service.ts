import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment.dev';
import { LoginInfos } from '../models/login-infos';
import { TokenInfos } from '../models/token-infos';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API_URL: string = environment.baseUrl;

  constructor(private _http: HttpClient) { }

  login(form: LoginInfos): void {
    this._http.post(this.API_URL + 'auth', form, { responseType: 'text' }).subscribe({
      next: (data) => {
        const claims = this.getTokenClaims(data);
        localStorage.setItem('id', claims.sid.toString());
        localStorage.setItem('role', claims.role);
        localStorage.setItem('token', data);
      },
      error: (error) => {
        console.log(error.error)  // delete
      }
    })
  }

  getTokenClaims(token: string): TokenInfos {
    const jwt = new JwtHelperService();
    const decodedToken = jwt.decodeToken(token);
    const claims: TokenInfos = {
      sid: decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid'],
      role: decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
    }
    return claims;
  }

  logout(): void {
    localStorage.clear();
  }
}
