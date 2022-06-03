import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MemberDetails } from '../../models/member-details.model';
import { MembersService } from '../../services/members.service';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.scss']
})
export class MemberDetailsComponent implements OnInit {

  member!: MemberDetails;
  subscriptions!: Subscription

  @Input() currentMemberId! : number

  constructor(
    private service: MembersService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const CurrentMemberId: number = this.route.snapshot.params['id'];

    this.subscriptions = this.service.getMemberDetails(this.currentMemberId).subscribe({
      next: (data) => {
        this.member = data;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
