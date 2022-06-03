import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';

import { MembersRoutingModule } from './members-routing.module';
import { MembersListComponent } from './components/members-list/members-list.component';
import { MemberDetailsComponent } from './components/member-details/member-details.component';


@NgModule({
  declarations: [
    MembersListComponent,
    MemberDetailsComponent
  ],
  imports: [
    CommonModule,
    MembersRoutingModule,
    SharedModule
  ]
})
export class MembersModule { }
