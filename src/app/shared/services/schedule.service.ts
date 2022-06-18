import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment.dev';
import { Schedule } from '../../modules/schedules/models/schedule.model';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private http: HttpClient) { }

  private readonly API_URL: string = environment.baseUrl + 'horaires/';
  private _scheduleUpdated$: Subject<boolean> = new Subject<boolean>();

  get scheduleCreated$(): Observable<boolean> {
    return this._scheduleUpdated$.asObservable();
  }

  getAllSchedules(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(this.API_URL + 'liste');
  }

  getScheduleById(id: number): Observable<Schedule> {
    return this.http.get<Schedule>(this.API_URL + id);
  }

  updateSchedule(schedule: Schedule): void {
    this.http.post<Schedule>(this.API_URL, schedule).subscribe({
      next: () => {
        this._scheduleUpdated$.next(true);
      },
      error: (error) => {
        console.log(error);
        this._scheduleUpdated$.next(false);
      }
    });
  }
}
