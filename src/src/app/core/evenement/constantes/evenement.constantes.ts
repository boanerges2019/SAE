import * as _ from 'underscore';
import { CtxCte } from '../../../../app/shared/services/constantes/ctx.constantes';

/**
* Entité de représentation les constantes sur les évenements
*/
export class EvenementCte {

  public static DEFAULT_GROUP = 'Evénements hors groupes';

  public static ONGLET_LISTE_EVT = {
    evenementsPrevus: 'evenements-prevus',
    evenementsCourants: 'evenements-courants'
  }

  public static PR_REGEXP = /^\d+[+]\d+$/; ///^[0-9]+[+][0-9]+$/;

  public static setPrvalidator = (numero, abscisse) => {
    return new RegExp(`^${numero}[+]${abscisse}$`);
  }

  public static DEFAULT_TYPE_LOCALISANT = "TYPE_LOCALISATION_EVT.PONCTUEL";
  public static DEFAULT_AXE = "AXE-A43";
  public static DEFAULT_SENS = "SENS.PR_CROISSANT";

  public static EVT_EVT = "EVT-EVT"; // autres types evenements
  public static EVT_BAL = "BAL"; // evenement de type balsiage
  public static ALL_CATEGORIES = "CAT_EVT_TOUS"; // evenement de type balsiage



  public static INDICES_VOIES = {
    BAU: 5,
    EXT: 4,
    INS: 3,
    VL: 2,
	VM: 1,
    VR: 0
  }


  public static INPUT = {
    TYPES_LOCALISANT:                   'TYPE_LOCALISATION_EVT',
    TYPES_LOCALISANT_LIEU:              'TYPE_LOCALISATION_EVT.LIEU',
    TYPES_LOCALISANT_ETENDU:            'TYPE_LOCALISATION_EVT.ETENDU',
    TYPES_LOCALISANT_PONCTUEL:          'TYPE_LOCALISATION_EVT.PONCTUEL',
    TYPES_LOCALISANT_ZONE:              'TYPE_LOCALISATION_EVT.ZONE',
    AXES:                               'AXES',
    SENS:                               'SENS',
    SENS_CROISSANT:                     'SENS.PR_CROISSANT',
    SENS_DECROISSANT:                   'SENS.PR_DECROISSANT',
    ORIGINES:                           'EVT_ORIGINE',
    TYPES_LIEUX:                        'TYPES_LIEUX',
    LIEUX:                              'LIEUX',
    VOIES:                              'VOIES',
    NATURES_CHARGEMENT:                 'EVT_CHARGEMENT_VEH',
    CAUSES_ACCIDENT:                    'EVT_CAUSE_ACC',
    COMPLEMENTS_LOCALISATION:           'EVT_COMPLEMENT_LOC',
    TYPES_BOUCHON:                      'EVT_TYPE_BOUCHON',
    NATURES_BOUCHON:                    'EVT_NATURE_BOUCHON',
    SECTEURS:                           'EVT_SECTEUR_CSS',
    TYPES_CONVOI:                       'EVT_TYPE_CONVOI',
    MODES_CIRCULATION:                  'EVT_MODE_BASCULEMENT',
    SITES_INDUSTRIEL:                   'EVT_SITE_INDUS',
    PLANIFICATIONS_ALTERNAT:            'EVT_PLANIF_ATF',
    SOUS_TYPES_ANIMAL:                  'EVT_TYPE_ANIMAL',
    ESPECES_ANIMAL:                     'EVT_ESPECE_ANIMAL',
    CLASSEMENTS_LOCALISATION:           'EVT_CLASSEMENT_LOC',
    CATEGORIES_AST:                     'EVT_CATEGORIE_AST',
    CONSEQUENCES_AST:                   'EVT_CONSEQUENCE_AST',
    TYPES_CRUE:                         'EVT_TYPE_CRUE',
    CATEGORIES_EVENEMENT:               'CATEGORIES_EVENEMENT',
    CATEGORIES_TYPES_EVENEMENT:         'CATEGORIES_TYPES_EVENEMENT',
    TYPES_EVENEMENT:                    'TYPES_EVENEMENT',
    ETATS_EVENEMENT:                    'ETATS_EVENEMENT',
    MOTIFS_FERMETURE:                   'EVT_MOTIF_FTF',
    TYPES_VEHICULES:                    'EVT_TYPE_HGA',
    CAUSES_INCENDIE:                    'EVT_CAUSE_INC',
    TYPES_INFORMATIONS:                 'EVT_TYPE_INFO',
    TYPES_MALVEILLANCE:                 'EVT_TYPE_MALVEILLANCE',
    TYPES_MANIFESTATION:                'EVT_TYPE_MANIF',
    NATURES_METEO:                      'EVT_NATURE_METEO',
    TYPES_OBSTACLES:                    'EVT_TYPE_OBSTACLE',
    TYPES_PERSONNES:                    'EVT_TYPE_PERSONNE',
    SECTEURS_GESTION_TRAFIC:            'EVT_SECTEUR_PGT',
    MESURES_GESTION_TRAFIC:             'EVT_MESURE_PGT',
    POLLUTIONS:                         'EVT_PROC_POLLUTION',
    SOUS_TYPES_RESEAU_AREA:             'EVT_TYPE_AREA',
    DIRECTIONS_RESEAU_AREA:             'EVT_DIRECTION_AREA',
    MOTIFS_SECOURS_PERSONNE:            'EVT_MOTIF_SECOURS',
    MODES_STOCKAGE:                     'EVT_MODE_STOCK',
    MOTIFS_STOCKAGE:                    'EVT_MOTIF_STOCK',
    TYPES_VEHICULES_STOCK:              'EVT_TYPE_VEH_STOCK',
    NATURES_TRAVAUX:                    'EVT_NATURE_TRAVAUX',
    CAUSES_VEHICULE_ARRETE:              'EVT_CAUSE_VEH',
    PARTIE_HAUTE_VIABILITE_HIVERNALE:    'EVT_TRT_VH',
    PARTIE_BASSE_VIABILITE_HIVERNALE:    'EVT_TRT_VH',
    MOTIFS_SUIVI_GENDARMRIE:             'EVT_MOTIF_SECOURS',
    DEPANNEURS_ASTREINTE:                'DEPANNEURS_ASTREINTE',
    DEPANNEURS_MOTIFS:                   'EVT_MOTIF_INTERV',
    DEPANNAGES:                          'EVT_DEPANNAGE',
    INTERVENTIONS_CONJOINTES:            'EVT_MOTIF_INTERV',
    //Attributs spécifique balisage
    TYPE_BALISAGE:                      'BAL_TYPE',
    MOTIF_BALISAGE:                     'BAL_MOTIF'
            
  };

