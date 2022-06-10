import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MemberBelt } from '../../models/member-belt.model';
import { Member } from '../../models/member.model';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.scss']
})
export class MemberDetailsComponent implements OnInit {

  member!: Member;
  jujutsuTopBelt: string = 'orange-belt';
  taijutsuTopBelt: string = 'yellow-belt';

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getRouteData('currentMember');
  }

  getRouteData(resolverName: string): void {
    this.route.params.subscribe((id : Params) => {
      this.member = this.route.snapshot.data[resolverName];
    });
  }

  deleteMember() {
    throw new Error('Method not implemented.');
  }
}
