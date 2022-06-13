import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Member } from '../../modules/members/models/member.model';
import { MembersService } from '../services/members.service';

@Injectable({
  providedIn: 'root'
})
export class MemberDetailsResolver implements Resolve<Member> {

  constructor(private service: MembersService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Member> {
    const idMembre = route.params['id'];
    return this.service.getMemberDetails(idMembre);
  }
}