  /**
  * @return la liste des changements d'états possibles.
  * @param etat état source.
  */
  public static getEtatsPossibles(contexte: string, ongletSource: string, etat: string): { [ key: string] : any}  {
    if ([CtxCte.CTX.CREATE_EVENEMENT_MANUALLY].indexOf(contexte) > -1 &&
         ongletSource === EvenementCte.ONGLET_LISTE_EVT.evenementsCourants){
      return {
          default: EvenementCte.ETATS_EVENEMENT.enCours,
          etats: [EvenementCte.ETATS_EVENEMENT.enCours, EvenementCte.ETATS_EVENEMENT.signale]
      };
    } else if ([CtxCte.CTX.CREATE_EVENEMENT_MANUALLY].indexOf(contexte) > -1 &&
                ongletSource === EvenementCte.ONGLET_LISTE_EVT.evenementsPrevus){
      return {
        default: EvenementCte.ETATS_EVENEMENT.prevu,
        etats: [EvenementCte.ETATS_EVENEMENT.prevu]
      };
    } else if ([CtxCte.CTX.UPDATE_ETAT_EVENEMENT].indexOf(contexte) > -1 &&
                ongletSource === EvenementCte.ONGLET_LISTE_EVT.evenementsCourants){
      if (etat === EvenementCte.ETATS_EVENEMENT.enCours) {
        return {
          default: EvenementCte.ETATS_EVENEMENT.termine,
          etats: [EvenementCte.ETATS_EVENEMENT.termine]
        };
      } else if (etat === EvenementCte.ETATS_EVENEMENT.signale) {
        return {
          default: EvenementCte.ETATS_EVENEMENT.enCours,
          etats: [EvenementCte.ETATS_EVENEMENT.enCours, EvenementCte.ETATS_EVENEMENT.abandonne]
        };
      }  else if (etat === EvenementCte.ETATS_EVENEMENT.termine) {
        return {
          default: EvenementCte.ETATS_EVENEMENT.cloture,
          etats: [EvenementCte.ETATS_EVENEMENT.cloture]
        };
      }
    } else if ([CtxCte.CTX.UPDATE_ETAT_EVENEMENT].indexOf(contexte) > -1 &&
                ongletSource === EvenementCte.ONGLET_LISTE_EVT.evenementsPrevus){
      if (etat === EvenementCte.ETATS_EVENEMENT.prevu) {
        return {
          default: EvenementCte.ETATS_EVENEMENT.enCours,
          etats: [EvenementCte.ETATS_EVENEMENT.enCours, EvenementCte.ETATS_EVENEMENT.abandonne]
        };
      }
    }

    return {
      default: undefined,
      etats: _.values(EvenementCte.ETATS_EVENEMENT)
    };
  }

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


