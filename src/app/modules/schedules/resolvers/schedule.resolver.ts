import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Schedule } from '../models/schedule.model';
import { ScheduleService } from '../../../shared/services/schedule.service';

@Injectable({
  providedIn: 'root'
})
export class ScheduleResolver implements Resolve<Schedule> {

  constructor(private service: ScheduleService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Schedule> {
    const id = route.params['id'];
    return this.service.getScheduleById(id);
  }
}
