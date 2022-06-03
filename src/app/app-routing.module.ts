import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './core/components/authentication/authentication.component';

const routes: Routes = [
  { path: 'login', component: AuthenticationComponent },
  { path: 'membres', loadChildren: () => import('./modules/members/members.module').then(m => m.MembersModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
