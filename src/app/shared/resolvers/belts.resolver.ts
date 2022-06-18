import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Belt } from 'src/app/shared/models/belt.model';
import { BeltService } from 'src/app/shared/services/belt.service';

@Injectable({
  providedIn: 'root'
})
export class BeltsResolver implements Resolve<Belt[]> {

  constructor(private service: BeltService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Belt[]> {
    return this.service.getAllBelts();
  }
}
