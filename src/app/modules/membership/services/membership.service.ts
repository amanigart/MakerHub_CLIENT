import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class MembershipService {

  private API_URL: string = environment.baseUrl + 'cotisations/'
  constructor() { }
}
