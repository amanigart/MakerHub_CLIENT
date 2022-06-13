import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { PricePlan } from '../models/price-plan.model';
import { PricePlanService } from '../services/price-plan.service';

@Injectable({
  providedIn: 'root'
})
export class PricePlanResolver implements Resolve<PricePlan[]> {

  constructor(private service: PricePlanService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PricePlan[]> {
    return this.service.getAllPricePlans();
  }
}
