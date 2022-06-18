import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment.dev';
import { BeltForCreation } from '../models/belt-for-creation.model';
import { Belt } from '../models/belt.model';

@Injectable({
  providedIn: 'root'
})
export class BeltService {

  constructor(private http: HttpClient) { }

  private readonly API_URL: string = environment.baseUrl + 'ceintures/';
  private _beltCreatedForMember$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get beltCreatedForMember$(): Observable<boolean> {
    return this._beltCreatedForMember$.asObservable();
  }

  getAllBelts(): Observable<Belt[]> {
    return this.http.get<Belt[]>(this.API_URL + 'liste');
  }

  getBeltById(idCeinture: number): Observable<Belt> {
    return this.http.get<Belt>(this.API_URL + idCeinture);
  }

  createBeltForMember(belt: BeltForCreation): void {
    this.http.post(this.API_URL + 'ceinture-membre', belt, {responseType: 'text'}).subscribe({
      next: () => this._beltCreatedForMember$.next(true),
      error: (error) => {
        console.log(error);
        this._beltCreatedForMember$.next(false);
      }
    })
  }
}
