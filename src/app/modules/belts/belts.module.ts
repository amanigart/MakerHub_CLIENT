import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BeltsRoutingModule } from './belts-routing.module';
import { BeltsListComponent } from './components/belts-list/belts-list.component';
import { BeltDetailsComponent } from './components/belt-details/belt-details.component';
import { BeltUpdateComponent } from './components/belt-update/belt-update.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    BeltsListComponent,
    BeltDetailsComponent,
    BeltUpdateComponent
  ],
  imports: [
    CommonModule,
    BeltsRoutingModule,
    SharedModule
  ]
})
export class BeltsModule { }
