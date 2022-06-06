import { Component, OnInit } from '@angular/core';
import { SidebarToggle } from '../../models/sidebar-toggle.model';
import { NavService } from '../../services/nav.service';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss']
})
export class AppLayoutComponent {

  isSidebarCollapsed: boolean = false;
  screenWidth: number = 0;

  onToggleSidebar(data: SidebarToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSidebarCollapsed = data.isCollapsed;
  }

}
