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
      this.jujutsuTopBelt = this.getTopBeltColor(this.member.ceintures, 'jiu-jitsu');
      this.taijutsuTopBelt = this.getTopBeltColor(this.member.ceintures, 'taï-jitsu');
    });
  }

  deleteMember() {
    throw new Error('Method not implemented.');
  }

  getTopBeltColor(belts: MemberBelt[], discipline: string): string {
    let maxBelt = this.member.ceintures.filter(x => x.discipline === discipline)
                                       .map(x => ({id: x.id, couleur: x.couleur}))
                                       .sort((a, b) => a.id - b.id)
                                       .slice(-1)[0];

    switch (maxBelt.couleur) {
      case 'blanche':
        return 'white-belt';
      case 'jaune':
        return 'yellow-belt';
      case 'orange':
        return 'orange-belt';
      case 'verte':
        return 'green-belt';
      case 'bleue':
        return 'blue-belt';
      case 'marron':
        return 'brown-belt';
      default:
        return 'black-belt';
    }
  }

}
