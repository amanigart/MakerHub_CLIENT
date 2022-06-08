import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { JiuJitsuComponent } from './pages/jiu-jitsu/jiu-jitsu.component';
import { TaiJitsuComponent } from './pages/tai-jitsu/tai-jitsu.component';
import { ClubComponent } from './pages/club/club.component';
import { CoursesComponent } from './pages/courses/courses.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'jiu-jitsu', component: JiuJitsuComponent },
  { path: 'tai-jitsu', component: TaiJitsuComponent },
  { path: 'club', component: ClubComponent},
  { path: 'cours', component: CoursesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsiteRoutingModule { }
