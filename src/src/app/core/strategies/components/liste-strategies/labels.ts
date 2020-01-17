import { CtxCte } from 'app/shared/services/constantes/ctx.constantes';

export const LABELS = (() => {
    let result:any = {};
    result["headers"] = [
        {identifiant: 'strat', label: 'Stratégie', model: 'equipement'},
        {identifiant: 'priorite', label: 'Priorité', model: 'priorite'},
        {identifiant: 'calendrier', label: 'Calendrier', model: 'calendrier'},
        {identifiant: 'statut', label: 'Statut', model: 'codeEtat'}
    ];

    result['ctx'] = {};
    result['ctx'][CtxCte.CTX.LIST_STRATEGIE] = "Suivi des strategies";
    result['ctx'][CtxCte.CTX.CREATE_STRATEGIE] = "Gestion des strategies";
    result['ctx'][CtxCte.CTX.UPDATE_STRATEGIE] = "Gestion des strategies";

    result['cancel'] = {};
    result["cancel"][CtxCte.CTX.READ] = "Retour";
    result["cancel"][CtxCte.CTX.CREATE_STRATEGIE] = "Retour";
    result["cancel"][CtxCte.CTX.UPDATE_STRATEGIE] = "Retour";

    return result;
})();
