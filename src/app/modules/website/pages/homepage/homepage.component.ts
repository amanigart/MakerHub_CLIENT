import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Schedule } from 'src/app/modules/schedules/models/schedule.model';
import { PricePlan } from 'src/app/shared/models/price-plan.model';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  schedules!: Schedule[];
  prices!: PricePlan[];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.schedules = this.route.snapshot.data['allSchedules'];
    this.prices = this.route.snapshot.data['allPrices'];
  }

}
