import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavService {

  public changeNavLinksColor: Subject<any> = new Subject<any>();

  constructor() { }
}
