import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BeltDetailsComponent } from './components/belt-details/belt-details.component';
import { BeltUpdateComponent } from './components/belt-update/belt-update.component';
import { BeltsListComponent } from './components/belts-list/belts-list.component';
import { BeltResolver } from './resolvers/belt.resolver';

const routes: Routes = [
  { path: '', component: BeltsListComponent, children: [
    { path: 'details/:id', resolve: {currentBelt: BeltResolver }, component: BeltDetailsComponent },
    { path: 'update/:id', component: BeltUpdateComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BeltsRoutingModule { }
