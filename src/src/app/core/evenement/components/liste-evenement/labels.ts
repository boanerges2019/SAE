import { EvenementCte } from '../../../../../app/core/evenement/constantes/evenement.constantes';
import { CtxCte } from '../../../../../app/shared/services/constantes/ctx.constantes';

export const LABELS = (() => {
    let result: { [key: string]: any } = {};
    result['evenement'] = {
        type: 'Type',
        nom: 'Evenement',
        localisation: 'localisation',
        statut: 'Statut',
        debut: 'Début',
        fin: 'Fin (estimée)',
        identifiant: 'Id',
        headers: [
            { identifiant: 'type', label: 'Type', model: 'type', sortable: false },
            { identifiant: 'evenement', label: 'Evenement', model: 'type', sortable: true },
            { identifiant: 'localisation', label: 'Localisation', model: 'nomLocalisant', sortable: true },
            { identifiant: 'statut', label: 'Statut', model: 'etat', sortable: true },
            { identifiant: 'debut', label: 'Début', model: 'horodateDebut', sortable: true },
            { identifiant: 'fin', label: 'Fin(estimée)', model: 'horodateFin', sortable: true },
            { identifiant: 'id', label: 'Id', model: 'nom', sortable: true }
        ],
        actions: {
            edit: 'Editer',
            show: 'Voir'
        }
    }

    result['ctx'] = {};
    result['ctx']['cancelButton'] = {};
    result['ctx']['cancelButton'][CtxCte.CTX.EDIT_EVENEMENT] = "Annuler";
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



    result['evenement']['etats'] = {};
    result['evenement']['etats'][EvenementCte.ETATS_EVENEMENT.enCours] = "En Cours";
    result['evenement']['etats'][EvenementCte.ETATS_EVENEMENT.prevu] = "Prévu";
    result['evenement']['etats'][EvenementCte.ETATS_EVENEMENT.signale] = "Signalé";
    result['evenement']['etats'][EvenementCte.ETATS_EVENEMENT.termine] = "Terminé";

    result['typeEvenement'] = {};
    result['typeEvenement'][''] = "";
    result['typeEvenement'][EvenementCte.TYPES_EVENEMENT.ACC] = "Accident";
    result['typeEvenement'][EvenementCte.TYPES_EVENEMENT.ACI] = "Accident industriel";
    result['typeEvenement'][EvenementCte.TYPES_EVENEMENT.ALE] = "Alerte enlèvement";
    result['typeEvenement'][EvenementCte.TYPES_EVENEMENT.ATF] = "Alternant Tunnel ";
    result['typeEvenement'][EvenementCte.TYPES_EVENEMENT.ANI] = "Animal Sur Chaussee";
    result['typeEvenement'][EvenementCte.TYPES_EVENEMENT.BAL] = "Balisage";
    result['typeEvenement'][EvenementCte.TYPES_EVENEMENT.BAS] = "Basculement De Chaussee";
    result['typeEvenement'][EvenementCte.TYPES_EVENEMENT.BOU] = "Bouchon";
    result['typeEvenement'][EvenementCte.TYPES_EVENEMENT.CTU] = "Circulation Tunnel";
    result['typeEvenement'][EvenementCte.TYPES_EVENEMENT.CSS] = "Contre Sens";
    result['typeEvenement'][EvenementCte.TYPES_EVENEMENT.CEX] = "Convoi exceptionnel";
    result['typeEvenement'][EvenementCte.TYPES_EVENEMENT.CRU] = "Crue torrentielle";
    result['typeEvenement'][EvenementCte.TYPES_EVENEMENT.EBO] = "Eboulement";
    result['typeEvenement'][EvenementCte.TYPES_EVENEMENT.FTF] = "Fermeture Tunnel du Fréjus";
    result['typeEvenement'][EvenementCte.TYPES_EVENEMENT.TMD] = "Fuite TMD";
    result['typeEvenement'][EvenementCte.TYPES_EVENEMENT.HGA] = "Hors gabarit";
    result['typeEvenement'][EvenementCte.TYPES_EVENEMENT.INC] = "Incendie";
    result['typeEvenement'][EvenementCte.TYPES_EVENEMENT.INB] = "Incendie bâtiment";
    result['typeEvenement'][EvenementCte.TYPES_EVENEMENT.INF] = "Information particulière";
    result['typeEvenement'][EvenementCte.TYPES_EVENEMENT.MAL] = "Malveillance";
    result['typeEvenement'][EvenementCte.TYPES_EVENEMENT.MAN] = "Manifestation";
    result['typeEvenement'][EvenementCte.TYPES_EVENEMENT.MET] = "Météo";
    result['typeEvenement'][EvenementCte.TYPES_EVENEMENT.OBS] = "Obstacle sur chaussée";
    result['typeEvenement'][EvenementCte.TYPES_EVENEMENT.PGT] = "Plan de Gestion de Trafic";
    result['typeEvenement'][EvenementCte.TYPES_EVENEMENT.PIE] = "Personne sur chaussée";
    result['typeEvenement'][EvenementCte.TYPES_EVENEMENT.POL] = "Pollution atmosphérique";
    result['typeEvenement'][EvenementCte.TYPES_EVENEMENT.RAR] = "Réseau AREA";
    result['typeEvenement'][EvenementCte.TYPES_EVENEMENT.SAP] = "Secours à personne";
    result['typeEvenement'][EvenementCte.TYPES_EVENEMENT.STK] = "Stockage";
    result['typeEvenement'][EvenementCte.TYPES_EVENEMENT.TRA] = "Travaux";
    result['typeEvenement'][EvenementCte.TYPES_EVENEMENT.VEH] = "Véhicule arrêté";
    result['typeEvenement'][EvenementCte.TYPES_EVENEMENT.VHI] = "Viabilité hivernale";
    return result;
})();
