import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './core/components/authentication/authentication.component';
import { AppLayoutComponent } from './core/layouts/app-layout/app-layout.component';
import { WebsiteLayoutComponent } from './core/layouts/website-layout/website-layout.component';

const routes: Routes = [
  // { path: 'login', component: AuthenticationComponent },

  // Website routes
  { path: '', component: WebsiteLayoutComponent, children:[
    //{ path: '', redirectTo: '', pathMatch: 'full' },
    { path: '', loadChildren: () => import('./modules/website/website.module').then(m => m.WebsiteModule)}
  ]},
  // App routes
  { path: '', component: AppLayoutComponent, children: [
    { path: '', redirectTo: '/membres', pathMatch: 'full' },
    { path: 'app/membres', loadChildren: () => import('./modules/members/members.module').then(m => m.MembersModule)}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
