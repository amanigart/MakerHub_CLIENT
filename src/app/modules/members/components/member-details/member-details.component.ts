import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MemberDetails } from '../../models/member-details.model';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.scss']
})
export class MemberDetailsComponent implements OnInit {

  member!: MemberDetails;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getRouteData('currentMember');

    let dob = this.member.dateNaissance
    console.log(dob);
    console.log(new Date(dob));
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
