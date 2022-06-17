import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { toUsDate } from 'src/app/shared/functions/convert-date-format';
import { Belt } from 'src/app/shared/models/belt.model';
import { Discipline } from 'src/app/shared/models/discipline.model';
import { BeltService } from 'src/app/shared/services/belt.service';
import { DisciplineService } from 'src/app/shared/services/discipline.service';
import { MemberBelt } from '../../models/member-belt.model';
import { Member } from '../../models/member.model';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.scss']
})
export class MemberDetailsComponent implements OnInit, OnDestroy {

  constructor(
    private route: ActivatedRoute,
    private builder: FormBuilder,
    private beltService: BeltService,
    private disciplineService: DisciplineService
  ) { }

  member!: Member;
  belts!: Belt[];
  jujutsuTopBelt: string = 'orange-belt';
  taijutsuTopBelt: string = 'yellow-belt';
  disciplines!: Discipline[];
  newBelt!: any;
  beltForm!: FormGroup;
  membershipForm!: FormGroup;
  displayBeltModal: boolean = false;
  displayMembershipModal: boolean = false;
  jjBelts!: Belt[];
  tjBelts!: Belt[];
  beltColors!: Belt[];
  subscriptions!: Subscription;
  beltCreatedSubscription$!: Subscription;
  membershipCreatedSubscription$!: Subscription;

  ngOnInit(): void {
    this.getRouteData('currentMember');

    // this.belts = this.route.snapshot.data['allBelts'];
    // this.beltColors = this.belts.filter(x => x.discipline.nom === 'jiu-jitsu')
    // this.jjBelts = this.belts.filter((x: any) => x.discipline.nom === 'jiu-jitsu');
    // this.tjBelts = this.belts.filter((x: any) => x.discipline.nom === 'taï-jitsu');

    this.subscriptions = this.beltService.getAllBelts().subscribe({
      next: (data) => {
        this.belts = data;
        this.jjBelts = data.filter(x => x.discipline.nom === 'jiu-jitsu');
        this.tjBelts = data.filter(x => x.discipline.nom === 'taï-jitsu');
      }
    });
    this.subscriptions = this.disciplineService.getAllDisciplines().subscribe({
      next: (data) => {
        this.disciplines = data;
      }
    })
    this.blankBeltForm();
    this.blankMembershipForm();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getRouteData(resolverName: string): void {
    this.route.params.subscribe((id : Params) => {
      this.member = this.route.snapshot.data[resolverName];
      this.jujutsuTopBelt = this.getTopBeltColor(this.member.ceintures, 'jiu-jitsu');
      this.taijutsuTopBelt = this.getTopBeltColor(this.member.ceintures, 'taï-jitsu');
    });
  }

  blankBeltForm(): void {
    this.beltForm = this.builder.group({
      discipline: ['', Validators.required],
      ceinture: ['', Validators.required],
      dateObtention: [null, Validators.required]
    })
  }

  blankMembershipForm(): void {
    this.membershipForm = this.builder.group({
      dateDebut: [null, Validators.required]
    })
  }

  deleteMember() {
    throw new Error('Method not implemented.');
  }

  displayAddBelt(): void {
    this.displayBeltModal = true;
  }

  displayAddMembership(): void {
    this.displayMembershipModal = true;
  }

  addBelt(): void {
    this.newBelt = this.beltForm.value;

    let ceinture = this.beltColors.filter((x: Belt) => (x.couleur === this.beltForm.value['ceinture'].couleur) && (x.discipline.idDiscipline === this.beltForm.value['discipline'].idDiscipline))

    console.log(ceinture[0].couleur);
    let test = {
      idMembre: this.member.idMembre,
      idCeinture: ceinture[0].idCeinture,
      dateObtention: new Date(toUsDate(this.beltForm.value['dateObtention']))
    }
    //console.log(this.newBelt);
    // console.log(this.jjBelts);
    console.log(test);
  }

  addMembership():void {

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
