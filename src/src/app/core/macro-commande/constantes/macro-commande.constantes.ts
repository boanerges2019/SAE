import { UserCte } from 'app/shared/services/constantes/user.constantes';
import { CtxCte } from 'app/shared/services/constantes/ctx.constantes';

export class FieldMacroCommandeCte {

    public static CODE_ETAT_MACRO = {
        DEMANDER: "ETAT_MACRO_COMMANDE.DEMANDE",
        EN_COURS: "ETAT_MACRO_COMMANDE.EN_COURS",
        SUCCES: "ETAT_MACRO_COMMANDE.SUCCES",
        SUSPENDU:"ETAT_MACRO_COMMANDE.SUSPENDU",
        ANNULE:"ETAT_MACRO_COMMANDE.ANNULE",
        ECHEC:"ETAT_MACRO_COMMANDE.ECHEC"
    };

    public static CODE_ETAT_ACTION = {
        QUESTION:"ETAT_ACTION.EN_ATTENTE",
        VERIFIER: "ETAT_ACTION.NON",
        NON: "ETAT_ACTION.NON",
        OUI: "ETAT_ACTION.OUI",
        EN_COURS: "ETAT_ACTION.EN_COURS",
        SUCCES: "ETAT_ACTION.SUCCES",
        ECHEC:"ETAT_ACTION.ECHEC",
    };

    public static FIELD = {
        lancer: "lancer",
        planifier: "planifier",
        oui:"oui",
        non:"non",
        suspendre:"suspendre",
        arreter:"arreter",
        verifier:"verifier",
        instantiate:"instantiate",
        annuler:"annuler",
    };


    public static DROIT = (() => {
        let result = {};
        let droitDeBase = [UserCte.DROIT.gestionDesMacroCommandes];

        // par défaut tous les fields ont les droits de base
        for (const key in FieldMacroCommandeCte.FIELD) {
            let value = FieldMacroCommandeCte.FIELD[key];
            result[value] = droitDeBase;
        }

        return result;
    })();

    public static CTX = (() => {
        let result = {};

        let contexteDeBase = [CtxCte.CTX.LIST_MODELE_MACRO, CtxCte.CTX.DETAIL_MACRO, CtxCte.CTX.GESTION_MACRO_COMMANDE, CtxCte.CTX.PAC_MACRO_COMMANDE];
        // par défaut tous les fields ont les contexte de base
        for (const key in FieldMacroCommandeCte.FIELD) {
            let value = FieldMacroCommandeCte.FIELD[key];
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
