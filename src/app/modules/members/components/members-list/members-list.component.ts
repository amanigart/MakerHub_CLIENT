import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MemberForList } from '../../models/member-for-list.model';
import { MembersService } from '../../../../shared/services/members.service';

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.scss']
})
export class MembersListComponent implements OnInit, OnDestroy {

  members!: MemberForList[];
  serviceSubscriptions!: Subscription;

  constructor(
    private service: MembersService,
  ) { }

  ngOnInit(): void {
    this.serviceSubscriptions = this.service.getMembersList().subscribe({
      next: (data) => {
        this.members = data;
      },
      error: (error) => console.log(error)
    })
  }

  ngOnDestroy(): void {
    this.serviceSubscriptions.unsubscribe();
  }


}
