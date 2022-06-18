import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchedulesRoutingModule } from './schedules-routing.module';
import { SchedulesListComponent } from './components/schedules-list/schedules-list.component';
import { ScheduleDetailsComponent } from './components/schedule-details/schedule-details.component';
import { ScheduleUpdateComponent } from './components/schedule-update/schedule-update.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SchedulesPanelComponent } from './components/schedules-panel/schedules-panel.component';


@NgModule({
  declarations: [
    SchedulesListComponent,
    ScheduleDetailsComponent,
    ScheduleUpdateComponent,
    SchedulesPanelComponent
  ],
  imports: [
    CommonModule,
    SchedulesRoutingModule,
    SharedModule
  ]
})
export class SchedulesModule { }
