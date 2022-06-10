import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Member } from '../../models/member.model';

@Component({
  selector: 'app-members-update',
  templateUrl: './members-update.component.html',
  styleUrls: ['./members-update.component.scss']
})
export class MembersUpdateComponent implements OnInit {

  member!: Member;
  memberForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private builder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.member = this.getRouteData('currentMember');
    this.filledForm();
  }

  filledForm(): void {
    this.memberForm = this.builder.group({
      nom: [this.member.personne.nom, Validators.required],
      prenom: [this.member.personne.prenom, Validators.required],
      dateInscription: [this.member.dateInscription, Validators.required],
      dateNaissance: [this.member.dateNaissance, Validators.required],
      sexe: [this.member.sexe, Validators.required],
      groupeSanguin: [this.member.groupeSanguin],
      autoriseImage: [this.member.autoriseImage, Validators.required],
      telephone: [this.member.personne.telephone, Validators.required],
      email: [this.member.personne.email, Validators.required],
      adRue: [this.member.adresse.rue, Validators.required],
      adNumero: [this.member.adresse.numero, Validators.required],
      adCP: [this.member.adresse.codePostal, Validators.required],
      adVille: [this.member.adresse.ville, Validators.required],
      contactNom: [this.member.contact.personne.nom, Validators.required],
      contactPrenom: [this.member.contact.personne.prenom, Validators.required],
      contactTelephone: [this.member.contact.personne.telephone, Validators.required],
      contactLienAdherent: [this.member.contact.lienAvecMembre, Validators.required],
      referentNom: [this.member.referent?.personne.nom],
      referentPrenom: [this.member.referent?.personne.prenom],
      referentTelephone: [this.member.referent?.personne.telephone],
      referentEmail: [this.member.referent?.personne.email],
      referentLienAdherent:[this.member.referent?.lienAvecMembre]
    });
  }

  getRouteData(resolverName: string): any {
    let data: any;
    this.route.params.subscribe((id : Params) => {
      data = this.route.snapshot.data[resolverName];
    });
    return data;
  }

  submitForm(): void {

  }

}
