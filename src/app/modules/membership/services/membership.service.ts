import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cotisation } from 'src/app/shared/models/cotisation.model';
import { environment } from 'src/environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class MembershipService {

  private API_URL: string = environment.baseUrl + 'cotisations/';

  constructor(private http: HttpClient) { }

  getAllMemberships(): Observable<Cotisation[]> {
    return this.http.get<Cotisation[]>(this.API_URL + 'liste');
  }
}
