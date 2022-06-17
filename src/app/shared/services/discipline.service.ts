import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.dev';
import { Discipline } from '../models/discipline.model';

@Injectable({
  providedIn: 'root'
})
export class DisciplineService {

  constructor(private http: HttpClient) { }

  private readonly API_URL: string = environment.baseUrl + 'disciplines/';

  getAllDisciplines(): Observable<Discipline[]> {
    return this.http.get<Discipline[]>(this.API_URL + 'liste');
  }
}
