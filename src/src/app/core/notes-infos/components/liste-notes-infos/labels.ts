export const LABELS = (() => {
  let result: any = {};
  result["headers"] = [
    {identifiant: 'macroPlanifie', label: 'Macro-commandes planifiées', model: 'macroPlanifie'},
    {identifiant: 'priorite', label: 'Priorité', model: 'priorite'},
    {identifiant: 'calendrier', label: 'Calendrier', model: 'currentDate'},
    {identifiant: 'nextDate',label: 'Prochaine éxécution', model: 'nextDate'}
  ];
  return result;
})();
