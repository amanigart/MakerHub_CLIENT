import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberCreateComponent } from './components/member-create/member-create.component';
import { MemberDetailsComponent } from './components/member-details/member-details.component';
import { MembersListComponent } from './components/members-list/members-list.component';
import { MembersUpdateComponent } from './components/members-update/members-update.component';
import { MemberDetailsResolver } from '../../shared/resolvers/member-details.resolver';

const routes: Routes = [
  { path: '', component: MembersListComponent, children: [
    { path: 'details/:id', resolve: {currentMember: MemberDetailsResolver }, component: MemberDetailsComponent },
    { path: 'update/:id', resolve: {currentMember: MemberDetailsResolver }, component: MembersUpdateComponent },
    { path: 'inscription', component: MemberCreateComponent }
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembersRoutingModule { }
