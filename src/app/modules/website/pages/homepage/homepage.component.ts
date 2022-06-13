import { Component, OnInit } from '@angular/core';
import { Schedule } from 'src/app/modules/schedules/models/schedule.model';
import { ScheduleService } from 'src/app/modules/schedules/services/schedule.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  schedules: Schedule[] = [];

  constructor(private scheduleService: ScheduleService) { }

  ngOnInit(): void {

  }

}
