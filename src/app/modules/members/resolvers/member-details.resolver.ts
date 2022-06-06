import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { MemberDetails } from '../models/member-details.model';
import { MembersService } from '../services/members.service';

@Injectable({
  providedIn: 'root'
})
export class MemberDetailsResolver implements Resolve<MemberDetails> {

  constructor(private service: MembersService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MemberDetails> {
    const idMembre = route.params['id'];
    return this.service.getMemberDetails(idMembre);
  }
}
