import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { checkIfUnderage } from 'src/app/shared/functions/check-if-underage';
import { Belt } from 'src/app/shared/models/belt.model';
import { PricePlan } from 'src/app/shared/models/price-plan.model';
import { BeltService } from 'src/app/shared/services/belt.service';
import { PricePlanService } from 'src/app/shared/services/price-plan.service';
import { BloodType } from '../../models/blood-type.model';
import { Gender } from '../../models/genders.model';
import { MemberForCreation } from '../../models/member-for-creation.model';
import { MembersService } from '../../../../shared/services/members.service';
import { toUsDate } from 'src/app/shared/functions/convert-date-format';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-member-create',
  templateUrl: './member-create.component.html',
  styleUrls: ['./member-create.component.scss'],
  providers: [MessageService]
})
export class MemberCreateComponent implements OnInit, OnDestroy {

  constructor(
    private builder: FormBuilder,
    private memberService: MembersService,
    private beltService: BeltService,
    private priceService: PricePlanService,
    private messageService: MessageService
  ) { }

  form!: FormGroup;
  newMember!: MemberForCreation;
  tabIndex: number = 0;
  estMineur: boolean = false;
  genders!: Gender[];
  bloodTypes!: BloodType[];
  jjBelts!: Belt[];
  tjBelts!: Belt[];
  pricePlans!: PricePlan[];
  subscriptions!: Subscription;
  memberCreatedSubscription!: Subscription;
  stateOptions!: any[];

  ngOnInit(): void {
    // Récupère les ceintures pour chaque discipline
    this.subscriptions = this.beltService.getAllBelts().subscribe({
      next: (data) => {
        this.jjBelts = data.filter(x => x.discipline.nom === 'jiu-jitsu');
        this.tjBelts = data.filter(x => x.discipline.nom === 'taï-jitsu');
      },
      error: (error) => console.log(error)
    });
    // Récupère la liste des tarifs
    this.subscriptions = this.priceService.getAllPricePlans().subscribe({
      next: (data) => this.pricePlans = data,
      error: (error) => console.log(error)
    });
    // Vérifie si le membre a bient été créé
    this.memberCreatedSubscription = this.memberService.memberCreated$.subscribe({
      next: (data: boolean) => {
        if (data) this.showSuccessToast();
        else this.showErrorToast();
      }
    });

    this.stateOptions = [
      {label: 'Oui', value: true}, {label: 'Non', value: false}
    ];
    this.genders = [
      {label: 'homme'}, {label: 'femme'}, {label: 'autre'}
    ];
    this.bloodTypes = [
      {label: 'A+'}, {label: 'B+'}, {label: 'O+'}, {label: 'AB+'},
      {label: 'A-'}, {label: 'B-'}, {label: 'O-'}, {label: 'AB-'},
      {label: 'Inconnu'}
    ];
    this.blankForm();
  }

  ngOnDestroy(): void {
    if (this.subscriptions) this.subscriptions.unsubscribe();
    if (this.memberCreatedSubscription) this.memberCreatedSubscription.unsubscribe();
  }

