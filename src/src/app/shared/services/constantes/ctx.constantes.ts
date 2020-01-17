/**
 * Entité de représentation des contextes d'accès à une ressource.
 */
export class CtxCte {

    public static CTX = {
        READ: 'READ',
        LIST_EVENEMENT_COURANT: 'LIST_EVENEMENT_COURANT',
        LIST_EVENEMENT_PREVU: 'LIST_EVENEMENT_PREVU',
        EDIT_EVENEMENT: 'EDIT_EVENEMENT',
        CREATE_EVENEMENT_MANUALLY: 'CREATE_EVENEMENT_MANUALLY',
        CREATE_EVENEMENT_FROM_ALERTE: 'CREATE_EVENEMENT_FROM_ALERTE',
        UPDDATE_TYPE_EVENEMENT: 'UPDDATE_TYPE_EVENEMENT',
        UPDATE_ETAT_EVENEMENT: 'UPDATE_ETAT_EVENEMENT',
        CREATE_GROUPE_EVENEMENT: 'CREATE_GROUPE_EVENEMENT',
        UPDATE_GROUPE_EVENEMENT: 'UPDATE_GROUPE_EVENEMENT',

        // strategie
        LIST_STRATEGIE: 'LIST_STRATEGIE',
        UPDATE_STRATEGIE: 'UPDATE_STRATEGIE',
        CREATE_STRATEGIE: 'CREATE_STRATEGIE',
        PLAN_STRATEGIE: 'PLAN_STRATEGIE',
        REMOVE_STRATEGIE: 'REMOVE_STRATEGIE',

        // MACRO
        LIST_MODELE_MACRO:'LIST_MODELE_MACRO',
        PLANIFICATION_MACRO:'PLANIFICATION_MACRO',
        DETAIL_MACRO:'DETAIL_MACRO',

        // PLAN D'ACTTION
        PAC_LIST_STRATEGIE: 'PAC_LIST_STRATEGIE',
        PAC_CREATE_STRATEGIE: 'PAC_CREATE_STRATEGIE',
        PAC_MACRO_COMMANDE:'PAC_MACRO_COMMANDE',
        PAC_COMMUNICATION:'PAC_COMMUNICATION',
        PAC_APERCU_COMMUNICATION:'PAC_APERCU_COMMUNICATION',
        PAC_COMPTE_RENDU_COMMUNICATION:'PAC_COMPTE_RENDU_COMMUNICATION',
        GESTION_MACRO_COMMANDE:'GESTION_MACRO_COMMANDE',

        // bulletins
        LIST_BULLETINS_PREPARATIONS_ENVOIES_PLANIFIES:'LIST_BULLETINS_PREPARATIONS_ENVOIES_PLANIFIES',
        LIST_BULLETINS_PREPARATIONS_ENVOIES:'LIST_BULLETINS_PREPARATIONS_ENVOIES',
        BULLETIN_CREATE_PREPARATION_ENVOI:'BULLETIN_CREATE_PREPARATION_ENVOI',
        BULLETIN_EDITION_PREPARATION_ENVOI:'BULLETIN_EDITION_PREPARATION_ENVOI',
        BULLETIN_PLANIFICATION_PREPARATION_ENVOI:'BULLETIN_PLANIFICATION_PREPARATION_ENVOI',

        // viabilités
        VIABILITE_HIVERNALES:'VIABILITE_HIVERNALES',

        // astreintes
        ASTREINTES:'ASTREINTES',
        ASTREINTES_DIFFUSSION_MESSAGES:'ASTREINTES_DIFFUSSION_MESSAGES',

        // annuaires
        ANNUAIRES:'ANNUAIRES',

        // Notes
        POSTIT:'NOTES',

        // extractions de données
        EXTRACTIONS_DONNEES:'EXTRACTIONS_DONNEES'
    };
}