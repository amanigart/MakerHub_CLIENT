import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, Observable, Subject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.dev';
import { LoginInfos } from '../models/login-infos';
import { TokenInfos } from '../models/token-infos';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  private readonly API_URL: string = environment.baseUrl + 'auth';
  private _errorMessage$: Subject<string> = new Subject<string>();
  private _isAuthenticated$: Subject<boolean> = new Subject<boolean>();

  get errorMessage$(): Observable<string> {
    return this._errorMessage$.asObservable();
  }
  get isAuthenticated$(): Observable<boolean> {
    return this._isAuthenticated$.asObservable();
  }

  login(form: LoginInfos): void {
    this.http.post(this.API_URL, form, { responseType: 'text' }).subscribe({
      next: (data) => {
        const claims = this.getTokenClaims(data);
        localStorage.setItem('id', claims.sid.toString());
        localStorage.setItem('role', claims.role);
        localStorage.setItem('token', data);
        this._isAuthenticated$.next(true);
        this.router.navigate(['app/admin']);
      },
      error: (error) => {
        this._errorMessage$.next(error.error)
      }
    });
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
    this._isAuthenticated$.next(false);
  }
}
