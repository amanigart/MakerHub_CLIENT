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

@Component({
  selector: 'app-member-create',
  templateUrl: './member-create.component.html',
  styleUrls: ['./member-create.component.scss']
})
export class MemberCreateComponent implements OnInit, OnDestroy {

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
  stateOptions!: any[];

  constructor(
    private builder: FormBuilder,
    private memberService: MembersService,
    private beltService: BeltService,
    private priceService: PricePlanService
  ) { }

  ngOnInit(): void {
    this.subscriptions = this.beltService.getAllBelts().subscribe({
      next: (data) => {
        this.jjBelts = data.filter(x => x.discipline.nom === 'jiu-jitsu');
        this.tjBelts = data.filter(x => x.discipline.nom === 'taï-jitsu');
      },
      error: (error) => console.log(error)
    });
    this.subscriptions = this.priceService.getAllPricePlans().subscribe({
      next: (data) => this.pricePlans = data,
      error: (error) => console.log(error)
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
    this.subscriptions.unsubscribe();
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
      rue: new FormControl({value: '', disabled: this.estMineur}),
      numero: new FormControl({value: '', disabled: this.estMineur}),
      codePostal: new FormControl({value: null, disabled: this.estMineur}),
      ville: new FormControl({value: '', disabled: this.estMineur}),
      jjCeinture: ['', Validators.required],
      tjCeinture: ['', Validators.required],
      contactNom: ['', Validators.required],
      contactPrenom: ['', Validators.required],
      contactTelephone: ['', Validators.required],
      contactLien: ['', Validators.required],
      referentNom: new FormControl({value: '', disabled: !this.estMineur}),
      referentPrenom: new FormControl({value: '', disabled: !this.estMineur}),
      referentTelephone: new FormControl({value: '', disabled: !this.estMineur}),
      referentLien: new FormControl({value: '', disabled: !this.estMineur}),
      referentRue: new FormControl({value: '', disabled: !this.estMineur}),
      referentNumero: new FormControl({value: '', disabled: !this.estMineur}),
      referentCP: new FormControl({value: null, disabled: !this.estMineur}),
      referentVille: new FormControl({value: '', disabled: !this.estMineur}),
      dateSouscription: [null, Validators.required],
      formuleCotisation: ['', Validators.required],
      estPaye: [null, Validators.required]
    })
  }

  // Crée le nouveau membre si le formulaire est valide
  submitForm(): void {
    this.newMember = {
      membreInfos: {
        dateInscription: new Date(this.form.value['dateInscription']),
        estActif : true,
        photo: null,
        sexe: this.form.value['sexe'],
        dateNaissance: new Date(this.form.value['dateNaissance']),
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
          idDiscipline: this.form.value['jjCeinture'].idDiscipline,
          idCeinture: this.form.value['jjCeinture'].idCeinture
        },
        {
          idDiscipline: this.form.value['tjCeinture'].idDiscipline,
          idCeinture: this.form.value['tjCeinture'].idCeinture
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
        dateDebut: new Date(this.form.value['dateSouscritpion']),
        estPaye: this.form.value['estPaye'],
        idTarif: this.form.value['formuleCotisation'].idTarif,
        duree: this.form.value['formuleCotisation'].duree
      }
    };
    console.log(this.newMember);
  }

  // Change la valeur de estMineur lorsque la valeur change dans le formulaire
  onBirthdateChange(event: any): void {
    this.estMineur = checkIfUnderage(new Date(this.form.value['dateNaissance']));
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

}
