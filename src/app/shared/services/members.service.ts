import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.dev';
import { MemberForList } from '../../modules/members/models/member-for-list.model';
import { Member } from '../../modules/members/models/member.model';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  private readonly API_URL: string = environment.baseUrl + "membres/";

  constructor(private http: HttpClient) { }

  getMembersList(): Observable<MemberForList[]> {
    return this.http.get<MemberForList[]>(this.API_URL+'liste');
  }

  getMemberDetails(id: number): Observable<Member> {
    return this.http.get<Member>(this.API_URL + id);
  }
}
