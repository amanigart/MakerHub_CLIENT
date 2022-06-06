import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuListComponent } from './menu-list/menu-list.component';
import { ButtonModule } from 'primeng/button';
// import { DropdownModule } from 'primeng/dropdown';



@NgModule({
  declarations: [
    MenuListComponent
  ],
  imports: [
    CommonModule,
    // PrimeNg
    ButtonModule,
    // DropdownModule,
  ],
  exports: [
    MenuListComponent,
    ButtonModule,
    // DropdownModule
  ]
})
export class SharedModule { }
