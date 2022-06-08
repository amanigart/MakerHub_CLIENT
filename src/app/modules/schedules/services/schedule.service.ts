import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.dev';
import { Schedule } from '../models/schedule.model';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private readonly API_URL: string = environment.baseUrl + 'horaires/';

  constructor(private http: HttpClient) { }

  getAllSchedules(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(this.API_URL + 'liste');
  }

  getScheduleById(id: number): Observable<Schedule> {
    return this.http.get<Schedule>(this.API_URL + id);
  }
}
