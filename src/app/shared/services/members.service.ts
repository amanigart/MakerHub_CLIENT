import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MemberForCreation } from 'src/app/modules/members/models/member-for-creation.model';
import { environment } from 'src/environments/environment.dev';
import { Member } from '../../modules/members/models/member.model';
import { MemberForList } from '../models/member-for-list.model';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  constructor(private http: HttpClient) { }

  private readonly API_URL: string = environment.baseUrl + "membres/";
  private _memberCreated$: Subject<boolean> = new Subject<boolean>();
  private _memberDisabled$: Subject<boolean> = new Subject<boolean>();
  private _memberActivated$: Subject<boolean> = new Subject<boolean>();

  get memberCreated$(): Observable<boolean> {
    return this._memberCreated$.asObservable();
  }
  get memberDisabled$(): Observable<boolean> {
    return this._memberDisabled$.asObservable();
  }
  get memberActivated$(): Observable<boolean> {
    return this._memberActivated$.asObservable();
  }

  getMembersList(): Observable<MemberForList[]> {
    return this.http.get<MemberForList[]>(this.API_URL+'liste');
  }

  getMemberDetails(id: number): Observable<Member> {
    return this.http.get<Member>(this.API_URL + id);
  }

  // Enregistre un nouveau membre
  createMember(newMember: MemberForCreation): void {
    this.http.post<MemberForCreation>(this.API_URL + 'inscription', newMember).subscribe({
      next: () => {
        this._memberCreated$.next(true);
      },
      error: (error) => {
        console.log(error);
        this._memberCreated$.next(false);
      }
    })
  }

  // Désactive un membre selon son status actuel
  disableMember(id: number): void {
    this.http.delete(this.API_URL + id).subscribe({
      next: () => {
        this._memberDisabled$.next(true);
      },
      error: (error) => {
        console.log(error);
        this._memberDisabled$.next(false)
      }
    })
  }

  // Ré-active un membre (estActif = true)
  activateMember(id: number): void {
    this.http.post(this.API_URL + id, null).subscribe({
      next: () => {
        this._memberActivated$.next(true);
      },
      error: (error) => {
        console.log(error);
        this._memberActivated$.next(false);
      }
    })
  }

}
