import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberListResolver } from 'src/app/shared/resolvers/member-list.resolver';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';

const routes: Routes = [
  { path: '', resolve: { memberList: MemberListResolver },  component: AdminPanelComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
