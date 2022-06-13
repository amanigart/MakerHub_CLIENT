export interface Belt {
  idCeinture: number,
  couleur: string,
  nbPresencesRequis: number,
  illustration?: string,
  discipline: {
    idDiscipline: number,
    nom: string
  }
};