  // Génère un formulaire vide pour la création d'un membre
  blankForm(): void {
    this.form = this.builder.group({
      dateInscription: ['', Validators.required],
      sexe: ['', Validators.required],
      dateNaissance: ['', Validators.required],
      groupeSanguin: [''],
      autoriseImage: [null, Validators.required],
      basePresencesRequises: [0, Validators.required],
      basePresencesTotal: [0, Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      telephone: ['', Validators.required],
      email: [''],
      rue: [''],
      numero: [''],
      codePostal: [null, Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]{4}'),
        Validators.min(1000)
      ])],
      ville: [''],
      jjCeinture: ['', Validators.required],
      jjDateObtention: [null, Validators.required],
      tjCeinture: ['', Validators.required],
      tjDateObtention: [null, Validators.required],
      contactNom: ['', Validators.required],
      contactPrenom: ['', Validators.required],
      contactTelephone: ['', Validators.required],
      contactLien: ['', Validators.required],
      referentNom: [''],
      referentPrenom: [''],
      referentTelephone: [''],
      referentLien: [''],
      referentRue: [''],
      referentNumero: [''],
      referentCP: [null, Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]{4}'),
        Validators.min(1000)
      ])],
      referentVille: [''],
      dateSouscription: [null, Validators.required],
      formuleCotisation: ['', Validators.required],
      estPaye: [null, Validators.required]
    })
  }

  // Crée le nouveau membre si le formulaire est valide
  submitForm(): void {
    this.newMember = {
      membreInfos: {
        dateInscription: new Date(toUsDate(this.form.value['dateInscription'])),
        estActif : true,
        photo: null,
        sexe: this.form.value['sexe'],
        dateNaissance: new Date(toUsDate(this.form.value['dateNaissance'])),
        groupeSanguin: this.form.value['groupeSanguin'].label,
        autoriseImage: this.form.value['autoriseImage'],
        basePresencesRequises: this.form.value['basePresencesRequises'],
        basePresencesTotal: this.form.value['basePresencesTotal'],
      },
      personne: {
        nom: this.form.value['nom'],
        prenom: this.form.value['prenom'],
        email: this.form.value['email'],
        telephone: this.form.value['telephone'],
      },
      adresse: {
        rue: this.form.value['rue'] === '' ? null : this.form.value['rue'],
        numero: this.form.value['numero'] === '' ? null : this.form.value['numero'],
        codePostal: this.form.value['codePostal'] === null ? null : this.form.value['codePostal'],
        ville: this.form.value['ville'] === '' ? null : this.form.value['ville']
      },
      ceintures: [
        {
          idCeinture: this.form.value['jjCeinture'].idCeinture,
          dateObtention: new Date(toUsDate(this.form.value['jjDateObtention']))
        },
        {
          idCeinture: this.form.value['tjCeinture'].idCeinture,
          dateObtention: new Date(toUsDate(this.form.value['tjDateObtention']))
        }
      ],
      contact: {
        personne: {
          nom: this.form.value['contactNom'],
          prenom: this.form.value['contactPrenom'],
          telephone: this.form.value['contactTelephone'],
        },
        lienAvecMembre: this.form.value['contactLien']
      },
      referent: {
        personne: {
          nom: this.form.value['referentNom'] === '' ? null : this.form.value['referentNom'],
          prenom: this.form.value['referentPrenom'] === '' ? null : this.form.value['referentPrenom'],
          email: this.form.value['referentEmail'] === '' ? null : this.form.value['referentEmail'],
          telephone: this.form.value['referentTelephone'] === '' ? null : this.form.value['referentTelephone'],
        },
        adresse: {
          rue: this.form.value['referentRue'] === '' ? null : this.form.value['referentRue'],
          numero: this.form.value['referentNumero'] === '' ? null : this.form.value['referentNumero'],
          codePostal: this.form.value['referentCP'] === null ? null : this.form.value['referentCP'],
          ville: this.form.value['referentVille'] === '' ? null : this.form.value['referentVille']
        },
        lienAvecMembre: this.form.value['referentLien']
      },
      cotisation: {
        dateDebut: new Date(toUsDate(this.form.value['dateSouscription'])),
        estPaye: this.form.value['estPaye'],
        idTarif: this.form.value['formuleCotisation'].idTarif,
        duree: this.form.value['formuleCotisation'].duree
      }
    };
    return this.memberService.createMember(this.newMember);
  }

  // Change la valeur de estMineur lorsque la valeur change dans le formulaire
  onBirthdateChange(event: any): void {
    this.estMineur = checkIfUnderage(new Date(toUsDate(this.form.value['dateNaissance'])));
  }

  // Modifie tabIndex pour naviguer vers l'onglet suivant (prend en compte si le membre est mineur)
  openNext(): void {
    if (this.tabIndex === 0 && this.estMineur === true)
      this.tabIndex = this.tabIndex +2;
    else if (this.tabIndex === 3 && this.estMineur === false)
      this.tabIndex = this.tabIndex +2;
    else
      this.tabIndex = this.tabIndex +1;
  }

  // Modifie tabIndex pour naviguer vers l'onglet précédent (prend en compte si le membre est mineur)
  openPrevious(): void {
    if (this.tabIndex === 2 && this.estMineur === true)
      this.tabIndex = this.tabIndex -2;
    else if (this.tabIndex === 5 && this.estMineur === false)
      this.tabIndex = this.tabIndex -2;
    else
      this.tabIndex = this.tabIndex -1;
  }

  // Toasters
  showSuccessToast(): void {
    this.messageService.add({key: 'created', severity:'success', summary: 'Succès', detail: 'Le membre a bien été créé'});
  }
  showErrorToast(): void {
    this.messageService.add({key: 'notCreated', severity:'error', summary: 'Erreur', detail: 'Le membre n\'a pas été correctement ajouté.'});
  }

}
