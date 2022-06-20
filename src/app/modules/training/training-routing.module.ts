import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { TrainingDetailsComponent } from './components/training-details/training-details.component';
import { TrainingListComponent } from './components/training-list/training-list.component';

const routes: Routes = [
  { path: '', canActivate: [AuthGuard], component: TrainingListComponent, children: [
    { path: ':id', canActivate: [AuthGuard], component: TrainingDetailsComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingRoutingModule { }
