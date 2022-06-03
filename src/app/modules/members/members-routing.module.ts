import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberDetailsComponent } from './components/member-details/member-details.component';
import { MembersListComponent } from './components/members-list/members-list.component';
import { MembersUpdateComponent } from './components/members-update/members-update.component';

const routes: Routes = [
  // { path: '', component: MembersListComponent, outlet: 'menu', children : [
  //   { path: 'details/:id', component: MemberDetailsComponent, outlet: 'content' }
  // ] }

  { path: '', component: MembersListComponent, children: [
    { path: ':id', component: MembersListComponent },
    { path: ':id/update', component: MembersUpdateComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembersRoutingModule { }
