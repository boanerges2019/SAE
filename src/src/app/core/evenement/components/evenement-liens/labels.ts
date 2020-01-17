import { EvenementCte } from 'app/core/evenement/constantes/evenement.constantes';

export const LABELS = (() => {
    let result: { [key: string]: any } = {};

    result['evenement'] = 'Balisage(s)';
    result['balisage'] = 'Evénement(s)';

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
