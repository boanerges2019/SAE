import { UserCte } from '../../../../app/shared/services/constantes/user.constantes';
import { CtxCte } from '../../../../app/shared/services/constantes/ctx.constantes';
import { EvenementCte } from './evenement.constantes';

export class FieldEvenementCte {

    public static FIELD = {
        identifiant: 'identifiant',
        valeur: 'valeur',
        codeInfoModele: 'codeInfoModele',
        // Evenement grouping -----------------------------------------------------------------------------
        groupe: 'EVT.GROUPE',
        checked: 'checked', // transient
        // Evenement nouveau -----------------------------------------------------------------------------
        categorie: 'categorie', // La catégorie du type de l'évenement
        type: 'codeModele',
        etat: 'codeEtat',
        nomLocalisant: 'nomLocalisant',
        versionEvenement: 'versionEvenement',
        operateur: 'operateur',
        // Evenement Commun -----------------------------------------------------------------------------
        horodateCreation: 'horodateCreation',
        horodateDebutPrevue: 'horodateDebutPrevue',
        horodateDebut: 'horodateDebut',
        horodateFinPrevue: 'horodateFinPrevue',
        horodateFin: 'horodateFin',
        origine: 'EVT.ORIGINE', // Origine
        dureePrevue: 'EVT.DUREE_PREVUE', // Durée prévue
        informerWebTrafic: 'EVT.INFO_WEB_TRAFIC', // Informer Web Trafic
        // Evenement localisant -----------------------------------------------------------------------------
        typeLocalisant: 'codeModeLocalisation',
        axe: 'codeAxe',
        sens: 'codeSensDebut',
        typeLieu: 'typeLieu',
        lieu: 'codelieu',
        complementLocalisation: 'EVT.COMPLEMENT_LOC', // Complément de localisation
        commune: 'EVT.COMMUNE', // Commune
        longeurLocalisation: 'EVT.LONGUEUR',
        prDebut: 'prDebut',
        prFin: 'prFin',
        impliqueDeuxSens: 'EVT.DEUX_SENS', // Implique les deux sens
        // Evenement Emprise -----------------------------------------------------------------------------
        // Evenement Caractéristiques (accident) -----------------------------------------------------------------------------
        gravitePersonnesImpliquees: 'EVT.GRAVITE', // Gravité des personnes impliquées
        presenceBlesses: 'EVT.PRESENCE_BLESSES', // Présence de blessés
        presenceVIP: 'EVT.PRESENCE_VIP', // Présence de VIP
        nbPersonnesImpliquees: 'EVT.NB_IMPLIQUES', // Nombre de personnes impliquées
        indemnes: 'EVT.NB_INDEMNES', // Nombre de personnes indemnes
        blessesLegers: 'EVT.NB_BLESSES_LEGERS', // Nombre de blessés légers
        blessesGraves: 'EVT.NB_BLESSES_GRAVES', // Nombre de blessés graves
        decedes: 'EVT.NB_DECEDES', // Nombre de décédés
        nbVehiculesImpliques: 'EVT.NB_VEHICULES', // Nombre de véhicules impliqués
        typesVehiculesImpliques: 'EVT.VEHICULES_IMPLIQUES', // Types des véhicules impliqués
        vl: 'EVT.NB_VL_IMPLIQUES', // Nombre de VL impliqués
        pl: 'EVT.NB_PL_IMPLIQUES', // Nombre de PL impliqués
        moto: 'EVT.NB_MOTOS_IMPLIQUEES', // Nombre de motos impliquées
        bus: 'EVT.NB_BUS_IMPLIQUES', // Nombre de bus impliqués
        tmd: 'EVT.NB_TMD_IMPLIQUES', // EVT.NB_TMD_IMPLIQUES
        velo: 'EVT.NB_VELOS_IMPLIQUES', // Nombre de vélos impliqués
        pieton: 'EVT.NB_PIETONS_IMPLIQUES', // Nombre de piétons impliqués
        natureChargement: 'EVT.NATURE_CHARGEMENT', // Nature du chargement
        causeAccident: 'ACC.CAUSE_ACCIDENT', // Cause de l'accident
        degatsAuxDomaines: 'EVT.DEGATS_DOMAINE', // Dégâts au domaine
        descriptionDegatsAuxDomaines: 'EVT.DESCRIPTION_DEGATS', // Description des dégâts au domaine
        // Evenement Caractéristiques (accident industriel) -----------------------------------------------------------------------------
        siteIndustriel: 'ACI.SITE_INDUS', // Site industriel
        horodateDebutConfinement: 'EVT.HD_DEBUT_CONFINEMENT',
        horodateFinConfinement: 'EVT.HD_FIN_CONFINEMENT',
        // Caractéristiques (alerte enlèvement) -----------------------------------------------------------------------------
        debutAffichagePmv: 'ALE.HD_DEBUT_AFFICHAGE', // Horodate de début d'affichage PMV
        finAffichagePmv: 'ALE.HD_FIN_AFFICHAGE', // Horodate de fin d'affichage PMV
        nbPmvUtilise: 'ALE.NB_PMV_UTILISES', // Nombre de PMV utilisés
        //Caractéristiques (alternat Tunnel du Fréjus) -----------------------------------------------------------------------------
        planificationAlternat: 'ATF.PLANIFICATION', // Planification alternat
        alternatExceptionnel: 'ATF.EXCEPTIONNEL', // Alternat exceptionnel
        //  Caractéristiques (animal sur la chaussée) -----------------------------------------------------------------------------
        sousTypeAnimal: 'ANI.TYPE_ANIMAL', // Type d'animal errant
        especeAnimal: 'ANI.ESPECE_ANIMAL', // Espèce d'animal
        //  Caractéristiques (basculement de chaussée) -----------------------------------------------------------------------------
        modeDeCirculation: 'BAS.MODE_CIRCULATION', // Mode de circulation
        miseEnCirculationADoubleSens: 'BAS.HD_DOUBLE_SENS', // Horodate de mise en circulation à double sens
        itpcDoubleSens: 'BAS.ITPC_DOUBLE_SENS', // ITPC de mise en circulation à double sens
        miseEnCirculationASensUnique: 'BAS.HD_SENS_UNIQUE', // Horodate de retour en sens unique
        itpcSensUnique: 'BAS.ITPC_SENS_UNIQUE', // ITPC de retour en sens unique
        //  Caractéristiques (bouchon) -----------------------------------------------------------------------------
        typeBouchon: 'BOU.TYPE', // Type de bouchon
        natureBouchon: 'BOU.NATURE', // Nature du bouchon
        hkm: 'BOU.HKM', // Encombrement (h.Km) du bouchon
        longueurMaxiBouchon: 'BOU.LONGUEUR_MAX', // Longueur maximale (m) du bouchon
        // Caractéristiques (contresens) -----------------------------------------------------------------------------
        secteurContreSens: 'CSS.SECTEUR', // Secteur du contresens
        vehiculeIntercepteContreSens: 'CSS.INTERCEPTION', // Véhicule intercepté
        // Caractéristiques (convoi exceptionnel) -----------------------------------------------------------------------------
        typeConvoi: 'CEX.TYPE_CONVOI', // Type de convoi exceptionnel
        nbDePlEnConvoi: 'CEX.NB_PL_CONVOI', // Nombre de PL en convoi
        accordDePassage: 'CEX.ACCORD_PASSAGE', // Accord de passage du convoi
        // Caractéristiques (crue torrentielle) -----------------------------------------------------------------------------
        typeCrue: 'CRU.TYPE_CRUE', // Type de crue torrentielle
        //Caractéristiques (éboulement) -----------------------------------------------------------------------------

        //Caractéristiques (fermeture Tunnel du Fréjus) -----------------------------------------------------------------------------
        motifDeFermeture: 'FTF.MOTIF_FERMETURE', // Motif fermeture tunnel du Fréjus
        //Caractéristiques (Caractéristiques (Fuite TMD)) -----------------------------------------------------------------------------
        codeDanger: 'TMD.CODE_DANGER',
        codeMatiere: 'TMD.CODE_MATIERE',
        debutConfinement: 'EVT.HD_DEBUT_CONFINEMENT',
        finConfinement: 'EVT.HD_FIN_CONFINEMENT',
        //Caractéristiques (hors Gabarit) -----------------------------------------------------------------------------
        hauteurChargement: 'HGA.HAUTEUR', // Hauteur du chargement
        typeDeVehicule: 'HGA.TYPE_VEH', // Type de véhicule hors gabarit
        stoppeParDispositifDeRetenue: 'HGA.STOPPE_DISP', // Stoppé par dispositif de retenue
        stoppeParPersonnel: 'HGA.STOPPE_PERS', // Stoppé par personnel SFTRF
        //Caractéristiques (incendie) -----------------------------------------------------------------------------
        numeroRepereIncendie: 'INC.REPERE', // Numéro de repère incendie
        numeroRepereForce: 'INC.REPERE_FORCE', // Numéro de repère forcé
        incendieMobile: 'INC.MOBILE', // Incendie mobile
        causeIncendie: 'INC.CAUSE_INCENDIE', // Cause de l'incendie
        // Caractéristiques (information particulière) -----------------------------------------------------------------------------
        typeInformation: 'INF.TYPE_INFO', // Type d'information particulière
        // Caractéristiques (malveillance) -----------------------------------------------------------------------------
        typeMalveillance: 'MAL.TYPE_MALVEILLANCE', // Type de malveillance
        // Caractéristiques (malveillance) -----------------------------------------------------------------------------
        typeManifestation: 'MAN.TYPE_MANIF', // Type de manifestation
        mobileManifestation: 'MAN.MOBILE', // Manifestation mobile
        // Caractéristiques (météo) -----------------------------------------------------------------------------
        natureMeteo: 'MET.NATURE', // Nature du phénomène météo
        // Caractéristiques (obstacle sur chaussée) -----------------------------------------------------------------------------
        typeObstacle: 'OBS.TYPE_OBSTACLE', // Type d'obstacle sur chaussée
        // Caractéristiques (personne sur chaussée) -----------------------------------------------------------------------------
        typePersonne: 'PIE.TYPE_PERSONNE', // Type de personne
        // Caractéristiques (plan de gestion de trafic) -----------------------------------------------------------------------------
        secteurGestionTrafic: 'PGT.SECTEUR', // Secteur du PGT
        mesureGestionTrafic: 'PGT.MESURE', // Mesure du PGT
        // Caractéristiques (pollution atmosphérique) -----------------------------------------------------------------------------
        zoneUrbainePaysDeSavoie: 'POL.ZU_PAYS_SAVOIE', // Procédure Zone Urbaine Pays de Savoie
        maurienneTarentaise: 'POL.MAURIENNE_TAR', // Procédure Maurienne-Tarentaise
        // Caractéristiques (réseau AREA) -----------------------------------------------------------------------------
        sousTypeReseauArea: 'RAR.SOUS_TYPE', // Type d'événement AREA
        directionReseauArea: 'RAR.DIRECTION', // Direction de l'événement AREA
        prReseauArea: 'RAR.DISTANCE', // Distance à l'événement AREA
        // Caractéristiques (secours à personne) -----------------------------------------------------------------------------
        motifSecoursPersonne: 'SAP.MOTIF_SECOURS', // Motif secours à personne
        personnelSftrf: 'SAP.PERS_SFTRF', // Personnel SFTRF
        accidentTravail: 'SAP.ACC_TRAVAIL', // Accident du travail
        // Caractéristiques (stockage) -----------------------------------------------------------------------------
        modeStockage: 'STK.MODE_STOCK', // Mode de stockage
        typeVehicule: 'STK.TYPE_VEH_STOCK', // Type des véhicules stockés
        motifStockage: 'STK.MOTIF_STOCK', // Motif du stockage
        nbVehiculesStockes: 'STK.NB_VEH_STOCK', // Nombre de véhicules stockés
        // Caractéristiques (travaux) -----------------------------------------------------------------------------
        listeIntervenantsTravaux: 'TRA.LISTE_INTERVENANTS', // Liste des interventions dépanneurs
        itemIntervenantTravaux: 'TRA.ITEM_INTERVENANT', // Item intervention dépanneurs
        natureTravaux: 'TRA.NATURE',// Nature des travaux
        mobileCbTravaux: 'TRA.MOBILE', // Travaux mobiles
        entrepriseTravaux: 'TRA.ENTREPRISE_INTERV', // Entreprise
        nbPersonnesTravaux: 'TRA.NB_PERS_INTERV', // Nombre de personnes impliquées
        nbVehiculesTravaux: 'TRA.NB_VEH_INTERV', // Nombre de véhicules
        autorisationTravaux: 'TRA.AI_INTERV', // Autorisation d'intervention
        mobileTravaux: 'TRA.MOBILE_INTERV', // Téléphone mobile
        radioTravaux: 'TRA.RADIO_INTERV', // Radio d'exploitation
        dateDebutTravaux: 'TRA.HD_DEBUT_INTERV', // Début d'intervention
        dateFinTravaux: 'TRA.HD_FIN_INTERV', // Fin d'intervention
        // Caractéristiques (véhicule arrêté) -----------------------------------------------------------------------------
        depannageVehiculeArrete: 'VEH.DEPANNAGE', // Dépannage
        causeVehiculeArrete: 'VEH.CAUSE_ARRET', // Cause de l'arrêt
        //Caractéristiques (viabilité hivernale) -----------------------------------------------------------------------------
        partieHauteViabiliteHivernale: 'VHI.TRT_HAUT', // Traitement partie haute (La Praz)
        partieBasseViabiliteHivernale: 'VHI.TRT_BAS', // Traitement partie basse (CESAM)
        //Caractéristiques (balisage) -----------------------------------------------------------------------------
        libelleBalisage :                   'BAL.LIBELLE',
        typeBalisage:                       'BAL.TYPE_BALISAGE',
        motifBalisage:                      'BAL.MOTIF_BALISAGE',
        horodatePosePremierPanneauBalisage: 'BAL.HD_POSE_1ER_PANN',
        horodatePoseBiseauBalisage:         'BAL.HD_POSE_BISEAU',
        horodateFinPoseBalisage:            'BAL.HD_FIN_POSE',
        horodateDebutDeposeBalisage:        'BAL.HD_DEBUT_DEPOSE',
        horodateDeposePanneauBalisage:      'BAL.HD_DEPOSE_PANN',    
        horodateDeposeBiseauBalisage:       'BAL.HD_DEPOSE_BISEAU',

        // Interventions secours -----------------------------------------------------------------------------
        listeSuivisGendarmerie: 'EVT.LISTE_INTERV_GN', //Liste des interventions GN
        itemSuiviGendarmerie: 'EVT.ITEM_INTERV_GN', //Item intervention GN
        motifSuiviGendarmerie: 'EVT.MOTIF_GN', // Motif de l'intervention GN
        interventionConjointeSuiviGendarmerie: 'EVT.INTERV_CONJ_GN', // Intervention conjointe GN
        idEvenementConjointSuiviGendarmerie: 'EVT.EVT_INTERV_CONJ_GN', // Evénement intervention conjointe GN
        intervenantSuiviGendarmerie: 'EVT.INTERVENANT_GN', // Gendarmerie intervenue
        horodateAppelSuiviGendarmerie: 'EVT.HD_ALERTE_GN', // Horodate d'alerte GN
        horodateArriveeLieuSuiviGendarmerie: 'EVT.HD_ARRIVEE_GN', // Horodate d'arrivée sur les lieux GN
        horodateQuitteLieuSuiviGendarmerie: 'EVT.HD_FIN_GN', // Horodate de départ des lieux GN
        listeSuivisSapeurPompier: 'EVT.LISTE_INTERV_SP', // Liste des interventions SP
        itemSuiviSapeurPompier: 'EVT.ITEM_INTERV_SP', // Item intervention SP
        vehiculeSuiviSapeurPompier: 'EVT.VEHICULES_SP', // Véhicules mobilisés SP
        interventionConjointeSuiviSapeurPompier: 'EVT.INTERV_CONJ_SP', // Intervention conjointe SP
        idEvenementConjointSuiviSapeurPompier: 'EVT.EVT_INTERV_CONJ_SP', // Evénement intervention conjointe SP
        intervenantSuiviSapeurPompier: 'EVT.INTERVENANT_SP', // Pompiers intervenus
        horodateAppelSuiviSapeurPompier: 'EVT.HD_ALERTE_SP', // Horodate d'alerte SP
        horodateArriveeLieuSuiviSapeurPompier: 'EVT.HD_ARRIVEE_SP', // Horodate d'arrivée sur les lieux SP
        horodateQuitteLieuSuiviSapeurPompier: 'EVT.HD_FIN_SP', // Horodate de départ des lieux SP
        //Interventions dépanneur
        listeInterventionsDepanneur: 'EVT.LISTE_INTERV_DEP', // Liste des interventions dépanneurs
        itemInterventionDepanneur: 'EVT.ITEM_INTERV_DEP', // Item intervention dépanneurs
        depanneurAstreinte: 'EVT.DEPANNEUR_ASTR', // Dépanneur d'astreinte
        depanneurMotif: 'EVT.MOTIF_DEP', // Motif de l'intervention dépanneur
        depannage: 'EVT.DEPANNAGE', // Type de dépannage
        interventionConjointeDepanneur: 'EVT.INTERV_CONJ_DEP', // Intervention conjointe dépanneur
        idEvenementConjointDepanneur: 'EVT.EVT_INTERV_CONJ_DEP', // Evénement intervention conjointe dépanneur
        intervenantDepanneur: 'EVT.INTERVENANT_DEP', // Dépanneur intervenu
        horodateAppelDepanneur: 'EVT.HD_ALERTE_DEP', // Horodate d'alerte dépanneur
        horodateArriveeLieuDepanneur: 'EVT.HD_ARRIVEE_DEP', // Horodate d'arrivée sur les lieux dépanneur
        horodateQuitteLieuDepanneur: 'EVT.HD_FIN_DEP', // Horodate de départ des lieux dépanneur
        // Interventions SFTRF -----------------------------------------------------------------------------
        listeInterventionsSftrf: 'EVT.LISTE_INTERV_SFTRF', // Liste des interventions SFTRF
        itemInterventionSftrf: 'EVT.ITEM_INTERV_SFTRF', // Item intervention SFTRF
        interventionConjointeSftrf: 'EVT.INTERV_CONJ_SFTRF', // Intervention conjointe SFTRF
        idEvenementConjointSftrf: 'EVT.EVT_INTERV_CONJ_SFTRF', // Evénement intervention conjointe SFTRF
        intervenantSftrf: 'EVT.INTERVENANT_SFTRF', // Personnel SFTRF intervenu
        horodateAppelSftrf: 'EVT.HD_ALERTE_SFTRF', // Horodate d'alerte SFTRF
        horodateArriveeLieuSftrf: 'EVT.HD_ARRIVEE_SFTRF', // Horodate d'arrivée sur les lieux SFTRF
        horodateQuitteLieuSftrf: 'EVT.HD_FIN_SFTRF', // Horodate de départ des lieux SFTRF

        // Vehicules -----------------------------------------------------------------------------
        listeVehicules: 'EVT.LISTE_VEHICULES', // Liste des descriptions des véhicules
        itemVehicule: 'EVT.ITEM_VEHICULE', // Item description d'un véhicule
        descriptionVehicule: 'EVT.DESCRIPTION_VEH', // Description d'un véhicule
        degatVehicule: 'EVT.DEGATS_MATERIEL_VEH', // Dégats matériels d'un véhicule
        descriptionDegatVehicule: 'EVT.DESCRIPTION_DEGATS_VEH',

        // Impliqués -----------------------------------------------------------------------------
        listeImpliques: 'EVT.LISTE_PERSONNES', // Liste des coordonnées des impliqués
        itemImplique: 'EVT.ITEM_PERSONNE', // Item description d'un implique
        coordonneesImpliquees: 'EVT.COORDONNEES_PERS', // Coordonnées d'un véhicule

        // Exploitation -----------------------------------------------------------------------------
        indicateurConfirmationExploitation: 'EVT.HD_CONFIRMATION', // Horodate de confirmation (t0 indicateurs)
        indicateur107Exploitation: 'EVT.INDICATEUR_107.7', // Indicateur 107.7
        indicateurPMVExploitation: 'EVT.INDICATEUR_PMV', // Indicateur PMV
        indicateurSftrfExploitation: 'EVT.INDICATEUR_SFTRF', // Indicateur SFTRF
        ficheRexExlploitation: 'EVT.FICHE_REX', // Fiche REX
        referenceRexExploitation: 'EVT.REFERENCE_REX', // Référence de la fiche REX
        classementLocalisationExploitation: 'EVT.CLASSEMENT_LOC', // Classement localisation
        categorieAstExploitation: 'EVT.CATEGORIE_AST', // Catégorie AST
        consequenceAstExploitation: 'EVT.CONSEQUENCE_AST', // Conséquence AST

        // Evenement commentaires -----------------------------------------------------------------------------
        listeCommentaires: 'EVT.COMMENTAIRES', // Liste des commentaires
        itemCommentaire: 'EVT.ITEM_COMMENTAIRE', // Item commentaire
        descriptionCommentaire: 'EVT.TEXTE_COMMENTAIRE', // Texte du commentaire
        horodateCommentaire: 'EVT.HORODATE_COMMENTAIRE', // Horodate du commentaire

        // Evenement liens -----------------------------------------------------------------------------
        evenementCause: 'EVT.CAUSE', // Evénement cause
        alerteSource: 'EVT.ALERTE_SOURCE', // Alerte source
        listeAlertes: 'EVT.LISTE_ALERTES', // Liste des alertes rattachées
        alerteRattachee: 'EVT.ALERTE_RATTACHEE', // Alerte rattachée
        evenementRattache: 'BAL.EVENEMENT_RATTACHE', // evenement rattaché
        balisageRattache: 'EVT.BALISAGE_RATTACHE', // Balisage rattaché
        listeEvenements: 'BAL.LISTE_EVENEMENTS',
        listeBalisages: 'EVT.LISTE_BALISAGES',
        itemEvenement: 'BAL.ITEM_EVENEMENT',
        itemBalisage: 'EVT.ITEM_BALISAGE',

        // Bouton -----------------------------------------------------------------------------
        createEvenementManually: 'createEvenementManually',
        validerUpdateEvenement: 'validerUpdateEvenement',
        emprisesBtn: 'emprisesBtn',
        emprisesSensInverseBtn: 'emprisesSensInverseBtn',
        validerEvenementBtn: 'validerEvenementBtn',
        addSuiviGendarmerieBtn: 'addSuiviGendarmerieBtn',
        removeSuiviGendarmerieBtn: 'removeSuiviGendarmerieBtn',
        addSuiviSapeurPompierBtn: 'addSuiviSapeurPompierBtn',
        removeSuiviSapeurPomierBtn: 'removeSuiviSapeurPomierBtn',
        addInterventionDepanneurBtn: 'addInterventionDepanneurBtn',
        removeInterventionDepanneurBtn: 'removeInterventionDepanneurBtn',
        addInterventionSftrfBtn: 'addInterventionSftrfBtn',
        removeInterventionSftrfBtn: 'removeInterventionSftrfBtn',
        addVehiculeBtn: 'addVehiculeBtn',
        removeVehiculeBtn: 'removeVehiculeBtn',
        addImpliqueBtn: 'addImpliqueBtn',
        removeImpliqueBtn: 'removeImpliqueBtn',
        addCommentaireBtn: 'addCommentaireBtn',
        renameGroupBtn: 'renameGroupBtn',
        editGroupBtn: 'editGroupBtn',
        cancelGroupBtn: 'cancelGroupBtn',
        validateGroupBtn: 'validateGroupBtn',
        validateRenameGroupBtn: 'validateRenameGroupBtn',
        validateCreateGroupBtn: 'validateCreateGroupBtn',
        editEvenementBtn: 'editEvenementBtn',
        updateTypeEvenementBtn: 'updateTypeEvenementBtn',
        updateEtatEvenementBtn: 'updateEtatEvenementBtn',
        createGroupBtn: 'createGroupBtn',
        createEvenementManuallyBtn: 'createEvenementManuallyBtn',
        createBalisageManuallyBtn: 'createBalisageManuallyBtn',
        evenementEnCoursCheckbox: 'evenementEnCoursCheckbox',
        evenementSignaleCheckbox: 'evenementSignaleCheckbox',
        evenementTermineCheckbox: 'evenementTermineCheckbox',
        addSousEmpriseBtn: 'addSousEmpriseBtn',
        removeSousEmpriseBtn: 'removeSousEmpriseBtn',
        validateAddSousEmpriseBtn: 'validateAddSousEmpriseBtn',
        cancelAddSousEmpriseBtn: 'cancelAddSousEmpriseBtn',
        addSousEmpriseInput: 'addSousEmpriseInput',

        updateEvenementCause: 'updateEvenementCause',
        removeAlerteSource: 'removeAlerteSource',
        removeAlerteRattachee: 'removeAlerteRattachee',
        addEvenementRattache: 'addEvenementRattache',
        removeEvenementRattache: 'removeEvenementRattache',
    };


