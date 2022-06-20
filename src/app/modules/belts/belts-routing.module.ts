import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { BeltDetailsComponent } from './components/belt-details/belt-details.component';
import { BeltUpdateComponent } from './components/belt-update/belt-update.component';
import { BeltsListComponent } from './components/belts-list/belts-list.component';
import { BeltResolver } from './resolvers/belt.resolver';

const routes: Routes = [
  { path: '', canActivate: [AuthGuard], component: BeltsListComponent, children: [
    { path: 'details/:id', canActivate: [AuthGuard], resolve: {currentBelt: BeltResolver }, component: BeltDetailsComponent },
    { path: 'update/:id', canActivate: [AuthGuard], component: BeltUpdateComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BeltsRoutingModule { }
