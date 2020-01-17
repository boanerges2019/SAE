import { UserCte } from 'app/shared/services/constantes/user.constantes';
import { CtxCte } from 'app/shared/services/constantes/ctx.constantes';
import { TabDefinition } from 'app/shared/components/abstract-tab/tab-definition';

export class FieldBulletinsCte {

    public static TABS: { [key: string]: TabDefinition } = {
        TAB_BULLETINS_PLANIFIES: new TabDefinition(1,'TAB_BULLETINS_PLANIFIES','Bulletins planifiés','Bulletins planifiés','setActiveTab("TAB_BULLETINS_PLANIFIES")'),
        TAB_PREPARATIONS_ENVOIS: new TabDefinition(2,'TAB_PREPARATIONS_ENVOIS','Préparations Envois','Préparations Envois','setActiveTab("TAB_PREPARATIONS_ENVOIS")'),
    }

    public static FIELD = {
        // Bouton -----------------------------------------------------------------------------
        create: 'createBulletinsBtn',
        selectModelBulletins:'selectModelBulletins',
        planifier:'planifierBulletinsBtn',
        annuler:'annuler',
        valider:'valider',
        actions:'actions'
    };

    public static CODE_TYPE = {
        TEXTUELLE_BORNEE: "TYPE_VALEUR_POSSIBLE.TEXTUELLE_BORNEE",
        ENUMERATION: "TYPE_VALEUR_POSSIBLE.ENUMERATION",
        REQUETE: "TYPE_VALEUR_POSSIBLE.REQUETE",
        OBJET_INFERENCE: "TYPE_VALEUR_POSSIBLE.OBJET_INFERENCE",
        LOCALISANT: "TYPE_VALEUR_POSSIBLE.LOCALISANT",
        ENTIER_BORNEE: "TYPE_VALEUR_POSSIBLE.ENTIER_BORNEE",
        LIBRE: "TYPE_VALEUR_POSSIBLE.LIBRE",
        EXPRESSION_REGULIERE: "TYPE_VALEUR_POSSIBLE.EXPRESSION_REGULIERE",
        NUMERIQUE_BORNEE: "TYPE_VALEUR_POSSIBLE.NUMERIQUE_BORNEE",
    };

    public static TYPE_MODELE = {
        EVENEMENT: "Evenement",
    };

    public static EVT_EVT = "EVT-EVT";
    /** liste des évenements. */
    public static ETATS_EVENEMENT = {
        enCours: "EVT_ETAT.ENCOURS",
        signale: "EVT_ETAT.SIGNALE",
        prevu: "EVT_ETAT.PREVU",
        termine: "EVT_ETAT.TERMINE",
        abandonne: "EVT_ETAT.ABANDONNE",
        cloture: "EVT_ETAT.CLOTURE",
        archive: "EVT_ETAT.ARCHIVE",
    }

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

    /* Plages Horaires */
    static PERIODICITES = [
        {
            id:0,
            idPrec:12,
            idSuiv:1,
            periodicite: 0
        },{
            id:1,
            idPrec:0,
            idSuiv:2,
            periodicite: 5
        },{
            id:2,
            idPrec:1,
            idSuiv:3,
            periodicite: 10
        },{
            id:3,
            idPrec:2,
            idSuiv:4,
            periodicite: 15
        },{
            id:4,
            idPrec:3,
            idSuiv:4,
            periodicite: 20
        },{
            id:5,
            idPrec:4,
            idSuiv:6,
            periodicite: 25
        },{
            id:6,
            idPrec:5,
            idSuiv:7,
            periodicite: 30
        },{
            id:7,
            idPrec:6,
            idSuiv:8,
            periodicite: 35
        },{
            id:8,
            idPrec:7,
            idSuiv:9,
            periodicite: 40
        },{
            id:9,
            idPrec:8,
            idSuiv:10,
            periodicite: 45
        },{
            id:10,
            idPrec:9,
            idSuiv:11,
            periodicite: 50
        },{
            id:11,
            idPrec:10,
            idSuiv:12,
            periodicite: 55
        },{
            id:12,
            idPrec:11,
            idSuiv:0,
            periodicite: 60
        }
    ];


    public static DROIT = (() => {
        let result = {};
        let droitDeBase = [UserCte.DROIT.gestionDesBulletins];

        // par défaut tous les fields ont les droits de base
        for (const key in FieldBulletinsCte.FIELD) {
            let value = FieldBulletinsCte.FIELD[key];
            result[value] = droitDeBase;
        }

        return result;
    })();

    public static CTX = (() => {
        let result = {};

        let contexteDeBase = [CtxCte.CTX.LIST_BULLETINS_PREPARATIONS_ENVOIES_PLANIFIES,CtxCte.CTX.LIST_BULLETINS_PREPARATIONS_ENVOIES,
                                CtxCte.CTX.BULLETIN_PLANIFICATION_PREPARATION_ENVOI, CtxCte.CTX.BULLETIN_EDITION_PREPARATION_ENVOI,
                                CtxCte.CTX.BULLETIN_CREATE_PREPARATION_ENVOI];
        // par défaut tous les fields ont les contexte de base
        for (const key in FieldBulletinsCte.FIELD) {
            let value = FieldBulletinsCte.FIELD[key];
            result[value] = contexteDeBase;
        }
        result[FieldBulletinsCte.FIELD["create"]] = [CtxCte.CTX.LIST_BULLETINS_PREPARATIONS_ENVOIES];
        result[FieldBulletinsCte.FIELD["planifier"]] = [CtxCte.CTX.LIST_BULLETINS_PREPARATIONS_ENVOIES_PLANIFIES];
        return result;
    })();

    /**
     * Déclaration des champs éditables selon l'etat.
     */
    public static ETAT = (() => {
        let result = {};
        return result;
    })();

}