  /**
  * Confid regroupant l'ensemble des types des évenements.
  */
  public static TYPES_EVENEMENT = {
      'ACC':'ACC',
      'ACI':'ACI',
      'ALE':'ALE',
      'ATF':'ATF',
      'ANI':'ANI',
      'BAL':'BAL',
      'BAS':'BAS',
      'BOU':'BOU',
      'CTU':'CTU',
      'CSS':'CSS',
      'CEX':'CEX',
      'CRU':'CRU',
      'EBO':'EBO',
      'FTF':'FTF',
      'TMD':'TMD',
      'HGA':'HGA',
      'INC':'INC',
      'INB':'INB',
      'INF':'INF',
      'MAL':'MAL',
      'MAN':'MAN',
      'MET':'MET',
      'OBS':'OBS',
      'PGT':'PGT',
      'PIE':'PIE',
      'POL':'POL',
      'RAR':'RAR',
      'SAP':'SAP',
      'STK':'STK',
      'TRA':'TRA',
      'VEH':'VEH',
      'VHI':'VHI',
  }


  public static COMPOSANTS_EVENEMENT = {
    commun: 'commun',
    localisation: 'localisation',
    emprise: 'emprise',

    evenementSecours : 'evenementSecours',
    evenementDepanneur : 'evenementDepanneur',
    evenementSftrf: 'evenementSftrf',
    evenementExploitation: 'evenementExploitation',
    evenementCommentaire: 'evenementCommentaire',
    vehicules: 'vehicules',
    impliques: 'impliques',
    evenementLiens: 'evenementLiens',


    accidentCaracteristiques: 'accidentCaracteristiques',
    accidentIndustrielCaracteristiques: 'accidentIndustrielCaracteristiques',
    alerteEnlevementCaracteristiques: 'alerteEnlevementCaracteristiques',
    alternatCaracteristiques : 'alternatCaracteristiques',
    animalCaracteristiques: 'animalCaracteristiques',
    basculementCaracteristiques: 'basculementCaracteristiques',
    balisageCaracteristiques: 'balisageCaracteristiques',
    bouchonCaracteristiques: 'bouchonCaracteristiques',
    contresensCaracteristiques: 'contresensCaracteristiques',
    circulationTunnelCaracteristiques: 'circulationTunnelCaracteristiques',
    convoiCaracteristiques: 'convoiCaracteristiques',
    crueCaracteristiques: 'crueCaracteristiques',
    eboulementCaracteristiques: 'eboulementCaracteristiques',
    fermetureCaracteristiques: 'fermetureCaracteristiques',
    fuiteCaracteristiques: 'fuiteCaracteristiques',
    horsGabaritCaracteristiques: 'horsGabaritCaracteristiques',
    incendieCaracteristiques: 'incendieCaracteristiques',
    incendieBatimentCaracteristiques: 'incendieBatimentCaracteristiques',
    informationCaracteristiques: 'informationCaracteristiques',
    malveillanceCaracteristiques: 'malveillanceCaracteristiques',
    manifestationCaracteristiques: 'manifestationCaracteristiques',
    meteoCaracteristiques : 'meteoCaracteristiques',
    obstacleCaracteristiques: 'obstacleCaracteristiques',
    personneCaracteristiques: 'personneCaracteristiques',
    planCaracteristiques: 'planCaracteristiques',
    pollutionCaracteristiques: 'pollutionCaracteristiques',
    reseauAreaCaracteristiques: 'reseauAreaCaracteristiques',
    secoursCaracteristiques : 'secoursCaracteristiques',
    stockageCaracteristiques: 'stockageCaracteristiques',
    travauxCaracteristiques : 'travauxCaracteristiques',
    vehiculeCaracteristiques : 'vehiculeCaracteristiques',
    viabiliteCaracteristiques: 'viabiliteCaracteristiques',

  }

