export const LABELS = (() => {
  let result: any = {};
  result["headers"] = [
    {identifiant: 'strat', label: 'Stratégie', model: 'equipement'},
    {identifiant: 'priorite', label: 'Priorité', model: 'priorite'},
    {identifiant: 'calendrier', label: 'Calendrier', model: 'calendrier'},
    {identifiant: 'statut',label: 'Statut', model: 'codeEtat'}
  ];
  result.entities = {
      tous: "tous",
      actions: "actions",
      alertes: "alertes",
      appels: "appels",
      balisage: "balisage",
      diffusionBulletins: "diffusionBulletins",
      evenement: "evenement",
      macroCommande: "macroCommande",
      planAction: "planAction",
      strategie: "strategie",
      viabilite: "viabilite"
  };

  result['natures'] = {};
  result['natures']['alertes'] = "Alerte";
  result['natures']['appels'] = "Appels";
  result['natures']['balisage'] = "Balisage";
  result['natures']['diffusionBulletins'] = "Diffusion Bulletins";
  result['natures']['evenement'] = "Evenement";
  result['natures']['macroCommande'] = "Macro Commande";
  result['natures']['planAction'] = "Plan d'actions";
  result['natures']['strategie'] = "Stratégie d'affichage";
  result['natures']['viabilite'] = "Viabilité Hivernale";

  return result;
})();
