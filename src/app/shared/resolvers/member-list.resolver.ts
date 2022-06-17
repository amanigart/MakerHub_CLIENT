import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { MemberForList } from 'src/app/shared/models/member-for-list.model';
import { MembersService } from '../services/members.service';

@Injectable({
  providedIn: 'root'
})
export class MemberListResolver implements Resolve<MemberForList[]> {

  constructor(private service: MembersService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MemberForList[]> {
    return this.service.getMembersList();
  }
}
