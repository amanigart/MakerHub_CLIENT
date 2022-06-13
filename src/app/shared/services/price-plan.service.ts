import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.dev';
import { PricePlan } from '../models/price-plan.model';

@Injectable({
  providedIn: 'root'
})
export class PricePlanService {

  private readonly API_URL: string = environment.baseUrl + 'tarifs/'

  constructor(private http: HttpClient) { }

  getAllPricePlans(): Observable<PricePlan[]> {
    return this.http.get<PricePlan[]>(this.API_URL + 'liste');
  }

}
