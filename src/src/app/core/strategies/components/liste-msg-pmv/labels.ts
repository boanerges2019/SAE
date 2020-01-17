export const LABELS = (() => {
  let result: any = {};
  result["headers"] = [
    {identifiant: 'strat', label: 'Stratégie', model: 'equipement'},
    {identifiant: 'priorite', label: 'Priorité', model: 'priorite'},
    {identifiant: 'calendrier', label: 'Calendrier', model: 'calendrier'},
    {identifiant: 'statut',label: 'Statut', model: 'codeEtat'}
  ];

  result['ctx'] = {};
  result['ctx']['LIST_STRATEGIE'] =   "Liste des équipements";
  result['ctx']['CREATE_STRATEGIE'] = "Edition des équipements";

  return result;
})();
