import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './core/components/authentication/authentication.component';
import { NotFoundErrorComponent } from './core/components/not-found-error/not-found-error.component';
import { AppLayoutComponent } from './core/layouts/app-layout/app-layout.component';
import { WebsiteLayoutComponent } from './core/layouts/website-layout/website-layout.component';

const routes: Routes = [
  // Website routes
  { path: '', component: WebsiteLayoutComponent, children:[
    //{ path: '', redirectTo: '', pathMatch: 'full' },
    { path: '', loadChildren: () => import('./modules/website/website.module').then(m => m.WebsiteModule)},
    { path: 'auth', component: AuthenticationComponent }
  ]},
  // App routes
  { path: '', component: AppLayoutComponent, children: [
    { path: '', redirectTo: '/membres', pathMatch: 'full' },
    { path: 'app/admin', loadChildren: () => import('./modules/admin/admin.module').then(m=> m.AdminModule) },
    { path: 'app/membres', loadChildren: () => import('./modules/members/members.module').then(m => m.MembersModule) },
    { path: 'app/entrainements', loadChildren: () => import('./modules/training/training.module').then(m => m.TrainingModule) }
  ]},
  { path: '**', component: NotFoundErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
