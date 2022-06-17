import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MemberForCreation } from 'src/app/modules/members/models/member-for-creation.model';
import { environment } from 'src/environments/environment.dev';
import { MemberForList } from '../models/member-for-list.model';
import { Member } from '../../modules/members/models/member.model';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  constructor(private http: HttpClient) { }

  private readonly API_URL: string = environment.baseUrl + "membres/";
  private _memberCreated$: Subject<boolean> = new Subject<boolean>();
  private _memberDisabled$: Subject<boolean> = new Subject<boolean>();

  get memberCreated$(): Observable<boolean> {
    return this._memberCreated$.asObservable();
  }

  getMembersList(): Observable<MemberForList[]> {
    return this.http.get<MemberForList[]>(this.API_URL+'liste');
  }

  getMemberDetails(id: number): Observable<Member> {
    return this.http.get<Member>(this.API_URL + id);
  }

  createMember(newMember: MemberForCreation): void {
    this.http.post<MemberForCreation>(this.API_URL + 'inscription', newMember).subscribe({
      next: (data) => {
        this._memberCreated$.next(true);
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
