import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MembershipRoutingModule } from './membership-routing.module';
import { MembershipListComponent } from './components/membership-list/membership-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MembershipCreateComponent } from './components/membership-create/membership-create.component';


@NgModule({
  declarations: [
    MembershipListComponent,
    MembershipCreateComponent
  ],
  imports: [
    CommonModule,
    MembershipRoutingModule,
    SharedModule
  ]
})
export class MembershipModule { }
