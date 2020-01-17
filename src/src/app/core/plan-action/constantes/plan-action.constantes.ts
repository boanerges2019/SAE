/**
 * Entité de représentation les constantes sur les évenements
 */
export class PlanActionCte {

    public static CODE_TYPE = {
        TEXTUELLE_BORNEE: "TYPE_VALEUR_POSSIBLE.TEXTUELLE_BORNEE",
        ENUMERATION: "TYPE_VALEUR_POSSIBLE.ENUMERATION",
        REQUETE: "TYPE_VALEUR_POSSIBLE.REQUETE",
        OBJET_INFERENCE: "TYPE_VALEUR_POSSIBLE.OBJET_INFERENCE",
        LOCALISANT: "TYPE_VALEUR_POSSIBLE.LOCALISANT",
        ENTIER_BORNEE: "TYPE_VALEUR_POSSIBLE.ENTIER_BORNEE",
        LIBRE: "TYPE_VALEUR_POSSIBLE.LIBRE",
        EXPRESSION_REGULIERE: "TYPE_VALEUR_POSSIBLE.EXPRESSION_REGULIERE",
        NUMERIQUE_BORNEE: "TYPE_VALEUR_POSSIBLE.NUMERIQUE_BORNEE"
    };

    public static INPUT = {
        MODE_EXECUTION_THEME: 'MODE_EXECUTION_THEME',
        MODE_EXECUTION_THEME_RFELEXE: 'MODE_EXECUTION_THEME_RFELEXE',
        MODE_EXECUTION_THEME_MANUEL: 'MODE_EXECUTION_THEME_MANUEL',
        MODE_EXECUTION_THEME_AUTOMATIQUE: 'MODE_EXECUTION_THEME_AUTOMATIQUE'
    };

    public static MODES_EXECUTION = {
        MANUEL: "MODE_EXECUTION_THEME.MANUEL",
        REFLEXE: "MODE_EXECUTION_THEME.REFLEXE",
        AUTOMATIQUE: "MODE_EXECUTION_THEME.AUTOMATIQUE"
    };

    public static ETATS = {
        SUCCES: "ETAT_ACTION.SUCCES",
        EN_COURS: "ETAT_ACTION.EN_COURS",
        ECHEC: "ETAT_ACTION.ECHEC",
        REFUSE: "ETAT_ACTION.REFUSE",
        SUSPENDU: "ETAT_ACTION.SUSPENDU",
        ATTENTE: ""
    };

    public static ONGLET_LISTE_EVT = {
        evenementsPrevus: 'evenements-prevus',
        evenementsCourants: 'evenements-courants'
    }

    public static TYPE_COMMUNICATION = {
        APPEL: "APPEL",
        MESSAGE_VOCAL: "DIFFUSSION",
        PREPARATION: "PREPARATION",
        BULLETIN: "BULLETIN",
    };


    public static CATEGORIE_PRIMITIVES = [
        "gestionCirculation",
        {
            "key": "equipement",
            "values": [
                "actionsCommunesEquipements",
                "fonctionEnergie",
                "fonctionVentilation",
                "fonctionEclairage",
                "fonctionSignalisation",
                "fonctionBassins",
                "fonctionProtectionIncendie",
                "fonctionExploitation",
                "fonctionVidéoDAI",
                "fonctionContrôleAccès",
                "fonctionSonorisation",
            ]
        },
        "gestionStratégiesAffichage",
        "gestionDesMacroCommandes",
        {
            "key": "appels",
            "values": [
                "actionsAppelSortant",
                "actionsDiffusionMessagesVocaux",
            ]
        },
        "gestionBalisages",
        "gestionDocuments",
        "gestionMurImage",
        "aideOperateur",
        "gestionTraces"
    ];

