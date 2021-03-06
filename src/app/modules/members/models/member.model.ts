import { Cotisation } from "src/app/shared/models/cotisation.model"
import { MemberBelt } from "./member-belt.model"

export interface Member {
  idMembre: number,
  dateInscription: Date,
  estActif : boolean,
  photo: string | null,
  sexe: string,
  dateNaissance: Date,
  groupeSanguin?: string,
  autoriseImage: boolean,
  basePresencesRequises: number,
  basePresencesTotal: number,
  personne: {
    idPersonne: number,
    nom: string,
    prenom: string,
    email: string,
    telephone: string,
    idAdresse: number | null
  },
  adresse: {
    idAdresse: number | null,
    rue: string | null,
    numero: string | null,
    codePostal: number | null,
    ville: string | null
  }
  ceintures: [MemberBelt],
  contact: {
    id: number,
    personne: {
      idPersonne: number,
      nom: string,
      prenom: string,
      telephone: string,
    },
    lienAvecMembre: string
  },
  referent: {
    id: number | null,
    personne: {
      idPersonne: number | null,
      nom: string | null,
      prenom: string | null,
      email: string | null,
      telephone: string | null,
      idAdresse: number | null
    },
    adresse: {
      idAdresse: number | null,
      rue: string | null,
      numero: string | null,
      codePostal: number | null,
      ville: string | null
    },
    lienAvecMembre: string | null
  },
  cotisations: [Cotisation]
}