    public static DROIT = (() => {
        let result = {};
        let droitDeBase = [
                UserCte.DROIT.gestionDesEvenementsPrevus,
                UserCte.DROIT.gestionDesEvenementEtPlanActions,
                UserCte.DROIT.gestionDesBalisages,
                UserCte.DROIT.gestionDesBalisagesPrevus
        ];

        // par défaut tous les fields ont les droits de base
        for (const key in FieldEvenementCte.FIELD) {
            let value = FieldEvenementCte.FIELD[key];
            result[value] = droitDeBase;
        }
        return result;
    })();


    public static CTX = (() => {
        let result = {};

        //List evenements
        result[FieldEvenementCte.FIELD.groupe] = [CtxCte.CTX.UPDATE_GROUPE_EVENEMENT, CtxCte.CTX.CREATE_GROUPE_EVENEMENT,];
        result[FieldEvenementCte.FIELD.checked] = [CtxCte.CTX.UPDATE_GROUPE_EVENEMENT];

        // Evenement nouveau
        result[FieldEvenementCte.FIELD.categorie] = [CtxCte.CTX.CREATE_EVENEMENT_MANUALLY, CtxCte.CTX.CREATE_EVENEMENT_FROM_ALERTE, CtxCte.CTX.UPDDATE_TYPE_EVENEMENT];
        result[FieldEvenementCte.FIELD.type] = [CtxCte.CTX.CREATE_EVENEMENT_MANUALLY, CtxCte.CTX.CREATE_EVENEMENT_FROM_ALERTE, CtxCte.CTX.UPDDATE_TYPE_EVENEMENT];
        result[FieldEvenementCte.FIELD.etat] = [CtxCte.CTX.CREATE_EVENEMENT_MANUALLY,
            CtxCte.CTX.UPDATE_ETAT_EVENEMENT];

        // Evenement Commun
        result[FieldEvenementCte.FIELD.horodateDebutPrevue] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.horodateFinPrevue] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.origine] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.informerWebTrafic] = [CtxCte.CTX.EDIT_EVENEMENT];
        // Evenement localisant
        result[FieldEvenementCte.FIELD.typeLocalisant] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.axe] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.sens] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.typeLieu] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.lieu] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.prDebut] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.prFin] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.complementLocalisation] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.commune] = [];
        result[FieldEvenementCte.FIELD.impliqueDeuxSens] = [CtxCte.CTX.EDIT_EVENEMENT];
        // Evenement Emprise

        // Evenement Caractéristiques (accident)
        result[FieldEvenementCte.FIELD.gravitePersonnesImpliquees] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.presenceBlesses] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.presenceVIP] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.nbPersonnesImpliquees] = [CtxCte.CTX.READ];
        result[FieldEvenementCte.FIELD.indemnes] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.blessesLegers] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.blessesGraves] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.decedes] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.nbVehiculesImpliques] = [CtxCte.CTX.READ];
        result[FieldEvenementCte.FIELD.typesVehiculesImpliques] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.vl] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.pl] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.moto] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.bus] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.tmd] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.velo] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.pieton] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.natureChargement] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.causeAccident] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.degatsAuxDomaines] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.descriptionDegatsAuxDomaines] = [CtxCte.CTX.EDIT_EVENEMENT];
        // Evenement Caractéristiques (accident industriel)
        result[FieldEvenementCte.FIELD.siteIndustriel] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.horodateDebutConfinement] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.horodateFinConfinement] = [CtxCte.CTX.EDIT_EVENEMENT];
        // Caractéristiques (alerte enlèvement)
        result[FieldEvenementCte.FIELD.debutAffichagePmv] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.finAffichagePmv] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.nbPmvUtilise] = [CtxCte.CTX.EDIT_EVENEMENT];
        //Caractéristiques (alternat Tunnel du Fréjus)
        result[FieldEvenementCte.FIELD.planificationAlternat] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.alternatExceptionnel] = [CtxCte.CTX.EDIT_EVENEMENT];
        //  Caractéristiques (animal sur la chaussée)
        result[FieldEvenementCte.FIELD.sousTypeAnimal] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.especeAnimal] = [CtxCte.CTX.EDIT_EVENEMENT];
        //  Caractéristiques (basculement de chaussée)
        result[FieldEvenementCte.FIELD.modeDeCirculation] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.miseEnCirculationADoubleSens] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.itpcDoubleSens] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.miseEnCirculationASensUnique] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.itpcSensUnique] = [CtxCte.CTX.EDIT_EVENEMENT];
        //  Caractéristiques (bouchon)
        result[FieldEvenementCte.FIELD.typeBouchon] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.natureBouchon] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.hkm] = [CtxCte.CTX.READ];
        result[FieldEvenementCte.FIELD.longueurMaxiBouchon] = [CtxCte.CTX.READ];
        // Caractéristiques (contresens)
        result[FieldEvenementCte.FIELD.secteurContreSens] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.vehiculeIntercepteContreSens] = [CtxCte.CTX.EDIT_EVENEMENT];
        // Caractéristiques (convoi exceptionnel)
        result[FieldEvenementCte.FIELD.typeConvoi] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.nbDePlEnConvoi] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.accordDePassage] = [CtxCte.CTX.EDIT_EVENEMENT];
        // Caractéristiques (crue torrentielle)
        result[FieldEvenementCte.FIELD.typeCrue] = [CtxCte.CTX.EDIT_EVENEMENT];
        //Caractéristiques (éboulement)

        //Caractéristiques (fermeture Tunnel du Fréjus)
        result[FieldEvenementCte.FIELD.motifDeFermeture] = [CtxCte.CTX.EDIT_EVENEMENT];
        //Caractéristiques (fermeture Tunnel du Fréjus)
        result[FieldEvenementCte.FIELD.motifDeFermeture] = [CtxCte.CTX.EDIT_EVENEMENT];
        //Caractéristiques (Caractéristiques (Fuite TMD))
        result[FieldEvenementCte.FIELD.codeDanger] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.codeMatiere] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.debutConfinement] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.finConfinement] = [CtxCte.CTX.EDIT_EVENEMENT];
        //Caractéristiques (hors Gabarit)
        result[FieldEvenementCte.FIELD.hauteurChargement] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.typeDeVehicule] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.stoppeParDispositifDeRetenue] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.stoppeParPersonnel] = [CtxCte.CTX.EDIT_EVENEMENT];
        //Caractéristiques (incendie)
        result[FieldEvenementCte.FIELD.numeroRepereIncendie] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.numeroRepereForce] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.incendieMobile] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.causeIncendie] = [CtxCte.CTX.EDIT_EVENEMENT];
        // Caractéristiques (information particulière)
        result[FieldEvenementCte.FIELD.typeInformation] = [CtxCte.CTX.EDIT_EVENEMENT];
        // Caractéristiques (malveillance)
        result[FieldEvenementCte.FIELD.typeMalveillance] = [CtxCte.CTX.EDIT_EVENEMENT];
        // Caractéristiques (malveillance)
        result[FieldEvenementCte.FIELD.typeManifestation] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.mobileManifestation] = [CtxCte.CTX.EDIT_EVENEMENT];
        // Caractéristiques (météo)
        result[FieldEvenementCte.FIELD.natureMeteo] = [CtxCte.CTX.EDIT_EVENEMENT];
        // Caractéristiques (obstacle sur chaussée)
        result[FieldEvenementCte.FIELD.typeObstacle] = [CtxCte.CTX.EDIT_EVENEMENT];
        // Caractéristiques (personne sur chaussée)
        result[FieldEvenementCte.FIELD.typePersonne] = [CtxCte.CTX.EDIT_EVENEMENT];
        // Caractéristiques (plan de gestion de trafic)
        result[FieldEvenementCte.FIELD.secteurGestionTrafic] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.mesureGestionTrafic] = [CtxCte.CTX.EDIT_EVENEMENT];
        // Caractéristiques (pollution atmosphérique)
        result[FieldEvenementCte.FIELD.zoneUrbainePaysDeSavoie] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.maurienneTarentaise] = [CtxCte.CTX.EDIT_EVENEMENT];
        // Caractéristiques (réseau AREA)
        result[FieldEvenementCte.FIELD.sousTypeReseauArea] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.directionReseauArea] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.prReseauArea] = [CtxCte.CTX.EDIT_EVENEMENT];
        // Caractéristiques (secours à personne)
        result[FieldEvenementCte.FIELD.motifSecoursPersonne] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.personnelSftrf] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.accidentTravail] = [CtxCte.CTX.EDIT_EVENEMENT];
        // Caractéristiques (stockage)
        result[FieldEvenementCte.FIELD.modeStockage] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.typeVehicule] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.motifStockage] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.nbVehiculesStockes] = [CtxCte.CTX.EDIT_EVENEMENT];
        // Caractéristiques (travaux)
        result[FieldEvenementCte.FIELD.listeIntervenantsTravaux] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.itemIntervenantTravaux] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.natureTravaux] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.mobileCbTravaux] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.entrepriseTravaux] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.nbPersonnesTravaux] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.nbVehiculesTravaux] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.autorisationTravaux] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.mobileTravaux] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.radioTravaux] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.dateDebutTravaux] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.dateFinTravaux] = [CtxCte.CTX.EDIT_EVENEMENT];
        // Caractéristiques (véhicule arrêté)
        result[FieldEvenementCte.FIELD.depannageVehiculeArrete] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.causeVehiculeArrete] = [CtxCte.CTX.EDIT_EVENEMENT];
        //Caractéristiques (viabilité hivernale)
        result[FieldEvenementCte.FIELD.partieHauteViabiliteHivernale] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.partieBasseViabiliteHivernale] = [CtxCte.CTX.EDIT_EVENEMENT];

        //Caractéristiques balisages    
        result[FieldEvenementCte.FIELD.libelleBalisage                  ] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.typeBalisage                     ] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.motifBalisage                    ] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.horodatePosePremierPanneauBalisage] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.horodatePoseBiseauBalisage       ] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.horodateFinPoseBalisage        ] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.horodateDebutDeposeBalisage      ] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.horodateDeposePanneauBalisage    ] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.horodateDeposeBiseauBalisage     ] = [CtxCte.CTX.EDIT_EVENEMENT];

        // Interventions secours
        result[FieldEvenementCte.FIELD.listeSuivisGendarmerie] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.itemSuiviGendarmerie] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.motifSuiviGendarmerie] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.interventionConjointeSuiviGendarmerie] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.intervenantSuiviGendarmerie] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.horodateAppelSuiviGendarmerie] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.horodateArriveeLieuSuiviGendarmerie] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.horodateQuitteLieuSuiviGendarmerie] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.idEvenementConjointSuiviGendarmerie] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.listeSuivisSapeurPompier] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.itemSuiviSapeurPompier] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.vehiculeSuiviSapeurPompier] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.interventionConjointeSuiviSapeurPompier] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.intervenantSuiviSapeurPompier] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.horodateAppelSuiviSapeurPompier] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.horodateArriveeLieuSuiviSapeurPompier] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.horodateQuitteLieuSuiviSapeurPompier] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.idEvenementConjointSuiviSapeurPompier] = [CtxCte.CTX.EDIT_EVENEMENT];

        //Interventions dépanneur
        result[FieldEvenementCte.FIELD.listeInterventionsDepanneur] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.itemInterventionDepanneur] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.depanneurAstreinte] = [CtxCte.CTX.READ];
        result[FieldEvenementCte.FIELD.depanneurMotif] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.depannage] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.interventionConjointeDepanneur] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.idEvenementConjointDepanneur] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.intervenantDepanneur] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.horodateAppelDepanneur] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.horodateArriveeLieuDepanneur] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.horodateQuitteLieuDepanneur] = [CtxCte.CTX.EDIT_EVENEMENT];

        //Interventions SFTRF
        result[FieldEvenementCte.FIELD.listeInterventionsSftrf] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.itemInterventionSftrf] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.intervenantSftrf] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.interventionConjointeSftrf] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.idEvenementConjointSftrf] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.horodateAppelSftrf] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.horodateArriveeLieuSftrf] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.horodateQuitteLieuSftrf] = [CtxCte.CTX.EDIT_EVENEMENT];

        // Vehicules
        result[FieldEvenementCte.FIELD.listeVehicules] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.itemVehicule] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.descriptionVehicule] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.degatVehicule] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.descriptionDegatVehicule] = [CtxCte.CTX.EDIT_EVENEMENT];

        // Impliqués
        result[FieldEvenementCte.FIELD.listeImpliques] = [CtxCte.CTX.EDIT_EVENEMENT];
        // result[FieldEvenementCte.FIELD.itemImplique] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.coordonneesImpliquees] = [CtxCte.CTX.EDIT_EVENEMENT];

        // Exploitation
        result[FieldEvenementCte.FIELD.indicateurConfirmationExploitation] = [CtxCte.CTX.READ];
        result[FieldEvenementCte.FIELD.indicateur107Exploitation] = [CtxCte.CTX.READ];
        result[FieldEvenementCte.FIELD.indicateurPMVExploitation] = [CtxCte.CTX.READ];
        result[FieldEvenementCte.FIELD.indicateurSftrfExploitation] = [CtxCte.CTX.READ];
        result[FieldEvenementCte.FIELD.ficheRexExlploitation] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.referenceRexExploitation] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.classementLocalisationExploitation] = [CtxCte.CTX.READ];
        result[FieldEvenementCte.FIELD.categorieAstExploitation] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.consequenceAstExploitation] = [CtxCte.CTX.EDIT_EVENEMENT];


        // commentaires
        result[FieldEvenementCte.FIELD.listeCommentaires] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.itemCommentaire] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.descriptionCommentaire] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.horodateCommentaire] = [CtxCte.CTX.EDIT_EVENEMENT];

        // liens
        result[FieldEvenementCte.FIELD.evenementCause] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.alerteSource] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.listeAlertes] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.alerteRattachee] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.listeBalisages] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.evenementRattache] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.balisageRattache] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.listeEvenements] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.listeBalisages] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.itemEvenement] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.itemBalisage] = [CtxCte.CTX.EDIT_EVENEMENT];


        // Liste Evenement boutou Actions.
        result[FieldEvenementCte.FIELD.createEvenementManually] = [CtxCte.CTX.CREATE_EVENEMENT_MANUALLY, CtxCte.CTX.CREATE_EVENEMENT_FROM_ALERTE];
        result[FieldEvenementCte.FIELD.validerUpdateEvenement] = [CtxCte.CTX.UPDATE_ETAT_EVENEMENT, CtxCte.CTX.UPDDATE_TYPE_EVENEMENT, CtxCte.CTX.CREATE_GROUPE_EVENEMENT];


        result[FieldEvenementCte.FIELD.emprisesBtn] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.emprisesSensInverseBtn] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.validerEvenementBtn] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.addSuiviGendarmerieBtn] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.removeSuiviGendarmerieBtn] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.addSuiviSapeurPompierBtn] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.removeSuiviSapeurPomierBtn] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.addInterventionDepanneurBtn] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.removeInterventionDepanneurBtn] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.addInterventionSftrfBtn] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.removeInterventionSftrfBtn] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.addVehiculeBtn] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.removeVehiculeBtn] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.addImpliqueBtn] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.removeImpliqueBtn] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.addCommentaireBtn] = [CtxCte.CTX.EDIT_EVENEMENT]

        result[FieldEvenementCte.FIELD.renameGroupBtn] = [CtxCte.CTX.LIST_EVENEMENT_COURANT];
        result[FieldEvenementCte.FIELD.editGroupBtn] = [CtxCte.CTX.LIST_EVENEMENT_COURANT];
        result[FieldEvenementCte.FIELD.cancelGroupBtn] = [CtxCte.CTX.LIST_EVENEMENT_COURANT, CtxCte.CTX.CREATE_GROUPE_EVENEMENT, CtxCte.CTX.UPDATE_GROUPE_EVENEMENT];
        result[FieldEvenementCte.FIELD.validateGroupBtn] = [CtxCte.CTX.UPDATE_GROUPE_EVENEMENT];
        result[FieldEvenementCte.FIELD.validateRenameGroupBtn] = [CtxCte.CTX.UPDATE_GROUPE_EVENEMENT];
        result[FieldEvenementCte.FIELD.validateCreateGroupBtn] = [CtxCte.CTX.CREATE_GROUPE_EVENEMENT];

        result[FieldEvenementCte.FIELD.editEvenementBtn] = [CtxCte.CTX.LIST_EVENEMENT_COURANT];
        result[FieldEvenementCte.FIELD.updateTypeEvenementBtn] = [CtxCte.CTX.LIST_EVENEMENT_COURANT];
        result[FieldEvenementCte.FIELD.updateEtatEvenementBtn] = [CtxCte.CTX.LIST_EVENEMENT_COURANT];
        result[FieldEvenementCte.FIELD.createGroupBtn] = [CtxCte.CTX.LIST_EVENEMENT_COURANT]
        result[FieldEvenementCte.FIELD.createEvenementManuallyBtn] = [CtxCte.CTX.LIST_EVENEMENT_COURANT, CtxCte.CTX.LIST_EVENEMENT_PREVU];
        result[FieldEvenementCte.FIELD.createBalisageManuallyBtn] = [CtxCte.CTX.READ];

        result[FieldEvenementCte.FIELD.evenementEnCoursCheckbox] = [CtxCte.CTX.LIST_EVENEMENT_COURANT];
        result[FieldEvenementCte.FIELD.evenementSignaleCheckbox] = [CtxCte.CTX.LIST_EVENEMENT_COURANT];
        result[FieldEvenementCte.FIELD.evenementTermineCheckbox] = [CtxCte.CTX.LIST_EVENEMENT_COURANT];

        result[FieldEvenementCte.FIELD.addSousEmpriseBtn] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.removeSousEmpriseBtn] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.validateAddSousEmpriseBtn] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.cancelAddSousEmpriseBtn] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.addSousEmpriseInput] = [CtxCte.CTX.EDIT_EVENEMENT];

        result[FieldEvenementCte.FIELD.updateEvenementCause] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.removeAlerteSource] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.removeAlerteRattachee] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.addEvenementRattache] = [CtxCte.CTX.EDIT_EVENEMENT];
        result[FieldEvenementCte.FIELD.removeEvenementRattache] = [CtxCte.CTX.EDIT_EVENEMENT];

        return result;
    })();

    /**
     * déclaration des champs éditables selon l'etat.
     */
    public static ETAT = (() => {
        let result = {};
        let allStates = [EvenementCte.ETATS_EVENEMENT.enCours,
            EvenementCte.ETATS_EVENEMENT.signale,
            EvenementCte.ETATS_EVENEMENT.prevu,
            EvenementCte.ETATS_EVENEMENT.termine
        ];
        // par défaut tous les fields sont editables dans tous les états
        for (const key in FieldEvenementCte.FIELD) {
            result[key] = allStates;
        }
        // modification spécifique.
        result[FieldEvenementCte.FIELD.horodateDebutPrevue] = [EvenementCte.ETATS_EVENEMENT.prevu];
        result[FieldEvenementCte.FIELD.horodateFinPrevue] = [EvenementCte.ETATS_EVENEMENT.prevu, EvenementCte.ETATS_EVENEMENT.enCours,
            EvenementCte.ETATS_EVENEMENT.signale];

        return result;
    })();

}
