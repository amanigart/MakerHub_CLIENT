import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainingDetailsComponent } from './components/training-details/training-details.component';
import { TrainingListComponent } from './components/training-list/training-list.component';

const routes: Routes = [
  { path: '', component: TrainingListComponent, children: [
    { path: ':id', component: TrainingDetailsComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingRoutingModule { }
