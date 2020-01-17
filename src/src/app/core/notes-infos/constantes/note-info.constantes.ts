import { UserCte } from '../../../../app/shared/services/constantes/user.constantes';
import { CtxCte } from '../../../../app/shared/services/constantes/ctx.constantes';
import { TabDefinition } from '../../../shared/components/abstract-tab/tab-definition';

export class NotesInfoCte {

    public static TABS: { [key: string]: TabDefinition } = {
        TAB_NOTE: new TabDefinition(1,'TAB_NOTE','NOTES','Notes','setActiveTab("TAB_NOTE")'),
        TAB_CONSIGNE: new TabDefinition(2,'TAB_CONSIGNE','Consignes','Consignes','setActiveTab("TAB_CONSIGNE")'),
        TAB_AST_SIMPLE: new TabDefinition(3,'TAB_AST_SIMPLE','ASTREINTES CLASSIQUES','Astreintes classique du jour','setActiveTab("TAB_AST_SIMPLE")'),
        TAB_AST_MULT: new TabDefinition(4,'TAB_AST_MULT','ASTREINTES MULTIPLES','Astreintes multiples du jour','setActiveTab("TAB_AST_MULT")'),
        TAB_EVT_PREV_JOUR: new TabDefinition(5,'TAB_EVT_PREV_JOUR','événements prévus','Evénements prévus du jour','setActiveTab("TAB_EVT_PREV_JOUR")'),
        TAB_BAL_PREV_JOUR: new TabDefinition(6,'TAB_BAL_PREV_JOUR','BALISAGES prévus','Balisages prévus du jour','setActiveTab("TAB_BAL_PREV_JOUR")'),
    }



    public static FIELD = {
        ATTRIBUTS: "attributs",
        DATE: "NOTE.HD_REDACTION",
        COULEUR: "NOTE.COULEUR",
        NUMERO_LIGNE: "NOTE.NUMERO_LIGNE",
        NUMERO_COLONNE: "NOTE.NUMERO_COLONNE",
        AUTEUR: "NOTE.AUTEUR",
        AUTEUR_NOM: "NOTE.AUTEUR.NOM",
        CODE_INFO: "NOTE.AUTEUR.CODE_INFO",
        FICHIER: "CONSIGNE.FICHIER_ATTACHE",
        LUE: "lue",
        LECTEURS: "NOTE.LECTEURS",
        NOTE_LECTEURS: "NOTE.LECTEUR",
        LECTEUR_CODE_INFO: "NOTE.LECTEUR.CODE_INFO",
        LECTEUR_SIGNATURE: "NOTE.LECTEUR.HD_SIGNATURE",
        LECTEUR_NOM: "NOTE.LECTEUR.NOM",
        LECTEUR_PRENOM: "NOTE.LECTEUR.PRENOM",
        nouvelleNote:"nouvelleNote",
        modifierNote:"modifierNote",
        supprimerNote:"supprimerNote",
        signerNote:"signerNote",
        openFile:"openFile",

    };

    public static COULEUR = {
        JAUNE: "jaune",
        VIOLET: "violet",
        BLEU: "bleu",
    };

    public static TYPE_NOTE = {
        CONSIGNE: "CONSIGNE",
        POSTIT: "POSTIT"
    };


    public static DROIT = (() => {
        let result = {};
        let droitDeBase = [UserCte.DROIT.gestionDesPostIt, UserCte.DROIT.gestionDesConsignes];

        // par défaut tous les fields ont les droits de base
        for (const key in NotesInfoCte.FIELD) {
            let value = NotesInfoCte.FIELD[key];
            result[value] = droitDeBase;
        }

        return result;
    })();

    public static CTX = (() => {
        let result = {};

        let contexteDeBase = [CtxCte.CTX.POSTIT];
        // par défaut tous les fields ont les contexte de base
        for (const key in NotesInfoCte.FIELD) {
            let value = NotesInfoCte.FIELD[key];
            result[value] = contexteDeBase;
        }
        return result;
    })();

    /**
     * déclaration des champs éditables selon l'etat.
     */
    public static ETAT = (() => {
        let result = {};
        return result;
    })();

}
