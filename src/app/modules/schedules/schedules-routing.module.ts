import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PricePlanResolver } from 'src/app/shared/resolvers/price-plans.resolver';
import { ScheduleDetailsComponent } from './components/schedule-details/schedule-details.component';
import { ScheduleUpdateComponent } from './components/schedule-update/schedule-update.component';
import { SchedulesListComponent } from './components/schedules-list/schedules-list.component';
import { SchedulesPanelComponent } from './components/schedules-panel/schedules-panel.component';
import { ScheduleResolver } from './resolvers/schedule.resolver';
import { SchedulesResolver } from './resolvers/schedules.resolver';

const routes: Routes = [
  { path: '',  resolve: {allSchedules: SchedulesResolver, allPrices: PricePlanResolver}, component: SchedulesPanelComponent }
  // { path: '', component: SchedulesListComponent, children: [
  // // { path: '', resolve: {currentSchedules: SchedulesResolver}, component: SchedulesListComponent, children: [
  //   { path: 'details/:id', resolve: {currentSchedule: ScheduleResolver}, component: ScheduleDetailsComponent },
  //   // { path: 'details/:id', component: ScheduleDetailsComponent },
  //   { path: 'update/:id', component: ScheduleUpdateComponent }
  // ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchedulesRoutingModule { }
