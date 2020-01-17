export const LABELS = (() => {
    let result:any = {};
    result["headers"] = [
        {identifiant: 'strat', label: 'Stratégie', model: 'equipement'},
        {identifiant: 'priorite', label: 'Priorité', model: 'priorite'},
        {identifiant: 'calendrier', label: 'Calendrier', model: 'calendrier'},
        {identifiant: 'statut', label: 'Statut', model: 'codeEtat'}
    ];

    return result;
})();
