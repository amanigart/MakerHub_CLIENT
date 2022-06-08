import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Belt } from '../models/belt.model';
import { ServiceBeltService } from '../services/service-belt.service';

@Injectable({
  providedIn: 'root'
})
export class BeltResolver implements Resolve<Belt> {

  constructor(private service: ServiceBeltService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Belt> {
    const beltId = route.params['id'];
    return this.service.getBeltById(beltId);
  }
}