  public static COMPOSANTS_BY_TYPE_EVENEMENT = (() => {
    let result = {};

    let base = [
      EvenementCte.COMPOSANTS_EVENEMENT.commun,
      EvenementCte.COMPOSANTS_EVENEMENT.localisation,
      EvenementCte.COMPOSANTS_EVENEMENT.emprise,
      EvenementCte.COMPOSANTS_EVENEMENT.evenementLiens,
      EvenementCte.COMPOSANTS_EVENEMENT.evenementCommentaire
  ];

    let baseEvenementExploitation = base.concat(EvenementCte.COMPOSANTS_EVENEMENT.evenementSecours,
                                                EvenementCte.COMPOSANTS_EVENEMENT.evenementSftrf,
                                                EvenementCte.COMPOSANTS_EVENEMENT.evenementExploitation,
                                                EvenementCte.COMPOSANTS_EVENEMENT.evenementDepanneur);

    result[EvenementCte.TYPES_EVENEMENT.BAL] = base.concat([EvenementCte.COMPOSANTS_EVENEMENT.balisageCaracteristiques]);
    [
        EvenementCte.COMPOSANTS_EVENEMENT.commun,
        EvenementCte.COMPOSANTS_EVENEMENT.localisation,
        EvenementCte.COMPOSANTS_EVENEMENT.emprise,
        EvenementCte.COMPOSANTS_EVENEMENT.evenementLiens,
        EvenementCte.COMPOSANTS_EVENEMENT.evenementCommentaire
    ];

    result[EvenementCte.TYPES_EVENEMENT.ACC] = baseEvenementExploitation.concat([
                                                              EvenementCte.COMPOSANTS_EVENEMENT.vehicules,
                                                              EvenementCte.COMPOSANTS_EVENEMENT.impliques,
                                                              EvenementCte.COMPOSANTS_EVENEMENT.accidentCaracteristiques]);
    result[EvenementCte.TYPES_EVENEMENT.ACI] = baseEvenementExploitation.concat([EvenementCte.COMPOSANTS_EVENEMENT.accidentIndustrielCaracteristiques, EvenementCte.COMPOSANTS_EVENEMENT.evenementLiens,]);
    result[EvenementCte.TYPES_EVENEMENT.ALE] = baseEvenementExploitation.concat([EvenementCte.COMPOSANTS_EVENEMENT.alerteEnlevementCaracteristiques]);
    result[EvenementCte.TYPES_EVENEMENT.ATF] = baseEvenementExploitation.concat([EvenementCte.COMPOSANTS_EVENEMENT.alternatCaracteristiques]);
    result[EvenementCte.TYPES_EVENEMENT.ANI] = baseEvenementExploitation.concat([EvenementCte.COMPOSANTS_EVENEMENT.animalCaracteristiques]);

    result[EvenementCte.TYPES_EVENEMENT.BAS] = baseEvenementExploitation.concat([EvenementCte.COMPOSANTS_EVENEMENT.basculementCaracteristiques]);
    result[EvenementCte.TYPES_EVENEMENT.BOU] = baseEvenementExploitation.concat([EvenementCte.COMPOSANTS_EVENEMENT.bouchonCaracteristiques]);
    result[EvenementCte.TYPES_EVENEMENT.CTU] = base.concat([EvenementCte.COMPOSANTS_EVENEMENT.circulationTunnelCaracteristiques]);
    result[EvenementCte.TYPES_EVENEMENT.CSS] = baseEvenementExploitation.concat([EvenementCte.COMPOSANTS_EVENEMENT.vehicules, EvenementCte.COMPOSANTS_EVENEMENT.contresensCaracteristiques]);
    result[EvenementCte.TYPES_EVENEMENT.CEX] = baseEvenementExploitation.concat([EvenementCte.COMPOSANTS_EVENEMENT.convoiCaracteristiques]);
    result[EvenementCte.TYPES_EVENEMENT.CRU] = baseEvenementExploitation.concat([EvenementCte.COMPOSANTS_EVENEMENT.crueCaracteristiques]);
    result[EvenementCte.TYPES_EVENEMENT.EBO] = baseEvenementExploitation.concat([EvenementCte.COMPOSANTS_EVENEMENT.eboulementCaracteristiques]);
    result[EvenementCte.TYPES_EVENEMENT.FTF] = baseEvenementExploitation.concat([EvenementCte.COMPOSANTS_EVENEMENT.fermetureCaracteristiques]);
    result[EvenementCte.TYPES_EVENEMENT.TMD] = baseEvenementExploitation.concat([EvenementCte.COMPOSANTS_EVENEMENT.fuiteCaracteristiques]);
    result[EvenementCte.TYPES_EVENEMENT.HGA] = baseEvenementExploitation.concat([EvenementCte.COMPOSANTS_EVENEMENT.horsGabaritCaracteristiques]);
    result[EvenementCte.TYPES_EVENEMENT.INC] = baseEvenementExploitation.concat([
                                                              EvenementCte.COMPOSANTS_EVENEMENT.vehicules,
                                                              EvenementCte.COMPOSANTS_EVENEMENT.impliques,
                                                              EvenementCte.COMPOSANTS_EVENEMENT.incendieCaracteristiques]);
    result[EvenementCte.TYPES_EVENEMENT.INB] = baseEvenementExploitation.concat([
                                                              EvenementCte.COMPOSANTS_EVENEMENT.vehicules,
                                                              EvenementCte.COMPOSANTS_EVENEMENT.impliques,
                                                              EvenementCte.COMPOSANTS_EVENEMENT.incendieBatimentCaracteristiques]);
    result[EvenementCte.TYPES_EVENEMENT.INF] = baseEvenementExploitation.concat([EvenementCte.COMPOSANTS_EVENEMENT.informationCaracteristiques]);
    result[EvenementCte.TYPES_EVENEMENT.MAL] = baseEvenementExploitation.concat([
                                                              EvenementCte.COMPOSANTS_EVENEMENT.malveillanceCaracteristiques,
                                                              EvenementCte.COMPOSANTS_EVENEMENT.impliques]);
    result[EvenementCte.TYPES_EVENEMENT.MAN] = baseEvenementExploitation.concat([EvenementCte.COMPOSANTS_EVENEMENT.manifestationCaracteristiques]);
    result[EvenementCte.TYPES_EVENEMENT.MET] = baseEvenementExploitation.concat([EvenementCte.COMPOSANTS_EVENEMENT.meteoCaracteristiques]);
    result[EvenementCte.TYPES_EVENEMENT.OBS] = baseEvenementExploitation.concat([EvenementCte.COMPOSANTS_EVENEMENT.obstacleCaracteristiques]);
    result[EvenementCte.TYPES_EVENEMENT.PIE] = baseEvenementExploitation.concat([EvenementCte.COMPOSANTS_EVENEMENT.personneCaracteristiques]);
    result[EvenementCte.TYPES_EVENEMENT.PGT] = baseEvenementExploitation.concat([EvenementCte.COMPOSANTS_EVENEMENT.planCaracteristiques]);
    result[EvenementCte.TYPES_EVENEMENT.POL] = baseEvenementExploitation.concat([EvenementCte.COMPOSANTS_EVENEMENT.pollutionCaracteristiques]);
    result[EvenementCte.TYPES_EVENEMENT.RAR] = baseEvenementExploitation.concat([EvenementCte.COMPOSANTS_EVENEMENT.reseauAreaCaracteristiques]);
    result[EvenementCte.TYPES_EVENEMENT.SAP] = baseEvenementExploitation.concat([
                                                                  EvenementCte.COMPOSANTS_EVENEMENT.vehicules,
                                                                  EvenementCte.COMPOSANTS_EVENEMENT.impliques,
                                                                  EvenementCte.COMPOSANTS_EVENEMENT.secoursCaracteristiques]);
    result[EvenementCte.TYPES_EVENEMENT.STK] = baseEvenementExploitation.concat([EvenementCte.COMPOSANTS_EVENEMENT.stockageCaracteristiques]);
    result[EvenementCte.TYPES_EVENEMENT.TRA] = baseEvenementExploitation.concat([EvenementCte.COMPOSANTS_EVENEMENT.travauxCaracteristiques]);
    result[EvenementCte.TYPES_EVENEMENT.VEH] = baseEvenementExploitation.concat([
                                                                  EvenementCte.COMPOSANTS_EVENEMENT.vehiculeCaracteristiques,
                                                                  EvenementCte.COMPOSANTS_EVENEMENT.vehicules,
                                                                  EvenementCte.COMPOSANTS_EVENEMENT.impliques]);
    result[EvenementCte.TYPES_EVENEMENT.VHI] = baseEvenementExploitation.concat([EvenementCte.COMPOSANTS_EVENEMENT.viabiliteCaracteristiques]);
    return result;
  })();
}
