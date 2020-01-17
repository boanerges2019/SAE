export const LABELS = (() => {
    let result:any = {};
    result["headers"] = [
        {identifiant: 'macro', label: 'Macro-commandes planifiées', model: 'nom'},
        {identifiant: 'nextDate', label: 'Prochaine éxécution', model: 'dateDebut'}
    ];
    return result;
})();

