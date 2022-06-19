import { Cotisation } from "src/app/shared/models/cotisation.model"
import { MemberBelt } from "./member-belt.model"

export interface MemberForCreation {
  membreInfos: {
    dateInscription: Date,
    estActif : boolean,
    photo: string | null,
    sexe: string,
    dateNaissance: Date,
    groupeSanguin?: string,
    autoriseImage: boolean,
    basePresencesRequises: number,
    basePresencesTotal: number
  },
  personne: {
    nom: string,
    prenom: string,
    email: string,
    telephone: string,
  },
  adresse: {
    rue: string | null,
    numero: string | null,
    codePostal: number | null,
    ville: string | null
  },
  ceintures: [
    {
      idCeinture: number,
      dateObtention: Date
    },
    {
      idCeinture: number,
      dateObtention: Date
    }
  ],
  contact: {
    personne: {
      nom: string,
      prenom: string,
      telephone: string,
    },
    lienAvecMembre: string
  },
  referent: {
    personne: {
      nom: string | null,
      prenom: string | null,
      email: string | null,
      telephone: string | null,
    },
    adresse: {
      rue: string | null,
      numero: string | null,
      codePostal: number | null,
      ville: string | null
    },
    lienAvecMembre: string
  },
  cotisation: {
    dateDebut: Date,
    estPaye: boolean,
    idTarif: number,
    duree: string
  }
}
