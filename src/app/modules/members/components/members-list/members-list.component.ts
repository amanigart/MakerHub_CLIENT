import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { BasicMember } from '../../models/basic-member.model';
import { MembersService } from '../../services/members.service';

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.scss']
})
export class MembersListComponent implements OnInit, OnDestroy {

  members!: BasicMember[];
  serviceSubscriptions!: Subscription;
  // selectedId! : number;

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
