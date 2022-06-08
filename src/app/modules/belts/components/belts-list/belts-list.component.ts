import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Belt } from '../../models/belt.model';
import { ServiceBeltService } from '../../services/service-belt.service';

@Component({
  selector: 'app-belts-list',
  templateUrl: './belts-list.component.html',
  styleUrls: ['./belts-list.component.scss']
})
export class BeltsListComponent implements OnInit, OnDestroy {

  belts!: Belt[];
  subscriptions!: Subscription;

  constructor(
    private service: ServiceBeltService
  ) { }

  ngOnInit(): void {
    this.subscriptions = this.service.getAllBelts().subscribe({
      next: (data) => {
        this.belts = data;
      },
      error: (error) => console.log(error)
    })
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
