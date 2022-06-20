import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { MembershipListComponent } from './components/membership-list/membership-list.component';
import { MembershipResolver } from './resolvers/membership.resolver';

const routes: Routes = [
  { path: '', canActivate: [AuthGuard], resolve: {'allMemberships': MembershipResolver}, component: MembershipListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembershipRoutingModule { }
