import { Component, OnInit } from '@angular/core';
// import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-member-create',
  templateUrl: './member-create.component.html',
  styleUrls: ['./member-create.component.scss']
})
export class MemberCreateComponent implements OnInit {

  tabIndex: number = 0;
  estMineur: boolean = true;
  autoriseImage!: string;
  stateOptions!: any[];

  constructor() { }

  ngOnInit(): void {
    this.stateOptions = [{label: 'Oui', value: true}, {label: 'Non', value: false}];
  }

  openNext(): void {
    this.tabIndex = this.tabIndex +1;
  }

  openPrevious(): void {
    this.tabIndex = this.tabIndex -1;
  }

}
