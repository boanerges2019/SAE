import { EvenementCte } from 'app/core/evenement/constantes/evenement.constantes';
import { CtxCte } from 'app/shared/services/constantes/ctx.constantes';


/**
* Constante regroupant l'ensemble des catégories des évenements.
*/
export const EVENEMENT_LABELS = (() => {
  let result = {};
  result['categorie'] = {};
  result['evenement'] = {};
  result['balisage'] = {};

  result['evenement']['createButton'] = "Créer l'événement";
  result['balisage']['createButton'] = "Créer le balisage";

  result['ctx'] = {};
  result['ctx']['createButton'] = {};
  result['ctx']['createButton'][CtxCte.CTX.CREATE_EVENEMENT_MANUALLY] = "Créer";
  result['ctx']['createButton'][CtxCte.CTX.CREATE_EVENEMENT_FROM_ALERTE] = "Création d'un événement à partir d'une alerte";
  result['ctx']['createButton'][CtxCte.CTX.CREATE_GROUPE_EVENEMENT] = "Création d'un groupe";
  result['ctx']['createButton'][CtxCte.CTX.UPDATE_ETAT_EVENEMENT] = "Modification état événement";
  result['ctx']['createButton'][CtxCte.CTX.UPDDATE_TYPE_EVENEMENT] = "Modification type événement";


  result['etats'] = {};
  result['etats'][EvenementCte.ETATS_EVENEMENT.enCours] = "En Cours";
  result['etats'][EvenementCte.ETATS_EVENEMENT.prevu] = "Prévu";
  result['etats'][EvenementCte.ETATS_EVENEMENT.signale] = "Signalé";
  result['etats'][EvenementCte.ETATS_EVENEMENT.termine] = "Terminé";
  result['etats'][EvenementCte.ETATS_EVENEMENT.abandonne] = "Abandonné";
  result['etats'][EvenementCte.ETATS_EVENEMENT.cloture] = "Cloturé";

  result['typeEvenement'] = {};
  result['typeEvenement'][''] = "";
  result['typeEvenement'][EvenementCte.TYPES_EVENEMENT.ACC] = "Accident";
  result['typeEvenement'][EvenementCte.TYPES_EVENEMENT.ACI] = "Accident industriel";
  result['typeEvenement'][EvenementCte.TYPES_EVENEMENT.ALE] = "Alerte enlèvement";
  result['typeEvenement'][EvenementCte.TYPES_EVENEMENT.ATF] = "Alternant Tunnel ";
  result['typeEvenement'][EvenementCte.TYPES_EVENEMENT.ANI] = "Animal Sur Chaussee";
  result['typeEvenement'][EvenementCte.TYPES_EVENEMENT.BAS] = "Basculement De Chaussee";
  result['typeEvenement'][EvenementCte.TYPES_EVENEMENT.BOU] = "Bouchon";
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


  // '':'alternantTunnel',
  // '':'animalSurChaussee',
  // '':'basculementDeChaussee',
  // 'bouchon':'bouchon',
  // 'contreSens':'contreSens',
  // 'convoiExceptionnel':'convoiExceptionnel',
  // 'crueTorrentielle':'crueTorrentielle',
  // 'eboulement':'eboulement',
  // 'fermetureTunnel':'fermetureTunnel',
  // 'fuiteTMD':'fuiteTMD',
  // 'detectionHorsGabarit':'detectionHorsGabarit',
  // 'incendie':'incendie',
  // 'incendieBatiment':'incendieBatiment',
  // 'information':'information',
  // 'infrastructure': 'infrastructure',
  // 'malveillance':'malveillance',
  // 'manifestation':'manifestation',
  // 'meteo':'meteo',
  // 'obstacle':'obstacle',
  // 'pgt':'pgt',
  // 'personneSurChaussee':'personneSurChaussee',
  // 'pollutionAtmospherique':'pollutionAtmospherique',
  // 'researArea':'researArea',
  // 'secoursAPersonne':'secoursAPersonne',
  // 'stockage':'stockage',
  // 'travaux':'travaux',
  // 'vehiculeArrete':'vehiculeArrete',
  // 'viabiliteHivernale':'viabiliteHivernale',

  return result;
})();
