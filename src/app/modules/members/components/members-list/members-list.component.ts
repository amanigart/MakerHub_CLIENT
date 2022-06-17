import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MemberForList } from '../../../../shared/models/member-for-list.model';
import { MembersService } from '../../../../shared/services/members.service';

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.scss']
})
export class MembersListComponent implements OnInit, OnDestroy {

  constructor(
    private service: MembersService,
    private route: ActivatedRoute
  ) { }

  members!: MemberForList[];
  activeMembers!: MemberForList[];
  showAllMembers: boolean = false;
  serviceSubscriptions!: Subscription;

  ngOnInit(): void {
    // this.serviceSubscriptions = this.service.getMembersList().subscribe({
    //   next: (data) => {
    //     this.members = data;
    //   },
    //   error: (error) => console.log(error)
    // })
    this.members = this.route.snapshot.data['allMembers'];
    this.activeMembers = this.members.filter((x) => x.estActif === true);
  }

  ngOnDestroy(): void {
    // this.serviceSubscriptions.unsubscribe();
  }

  filterList(): void {
    this.showAllMembers = !this.showAllMembers;
  }


}
