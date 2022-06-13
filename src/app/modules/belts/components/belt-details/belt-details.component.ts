import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Belt } from '../../../../shared/models/belt.model';
import { BeltService } from '../../../../shared/services/belt.service';

@Component({
  selector: 'app-belt-details',
  templateUrl: './belt-details.component.html',
  styleUrls: ['./belt-details.component.scss']
})
export class BeltDetailsComponent implements OnInit {

  belt!: Belt;
  subscriptions!: Subscription;

  constructor(
    private service: BeltService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getRouteData('currentBelt');
  }

  getRouteData(resolverName: string): void {
    this.route.params.subscribe((id : Params) => {
      this.belt = this.route.snapshot.data[resolverName];
    });
  }

}
