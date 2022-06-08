import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Schedule } from '../../models/schedule.model';
import { ScheduleService } from '../../services/schedule.service';

@Component({
  selector: 'app-schedules-list',
  templateUrl: './schedules-list.component.html',
  styleUrls: ['./schedules-list.component.scss']
})
export class SchedulesListComponent implements OnInit {

  schedules!: Schedule[];

  constructor(
    private service: ScheduleService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.service.getAllSchedules().subscribe({
      next: (data) => {
        this.schedules = data;
      },
      error: (error) => console.log(error)
    })

    //this.schedules = this.route.snapshot.data['currentSchedules'];
  }

}
