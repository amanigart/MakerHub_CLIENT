import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './core/components/authentication/authentication.component';
import { NotFoundErrorComponent } from './core/components/not-found-error/not-found-error.component';
import { AuthGuard } from './core/guards/auth.guard';
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
    // { path: '', redirectTo: '', pathMatch: 'full' },
    { path: 'app/admin', canActivate: [AuthGuard], loadChildren: () => import('./modules/admin/admin.module').then(m=> m.AdminModule) },
    { path: 'app/membres', canActivate: [AuthGuard], loadChildren: () => import('./modules/members/members.module').then(m => m.MembersModule) },
    // { path: 'app/entrainements', canActivate: [AuthGuard], loadChildren: () => import('./modules/training/training.module').then(m => m.TrainingModule) },
    // { path: 'app/ceintures', canActivate: [AuthGuard], loadChildren: () => import('./modules/belts/belts.module').then(m => m.BeltsModule) },
    { path: 'app/horaires', canActivate: [AuthGuard], loadChildren: () => import('./modules/schedules/schedules.module').then(m => m.SchedulesModule) },
    { path: 'app/cotisations', canActivate: [AuthGuard], loadChildren: () => import('./modules/membership/membership.module').then(m => m.MembershipModule) }
  ]},
  { path: '**', component: NotFoundErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