    public static PRIMITIVES = {
        "gestionCirculation": ["circulationTube"],
        "actionsCommunesEquipements": ["invaliderEquipement", "revaliderEquipement"],
        "fonctionEnergie": ["marcheGroupe", "arreterGroupe"],
        "fonctionVentilation": [
            {
                "key": "ventilationAiguebelleHurtieres",
                "values": [
                    "ventilationSB",
                    "incendieSB",
                    "piloterVentilationSB",
                    "accelerateurSB",
                    "bypassSB"
                ]
            },
            {
                "key": "ventilationOrelle",
                "values": [
                    "incendieOrelle",
                    "ventilationOrelle",
                    "accelerateurOrelle",
                    "trappeDesenfumage",
                    "ventilateurAF/AV",
                    "ventilateurAbri",
                    "commanderRegistre"
                ]
            },
        ],
        "fonctionEclairage": [
            {
                "key": "eclairageOuvrages",
                "values": [
                    "modeEclairage",
                    "niveauTraficLocal",
                    "commanderCircuitDeclairage",
                    "commanderEclairageUsine"
                ]
            },
            {
                "key": "eclairageSectionCourante",
                "values": [
                    "commanderEclairagePeage"
                ]
            }
        ],
        "fonctionSignalisation": [
            {
                "key": "signalisationOuvrages",
                "values": [
                    "activerPlanSignalisation",
                    "commanderPanneauClimatique",
                    "commanderDispositifFermeture",
                    "commanderPMV"
                ]
            },
            {
                "key": "signalisationSectionCourante",
                "values": [
                    "commanderDispositifFermeture",
                    "commanderDispositifDelestage",
                    "commanderFeuxAntibrouillard"
                ]
            }
        ],
        "fonctionBassins": ["commanderVanne"],
        "fonctionProtectionIncendie": [
            {
                "key": "protectionIncendieOuvrages",
                "values": [
                    "piloterStationPompageOrelle"
                ]
            },
            {
                "key": "protectionIncendieSectionCourante",
                "values": [
                    "commanderReservoirIncendie"
                ]
            }
        ],
        "fonctionExploitation": ["fermerAccesPeage", "ouvrirBarrieresHorsGabarit", "commanderPortail", "gererITPC"],
        "fonctionVidéoDAI": ["appliquerScenarioDAI", "inhiberDAI", "commuterVideo", "appliquerPreposition"],
        "fonctionContrôleAccès": ["piloterGacheAcces"],
        "fonctionSonorisation": ["diffuserMessageInterphone"],
        "gestionStratégiesAffichage": ["lancerStrategie", "proposerStrategie", "supprimerStrategie"],
        "gestionDesMacroCommandes": ["lancerMacro", "lancerMacroZoneInfluence"/*,"poserQuestion","temporiser","temporiserJusquA"*/],
        "actionsAppelSortant": ["appelerDestinataire", "appelerAstreinte", "appelerAstreinteZone", "appelerOrganisationZone"],
        "actionsDiffusionMessagesVocaux": ["diffuserMessageVocal", "diffuserMessageAstreinte", "diffuserMessageDestinataire"],
        "gestionBalisages": ["creerBalisageEvenement"],
        "gestionDocuments": ["envoyerDocumentGeneral", "envoyerDocumentGeneralGroupe", "envoyerDocumentEvenement", "envoyerDocumentEvenementGroupe", "planifierDocumentEvenementPeriodique",
            "planifierDocumentGeneralPeriodique", "terminerDocumentEvenementPeriodique", "terminerDocumentGeneralPeriodique"],
        "gestionMurImage": ["changerConfigurationMurImage"],
        "aideOperateur": ["ouvrirDocument", "ouvrirDossier", "notifierOperateur", "informerOperateur"],
        "gestionTraces": ["tracer"]
    };

