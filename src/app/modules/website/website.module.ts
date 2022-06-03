import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebsiteRoutingModule } from './website-routing.module';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { CoursesComponent } from './pages/courses/courses.component';


@NgModule({
  declarations: [
    HomepageComponent,
    CoursesComponent
  ],
  imports: [
    CommonModule,
    WebsiteRoutingModule
  ]
})
export class WebsiteModule { }
