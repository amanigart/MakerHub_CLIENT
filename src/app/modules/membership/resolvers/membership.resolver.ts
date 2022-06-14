import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Cotisation } from 'src/app/shared/models/cotisation.model';
import { MembershipService } from '../services/membership.service';

@Injectable({
  providedIn: 'root'
})
export class MembershipResolver implements Resolve<Cotisation[]> {

  constructor(private service: MembershipService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Cotisation[]> {
    return this.service.getAllMemberships();
  }
}
