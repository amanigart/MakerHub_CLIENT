import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment.dev';
import { PricePlan } from '../models/price-plan.model';

@Injectable({
  providedIn: 'root'
})
export class PricePlanService {

  constructor(private http: HttpClient) { }

  private readonly API_URL: string = environment.baseUrl + 'tarifs/'
  private _priceUpdated$: Subject<boolean> = new Subject<boolean>();

  get priceUpdated$(): Observable<boolean> {
    return this._priceUpdated$.asObservable();
  }

  getAllPricePlans(): Observable<PricePlan[]> {
    return this.http.get<PricePlan[]>(this.API_URL + 'liste');
  }

  updatePricePlan(price: PricePlan): void {
    this.http.post<PricePlan>(this.API_URL, price).subscribe({
      next: () => {
        this._priceUpdated$.next(true);
      },
      error: (error) => {
        this._priceUpdated$.next(false);
        console.log(error);
      }
    })
  }

}
