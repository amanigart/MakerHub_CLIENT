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
  serviceSubscription!: Subscription;
  memberCreatedSubscription!: Subscription;

  ngOnInit(): void {
    this.members = this.route.snapshot.data['allMembers'];
    this.activeMembers = this.members.filter((x) => x.estActif === true);

    // Recharge la liste des membres quand un nouveau membre est créé
    this.memberCreatedSubscription = this.service.memberCreated$.subscribe({
      next: (data: boolean) => {
        if (data) {
          this.serviceSubscription = this.service.getMembersList().subscribe({
            next: (data: MemberForList[]) => {
              this.members = data;
              console.log(data);
            }
          });
        }
      }
    });
  }

  ngOnDestroy(): void {
    if (this.serviceSubscription) this.serviceSubscription.unsubscribe();
    //if (this.memberCreatedSubscription) this.memberCreatedSubscription.unsubscribe();
  }

  filterList(): void {
    this.showAllMembers = !this.showAllMembers;
  }

}
