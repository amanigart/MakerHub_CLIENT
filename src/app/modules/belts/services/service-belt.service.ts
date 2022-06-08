import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.dev';
import { Belt } from '../models/belt.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceBeltService {

  private readonly API_URL: string = environment.baseUrl + 'ceintures/'

  constructor(private http: HttpClient) { }

  getAllBelts(): Observable<Belt[]> {
    return this.http.get<Belt[]>(this.API_URL + 'liste');
  }

  getBeltById(idCeinture: number): Observable<Belt> {
    return this.http.get<Belt>(this.API_URL + idCeinture);
  }
}
