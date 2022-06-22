import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { checkIfUnderage } from 'src/app/shared/functions/check-if-underage';
import { toUsDate } from 'src/app/shared/functions/convert-date-format';
import { BeltForCreation } from 'src/app/shared/models/belt-for-creation.model';
import { Belt } from 'src/app/shared/models/belt.model';
import { CotisationForCreation } from 'src/app/shared/models/cotisation-for-creation.model';
import { Discipline } from 'src/app/shared/models/discipline.model';
import { PricePlan } from 'src/app/shared/models/price-plan.model';
import { BeltService } from 'src/app/shared/services/belt.service';
import { MembersService } from 'src/app/shared/services/members.service';
import { MembershipService } from 'src/app/shared/services/membership.service';
import { MemberBelt } from '../../models/member-belt.model';
import { Member } from '../../models/member.model';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.scss'],
  providers: [MessageService]
})
export class MemberDetailsComponent implements OnInit, OnDestroy {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private builder: FormBuilder,
    private beltService: BeltService,
    private memberService: MembersService,
    private membershipService: MembershipService,
    private messageService: MessageService
  ) { }

  member!: Member;
  belts!: Belt[];
  jujutsuTopBelt: string = 'orange-belt';
  taijutsuTopBelt: string = 'yellow-belt';
  disciplines!: Discipline[];
  newBelt!: BeltForCreation;
  newMembership!: CotisationForCreation;
  beltForm!: FormGroup;
  membershipForm!: FormGroup;
  displayBeltModal: boolean = false;
  displayMembershipModal: boolean = false;
  jjBelts!: Belt[];
  tjBelts!: Belt[];
  beltColors!: Belt[];
  pricePlans!: PricePlan[];
  subscriptions!: Subscription;
  beltCreatedSubscription!: Subscription;
  membershipCreatedSubscription!: Subscription;
  memberDisabledSubscription!: Subscription;
  memberActivatedSubscription! :Subscription;
  items!: MenuItem[];

  ngOnInit(): void {
    this.getRouteData('currentMember');
    this.belts = this.route.snapshot.data['allBelts'];
    this.pricePlans = this.route.snapshot.data['allPrices'];

    // Recharge la page quand une ceinture est ajoutée + déclenche un toaster message
    this.beltCreatedSubscription = this.beltService.beltCreatedForMember$.subscribe({
      next: (data: boolean) => {
        if (data) {
          this.subscriptions = this.memberService.getMemberDetails(this.member.idMembre).subscribe({
            next: (data: Member) => {
              this.member = data;
              this.jujutsuTopBelt = this.getTopBeltColor(this.member.ceintures, 'jiu-jitsu');
              this.taijutsuTopBelt = this.getTopBeltColor(this.member.ceintures, 'taï-jitsu');
              this.showBeltCreated();
            }
          })
        }
      }
    });
    // Recharge la page quand une cotisation estajoutée + déclence un toaster message
    this.membershipCreatedSubscription = this.membershipService.membershipCreated$.subscribe({
      next: (data: boolean) => {
        if (data) {
          this.subscriptions = this.memberService.getMemberDetails(this.member.idMembre).subscribe({
            next: (data: Member) => {
              this.member = data;
              this.showMembershipCreated();
            }
          });
        }
      }
    });
    // Recharge la page quand le membre est activé ou désactivé
    this.memberDisabledSubscription = this.memberService.memberDisabled$.subscribe({
      next: (data: boolean) => {
        if (data) {
          this.subscriptions = this.memberService.getMemberDetails(this.member.idMembre).subscribe({
            next: (data: Member) => {
              this.member = data;
            }
          });
        }
      }
    });
    // Recharge la page quand le membre est ré-activé
    this.memberActivatedSubscription = this.memberService.memberActivated$.subscribe({
      next: (data: boolean) => {
        if (data) {
          this.subscriptions = this.memberService.getMemberDetails(this.member.idMembre).subscribe({
            next: (data: Member) => {
              this.member = data;
            }
          });
        }
      }
    });

    this.blankBeltForm();
    this.blankMembershipForm();
  }

  ngOnDestroy(): void {
    if (this.subscriptions) this.subscriptions.unsubscribe();
    if (this.beltCreatedSubscription) this.beltCreatedSubscription.unsubscribe();
    if (this.membershipCreatedSubscription) this.membershipCreatedSubscription.unsubscribe();
    if (this.memberDisabledSubscription) this.memberDisabledSubscription.unsubscribe();
  }

  getRouteData(resolverName: string): void {
    this.route.params.subscribe((id : Params) => {
      this.member = this.route.snapshot.data[resolverName];
      this.jujutsuTopBelt = this.getTopBeltColor(this.member.ceintures, 'jiu-jitsu');
      this.taijutsuTopBelt = this.getTopBeltColor(this.member.ceintures, 'taï-jitsu');
    });
  }

  splitBtnNav(): void {
    this.items = [
      { label: 'Ajouter une ceinture', command: () => {this.addBelt()} },
      { label: 'Ajouter une cotisation', command: () => {this.addMembership()} }
    ];
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
      dateDebut: [null, Validators.required],
      idTarif: [null, Validators.required],
      estPaye: [null, Validators.required]
    })
  }

  disableMember(): void {
    let sound: HTMLAudioElement = new Audio('../../../../../assets/sounds/mixkit-message-pop-alert-2354.mp3');
    sound.play();
    this.memberService.disableMember(this.member.idMembre);

  }

  activateMember(): void {
    let sound: HTMLAudioElement = new Audio('../../../../../assets/sounds/mixkit-message-pop-alert-2354.mp3');
    sound.play();
    this.memberService.activateMember(this.member.idMembre);
  }

  // Affiche le modal de création de ceinture
  displayAddBelt(): void {
    this.displayBeltModal = true;
  }

  // Affiche le modal de création de cotisation
  displayAddMembership(): void {
    this.displayMembershipModal = true;
  }

  // Enregistre une nouvelle ceinture pour le membre
  addBelt(): void {
    let belt = this.belts.filter(x => (x.discipline.nom === this.beltForm.value['discipline']) && (x.couleur === this.beltForm.value['ceinture']));

    this.newBelt = {
      idMembre: this.member.idMembre,
      idCeinture: belt[0].idCeinture,
      dateObtention: new Date(toUsDate(this.beltForm.value['dateObtention']))
    };
    this.beltService.createBeltForMember(this.newBelt);
    this.displayBeltModal = false;
    let sound: HTMLAudioElement = new Audio('../../../../../assets/sounds/mixkit-water-sci-fi-bleep-902.wav');
    sound.play();
  }

  addMembership(): void {
    const idTarif = this.membershipForm.value['idTarif'];
    const duration = this.pricePlans.filter(x => x.idTarif == idTarif)[0].duree;

    this.newMembership = {
      idMembre: this.member.idMembre,
      dateDebut: new Date(toUsDate(this.membershipForm.value['dateDebut'])),
      estPaye: JSON.parse(this.membershipForm.value['estPaye']),
      idTarif: idTarif,
      duree: duration
    };
    this.membershipService.createMembershipForMember(this.newMembership);
    this.displayMembershipModal = false;
  }

  // récupère la classe CSS de la ceinture la plus haute dans la discipline passée en paramètre
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

  // Toaster en cas de ceinture ajoutée correctement
  showBeltCreated(): void {
    this.messageService.add({key: 'newBeltSuccess', severity:'success', summary: 'Succès', detail: 'Ceinture correctement ajoutée à la base de données.'});
  }

  // Toaster en cas de cotisation ajoutée correctement
  showMembershipCreated(): void {
    this.messageService.add({key: 'newMembershipSuccess', severity:'success', summary: 'Succès', detail: 'Cotisation correctement ajoutée à la base de données.'});
  }

  // Naviguer vers la page de modification
  navToUpdateMember(): void {
    this.router.navigate(['/app/membres/update/', this.member.idMembre]);
  }

  // Emet un son à la fermeture du toaster
  // playSound(): void{
  //   let sound: HTMLAudioElement = new Audio('../../../../../assets/sounds/mixkit-water-sci-fi-bleep-902.wav');
  //   sound.play();
  // }

}
