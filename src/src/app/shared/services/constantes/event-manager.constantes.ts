export class EventManagerCte {
    static EVENT_NAME = {
        // General
        cancelOperation: 'cancelOperation',

        // Group Evenement
        groupCreated: 'groupCreated',
        groupUpdated: 'groupUpdated',
        groupDeleted: 'groupDeleted',

        // Evenement
        createEvenement: 'createEvenement',
        evenementEdited: 'evenementEdited',
        evenementNotEdited: 'evenementNotEdited',
        evenementSucessfullyInitialized: 'evenementSucessfullyInitialized',
        evenementSucessfullyUpdated: 'evenementSucessfullyUpdated',
        evenementSuccessfullyCreated: 'evenementSuccessfullyCreated',
        evenementSuccessfullyUpdated: 'evenementSuccessfullyUpdated',
        cancelCreateOrCancelUpdateForEvtOrBal: 'cancelCreateOrCancelUpdateForEvtOrBal',
        loadAnotherEvenement: 'loadAnotherEvenement',
        fireEditBalisage: 'fireEditBalisage', // event lancé pour l'edition d'un balisage.
        fireUpdateBalisage: 'fireUpdateBalisage', // event lancé pour la mise à jour d'un balisage.

        // ALERTES
        resumeAlertetUpdatedFromWebSocket: 'resumeAlertetUpdatedFromWebSocket',

        // Resumé Evenement
        resumeEvenementCreatedFromWebSocket: 'resumeEvenementCreatedFromWebSocket',
        resumeEvenementUpdatedFromWebSocket: 'resumeEvenementUpdatedFromWebSocket',
        resumeEvenementDeletedFromWebSocket: 'resumeEvenementDeletedFromWebSocket',

        // PAC
        actionApplicableUpdated: 'actionApplicableUpdated',
        pacUpdated: 'pacUpdated',
        pacDeleted: 'pacDeleted',
        launchAction: 'launchAction',
        newPacToBeDisplayed: 'newPacToBeDisplayed',
        actionsUnitairesPacUpdatedFromWebSocket:'actionsUnitairesPacUpdatedFromWebSocket',
        reinitPlanActionADroite:'reinitPlanActionADroite',


        // MACRO COMMANDE
        newMacroCommandeToBeDisplayed: 'newMacroCommandeToBeDisplayed',
        modeleMacroCommandeSelected: 'macroCommandeSelected',
        instanceOfMacroCommandeSelected:'instanceOfMacroCommandeSelected',
        macroCommandesCreateFromWebSocket: 'macroCommandesCreateFromWebSocket',
        macroCommandesUpdateFromWebSocket: 'macroCommandesUpdateFromWebSocket',
        macroCommandesDeleteFromWebSocket: 'macroCommandesDeleteFromWebSocket',
        macroCommandesTypeObjetUpdateFromWebSocket: 'macroCommandesTypeObjetUpdateFromWebSocket',
        uneMacroCommandeCreateFromWebSocket: 'uneMacroCommandeCreateFromWebSocket',
        uneMacroCommandeUpdateFromWebSocket: 'uneMacroCommandeUpdateFromWebSocket',
        uneMacroCommandeDeleteFromWebSocket: 'uneMacroCommandeDeleteFromWebSocket',
        annulerPlanification:'annulerPlanification',
        validerPlanification:'validerPlanification',
        creerPlanificationModeleMacroCommande:'creerPlanificationModeleMacroCommande',
        stopExecutionOfModeleMacroCommande:'stopExecutionOfModeleMacroCommande',

        // Strategies
        strategieSeclected: 'strategieSeclected',
        strategieUnSeclected: 'strategieUnSeclected',
        updateStrategie: 'updateStrategie',
        planStrategie: 'planStrategie', // plainifier une strategie
        resumeStrategieUpdatedFromWebSocket: 'resumeStrategieUpdatedFromWebSocket',
        createStrategieFromPacSuccess: 'createStrategieFromPacSuccess',
        editMessage: 'editMessage',
        addMessage: 'addMessage',
        updateMessage: 'updateMessage',
        justification: 'justification',

        // Bulletins
        bulletinSeclected: 'bulletinSeclected',
        bulletinApercu: 'bulletinApercu',
        bulletinsUpdatedFromWebSocket:'bulletinsUpdatedFromWebSocket',
        showCreateButtonPreparationEnvoi:'showCreateButtonPreparationEnvoi',
        showValiderButtonPreparationEnvoi:'showValiderButtonPreparationEnvoi',
        showPlanifierButtonPreparationEnvoi:'showPlanifierButtonPreparationEnvoi',
        createPreparationEnvoiAndSendToBack:'createPreparationEnvoiAndSendToBack',
        modifierPreparationEnvoiAndSendToBack:'modifierPreparationEnvoiAndSendToBack',
        planifierPreparationEnvoiAlreadyExistAndSendToBack:'planifierPreparationEnvoiAlreadyExistAndSendToBack',
        modifierPlanifierPreparationEnvoiAlreadyExistAndSendToBack:'modifierPlanifierPreparationEnvoiAlreadyExistAndSendToBack',
        creerAndplanifierPreparationEnvoiAndSendToBack:'creerAndplanifierPreparationEnvoiAndSendToBack',
        sendToListOfBulletinsPlanifiesReload:'sendToListOfBulletinsPlanifiesReload',
        sendPreparationEnvoiToModification:'sendPreparationEnvoiToModification',
        sendPreparationEnvoiToPlanification:'sendPreparationEnvoiToPlanification',
        bulletinsCreatedFromWebSocket:'bulletinsCreatedFromWebSocket',
        bulletinsDeletedFromWebSocket:'bulletinsDeletedFromWebSocket',
        bulletinsEmisChangeFromWebSocket:'bulletinsEmisChangeFromWebSocket',

        // AlerteService
        newAlerte: 'alerte.new',
        validateAlerteByCreatingEvenement: 'valider Alerte en créant événement',

        // Section
        sectionCallable: 'sectionCallable',

        // Input Validation
        invalidInput: 'invalidInput',
        validInput: 'validInput',
        invalidSubEmprise: 'invalidSubEmprise',
        validSubEmprise: 'validSubEmprise',

        // Changement d'onglet
        swithchedTab: 'swithchedTab',
        swithchedDailyTab: 'swithchedDailyTab', // aujourd'hui
        swithchedPlannedTab: 'swithchedPlannedTab', // prevu

        // Directive
        unselectItem: 'unselectItem',
        selectItem: 'selectItem',// event appelé lorsque le user clique qui une seconde fois sur un item.
        deselectItem: 'deselectItem',// event appelé lorsque le user clique qui une seconde fois sur un item.

        // infinite scroll
        infiniteScrollNewItem: 'infinite.scroll.new.item',

        // Transverse
        triggerClick: 'triggerClick',

        // Popup confirmAction
        showPopup: 'showPopup',
        confirmActionResponseYes: 'confirmActionResponseYes',
        confirmActionResponseNo: 'confirmActionResponseNo',

        // Cesam http error
        cesamHttpError: 'cesamHttpError',

        // Bandeau
        sessionUserAlreadyExist:'sessionUserAlreadyExist',
        sendSessionUserConnexion:'sendSessionUserConnexion',
        sessionUserUpdatedFromWebSocket:'sessionUserUpdatedFromWebSocket',

        // Notification SAE
        notificationSaeUpdatedFromWebSocket:'notificationSaeUpdatedFromWebSocket',
        removeNotificationMacroToBandeau:'removeNotificationMacroToBandeau',

        // Notes
        notesSaeUpdatedFromWebSocket:'notesSaeUpdatedFromWebSocket',
        sendNotificationToJournalAlerte:'sendNotificationToJournalAlerte',
        sendNotificationToEvenement:'sendNotificationToEvenement',
        sendNotificationToMacroCommande:'sendNotificationToMacroCommande',
        noteModifierByOperateurEvent:'noteModifierByOperateurEvent',
        hiddenPopupModifierNoteEvent:'hiddenPopupModifierNoteEvent',

        // Viabilités Hivernales
        viabilitesHivernalesUpdatedFromWebSocket:'viabilitesHivernalesUpdatedFromWebSocket',
        variablesStationsUpdatedFromWebSocket:'variablesStationsUpdatedFromWebSocket',
        variablesConnexionSaeUpdatedFromWebSocket:'variablesConnexionSaeUpdatedFromWebSocket',
        variablesVehiculeSFTRFUpdatedFromWebSocket:'variablesVehiculeSFTRFUpdatedFromWebSocket',

        // Menu principale
        selectSituationCouranteInMenuPrincipaleEvent:'selectSituationCouranteInMenuPrincipaleEvent',
        selectJournalAlerteInMenuPrincipaleEvent:'selectJournalAlerteInMenuPrincipaleEvent',
        selectStrategieAffichageInMenuPrincipaleEvent:'selectStrategieAffichageInMenuPrincipaleEvent',
        selectMacroCommandeInMenuPrincipaleEvent:'selectMacroCommandeInMenuPrincipaleEvent',
        selectBulletinsInMenuPrincipaleEvent:'selectBulletinsInMenuPrincipaleEvent',
        selectBalisagesInMenuPrincipaleEvent:'selectBalisagesInMenuPrincipaleEvent',
        selectViabiltesHivernalesInMenuPrincipaleEvent:'selectViabiltesHivernalesInMenuPrincipaleEvent',
        selectAstreintesInMenuPrincipaleEvent:'selectAstreintesInMenuPrincipaleEvent',
        selectAnnuairesInMenuPrincipaleEvent:'selectAnnuairesInMenuPrincipaleEvent',
        selectJournauxHistoriquesInMenuPrincipaleEvent:'selectJournauxHistoriquesInMenuPrincipaleEvent',
        selectNotesInfosInMenuPrincipaleEvent:'selectNotesInfosInMenuPrincipaleEvent',

        // Notification de modification de référentiel
        ressourcesUpdatedEvent: 'ressourcesUpdatedEvent',
        astreintesUpdatedEvent: 'astreintesUpdatedEvent',

        // Notification de message vocal
        messageVocalEvent: 'messageVocalEvent',

        // Notification d'une commande IHM (édition evt, ouverture doc/dossier)
        demandeEditionEvenementEvent: 'demandeEditionEvenementEvent',
        demandeCreationEvenementEvent: 'demandeCreationEvenementEvent',
        demandeOuvertureDocumentEvent: 'demandeOuvertureDocumentEvent',
        demandeOuvertureDossierEvent:  'demandeOuvertureDossierEvent'
    }
}
