import { UserCte } from 'app/shared/services/constantes/user.constantes';
import { CtxCte } from 'app/shared/services/constantes/ctx.constantes';

export class FieldStrategieCte {

    public static FIELD = {
        identifiant: 'identifiant',

        // Bouton -----------------------------------------------------------------------------
        editStrategieBtn: 'editStrategieBtn',
        planStrategieBtn: 'planStrategieBtn',
        removeStrategieBtn: 'removeStrategieBtn',
        strategieModel: 'strategieModel',
        manualStrategieCb: 'manualStrategieCb',
        evenementStrategieCb: 'evenementStrategieCb',
        tdpCb: 'tdpCb',
        priorite: 'priorite',
        nature: 'nature',
        nom: 'nom',
        description: 'description',
        state: 'state',
        localisation: 'localisation',
        operateur: 'operateur',
        poste: 'poste',
        horodate: 'horodate',

        mode: ".DPR.COMMANDE_SAE_MODE",
        message: ".DPR.COMMANDE_SAE_MESSAGE",

        ligne1: '.DPR.COMMANDE_SAE_MSG_L1',
        ligne2: '.DPR.COMMANDE_SAE_MSG_L2',
        ligne3: ".DPR.COMMANDE_SAE_MSG_L3",
        ligne4: ".DPR.COMMANDE_SAE_MSG_L4",
        ligne1Alternee: ".DPR.COMMANDE_SAE_MSG_L1_ALT",
        ligne2Alternee: ".DPR.COMMANDE_SAE_MSG_L2_ALT",
        ligne3Alternee: ".DPR.COMMANDE_SAE_MSG_L3_ALT",
        ligne4Alternee: ".DPR.COMMANDE_SAE_MSG_L4_ALT",

        pictogramme: ".DPR.COMMANDE_SAE_PICTO",
        flash: ".DPR.COMMANDE_SAE_FLASH",
        luminosite: ".DPR.COMMANDE_SAE_LUM",

        instantiate: "instantiate",
        pmv: "pmv",
        familleMessage: "familleMessage",
        justificationGauche: "justificationGauche",
        justificationCentre: "justificationCentre",
        justificationDroite: "justificationDroite",

        initialiseBtn: 'initialiseBtn',
        addEquipementBtn: 'addEquipementBtn',
        createStrategieBtn: 'createStrategieBtn',
        associateStrategieBtn: 'associateStrategieBtn',
        editMessageBtn: 'editMessageBtn',
        removeMessageBtn: 'removeMessageBtn',
        simpleRadio: "simpleRadio",
        clignotantRadio: "clignotantRadio",
        alternatRadio: "simpleRadio",
    };


    public static DROIT = (() => {
        let result = {};
        let droitDeBase = [UserCte.DROIT.gestionDesStrategiesAffichage];

        // par défaut tous les fields ont les droits de base
        for (const key in FieldStrategieCte.FIELD) {
            let value = FieldStrategieCte.FIELD[key];
            result[value] = droitDeBase;
        }

        return result;
    })();

    public static CTX = (() => {
        let result = {};

        let contexteDeBase = [CtxCte.CTX.LIST_STRATEGIE, CtxCte.CTX.CREATE_STRATEGIE, CtxCte.CTX.UPDATE_STRATEGIE];
        // par défaut tous les fields ont les contexte de base
        for (const key in FieldStrategieCte.FIELD) {
            let value = FieldStrategieCte.FIELD[key];
            result[value] = contexteDeBase;
        }
        result[FieldStrategieCte.FIELD["createStrategieBtn"]] = [CtxCte.CTX.LIST_STRATEGIE, CtxCte.CTX.PAC_LIST_STRATEGIE];
        result[FieldStrategieCte.FIELD["associateStrategieBtn"]] = [ CtxCte.CTX.PAC_LIST_STRATEGIE];

        result[FieldStrategieCte.FIELD["manualStrategieCb"]] = [CtxCte.CTX.CREATE_STRATEGIE,  CtxCte.CTX.PAC_CREATE_STRATEGIE];
        result[FieldStrategieCte.FIELD["evenementStrategieCb"]] = [CtxCte.CTX.CREATE_STRATEGIE,  CtxCte.CTX.PAC_CREATE_STRATEGIE];
        result[FieldStrategieCte.FIELD["tdpCb"]] = [CtxCte.CTX.CREATE_STRATEGIE,  CtxCte.CTX.PAC_CREATE_STRATEGIE];


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
