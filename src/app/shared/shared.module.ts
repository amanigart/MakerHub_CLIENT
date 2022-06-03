import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuListComponent } from './menu-list/menu-list.component';



@NgModule({
  declarations: [
    MenuListComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MenuListComponent
  ]
})
export class SharedModule { }
