import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.dev';
import { BasicMember } from '../models/basic-member.model';
import { MemberDetails } from '../models/member-details.model';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  private readonly API_URL: string = environment.baseUrl + "membres/";

  constructor(private http: HttpClient) { }

  getMembersList(): Observable<BasicMember[]> {
    return this.http.get<BasicMember[]>(this.API_URL+'liste');
  }

  getMemberDetails(id: number): Observable<MemberDetails> {
    return this.http.get<MemberDetails>(this.API_URL + id);
  }
}
