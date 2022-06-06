import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleDetailsComponent } from './components/schedule-details/schedule-details.component';
import { ScheduleUpdateComponent } from './components/schedule-update/schedule-update.component';
import { SchedulesListComponent } from './components/schedules-list/schedules-list.component';

const routes: Routes = [
  { path: '', component: SchedulesListComponent, children: [
    { path: 'details/:id', component: ScheduleDetailsComponent },
    { path: 'update/:id', component: ScheduleUpdateComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchedulesRoutingModule { }
