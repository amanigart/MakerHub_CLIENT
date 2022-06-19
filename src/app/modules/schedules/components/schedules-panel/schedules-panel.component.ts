import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { PricePlan } from 'src/app/shared/models/price-plan.model';
import { PricePlanService } from 'src/app/shared/services/price-plan.service';
import { ScheduleService } from 'src/app/shared/services/schedule.service';
import { Schedule } from '../../models/schedule.model';

@Component({
  selector: 'app-schedules-panel',
  templateUrl: './schedules-panel.component.html',
  styleUrls: ['./schedules-panel.component.scss'],
  providers: [MessageService]
})
export class SchedulesPanelComponent implements OnInit, OnDestroy {

  constructor(
    private route: ActivatedRoute,
    private scheduleService: ScheduleService,
    private priceService: PricePlanService,
    private builder: FormBuilder,
    private messageService: MessageService
  ) { }

  schedules!: Schedule[];
  prices!: PricePlan[];
  scheduleForm1!: FormGroup;
  scheduleForm2!: FormGroup;
  scheduleForm3!: FormGroup;
  priceForm1!: FormGroup;
  priceForm2!: FormGroup;
  priceForm3!: FormGroup;
  displayScheduleModal: boolean = false;
  displayPriceModal: boolean = false;
  subscriptions!: Subscription;
  priceUpdatedSubscription!: Subscription;
  scheduleUpdatedSubscription!: Subscription;

  ngOnInit(): void {
    this.schedules = this.route.snapshot.data['allSchedules'];
    this.prices = this.route.snapshot.data['allPrices'];
    this.scheduleForm1 = this.filledScheduleForm(0);
    this.scheduleForm2 = this.filledScheduleForm(1);
    this.scheduleForm3 = this.filledScheduleForm(2);
    this.priceForm1 = this.filledPriceForm(0);
    this.priceForm2 = this.filledPriceForm(1);
    this.priceForm3 = this.filledPriceForm(2);

    // Recharge la liste des horaires quand un horaire a été modifié
    this.scheduleUpdatedSubscription = this.scheduleService.scheduleCreated$.subscribe({
      next: (data: boolean) => {
        if (data) {
          this.subscriptions = this.scheduleService.getAllSchedules().subscribe({
            next: (data: Schedule[]) => this.schedules = data
          });
        }
      }
    });
    // Recharge la liste des tarifs quand un tarif a été modifié
    this.priceUpdatedSubscription = this.priceService.priceUpdated$.subscribe({
      next: (data: boolean) => {
        if (data) {
          this.subscriptions = this.priceService.getAllPricePlans().subscribe({
            next: (data: PricePlan[]) => this.prices = data
          });
        }
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscriptions) this.subscriptions.unsubscribe();
    if (this.scheduleUpdatedSubscription) this.scheduleUpdatedSubscription.unsubscribe();
    if (this.priceUpdatedSubscription) this.priceUpdatedSubscription.unsubscribe();
  }

  // Méthodes pour le remplissage des formulaires
  filledScheduleForm(id: number): FormGroup {
    let form: FormGroup = this.builder.group({
      idHoraire: [this.schedules[id].idHoraire, Validators.required],
      jour: [this.schedules[id].jour, Validators.required],
      heureDebut: [this.schedules[id].heureDebut, Validators.required],
      heureFin: [this.schedules[id].heureFin, Validators.required]
    });
    return form;
  }
  filledPriceForm(id: number): FormGroup {
    let form: FormGroup = this.builder.group({
      idTarif: [this.prices[id].idTarif, Validators.required],
      prix: [this.prices[id].prix, Validators.required],
      duree: [this.prices[id].duree, Validators.required]
    });
    return form;
  }

  // Méthodes pour updater les formulaires des horaires
  updateSchedule1(): void {
    const currentSchedule: Schedule = this.scheduleForm1.value;
    this.scheduleService.updateSchedule(currentSchedule);
    this.showScheduleCreated();
  }
  updateSchedule2(): void {
    const currentSchedule: Schedule = this.scheduleForm2.value;
    this.scheduleService.updateSchedule(currentSchedule);
    this.showScheduleCreated();
  }
  updateSchedule3(): void {
    const currentSchedule: Schedule = this.scheduleForm3.value;
    this.scheduleService.updateSchedule(currentSchedule);
    this.showScheduleCreated();
  }

  // Méthodes pour updater les formulaires des tarifs
  updatePrice1(): void {
    const currentPrice: PricePlan = this.priceForm1.value;
    this.priceService.updatePricePlan(currentPrice);
    this.showPriceCreated();
  }
  updatePrice2(): void {
    const currentPrice: PricePlan = this.priceForm2.value;
    this.priceService.updatePricePlan(currentPrice);
    this.showPriceCreated();
  }
  updatePrice3(): void {
    const currentPrice: PricePlan = this.priceForm3.value;
    this.priceService.updatePricePlan(currentPrice);
    this.showPriceCreated();
  }

  // Méthodes qui ouvre les modals
  showScheduleModal(): void {
    this.displayScheduleModal = true;
  }
  showPriceModal(): void {
    this.displayPriceModal = true;
  }

  // Toasters
  showScheduleCreated(): void {
    this.messageService.add({key: 'scheduleMsg', severity:'success', summary: 'Succès', detail: 'L\'Horaire a bien été modifié.'});
  }
  showPriceCreated(): void {
    this.messageService.add({key: 'priceMsg', severity:'success', summary: 'Succès', detail: 'Le tarif a bien été modifié.'});
  }

}
