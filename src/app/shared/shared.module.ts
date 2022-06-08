import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuListComponent } from './menu-list/menu-list.component';
import { AgePipe } from './pipes/age.pipe';

// PrimeNg
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import {DividerModule} from 'primeng/divider';
import { ChipModule } from 'primeng/chip';



@NgModule({
  declarations: [
    MenuListComponent,
    AgePipe
  ],
  imports: [
    CommonModule,
    // PrimeNg
    ButtonModule,
    DropdownModule,
    InputTextModule,
    DividerModule,
    ChipModule
  ],
  exports: [
    MenuListComponent,
    ButtonModule,
    DropdownModule,
    InputTextModule,
    DividerModule,
    ChipModule,
    AgePipe
  ]
})
export class SharedModule { }
