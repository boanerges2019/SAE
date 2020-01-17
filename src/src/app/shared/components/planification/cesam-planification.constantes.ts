import { UserCte } from '../../../../app/shared/services/constantes/user.constantes';
import { CtxCte } from '../../../../app/shared/services/constantes/ctx.constantes';

export class CesamPlanificationCte {
    /* journées */
    static JOURNEES = [{
        nom: "Lundi",
        model: "lundi",
        isActive: false
    }, {
        nom: "Mardi",
        model: "mardi",
        isActive: false
    }, {
        nom: "Mercredi",
        model: "mercredi",
        isActive: false
    }, {
        nom: "Jeudi",
        model: "jeudi",
        isActive: false
    }, {
        nom: "Vendredi",
        model: "vendredi",
        isActive: false
    }, {
        nom: "Samedi",
        model: "samedi",
        isActive: false
    }, {
        nom: "Dimanche",
        model: "dimanche",
        isActive: false
    }];

    /* Plages Horaires */
    static PLAGES_HORAIRES = [
        {
            id:0,
            idPrec:23,
            idSuiv:1,
            horaire: "00:00"
        },{
            id:1,
            idPrec:0,
            idSuiv:2,
            horaire: "01:00"
        },{
            id:2,
            idPrec:1,
            idSuiv:3,
            horaire: "02:00"
        },{
            id:3,
            idPrec:2,
            idSuiv:4,
            horaire: "03:00"
        },{
            id:4,
            idPrec:3,
            idSuiv:4,
            horaire: "04:00"
        },{
            id:5,
            idPrec:4,
            idSuiv:6,
            horaire: "05:00"
        },{
            id:6,
            idPrec:5,
            idSuiv:7,
            horaire: "06:00"
        },{
            id:7,
            idPrec:6,
            idSuiv:8,
            horaire: "07:00"
        },{
            id:8,
            idPrec:7,
            idSuiv:9,
            horaire: "08:00"
        },{
            id:9,
            idPrec:8,
            idSuiv:10,
            horaire: "09:00"
        },{
            id:10,
            idPrec:9,
            idSuiv:11,
            horaire: "10:00"
        },{
            id:11,
            idPrec:10,
            idSuiv:12,
            horaire: "11:00"
        },{
            id:12,
            idPrec:11,
            idSuiv:13,
            horaire: "12:00"
        },{
            id:13,
            idPrec:12,
            idSuiv:14,
            horaire: "13:00"
        },{
            id:14,
            idPrec:13,
            idSuiv:15,
            horaire: "14:00"
        },{
            id:15,
            idPrec:14,
            idSuiv:16,
            horaire: "15:00"
        },{
            id:16,
            idPrec:15,
            idSuiv:17,
            horaire: "16:00"
        },{
            id:17,
            idPrec:16,
            idSuiv:18,
            horaire: "17:00"
        },{
            id:18,
            idPrec:17,
            idSuiv:19,
            horaire: "18:00"
        },{
            id:19,
            idPrec:18,
            idSuiv:20,
            horaire: "19:00"
        },{
            id:20,
            idPrec:19,
            idSuiv:21,
            horaire: "20:00"
        },{
            id:21,
            idPrec:20,
            idSuiv:22,
            horaire: "21:00"
        },{
            id:22,
            idPrec:21,
            idSuiv:23,
            horaire: "22:00"
        },{
            id:23,
            idPrec:22,
            idSuiv:0,
            horaire: "23:00"
        }
    ];

    static FIELD = {
        detail: "detail",
        date:"date",
        supprimer: "supprimer",
        dateDebut:"dateDebut",
        dateFin:"dateFin",
        calendrier:"calendrier",
        plageHoraire:"plageHoraire",
        confLancement:"confLancement",
        statutCalendrier:"statutCalendrier",
        annuler:'annuler',
        valider:'valider'
    };

    public static DROIT = (() => {
        let result = {};
        let droitDeBase = [UserCte.DROIT.gestionDesMacroCommandes];

        // par défaut tous les fields ont les droits de base
        for (const key in CesamPlanificationCte.FIELD) {
            let value = CesamPlanificationCte.FIELD[key];
            result[value] = droitDeBase;
        }

        return result;
    })();

    public static CTX = (() => {
        let result = {};

        let contexteDeBase = [CtxCte.CTX.PLANIFICATION_MACRO, CtxCte.CTX.LIST_MODELE_MACRO, CtxCte.CTX.GESTION_MACRO_COMMANDE];
        // par défaut tous les fields ont les contexte de base
        for (const key in CesamPlanificationCte.FIELD) {
            let value = CesamPlanificationCte.FIELD[key];
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
