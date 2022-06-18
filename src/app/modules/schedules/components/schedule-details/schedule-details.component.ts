import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Schedule } from '../../models/schedule.model';
import { ScheduleService } from '../../../../shared/services/schedule.service';

@Component({
  selector: 'app-schedule-details',
  templateUrl: './schedule-details.component.html',
  styleUrls: ['./schedule-details.component.scss']
})
export class ScheduleDetailsComponent implements OnInit {

  schedule!: Schedule;

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getRouteData('currentSchedule');
  }

  getRouteData(resolverName: string) {
    this.route.params.subscribe((id : Params) => {
      this.schedule = this.route.snapshot.data[resolverName];
  });
  }

}