    public static PARAMETRES_PRIMITIVES = {
        "circulationTube": [
            {
                "key": "tube",
                "values": [
                    "aiguebelle1",
                    "aiguebelle2",
                    "hurtieres1",
                    "hurtieres2",
                ]
            },
            {
                "key": "mode",
                "values": [
                    "mono",
                    "bidi",
                ]
            }
        ],
        "invaliderEquipement": [
            {
                "key": "equipement",
                "values": [
                    /*Données dynamique*/
                ]
            }
        ],
        "revaliderEquipement": [
            {
                "key": "equipement",
                "values": [
                    /*Données dynamique*/
                ]
            }
        ],
        "marcheGroupe": [
            {
                "key": "groupeElectrogene",
                "values": [
                    /*Données dynamique*/
                ]
            }
        ],
        "arreterGroupe": [
            {
                "key": "groupeElectrogene",
                "values": [
                    /*Données dynamique*/
                ]
            }
        ],
        "ventilationSB": [
            {
                "key": "ouvrage",
                "values": [
                    /*Données dynamique*/
                ]
            },
            {
                "key": "tube",
                "values": [
                    "sens1",
                    "sens2",
                ]
            },
            {
                "key": "regime",
                "values": [
                    "r0",
                    "r1",
                    "r2",
                    "r3",
                    "r4",
                    "r5",
                    "r6"
                ]
            },
            {
                "key": "sens",
                "values": [
                    "direct",
                    "inverse",
                ]
            }
        ],
        "incendieSB": [
            {
                "key": "ouvrage",
                "values": [
                    /*Données dynamique*/
                ]
            },
            {
                "key": "tube",
                "values": [
                    "sens1",
                    "sens2",
                ]
            }
        ],
        "piloterVentilationSB": [
            {
                "key": "ouvrage",
                "values": [
                    /*Données dynamique*/
                ]
            },
            {
                "key": "tube",
                "values": [
                    "sens1",
                    "sens2",
                ]
            },
            {
                "key": "mode",
                "values": [
                    "auto",
                    "manuelDirect",
                    "manuelInverse"
                ]
            }
        ],
        "accelerateurSB": [
            {
                "key": "accelerateur",
                "values": [
                    /*Données dynamique*/
                ]
            },
            {
                "key": "mode",
                "values": [
                    "marche",
                    "arret"
                ]
            }
        ],
        "bypassSB": [
            {
                "key": "ouvrage",
                "values": [
                    /*Données dynamique*/
                ]
            },
            {
                "key": "mode",
                "values": [
                    "auto",
                    "surpression1",
                    "surpression2"
                ]
            }
        ],
        "incendieOrelle": [
            {
                "key": "numeroRepereIncendie",
                "values": [
                    /*Données dynamique*/
                ]
            }
        ],
        "ventilationOrelle": [
            {
                "key": "mode",
                "values": [
                    "auto",
                    "manuel"
                ]
            }
        ],
        "accelerateurOrelle": [
            {
                "key": "accelerateur",
                "values": [
                    /*Données dynamique*/
                ]
            },
            {
                "key": "mode",
                "values": [
                    "marche1",
                    "marche2",
                    "arret"
                ]
            }
        ],
        "trappeDesenfumage": [
            {
                "key": "trappe",
                "values": [
                    /*Données dynamique*/
                ]
            },
            {
                "key": "mode",
                "values": [
                    "ouvert",
                    "ferme"
                ]
            }
        ],
        "ventilateurAF/AV": [
            {
                "key": "ventilateurAF/AV",
                "values": [
                    /*Données dynamique*/
                ]
            },
            {
                "key": "mode",
                "values": [
                    "marche",
                    "arret"
                ]
            }
        ],
        "ventilateurAbri": [
            {
                "key": "groupeElectrogene",
                "values": [
                    /*Données dynamique*/
                ]
            }
        ],
        "commanderRegistre": [
            {
                "key": "registre",
                "values": [
                    /*Données dynamique*/
                ]
            },
            {
                "key": "mode",
                "values": [
                    "ouvert",
                    "ferme"
                ]
            }
        ],
        "modeEclairage": [
            {
                "key": "ouvrage",
                "values": [
                    /*Données dynamique*/
                ]
            },
            {
                "key": "tube",
                "values": [
                    "sens1",
                    "sens2",
                    "so"
                ]
            },
            {
                "key": "mode",
                "values": [
                    "automatiqueLuminancemetre",
                    "automatiqueStatistique",
                    "manuel",
                    "regime1/4"
                ]
            }
        ],
        "niveauTraficLocal": [
            {
                "key": "ouvrage",
                "values": [
                    /*Données dynamique*/
                ]
            },
            {
                "key": "tube",
                "values": [
                    "sens1",
                    "sens2",
                    "so"
                ]
            },
            {
                "key": "niveauTrafic",
                "values": [
                    "fort",
                    "reduit",
                ]
            }
        ],
        "commanderCircuitDeclairage": [
            {
                "key": "circuit",
                "values": [
                    /*Données dynamique*/
                ]
            },
            {
                "key": "mode",
                "values": [
                    "allume",
                    "eteint"
                ]
            }
        ],
        "commanderEclairageUsine": [
            {
                "key": "usine",
                "values": [
                    "orelleAval",
                    "bronsonniere"
                ]
            },
            {
                "key": "mode",
                "values": [
                    "allume",
                    "eteint"
                ]
            }
        ],
        "commanderEclairagePeage": [
            {
                "key": "peage",
                "values": [
                    /*Données dynamique*/
                ]
            },
            {
                "key": "mode",
                "values": [
                    "auto",
                    "manuelAllume",
                    "manuelEteint"
                ]
            }
        ],
        "activerPlanSignalisation": [
            {
                "key": "ouvrage",
                "values": [
                    /*Données dynamique*/
                ]
            },
            {
                "key": "tube",
                "values": [
                    "sens1",
                    "sens2",
                    "so"
                ]
            },
            {
                "key": "plan",
                "values": [
                    /*Données dynamique*/
                ]
            },
        ],
        "commanderPanneauClimatique": [
            {
                "key": "panneauClimatique",
                "values": [
                    /*Données dynamique*/
                ]
            },
            {
                "key": "message",
                "values": [
                    "vent",
                    "pluie",
                    "accident",
                    "neige",
                    "brouillard",
                    "travaux",
                    "verglas",
                    "enTest",
                    "danger",
                    "eteint"
                ]
            }
        ],
        "commanderDispositifFermeture": [
            {
                "key": "dispositifFermeture",
                "values": [
                    /*Données dynamique*/
                ]
            },
            {
                "key": "mode",
                "values": [
                    "ouvert",
                    "ferme"
                ]
            }
        ],
        "commanderPMV": [
            {
                "key": "PMVdArret",
                "values": [
                    /*Données dynamique*/
                ]
            },
            {
                "key": "mode",
                "values": [
                    "allume",
                    "eteint"
                ]
            },
            {
                "key": "message",
                "values": [
                    "vent",
                    "pluie",
                    "accident",
                    "neige",
                    "brouillard",
                    "travaux",
                    "verglas",
                    "enTest",
                    "danger",
                    "eteint"
                ]
            }
        ],
        "commanderDispositifFermetureSectionCourante": [
            {
                "key": "dispositifFermeture",
                "values": [
                    /*Données dynamique*/
                ]
            },
            {
                "key": "mode",
                "values": [
                    "ouvert",
                    "ferme"
                ]
            }
        ],
        "commanderDispositifDelestage": [
            {
                "key": "dispositifDelestage",
                "values": [
                    /*Données dynamique*/
                ]
            },
            {
                "key": "mode",
                "values": [
                    "activationDelestage",
                    "desactivationDelestage"
                ]
            }
        ],
        "commanderFeuxAntibrouillard": [
            {
                "key": "garePeage",
                "values": [
                    /*Données dynamique*/
                ]
            },
            {
                "key": "mode",
                "values": [
                    "allume",
                    "eteint"
                ]
            }
        ],
        "commanderVanne": [
            {
                "key": "vanne",
                "values": [
                    /*Données dynamique*/
                ]
            },
            {
                "key": "mode",
                "values": [
                    "ouverture",
                    "fermeture"
                ]
            }
        ],
        "piloterStationPompageOrelle": [
            {
                "key": "mode",
                "values": [
                    "soutirageBas",
                    "soutirageHaut",
                    "remplissageReseau"
                ]
            }
        ],
        "commanderReservoirIncendie": [
            {
                "key": "reservoirIncendie",
                "values": [
                    /*Données dynamique*/
                ]
            },
            {
                "key": "mode",
                "values": [
                    "remplissageAutomatique",
                    "remplissageArrete"
                ]
            }
        ],
        "fermerAccesPeage": [
            {
                "key": "garePeage",
                "values": [
                    /*Données dynamique*/
                ]
            }
        ],
        "ouvrirBarrieresHorsGabarit": [
            {
                "key": "barriereHorsGabarit",
                "values": [
                    /*Données dynamique*/
                ]
            }
        ],
        "commanderPortail": [
            {
                "key": "portail",
                "values": [
                    /*Données dynamique*/
                ]
            },
            {
                "key": "mode",
                "values": [
                    "ouvert",
                    "ferme"
                ]
            }
        ],
        "gererITPC": [
            {
                "key": "ITPC",
                "values": [
                    /*Données dynamique*/
                ]
            },
            {
                "key": "mode",
                "values": [
                    "ouvert",
                    "ferme"
                ]
            }
        ],
        "appliquerDAI": [
            {
                "key": "ouvrage",
                "values": [
                    /*Données dynamique*/
                ]
            },
            {
                "key": "tube",
                "values": [
                    "sens1",
                    "sens2",
                    "so"
                ]
            },
            {
                "key": "scenarioDAI",
                "values": [
                    /*Données dynamique*/
                ]
            }
        ],
        "appliquerScenarioDAI": [
            {
                "key": "ouvrage",
                "values": [
                    /*Données dynamique*/
                ]
            },
            {
                "key": "tube",
                "values": [
                    "sens1",
                    "sens2",
                    "so"
                ]
            },
            {
                "key": "scenarioDAI",
                "values": [
                    /*Données dynamique*/
                ]
            }
        ],
        "inhiberDAI": [
            {
                "key": "zoneDAI",
                "values": [
                    "aiguebelle1",
                    "aiguebelle2",
                    "hurtieres1",
                    "hurtieres2",
                    "sorderettes1",
                    "orelleCantonA",
                    "orelleCantonB",
                    "orelleCantonC",
                ]
            },
            {
                "key": "mode",
                "values": [
                    "inhibe",
                    "desinhibe"
                ]
            }
        ],
        "commuterVideo": [
            {
                "key": "camera",
                "values": [
                    /*Données dynamique*/
                ]
            },
            {
                "key": "moniteur",
                "values": [
                    /*Données dynamique*/
                ]
            }
        ],
        "appliquerPreposition": [
            {
                "key": "camera",
                "values": [
                    /*Données dynamique*/
                ]
            },
            {
                "key": "nPreposition",
                "values": [
                    /*Données dynamique*/
                ]
            }
        ],
        "piloterGacheAcces": [
            {
                "key": "acces",
                "values": [
                    /*Données dynamique*/
                ]
            },
            {
                "key": "mode",
                "values": [
                    "ouvert",
                    "ferme"
                ]
            }
        ],
        "diffuserMessageInterphone": [
            {
                "key": "zoneInterphonie",
                "values": [
                    /*Données dynamique*/
                ]
            },
            {
                "key": "message",
                "values": [
                    "preenregistre",
                    "aucun"
                ]
            }
        ],
        "lancerStrategie": [
            {
                "key": "modeleStrategie",
                "values": [
                    /*Données dynamique*/
                ]
            }
        ],
        "proposerStrategie": [
            {
                "key": "modeleStrategie",
                "values": [
                    /*Données dynamique*/
                ]
            }
        ],
        "supprimerStrategie": [
            {
                "key": "modeleStrategie",
                "values": [
                    /*Données dynamique*/
                ]
            }
        ],
        "lancerMacro": [
            {
                "key": "macroCommande",
                "values": [
                    /*Données dynamique*/
                ]
            }
        ],
        "lancerMacroZoneInfluence": [
            {
                "key": "modeleMacroCommande",
                "values": [
                    /*Données dynamique*/
                ]
            }
        ],
        "appelerDestinataire": [
            {
                "key": "destinataire",
                "values": [
                    /*Données dynamique*/
                ]
            },
            {
                "key": "nComposer",
                "values": [
                    /*Données dynamique*/
                ]
            }
        ],
        "appelerAstreinte": [
            {
                "key": "typeAstreinte",
                "values": [
                    /*Données dynamique*/
                ]
            }
        ],
        "appelerAstreinteZone": [
            {
                "key": "typeAstreinteZone",
                "values": [
                    "depanneurVL",
                    "depanneurPL"
                ]
            }
        ],
        "appelerOrganisationZone": [
            {
                "key": "typeOrganisation",
                "values": [
                    "gendarmerie",
                    "sdis",
                    "centreEntretien"
                ]
            }
        ],
        "diffuserMessageVocal": [
            {
                "key": "groupeDiffusion",
                "values": [
                    /*Données dynamiques*/
                ]
            },
            {
                "key": "identifiantMessageVocal",
                "values": [
                    /*Données dynamiques*/
                ]
            }
        ],
        "diffuserMessageAstreinte": [
            {
                "key": "astreinte",
                "values": [
                    /*Données dynamiques*/
                ]
            },
            {
                "key": "identifiantMessageVocal",
                "values": [
                    /*Données dynamiques*/
                ]
            }
        ],
        "diffuserMessageDestinataire": [
            {
                "key": "destinataire",
                "values": [
                    /*Données dynamiques*/
                ]
            },
            {
                "key": "identifiantMessageVocal",
                "values": [
                    /*Données dynamiques*/
                ]
            }
        ],
        "creerBalisageEvenement": [
            {
                "key": "typeBalisage",
                "values": [
                    "cbu",
                    "cvl",
                    "cvr",
                    "fermeture",
                    "basculement",
                    "deviation"
                ]
            },
            {
                "key": "longueurBalisage",
                "values": [
                    /*Données dynamiques*/
                ]
            }
        ],
        "envoyerDocumentGeneral": [
            {
                "key": "destinataire",
                "values": [
                    /*Données dynamiques*/
                ]
            },
            {
                "key": "modeleDocument",
                "values": [
                    /*Données dynamiques*/
                ]
            },
            {
                "key": "format",
                "values": [
                    "html",
                    "pdf"
                ]
            }
        ],
        "envoyerDocumentGeneralGroupe": [
            {
                "key": "groupeDiffusion",
                "values": [
                    /*Données dynamiques*/
                ]
            },
            {
                "key": "modeleDocument",
                "values": [
                    /*Données dynamiques*/
                ]
            },
            {
                "key": "format",
                "values": [
                    "html",
                    "pdf"
                ]
            }
        ],
        "envoyerDocumentEvenement": [
            {
                "key": "destinataire",
                "values": [
                    /*Données dynamiques*/
                ]
            },
            {
                "key": "modeleDocumentEvenement",
                "values": [
                    /*Données dynamiques*/
                ]
            },
            {
                "key": "format",
                "values": [
                    "html",
                    "pdf"
                ]
            }
        ],
        "envoyerDocumentEvenementGroupe": [
            {
                "key": "groupeDiffusion",
                "values": [
                    /*Données dynamiques*/
                ]
            },
            {
                "key": "modeleDocumentEvenement",
                "values": [
                    /*Données dynamiques*/
                ]
            },
            {
                "key": "format",
                "values": [
                    "html",
                    "pdf"
                ]
            }
        ],
        "planifierDocumentEvenementPeriodique": [
            {
                "key": "destinataire",
                "values": [
                    /*Données dynamiques*/
                ]
            },
            {
                "key": "modeleDocument",
                "values": [
                    /*Données dynamiques*/
                ]
            },
            {
                "key": "format",
                "values": [
                    "html",
                    "pdf"
                ]
            },
            {
                "key": "periodicite",
                "values": [
                    /*Données dynamiques*/
                ]
            },
        ],
        "planifierDocumentGeneralPeriodique": [
            {
                "key": "destinataire",
                "values": [
                    /*Données dynamiques*/
                ]
            },
            {
                "key": "modeleDocument",
                "values": [
                    /*Données dynamiques*/
                ]
            },
            {
                "key": "format",
                "values": [
                    "html",
                    "pdf"
                ]
            },
            {
                "key": "periodicite",
                "values": [
                    /*Données dynamiques*/
                ]
            },
        ],
        "terminerDocumentEvenementPeriodique": [
            {
                "key": "destinataire",
                "values": [
                    /*Données dynamiques*/
                ]
            },
            {
                "key": "modeleDocument",
                "values": [
                    /*Données dynamiques*/
                ]
            }
        ],
        "terminerDocumentGeneralPeriodique": [
            {
                "key": "destinataire",
                "values": [
                    /*Données dynamiques*/
                ]
            },
            {
                "key": "modeleDocument",
                "values": [
                    /*Données dynamiques*/
                ]
            }
        ],
        "changerConfigurationMurImage": [
            {
                "key": "nomConfiguration",
                "values": [
                    /*Données dynamiques*/
                ]
            }
        ],
        "ouvrirDocument": [
            {
                "key": "nomDocument",
                "values": [
                    /*Données dynamiques*/
                ]
            }
        ],
        "ouvrirDossier": [
            {
                "key": "cheminAccesDossier",
                "values": [
                    /*Données dynamiques*/
                ]
            }
        ],
        "notifierOperateur": [
            {
                "key": "texteMessageNotification",
                "values": [
                    /*Données dynamiques*/
                ]
            }
        ],
        "informerOperateur": [
            {
                "key": "texteMessageInformation",
                "values": [
                    /*Données dynamiques*/
                ]
            }
        ],
        "tracer": [
            {
                "key": "texteTrace",
                "values": [
                    /*Données dynamiques*/
                ]
            }
        ],
    };
}
