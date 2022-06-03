import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';

import { MembersRoutingModule } from './members-routing.module';
import { MembersListComponent } from './components/members-list/members-list.component';
import { MemberDetailsComponent } from './components/member-details/member-details.component';
import { MembersUpdateComponent } from './components/members-update/members-update.component';


@NgModule({
  declarations: [
    MembersListComponent,
    MemberDetailsComponent,
    MembersUpdateComponent
  ],
  imports: [
    CommonModule,
    MembersRoutingModule,
    SharedModule
  ]
})
export class MembersModule { }
