export interface MemberDetails {
  idMembre: number,
  photo?: string,
  sexe: string,
  dateNaissance: Date,
  groupeSanguin?: string,
  autoriseImage: boolean,
  basePresences: number,
  ceintureJiujitsu: string,
  ceintureTaijitsu?: string,
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
  }
}
