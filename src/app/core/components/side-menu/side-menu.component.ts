import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core';
import { SidebarItem } from '../../models/sidebar-item.model';
import { SidebarToggle } from '../../models/sidebar-toggle.model';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  // animations: [
  //   trigger('fadeInOut', [
  //     transition(':enter', [
  //       style({opacity: 0}),
  //       animate('350ms',
  //         style({opacity: 1})
  //       )
  //     ]),
  //     transition(':leave', [
  //       style({opacity: 1}),
  //       animate('350ms',
  //         style({opacity: 0})
  //       )
  //     ])
  //   ]),
  //   trigger('rotate', [
  //     transition(':enter', [
  //       animate('1000ms',
  //         keyframes([
  //           style({transform: 'rotate(0deg)', offset: '0'}),
  //           style({transform: 'rotate(2turn)', offset: '1'})
  //         ])
  //       )
  //     ])
  //   ])
  // ]
})
export class SideMenuComponent implements OnInit {

  @Output() onToggleSidebar: EventEmitter<SidebarToggle> = new EventEmitter();
  isCollapsed: boolean = false;
  screenWidth: number = 0;
  sideNavItems!: SidebarItem[];

  // @HostListener('window:resize', ['$event'])
  // onResize(event: any) {
  //   this.screenWidth = window.innerWidth;
  //   if(this.screenWidth <= 768 ) {
  //     this.isCollapsed = false;
  //     this.onToggleSidebar.emit({isCollapsed: this.isCollapsed, screenWidth: this.screenWidth});
  //   }
  // }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.sideNavItems = [
      { name: 'Admin', route: 'app/admin', icon: 'bx bx-cog' },
      { name: 'Membres', route: 'app/membres', icon: 'bx bx-user' },
      { name: 'Entraînements', route: 'app/entrainements', icon: 'bx bx-calendar-edit' },
      { name: '', route: '', icon: '' }
    ];
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
    this.onToggleSidebar.emit({ screenWidth: this.screenWidth, isCollapsed: this.isCollapsed });
  }

  closeSidebar(): void {
    this.isCollapsed = false;
    this.onToggleSidebar.emit({ screenWidth: this.screenWidth, isCollapsed: this.isCollapsed });
  }

}
