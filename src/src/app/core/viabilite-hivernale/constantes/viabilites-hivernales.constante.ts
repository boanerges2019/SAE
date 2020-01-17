import * as _ from 'underscore';
import { CtxCte } from 'app/shared/services/constantes/ctx.constantes';
import { UserCte } from 'app/shared/services/constantes/user.constantes';


/**
 * Entité de représentation les constantes des stratégies.
 */
export class ViabilitesHivernalesServiceCte {

    public static FIELDS = {
        CIRCUIT_1:"ZI-VH-CESAM",
        CIRCUIT_2:"ZI-VH-LA-PRAZ",
        TEMPERATURE:"SME0.TM.TEMPERATURE",
        TEMPERATURE_CHAUSSE:"SME0.TM.TEMPERATURE_CHAUSSEE",
        TEMPERATURE_POINT_CONGELATION:"SME0.TM.TEMPERATURE_POINT_DE_CONGELATION",
        TEMPERATURE_PT_ROSEE: "SME0.TM.TEMPERATURE_POINT_DE_ROSEE",
        TEMPERATURE_SOUS_SOL:"SME0.TM.TEMPERATURE_DE_SOUS_SOL",
        HUMIDITE_RELATIF_AIR:"SME0.TM.HUMIDITE_RELATIF_AIR",
        VITESSE_DU_VENT:"SME0.TM.VITESSE_VENT_MAX",
        SME:"SME0",
        GEO:"GEO0",
        ALARME_PLUIE:"SME0.DPA.ALARME_PLUIE_ATT.ALERTEETAT",
        ALARME_VERGLAS:"SME0.DPA.ALARME_RISQUE_VERGLAS_ATT.ALERTEETAT",
        ALARME_NEIGE:"SME0.DPA.ALARME_NEIGE_ATT.ALERTEETAT",
        ETAT_CHAUSSEE:"SME0.DPS.HUMIDITE_CHAUSSEE",
        ASTREINTE_PRENOM:"PERSONNE_PHYSIQUE.PRENOM",
        ASTREINTE_PORTABLE:"CONTACT.NUM_TEL_POR_1",
        ASTREINTE_RADIO:"CONTACT.NUM_TEL_TETRA",
        VEHICLE_TYPE:"GEO0.TYPE",
        VEHICLE_TYPE_PL_SFTRF:"EQP_TYPE_VEHICULE.PL_SFTRF",
        VEHICLE_TYPE_PL_AFFRETE:"EQP_TYPE_VEHICULE.PL_AFFRETE",
        HORADATE_POSITION:"GEO0.TM.HORODATE_POSITION",
        VEHICLE_AXE:"GEO0.DPM.AXE",
        VEHICLE_SENS:"GEO0.DPM.SENS",
        VEHICLE_PR:"GEO0.DPM.PR_NUM",
        VEHICLE_PR_DIST:"GEO0.DPM.PR_DIST",
        VEHICLE_POINT_PARTICULIER:"GEO0.DPM.POINT_PARTICULIER",
        VEHICLE_HORS_TRACE:"GEO0.TS.HORS_TRACE",
        mettreAjour:"mettreAjour",
        envoiDonnees:"envoiDonnees",
        envoiReseau:"envoiReseau"
    }

    public static VALEURS_ENUMERATIONS = {
        VH_COND_CHAUSSEE:"VH_COND_CHAUSSEE",
        VH_EQP_SPECIAUX:"VH_EQP_SPECIAUX",
        VH_ETAT_CHAUSSEE:"VH_ETAT_CHAUSSEE",
        VH_ETAT_TRAITEMENT:"VH_ETAT_TRAITEMENT",
        VH_METEO:"VH_METEO",
        VH_TENDANCE_CC:"VH_TENDANCE_CC",
        VH_VENT:"VH_VENT"
    }

    public static CODES_ASTREINTES = {
        PRAZ:"AST-VH-LA-PRAZ",
        CESAM:"AST-VH-CESAM",
    }


    public static DROIT = (() => {
        let result = {};
        let droitDeBase = [UserCte.DROIT.gestionDeLaViabiliteHivernale];

        // par défaut tous les fields ont les droits de base
        for (const key in ViabilitesHivernalesServiceCte.FIELDS) {
            let value = ViabilitesHivernalesServiceCte.FIELDS[key];
            result[value] = droitDeBase;
        }

        return result;
    })();

    public static CTX = (() => {
        let result = {};

        let contexteDeBase = [CtxCte.CTX.VIABILITE_HIVERNALES];
        // par défaut tous les fields ont les contexte de base
        for (const key in ViabilitesHivernalesServiceCte.FIELDS) {
            let value = ViabilitesHivernalesServiceCte.FIELDS[key];
            result[value] = contexteDeBase;
        }
        result[ViabilitesHivernalesServiceCte.FIELDS["mettreAjour"]] = [CtxCte.CTX.VIABILITE_HIVERNALES];
        result[ViabilitesHivernalesServiceCte.FIELDS["envoiDonnees"]] = [CtxCte.CTX.VIABILITE_HIVERNALES];
        result[ViabilitesHivernalesServiceCte.FIELDS["envoiReseau"]] = [CtxCte.CTX.VIABILITE_HIVERNALES];
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

