import { EvenementCte } from 'app/core/evenement/constantes/evenement.constantes';
import { CtxCte } from 'app/shared/services/constantes/ctx.constantes';

export const LABELS = (() => {
    let result: { [key: string]: any } = {};

    result['ctx'] = {};
    result['ctx']['cancelButton'] = {};
    result['ctx']['cancelButton'][CtxCte.CTX.EDIT_EVENEMENT] = "Annuler";
    result['ctx']['cancelButton'][CtxCte.CTX.UPDATE_ETAT_EVENEMENT] = "Annuler";
    result['ctx']['cancelButton'][CtxCte.CTX.READ] = "retour";

    result['label'] = {};
    result['label'][''] = {};
    result['label']['BAL'] = {};
    result['label']['']['evenementsCourants'] = 'événements courants';
    result['label']['']['evenementsPrevus'] = 'événements prévus';
    result['label']['BAL']['evenementsCourants'] = 'gestion des balisage';
    result['label']['BAL']['evenementsPrevus'] = 'balisages prévus';

    result['label']['']['create'] = 'créer un événement';
    result['label']['BAL']['create'] = 'créer un balisage';
    result['label']['']['validate'] = "valider l'évènement";
    result['label']['BAL']['validate'] = 'valider le balisage';

    result['label']['']['countEnCours'] = 'évènement(s) en cours';
    result['label']['BAL']['countEnCours'] = 'balisage(s) en cours';
    result['label']['']['countPrevus'] = 'évènement(s) prévus';
    result['label']['BAL']['countPrevus'] = 'balisage(s) prévuss';
    result['label']['']['countSignales'] = 'évènement(s) signalé(s)';
    result['label']['BAL']['countSignales'] = 'balisage(s) signalé(s)';
    result['label']['']['countTermines'] = 'évènement(s) terminé(s)';
    result['label']['BAL']['countTermines'] = 'balisage(s) terminé(s)';


    result['evenement'] = {};
    result['evenement']['etats'] = {};
    result['evenement']['etats'][EvenementCte.ETATS_EVENEMENT.enCours] = "En Cours";
    result['evenement']['etats'][EvenementCte.ETATS_EVENEMENT.prevu] = "Prévu";
    result['evenement']['etats'][EvenementCte.ETATS_EVENEMENT.signale] = "Signalé";
    result['evenement']['etats'][EvenementCte.ETATS_EVENEMENT.termine] = "Terminé";


    return result;
})();
