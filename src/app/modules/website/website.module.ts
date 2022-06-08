import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebsiteRoutingModule } from './website-routing.module';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { JiuJitsuComponent } from './pages/jiu-jitsu/jiu-jitsu.component';
import { TaiJitsuComponent } from './pages/tai-jitsu/tai-jitsu.component';
import { ClubComponent } from './pages/club/club.component';


@NgModule({
  declarations: [
    HomepageComponent,
    CoursesComponent,
    JiuJitsuComponent,
    TaiJitsuComponent,
    ClubComponent
  ],
  imports: [
    CommonModule,
    WebsiteRoutingModule
  ]
})
export class WebsiteModule { }
