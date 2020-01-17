export const LABELS  = (() => {
  let result = {};

  // ETATS
  result["etats"] = {};
  result["etats"]["ETAT_ACTION.EN_COURS"] = "En Cours";
  result["etats"]["ETAT_ACTION.SUCCES"] = "Succès";
  result["etats"]["ETAT_ACTION.REFUSE"] = "Refusé";
  result["etats"][""] = "En Attente";
  result["etats"]["null"] = "En Attente";
  result["etats"]["ETAT_ACTION.ECHEC"] = "Echec";

  /*Categories Primitives */
  result["categoriePrimitives"] = {};
  result["categoriePrimitives"]["gestionCirculation"] = "Gestion des modes de circulation";
  result["categoriePrimitives"]["equipement"] = "Primitives de pilotage des équipements";
  result["categoriePrimitives"]["actionsCommunesEquipements"] = "Actions communes des équipements";
  result["categoriePrimitives"]["fonctionEnergie"] = "Actions liées à la fonction énergie";
  result["categoriePrimitives"]["fonctionVentilation"] = "Actions liées à la fonction ventilation";
  result["categoriePrimitives"]["fonctionEclairage"] = "Actions liées à la fonction éclairage";
  result["categoriePrimitives"]["fonctionSignalisation"] = "Actions liées à la fonction signalisation";
  result["categoriePrimitives"]["fonctionBassins"] = "Actions liées à la fonction bassins";
  result["categoriePrimitives"]["fonctionProtectionIncendie"] = "Actions liées à la fonction protection incendie";
  result["categoriePrimitives"]["fonctionExploitation"] = "Actions liées à la fonction exploitation";
  result["categoriePrimitives"]["fonctionVidéoDAI"] = "Actions liées à la fonction vidéo / DAI";
  result["categoriePrimitives"]["fonctionContrôleAccès"] = "Actions liées à la fonction contrôle d’accès";
  result["categoriePrimitives"]["fonctionSonorisation"] = "Actions liées à la fonction sonorisation";
  result["categoriePrimitives"]["gestionStratégiesAffichage"] = "Primitives de gestion des stratégies d’affichage";
  result["categoriePrimitives"]["gestionDesMacroCommandes"]  = "Primitives de gestion des macro-commandes";
  result["categoriePrimitives"]["appels"]  = "Primitives de gestion des appels";
  result["categoriePrimitives"]["actionsAppelSortant"]  = "Actions d’appel sortant";
  result["categoriePrimitives"]["actionsDiffusionMessagesVocaux"]  = "Actions de diffusion de messages vocaux";
  result["categoriePrimitives"]["gestionBalisages"]  = "Primitives de gestion des balisages";
  result["categoriePrimitives"]["gestionDocuments"]  = "Primitives de gestion des documents";
  result["categoriePrimitives"]["gestionMurImage"]  = "Primitives de gestion du mur d’image";
  result["categoriePrimitives"]["aideOperateur"]  = "Primitives d’aide à l’opérateur";
  result["categoriePrimitives"]["gestionTraces"]  = "Primitives de gestion des traces";


  /*Primitives*/
  result["primitives"] = {};
  result["primitives"]["circulationTube"] = "Changer le mode de circulation d’un tube";

  result["primitives"]["invaliderEquipement"] = "Invalider Equipement";
  result["primitives"]["revaliderEquipement"] = "Revalider Equipement";

  result["primitives"]["marcheGroupe"] = "Mettre en marche groupe";
  result["primitives"]["arreterGroupe"] = "Arrêter groupe";

  result["primitives"]["ventilationAiguebelleHurtieres"] = "Ventilation d’Aiguebelle et des Hurtières";
  result["primitives"]["ventilationSB"] = "Activer régime ventilation SB";
  result["primitives"]["incendieSB"] = "Activer mode incendie SB";
  result["primitives"]["piloterVentilationSB"] = "Piloter mode ventilation SB";
  result["primitives"]["accelerateurSB"] = "Commander accélérateur SB";
  result["primitives"]["bypassSB"] = "Piloter surpression bypass SB";
  result["primitives"]["ventilationOrelle"] = "Ventilation d’Orelle";
  result["primitives"]["incendieOrelle"] = "Activer mode incendie Orelle";
  result["primitives"]["ventilationOrelle"] = "Piloter mode ventilation Orelle";
  result["primitives"]["accelerateurOrelle"] = "Commander accélérateur Orelle";
  result["primitives"]["trappeDesenfumage"] = "Commander trappe de désenfumage";
  result["primitives"]["ventilateurAF/AV"] = "Commander ventilateur AF / AV";
  result["primitives"]["ventilateurAbri"] = "Commander ventilateur en abri";
  result["primitives"]["commanderRegistre"] = "Commander registre";

  result["primitives"]["eclairageOuvrages"] = "Eclairage des ouvrages";
  result["primitives"]["modeEclairage"] = "Piloter mode d’éclairage";
  result["primitives"]["niveauTraficLocal"] = "Régler niveau de trafic local";
  result["primitives"]["commanderCircuitDeclairage"] = "Commander circuit d’éclairage";
  result["primitives"]["commanderEclairageUsine"] = "Commander éclairage usine";
  result["primitives"]["eclairageSectionCourante"] = "Eclairage en section courante";
  result["primitives"]["commanderEclairagePeage"] = "Commander éclairage péage";

  result["primitives"]["signalisationOuvrages"] = "Signalisation des ouvrages";
  result["primitives"]["activerPlanSignalisation"] = "Activer plan de signalisation";
  result["primitives"]["commanderPanneauClimatique"] = "Commander panneau climatique";
  result["primitives"]["commanderDispositifFermeture"] = "Commander dispositif de fermeture";
  result["primitives"]["commanderPMV"] = "Commander PMV d’arrêt";
  result["primitives"]["signalisationSectionCourante"] = "Signalisation en section courante";
  result["primitives"]["commanderDispositifFermetureSectionCourante"] = "Commander dispositif de fermeture";
  result["primitives"]["commanderDispositifDelestage"] = "Commander dispositif de délestage";
  result["primitives"]["commanderFeuxAntibrouillard"] = "Commander feux antibrouillard";

  result["primitives"]["commanderVanne"] = "Commander une vanne";

  result["primitives"]["protectionIncendieOuvrages"] = "Protection incendie des ouvrages";
  result["primitives"]["piloterStationPompageOrelle"] = "Piloter la station de pompage d’Orelle";
  result["primitives"]["protectionIncendieSectionCourante"] = "Protection incendie en section courante";
  result["primitives"]["commanderReservoirIncendie"] = "Commander un réservoir incendie";

  result["primitives"]["fermerAccesPeage"] = "Fermer l’accès au péage";
  result["primitives"]["ouvrirBarrieresHorsGabarit"] = "Ouvrir les barrières hors gabarit";
  result["primitives"]["commanderPortail"] = "Commander un portail";
  result["primitives"]["gererITPC"] = "Gérer un ITPC";

  result["primitives"]["appliquerScenarioDAI"] = "Appliquer un scénario DAI";
  result["primitives"]["inhiberDAI"] = "Inhiber la DAI";
  result["primitives"]["commuterVideo"] = "Commuter vidéo";
  result["primitives"]["appliquerPreposition"] = "Appliquer préposition";

  result["primitives"]["piloterGacheAcces"] = "Piloter une gâche d’accès";

  result["primitives"]["diffuserMessageInterphone"] = "Diffuser un message sur interphone";

  result["primitives"]["lancerStrategie"] = "Lancer Stratégie";
  result["primitives"]["proposerStrategie"] = "Proposer Stratégie";
  result["primitives"]["supprimerStrategie"] = "Supprimer Stratégie";

  result["primitives"]["lancerMacro"] = "Lancer Macro";
  result["primitives"]["lancerMacroZoneInfluence"] = "Lancer Macro sur zone d’influence";
  result["primitives"]["poserQuestion"] = "Poser une question";
  result["primitives"]["temporiser"] = "Temporiser";
  result["primitives"]["temporiserJusquA"] = "Temporiser jusqu’à";

  result["primitives"]["appelerDestinataire"] = "Appeler un destinataire";
  result["primitives"]["appelerAstreinte"] = "Appeler une astreinte";
  result["primitives"]["appelerAstreinteZone"] = "Appeler une astreinte par zone";
  result["primitives"]["appelerOrganisationZone"] = "Appeler une organisation par zone";

  result["primitives"]["diffuserMessageVocal"] = "Diffuser un message vocal";
  result["primitives"]["diffuserMessageAstreinte"] = "Diffuser un message à une astreinte";
  result["primitives"]["diffuserMessageDestinataire"] = "Diffuser un message à un destinataire";

  result["primitives"]["creerBalisageEvenement"] = "Créer balisage événement";

  result["primitives"]["envoyerDocumentGeneral"] = "Envoyer document général";
  result["primitives"]["envoyerDocumentGeneralGroupe"] = "Envoyer document général à un groupe";
  result["primitives"]["envoyerDocumentEvenement"] = "Envoyer document événement";
  result["primitives"]["envoyerDocumentEvenementGroupe"] = "Envoyer document événement à un groupe";
  result["primitives"]["planifierDocumentEvenementPeriodique"] = "Planifier document événement périodique";
  result["primitives"]["planifierDocumentGeneralPeriodique"] = "Planifier document général périodique";
  result["primitives"]["terminerDocumentEvenementPeriodique"] = "Terminer document événement périodique";
  result["primitives"]["terminerDocumentGeneralPeriodique"] = "Terminer document général périodique";

  result["primitives"]["changerConfigurationMurImage"] = "Changer configuration mur d’image";

  result["primitives"]["ouvrirDocument"] = "Ouvrir document";
  result["primitives"]["ouvrirDossier"] = "Ouvrir dossier";
  result["primitives"]["notifierOperateur"] = "Notifier opérateur";
  result["primitives"]["informerOperateur"] = "Informer opérateur";

  result["primitives"]["tracer"] = "Tracer";

  /*Parametres*/
  result["fields"] = {};
  result["fields"]["tube"] = "Tube";
  result["fields"]["aiguebelle1"] = "Aiguebelle sens 1";
  result["fields"]["aiguebelle2"]= "Aiguebelle sens 2";
  result["fields"]["hurtieres1"] = "Hurtières sens 1";
  result["fields"]["hurtieres2"]= "Hurtières sens 2";
  result["fields"]["mode"]= "Mode";
  result["fields"]["mono"] = "Mono";
  result["fields"]["bidi"]= "Bidi";

  result["fields"]["equipement"] = "Equipement";

  result["fields"]["groupeElectrogene"] = "Groupe électrogène";

  result["fields"]["ouvrage"]= "Ouvrage";
  result["fields"]["sens1"]= "Sens 1";
  result["fields"]["sens2"] = "Sens 2";
  result["fields"]["regime"]= "Régime";
  result["fields"]["r0"]= "R0";
  result["fields"]["r1"]= "R1";
  result["fields"]["r2"] = "R2";
  result["fields"]["r3"]= "R3";
  result["fields"]["r4"]= "R4";
  result["fields"]["r5"] = "R5";
  result["fields"]["r6"]= "R6";
  result["fields"]["sens"]= "Sens";
  result["fields"]["direct"]= "Direct";
  result["fields"]["inverse"]= "Inverse";
  result["fields"]["mode"]= "Mode";
  result["fields"]["auto"]= "Automatique";
  result["fields"]["manuelDirect"]= "Manuel direct";
  result["fields"]["manuelInverse"]= "Manuel inverse";
  result["fields"]["accelerateur"]= "Accélérateur";
  result["fields"]["marche"]= "Marche";
  result["fields"]["arret"]= "Arrêt";
  result["fields"]["surpression1"]= "Surpression sens 1";
  result["fields"]["surpression2"]= "Surpression sens 2";
  result["fields"]["numeroRepereIncendie"]= "Numéro de repère incendie";
  result["fields"]["manuel"]= "Manuel";
  result["fields"]["marche1"]= "Marche sens 1";
  result["fields"]["marche2"]= "Marche sens 2";
  result["fields"]["trappe"] = "Trappe";
  result["fields"]["ouvert"] = "Ouvert";
  result["fields"]["ferme"] = "Fermé";
  result["fields"]["ventilateurAF/AV"] = "Ventilateur AF / AV";
  result["fields"]["ventilateurAbri"] = "Ventilateur en abri";
  result["fields"]["registre"] = "Registre";

  result["fields"]["so"] = "Sans objet";
  result["fields"]["automatiqueLuminancemetre"] = "Automatique luminancemètre";
  result["fields"]["automatiqueStatistique"] = "Automatique statistique";
  result["fields"]["regime1/4"] = "Régime ¼";
  result["fields"]["niveauTrafic"] = "Niveau de trafic";
  result["fields"]["fort"] = "Fort";
  result["fields"]["reduit"] = "Réduit";
  result["fields"]["circuit"] = "Circuit";
  result["fields"]["allume"] = "Allumé";
  result["fields"]["eteint"] = "Eteint";
  result["fields"]["usine"] = "Usine";
  result["fields"]["orelleAval"] = "Orelle aval";
  result["fields"]["bronsonniere"] = "Bronsonnière";
  result["fields"]["peage"] = "Péage";
  result["fields"]["manuelAllume"] = "Manuel allumé";
  result["fields"]["manuelEteint"] = "Manuel éteint";

  result["fields"]["plan"] = "Plan";
  result["fields"]["panneauClimatique"] = "Panneau climatique";
  result["fields"]["message"] = "Message";
  result["fields"]["vent"] = "Vent";
  result["fields"]["pluie"] = "Pluie";
  result["fields"]["accident"] = "Accident";
  result["fields"]["neige"] = "Neige";
  result["fields"]["brouillard"] = "Brouillard";
  result["fields"]["travaux"] = "Travaux";
  result["fields"]["verglas"] = "Verglas";
  result["fields"]["enTest"] = "En test";
  result["fields"]["danger"] = "Danger";
  result["fields"]["manuelEteint"] = "Manuel éteint";
  result["fields"]["dispositifFermeture"] = "Dispositif de fermeture";
  result["fields"]["PMVdArret"] = "PMV d’arrêt";
  result["fields"]["dispositifDelestage"] = "Dispositif de délestage";
  result["fields"]["activationDelestage"] = "Activation délestage";
  result["fields"]["desactivationDelestage"] = "Désactivation délestage";
  result["fields"]["garePeage"] = "Gare de péage";

  result["fields"]["vanne"] = "Vanne";
  result["fields"]["ouverture"] = "Ouverture";
  result["fields"]["fermeture"] = "Fermeture";

  result["fields"]["soutirageBas"] = "Soutirage par le réservoir bas";
  result["fields"]["soutirageHaut"] = "Soutirage par le réservoir haut";
  result["fields"]["remplissageReseau"] = "Remplissage réseau";
  result["fields"]["reservoirIncendie"] = "Réservoir incendie";
  result["fields"]["remplissageAutomatique"] = "Remplissage automatique";
  result["fields"]["remplissageArrete"] = "Remplissage arrêté";

  result["fields"]["barriereHorsGabarit"] = "Barrière hors gabarit";
  result["fields"]["portail"] = "Portail";
  result["fields"]["ITPC"] = "ITPC";

  result["fields"]["scenarioDAI"] = "Scénario DAI";
  result["fields"]["zoneDAI"] = "Zone DAI";
  result["fields"]["sorderettes1"] = "Sorderettes sens 1";
  result["fields"]["orelleCantonA"] = "Orelle canton A";
  result["fields"]["orelleCantonB"] = "Orelle canton B";
  result["fields"]["orelleCantonC"] = "Orelle canton C";
  result["fields"]["inhibe"] = "Inhibé";
  result["fields"]["desinhibe"] = "Désinhibé";
  result["fields"]["camera"] = "Caméra";
  result["fields"]["moniteur"] = "Moniteur";
  result["fields"]["nPreposition"] = "N° de préposition";

  result["fields"]["acces"] = "Accès";
  result["fields"]["zoneInterphonie"] = "Zone d’interphonie";
  result["fields"]["preenregistre"] = "Préenregistré";
  result["fields"]["aucun"] = "Aucun";

  result["fields"]["modeleStrategie"] = "Modèle de stratégie";

  result["fields"]["macroCommande"] = "Macro-commande";
  result["fields"]["modeleMacroCommande"] = "Modèle de macro-commande";

  result["fields"]["destinataire"] = "Destinataire";
  result["fields"]["nComposer"] = "N° à composer parmi les numéros";
  result["fields"]["typeAstreinte"] = "Type d’astreinte";
  result["fields"]["typeAstreinteZone"] = "Type d’astreinte par zone";
  result["fields"]["depanneurVL"] = "Dépanneurs VL";
  result["fields"]["depanneurPL"] = "Dépanneur PL";
  result["fields"]["typeOrganisation"] = "Type d’organisation";
  result["fields"]["gendarmerie"] = "Gendarmerie";
  result["fields"]["sdis"] = "SDIS";
  result["fields"]["centreEntretien"] = "Centre d’entretien";

  result["fields"]["groupeDiffusion"] = "Groupe de diffusion";
  result["fields"]["identifiantMessageVocal"] = "Identifiant du message vocal";
  result["fields"]["astreinte"] = "Astreinte";

  result["fields"]["typeBalisage"] = "Type de balisage";
  result["fields"]["cbu"] = "CBU";
  result["fields"]["cvl"] = "CVL";
  result["fields"]["cvr"] = "CVR";
  result["fields"]["fermeture"] = "Fermeture";
  result["fields"]["basculement"] = "Basculement";
  result["fields"]["deviation"] = "Déviation";
  result["fields"]["longueurBalisage"] = "Longueur du balisage";

  result["fields"]["modeleDocument"] = "Modèle de document";
  result["fields"]["format"] = "Format";
  result["fields"]["html"] = "HTML";
  result["fields"]["pdf"] = "PDF";
  result["fields"]["modeleDocumentEvenement"] = "Modèle de document événement";
  result["fields"]["periodicite"] = "Périodicité";

  result["fields"]["nomConfiguration"] = "Nom de configuration";
  result["fields"]["changerAccesDossier"] = "Chemin d’accès au dossier";
  result["fields"]["texteMessageNotification"] = "Texte du message de notification";
  result["fields"]["texteMessageInformation"] = "Texte du message d’information";
  result["fields"]["nomDocument"] = "Nom du document";
  result["fields"]["cheminAccesDossier"] = "Chemin d’accès au dossier";

  result["fields"]["texteTrace"] = "Texte de la trace";
  return result;
})();
