import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-shared-menu',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent<T> implements OnInit {

  @Input() datas!: T[];

  constructor() { }

  ngOnInit(): void {
  }

}
