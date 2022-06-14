export interface Cotisation {
  idCotisation: number,
  dateDebut: Date,
  dateFin: Date,
  estPaye: boolean,
  estArchive: boolean,
  idMembre: number,
  idTarif: number,
  prix: number,
  duree: string,
  nom: string,
  prenom: string
}
