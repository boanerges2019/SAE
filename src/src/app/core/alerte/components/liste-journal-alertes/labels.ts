import { AlerteCte } from '../../constantes/alerte.constantes';


export const LABELS = (() => {
  let result: { [key: string]: any } = {};
  result['alerte'] = {
    identifiant: 'Id',
    nom: 'Type',
    level: 'Niveau',
    localisant:'Localisation',
    codeEtat:'Qualification',
    horodateCreation: "Horodate d'apparition",
    horodateQualification:'Horodate de qualification',
    operateur: 'Operateur',
    evenement: 'Evenement',
    headers: [
      {identifiant: 'id',label: 'Id', model: 'identifiant'},
      {identifiant: 'type', label: 'Type', model: 'type'},
      {identifiant: 'localisation', label: 'Localisation', model: 'localisant.nom'},
      {identifiant: 'qualification', label: 'Qualification', model: 'codeEtat'},
      {identifiant: 'apparition',label: 'Horodate d apparition', model: 'horodateCreation'},
      {identifiant: 'h-qualification',label: 'Horodate de qualification', model: 'horodateQualification'},
      {identifiant: 'operateur', label: 'Opérateur', model: 'operateur'},
      {identifiant: 'evenement', label: 'Evénement', model: 'evenement'}
    ]
  }
  result['etat'] = {};
  result['etat'][AlerteCte.ETATS.aTraiter] = "A TRAITER";
  return result;
}
)
();
