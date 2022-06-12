import { Cotisation } from "src/app/shared/models/cotisation.model"
import { MemberBelt } from "./member-belt.model"

export interface Member {
  idMembre: number,
  dateInscription: Date,
  estActif : boolean,
  photo?: string,
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
    idAdresse?: number
  },
  adresse?: {
    idAdresse: number,
    rue: string,
    numero: string,
    codePostal: number,
    ville: string
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
  referent?: {
    id: number,
    personne: {
      idPersonne: number,
      nom: string,
      prenom: string,
      email: string,
      telephone: string,
      idAdresse: number
    },
    adresse: {
      idAdresse: number,
      rue: string,
      numero: string,
      codePostal: number,
      ville: string
    },
    lienAvecMembre: string
  },
  cotisations: [Cotisation]
}
