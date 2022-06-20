import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberCreateComponent } from './components/member-create/member-create.component';
import { MemberDetailsComponent } from './components/member-details/member-details.component';
import { MembersListComponent } from './components/members-list/members-list.component';
import { MembersUpdateComponent } from './components/members-update/members-update.component';
import { MemberDetailsResolver } from '../../shared/resolvers/member-details.resolver';
import { BeltsResolver } from '../../shared/resolvers/belts.resolver';
import { MemberListResolver } from 'src/app/shared/resolvers/member-list.resolver';
import { PricePlanResolver } from 'src/app/shared/resolvers/price-plans.resolver';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
  { path: '', canActivate: [AuthGuard], resolve: {allMembers: MemberListResolver }, component: MembersListComponent, children: [
    { path: 'details/:id', canActivate: [AuthGuard], resolve: {currentMember: MemberDetailsResolver, allBelts: BeltsResolver, allPrices: PricePlanResolver }, component: MemberDetailsComponent },
    { path: 'update/:id', canActivate: [AuthGuard], resolve: {currentMember: MemberDetailsResolver }, component: MembersUpdateComponent },
    { path: 'inscription', canActivate: [AuthGuard], component: MemberCreateComponent }
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembersRoutingModule { }
