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
  selectedMember!: MemberForList;
  activeMembers!: MemberForList[];
  filteredMembers!: any[];
  showAllMembers: boolean = false;
  serviceSubscription!: Subscription;
  memberCreatedSubscription!: Subscription;
  memberDisabledSubscription!: Subscription;
  memberActivatedSubscription!: Subscription;

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
              this.activeMembers = this.members.filter((x) => x.estActif == true);
              console.log(data);
            }
          });
        }
      }
    });
    // Recharge la liste des membres quand un membre est désactivé
    this.memberDisabledSubscription = this.service.memberDisabled$.subscribe({
      next: (data: boolean) => {
        if (data) {
          this.serviceSubscription = this.service.getMembersList().subscribe({
            next: (data: MemberForList[]) => {
              this.members = data;
              this.activeMembers = this.members.filter(x => x.estActif == true);
            }
          });
        }
      }
    });
    // Recharge la liste des membres quand un membre est ré-activé
    this.memberActivatedSubscription = this.service.memberActivated$.subscribe({
      next: (data: boolean) => {
        if (data) {
          this.serviceSubscription = this.service.getMembersList().subscribe({
            next: (data: MemberForList[]) => {
              this.members = data;
              this.activeMembers = this.members.filter(x => x.estActif == true);
            }
          });
        }
      }
    });
  }

  ngOnDestroy(): void {
    if (this.serviceSubscription) this.serviceSubscription.unsubscribe();
    if (this.memberCreatedSubscription) this.memberCreatedSubscription.unsubscribe();
    if (this.memberDisabledSubscription) this.memberDisabledSubscription.unsubscribe();
  }

  filterList(): void {
    let sound: HTMLAudioElement = new Audio('../../../../../assets/sounds/mixkit-light-button-2580.wav');
    sound.play();
    this.showAllMembers = !this.showAllMembers;
  }

  getInitials(firstname: string, lastname: string): string {
    return firstname[0] + lastname[0];
  }

  // searchMember(event: any): void {
  //   let filtered: any[] = [];
  //   let query = event.query;

  //   for (let i = 0; i < this.members.length; i++) {
  //     const member = this.members[i];
  //     if (member.nom.toLowerCase().indexOf(query.toLowerCase()) == 0)
  //       filtered.push(member);
  //   };

  //   this.filteredMembers = filtered;
  // }

}
