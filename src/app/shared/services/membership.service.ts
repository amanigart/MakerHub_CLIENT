import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Cotisation } from 'src/app/shared/models/cotisation.model';
import { environment } from 'src/environments/environment.dev';
import { CotisationForCreation } from '../models/cotisation-for-creation.model';

@Injectable({
  providedIn: 'root'
})
export class MembershipService {

  constructor(private http: HttpClient) { }

  private API_URL: string = environment.baseUrl + 'cotisations/';
  private _membershipCreated$: Subject<boolean> = new Subject<boolean>();
  private _membershipStatusChange$: Subject<boolean> = new Subject<boolean>();
  private _paymentStatusChange$: Subject<boolean> = new Subject<boolean>();

  get membershipCreated$(): Observable<boolean> {
    return this._membershipCreated$.asObservable();
  }
  get membershipStatusChange$(): Observable<boolean> {
    return this._membershipStatusChange$.asObservable();
  }
  get paymentStatusChange$(): Observable<boolean> {
    return this._paymentStatusChange$.asObservable();
  }

  getAllMemberships(): Observable<Cotisation[]> {
    return this.http.get<Cotisation[]>(this.API_URL + 'liste');
  }

  createMembershipForMember(membership: CotisationForCreation): void {
    this.http.post(this.API_URL, membership).subscribe({
      next: () => {
        this._membershipCreated$.next(true);
      },
      error: (error) => {
        console.log(error);
        this._membershipCreated$.next(false);
      }
    })
  }

  updateArchiveStatus(id: number): void{
    this.http.post(this.API_URL + `archivage/${id}`, null).subscribe({
      next: () => {
        this._membershipStatusChange$.next(true);
      },
      error: (error) => {
        console.log(error);
        this._membershipStatusChange$.next(false);
      }
    })
  }

  updatePaymentStatus(id: number): void{
    this.http.post(this.API_URL + `paiement/${id}`, null).subscribe({
      next: () => {
        this._paymentStatusChange$.next(true);
      },
      error: (error) => {
        console.log(error);
        this._paymentStatusChange$.next(false);
      }
    })
  }
}
