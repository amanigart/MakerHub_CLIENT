import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cotisation } from 'src/app/shared/models/cotisation.model';
import { MembershipService } from 'src/app/shared/services/membership.service';

@Component({
  selector: 'app-membership-list',
  templateUrl: './membership-list.component.html',
  styleUrls: ['./membership-list.component.scss']
})
export class MembershipListComponent implements OnInit, OnDestroy {

  constructor(
    private route: ActivatedRoute,
    private membershipService: MembershipService
  ) { }

  memberships!: Cotisation[];
  subscriptions!: Subscription;
  membershipStatusSubscription!: Subscription;
  paymentStatusSubscription!: Subscription;

  ngOnInit(): void {
    this.memberships = this.route.snapshot.data['allMemberships'];

    // Recharge les données quand le status d'archive d'une cotisation change
    this.membershipStatusSubscription = this.membershipService.membershipStatusChange$.subscribe({
      next: (data: boolean) => {
        if (data) {
          this.subscriptions = this.membershipService.getAllMemberships().subscribe({
            next: (data: Cotisation[]) => this.memberships = data
          });
        }
      }
    });
    // Recharge les données quand le status du paiement d'une cotisation change
    this.paymentStatusSubscription = this.membershipService.paymentStatusChange$.subscribe({
      next: (data: boolean) => {
        if (data) {
          this.subscriptions = this.membershipService.getAllMemberships().subscribe({
            next: (data: Cotisation[]) => this.memberships = data
          });
        }
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscriptions) this.subscriptions.unsubscribe();
    if (this.membershipStatusSubscription) this.membershipStatusSubscription.unsubscribe();
    if (this.paymentStatusSubscription) this.paymentStatusSubscription.unsubscribe();
  }

  changeArchiveStatus(id: number): void {
    this.membershipService.updateArchiveStatus(id);
  }

  changePaymentStatus(id: number): void {
    this.membershipService.updatePaymentStatus(id);
  }

}
