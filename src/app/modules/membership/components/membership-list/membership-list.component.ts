import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cotisation } from 'src/app/shared/models/cotisation.model';

@Component({
  selector: 'app-membership-list',
  templateUrl: './membership-list.component.html',
  styleUrls: ['./membership-list.component.scss']
})
export class MembershipListComponent implements OnInit {

  memberships!: Cotisation[];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.memberships = this.route.snapshot.data['allMemberships']
  }

}
