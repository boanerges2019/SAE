import { Component, OnInit, OnDestroy, Input} from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Rx';
import * as _ from 'underscore';
import * as moment from 'moment';
import { LABELS } from './labels';
import { EventManager } from '../../../../../app/shared/services/event/event-manager.service';
import { EventManagerCte } from '../../../../../app/shared/services/constantes/event-manager.constantes';
import { BaseService } from '../../../../../app/core/evenement/services/base.service';
import { GroupeService } from '../../../../../app/core/evenement/services/groupe.service';
import { Evenement } from '../../../../../app/shared/models/generic/Evenement';
import { ResumeEvenement } from '../../../../../app/shared/models/generic/ResumeEvenement';
import { OrderByPipe } from '../../../../../app/shared/pipes/order-by.pipe';
import { AlertMessage } from '../../../../../app/shared/models/generic/alert-message';
import { ConfigGenerale } from '../../../../../app/shared/services/config/config.generale';
import { EvenementCte } from '../../../../../app/core/evenement/constantes/evenement.constantes';
import { CtxCte } from '../../../../../app/shared/services/constantes/ctx.constantes';
import { FieldEvenementCte } from '../../../../../app/core/evenement/constantes/field-evenement.constantes';
import { EvenementUtils } from '../../../../../app/shared/utils/evenement-utils';
import { ModeleValeur } from '../../../../../app/shared/utils/modele-valeur-builder';
import { CacheService } from '../../../../../app/shared/services/cache/cache.service';
import { CacheConstantes } from '../../../../../app/shared/services/cache/cache.constantes';
import { AbstractBase } from '../../../../../app/shared/components/abstract-base/abstract-base';
import { ModeleEvenementService } from '../../../../../app/core/evenement/services/modele-evenement.service';
import { PrOriente } from '../../../../shared/models/generic/PrOriente';
import { SessionSae } from '../../../../shared/models/generic/SessionSae';

@Component({
    selector: 'liste-evenement',
    templateUrl: './liste-evenement.component.html',
    styleUrls: ['./liste-evenement.component.scss'],
    providers: [BaseService],
})
export class ListeEvenementComponent extends AbstractBase implements OnInit, OnDestroy {

    @Input() prevusDuJourUniquement: boolean = false;
    @Input() lectureSeule: boolean = false;
    @Input() idEvenementSelected?: number;
    @Input() edition?: boolean;
    @Input() creation?: boolean;
    @Input() idAlerteSource?: number;
    @Input() position?: PrOriente;
    @Input() type?: string; // type entité souhaitee [evenement ou balisage]


    model:any = {};
    evenements:ResumeEvenement[]; // Liste des evenements.
    createdEvenement:ResumeEvenement; // objet transmis par un composant fils signalant le status de l'opération.
    allEvenements:ResumeEvenement[] = []; // Liste des evenements
    selectedEvenement:ResumeEvenement; // évenement sélectionné.
    editedEvenement:Evenement; // évenement à editer.
    subscriptions:Subscription[] = [];
    groupes:any = []; //  les groupes
    warningEvtEdit:AlertMessage;

    //----------------------------------------------------------------------------
    //-- INITIALISATION
    //----------------------------------------------------------------------------
    constructor(public evenementService:BaseService,
                public groupeService:GroupeService,
                public eventManager:EventManager,
                public router:Router,
                public location:Location,
                private cacheService:CacheService) {
        super();
        // Listener.
        this.resolveValidationErrorsSubscription();
        this.resolveWebSocketCallbackSubscription();
        this.resolveGroupesSubscription();
        this.resolveCancelCreateOrUpdateSubscription();
        this.resolveSelectionSubscription();
        this.resolveDeselectionSubscription();
        this.resolveSuccessfullyInitOrUpdate();
        this.resolveLoaddingAnotherEvenement();
        this.resolveBalisageSubscription();
    }

    ngOnInit() {

        const nomMethode = 'ListeEvenementComponent.ngOnInit';
        console.debug(nomMethode);

        this.type = this.type || "";
        this.model.onglet = EvenementCte.ONGLET_LISTE_EVT;
        this.model.currentOnglet = EvenementCte.ONGLET_LISTE_EVT.evenementsCourants;
        this.model.field = FieldEvenementCte.FIELD;
        this.model.contexte = CtxCte.CTX;

        this.model.types = _.values(ModeleEvenementService.types);

        this.model.nbEvenements = {};
        this.model.nbEvenements.enCours = undefined;
        this.model.nbEvenements.signales = undefined;
        this.model.nbEvenements.termines = undefined;
        this.model.nbEvenements.prevus = undefined;
        this.model.ctx = {};
        this.model.sort = {}; // initialisation du tri.
        this.model.sort.order = false;

        this.model.evenementFiltre = {};
        this.model.evenementFiltre.enCours = true;
        this.model.evenementFiltre.signale = true;
        this.model.evenementFiltre.termine = false;

        this.initContext();
        this.model.i18n = LABELS; // constantes labels
        this.model.sort.header = this.model.i18n.evenement.headers[this.model.i18n.evenement.headers.length - 1];
        this.model.currentCtx = CtxCte.CTX.LIST_EVENEMENT_COURANT;

        this.model.ongletActif = {
            evenementsCourants: {
                actif: true,
                etats: `${EvenementCte.ETATS_EVENEMENT.enCours}|${EvenementCte.ETATS_EVENEMENT.signale}|${EvenementCte.ETATS_EVENEMENT.termine}`,
            },
            evenementsPrevus: {
                actif: false,
                etats: `${EvenementCte.ETATS_EVENEMENT.prevu}`
            }
        };

        this.model.idAlerteSource = this.idAlerteSource;
        this.idAlerteSource = undefined;
        this.model.position = this.position;
        this.position = undefined;

        /*
        if(this.creation) {
            this.createEvenementManually( (this.model.idAlerteSource) ? CtxCte.CTX.CREATE_EVENEMENT_FROM_ALERTE : CtxCte.CTX.CREATE_EVENEMENT_MANUALLY,
                                         this.model.idAlerteSource,
                                         this.model.position);
        }
        */
        this.getResumeEvenements();

        if(this.prevusDuJourUniquement){
            this.resolveDailyEvenements();
        }


    }

    ngAfterContentInit(){
        const nomMethode = 'ListeEvenementComponent.ngAfterContentInit';
        console.debug(nomMethode);
        if(this.creation) {
            this.createEvenementManually( (this.model.idAlerteSource) ? CtxCte.CTX.CREATE_EVENEMENT_FROM_ALERTE : CtxCte.CTX.CREATE_EVENEMENT_MANUALLY,
                                         this.model.idAlerteSource,
                                         this.model.position);
        }

    }


    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }


    /**
     * @return la liste des évenements.
     */
    public getResumeEvenements() {
        this.model.isLoading = true;
        let param = this.type === EvenementCte.EVT_BAL ? EvenementCte.EVT_BAL : EvenementCte.EVT_EVT;
        this.subscriptions.push(this.evenementService.getResumes(param)
                .subscribe(response => {
                    if (response) {
                        this.allEvenements = response;
                        if(this.idEvenementSelected){
                            /* cas ou il y a un evenement selectionné  */
                            this.allEvenements.map(evenement => {
                                if(evenement.identifiant===this.idEvenementSelected){
                                    if(evenement.codeEtat===EvenementCte.ETATS_EVENEMENT.prevu){
                                        this.resolveTab(this.model.onglet.evenementsPrevus);
                                    }else{
                                        this.resolveTab(this.model.onglet.evenementsCourants);
                                    }
                                   this.selectEvenement(evenement.identifiant);

                                    if(this.edition){
                                        this.editEvenement(null, evenement.identifiant, this.model.contexte.EDIT_EVENEMENT, param);
                                    }else{
                                        this.editEvenement(null, evenement.identifiant, this.model.contexte.READ, param);
                                    }
                                }
                            });
                        }else{
                            if(this.prevusDuJourUniquement){
                                this.resolveDailyEvenements();
                            }else{
                                this.resolveEvenementFiltre();
                            }
                            this.selectedEvenement = undefined;
                            this.resolveCounts();
                        }

                    }
                }, error => { },
                () => {
                    this.model.isLoading = false;
                })
        );
    }


    /**
     * Sélectionné un évenement
     * @param resumeEvenement
     */
    public selectEvenement( identifiant:number, codeModele?: string) {
        if (codeModele === EvenementCte.EVT_BAL){
            this.eventManager.broadcast({
                name: EventManagerCte.EVENT_NAME.fireEditBalisage,
                content: {identifiant: identifiant, currentCtx: CtxCte.CTX.READ }
            });
            return;
        }
        this.model.ctx.identifiant = identifiant;
    }

    /**
     * Met à jour un évenement.
     * @param evenement l'évenement.
     */
    public updateEvenement(event, evenement:Evenement) {
        if (event){
            event.stopPropagation();
            event.preventDefault();
        }
        // attention on met l'entite dans le cache uniquement pour s'en servir afin de la reselectionner apres update.
        //this.cacheService.setObject(CacheConstantes.EDITED_ITEM, this.editedEvenement);
        this.subscriptions.push(this.evenementService.updateEvenement(evenement)
            .subscribe(response => {
                // attention on récupère l'entite dans le cache uniquement pour s'en servir afin de la reselectionner apres update.
                this.subscriptions.push(this.evenementService.entrerOuSortirModeEdition(this.editedEvenement.identifiant, "FIN")
                    .subscribe((resp) => {
                        this.cacheService.setObject(CacheConstantes.ID_EVT_EDIT, null);
                        this.warningEvtEdit = undefined;
                        setTimeout(() => {
                            if (!this.editedEvenement) return;
                            this.eventManager.broadcast({
                                name: EventManagerCte.EVENT_NAME.triggerClick,
                                content: {identifiant: this.editedEvenement.identifiant}
                            });
                        }, 1000);
                        this.editedEvenement = undefined;
                        this.selectedEvenement = undefined;
                        this.model.currentCtx = this.model.sourceCtx;
                        this.resolveTab(this.model.currentOnglet);

                        if (this.model.idAlerteSource) {
                            this.router.navigate(['/situation-courante']);
                        }
                    }));
            }));
    }

    /**
     * Crée un évenement un évenement manuellement.
     * @param currentCtx mode d'access à la ressource.
     * @param alerte dans le cas d'une creation d'un evenement avec alerte.
     */
    public createEvenementManually(currentCtx:string, idAlerteSource?:number, position?: PrOriente) {
        const nomMethode = 'createEvenementManually';
        console.debug(nomMethode + ' : ctx=' + currentCtx + ' idAlerte= '+idAlerteSource);


        // Exceptionnellement l'edition d'un balisage est géré différemment et dans un autre composant
        if (this.type === EvenementCte.EVT_BAL){
            this.eventManager.broadcast({
                name: EventManagerCte.EVENT_NAME.fireEditBalisage,
                content: {
                        'identifiant': undefined,
                        'evenement': undefined,
                        'currentCtx': currentCtx,
                        'currentOnglet': this.model.currentOnglet,
                        'idAlerteSource': idAlerteSource,
                        'position': position
                }
            });
            return;
        }
        this.cacheService.setObject(CacheConstantes.PREVENT_NON_SAVE_DATA_CTX, true);
        this.model.sourceCtx = this.model.currentCtx;
        this.model.currentCtx = currentCtx;
        this.model.ctx.new = true;
        this.model.idAlerteSource = idAlerteSource;
        this.model.position = position;
        this.eventManager.broadcast({name: EventManagerCte.EVENT_NAME.createEvenement, content: {}});
    }

    /**
     * Permet de modifier le type d'un évenement
     * @param currentCtx mode d'access à la ressource.
     */
    public updateTypeEvenement($event, evenement:ResumeEvenement, currentCtx:string) {
        $event.stopPropagation();
        $event.preventDefault();
        this.cacheService.setObject(CacheConstantes.PREVENT_NON_SAVE_DATA_CTX, true);
        this.selectedEvenement = evenement;
        this.model.sourceCtx = this.model.currentCtx;
        this.model.currentCtx = currentCtx;
        this.model.ctx.new = true;
    }


    /**
     * Gestion modification etat de l'événement.
     * @param  {[type]}          $event     [description]
     * @param  {ResumeEvenement} evenement  [description]
     * @param  {string}          currentCtx [description]
     * @param  {string}          codeModele [description]
     * @return {[type]}                     [description]
     */
    public updateEtatEvenement($event, evenement:ResumeEvenement, currentCtx:string, codeModele: string) {
        $event.stopPropagation();
        $event.preventDefault();

        // Exceptionnellement l'edition d'un balisage est géré différemment et dans un autre composant
        if (codeModele === EvenementCte.EVT_BAL){
            this.eventManager.broadcast({
                name: EventManagerCte.EVENT_NAME.fireEditBalisage,
                content: {
                        identifiant: evenement.identifiant,
                        evenement: evenement,
                        currentCtx: currentCtx,
                        currentOnglet: this.model.currentOnglet,
                        idAlerteSource: this.model.idAlerteSource
                }
            });
            return;
        }
        this.cacheService.setObject(CacheConstantes.PREVENT_NON_SAVE_DATA_CTX, true);
        this.selectedEvenement = evenement;
        this.model.sourceCtx = this.model.currentCtx;
        this.model.currentCtx = currentCtx;
        this.model.ctx.new = true;
    }

    //----------------------------------------------------------------------------
    //-- EVENEMENTS
    //----------------------------------------------------------------------------
    /**
     * @param header du tableau sur lequel le tri doit se faire.
     * @return Tri le tableau des évenements.
     */
    public sortHeader(header) {
        if (!header.sortable) return;
        this.model.sort.header = header;
        this.model.sort.order = !this.model.sort.order;
        this.groupes = this.groupes.map(groupe => {
            groupe.evenements.sort((item1, item2) => {
                return super.compare(item1, item2, header.model, FieldEvenementCte.FIELD)
            });
            if (!this.model.sort.order)  groupe.evenements.reverse();
            return groupe;
        });
    }

    /**
     * Gestion du changement de filtre.
     */
    public resolveEvenementFiltre() {
        let states = [];
        states = this.model.evenementFiltre.enCours ? states.concat([EvenementCte.ETATS_EVENEMENT.enCours]) : states;
        states = this.model.evenementFiltre.signale ? states.concat([EvenementCte.ETATS_EVENEMENT.signale]) : states;
        states = this.model.evenementFiltre.termine ? states.concat([EvenementCte.ETATS_EVENEMENT.termine]) : states;
        this.evenements = this.getEvenementsByEtat(states, this.allEvenements);
        this.groupes = this.resolveGroups(this.evenements);
    }

    /**
     * Gestion des notifications de Creation/Update/Delete de résume d'évenement.
     */
    private resolveWebSocketCallbackSubscription() {
        this.subscriptions.push(this.eventManager
            .subscribe(EventManagerCte.EVENT_NAME.resumeEvenementCreatedFromWebSocket, (response) => {

                this.allEvenements.unshift(response.content);
                this.postOperationsAfterWebsocketNotification(this.model.currentOnglet);
                this.resolveCounts();
            }));

        this.subscriptions.push(this.eventManager
            .subscribe(EventManagerCte.EVENT_NAME.resumeEvenementUpdatedFromWebSocket, (response) => {
                let updatedEvenement = response.content;
                this.allEvenements = this.allEvenements.map(evenement => {
                    if (evenement.identifiant === updatedEvenement.identifiant) {
                        evenement = updatedEvenement;
                    }
                    return evenement;
                });

                this.postOperationsAfterWebsocketNotification(this.model.currentOnglet);
                this.resolveCounts();
            }));

        this.subscriptions.push(this.eventManager
            .subscribe(EventManagerCte.EVENT_NAME.resumeEvenementDeletedFromWebSocket, (response) => {
                let deletedEvenement = response.content;
                this.allEvenements = this.allEvenements.filter(evenement => {
                    return evenement.identifiant !== deletedEvenement.identifiant
                });

                this.postOperationsAfterWebsocketNotification(this.model.currentOnglet);
                this.resolveCounts();
            }));
    }

    /**
     * Traitement suite à la réception de la notification websocket.
     * @aram tab l'onglet cible.
     */
    public postOperationsAfterWebsocketNotification(tab:string):void {
        switch (tab) {
            case this.model.onglet.evenementsCourants:
                this.resolveEvenementFiltre();
                break;
            case this.model.onglet.evenementsPrevus:
                this.evenements = this.getEvenementsByEtat([EvenementCte.ETATS_EVENEMENT.prevu], this.allEvenements);
                this.model.nbEvenements.prevus = this.evenements.length;
                this.groupes = this.resolveGroups(this.evenements);
                break;
            default:
                return;
        }
    }

    /**
     * Gestion des notifications de Creation/Update/Delete de groupe d'évenement.
     */
    private resolveGroupesSubscription() {
        this.subscriptions.push(this.eventManager
            .subscribe(EventManagerCte.EVENT_NAME.groupCreated, (response) => {
                this.resolveCreatedGroupeNotification(response.content); // notification creation
            }));

        this.subscriptions.push(this.eventManager
            .subscribe(EventManagerCte.EVENT_NAME.groupUpdated, (response) => {
                this.resolveUpdatedGroupeNotification(response.content); // notification mis à jour.
            }));
    }

    /**
     * Traitement des messages d'alerte remontés par les composants fils.
     * @param operationStatus de l'opération (succès, echec, ou annuler).
     */
    public resolveCancelCreateOrUpdateSubscription() {
        this.subscriptions.push(this.eventManager
            .subscribe(EventManagerCte.EVENT_NAME.cancelCreateOrCancelUpdateForEvtOrBal, (response) => {
                this.model.ctx.new = false;
                this.model.position = undefined;
                this.model.currentCtx = this.model.sourceCtx || this.model.currentCtx;
            }));
    }

    /**
     * Gestion des notifications de sélection d'un item.
     */
    private resolveSelectionSubscription() {
        this.subscriptions.push(this.eventManager.subscribe(EventManagerCte.EVENT_NAME.selectItem, (response) => {

                this.subscriptions.push(this.evenementService.getEvenement(response.content.model.identifiant)
                    .subscribe((response) => {
                        if (response && this.type !== EvenementCte.EVT_BAL) {
                            // pas de plan d'action pour les balisage.
                            this.eventManager.broadcast({
                                name: EventManagerCte.EVENT_NAME.evenementEdited,
                                content: response.identifiant
                            });
                        }
                    }));


        }));
    }

    /**
     * Gestion des notifications de sélection d'un item.
     */
    private resolveDeselectionSubscription() {
        this.subscriptions.push(this.eventManager.subscribe(EventManagerCte.EVENT_NAME.deselectItem, (response) => {
            if (response.content.deselectionConcerned && response.content.deselectionConcerned !== "listeEvenements")
                return; // dans ce cas la désélection ne concerne pas les evets.
            this.model.ctx.identifiant = undefined;
        }));
    }

    /**
     * Listener des éventuelles erreurs de validation.
     */
    private resolveValidationErrorsSubscription() {
        this.subscriptions.push(this.eventManager
            .subscribe(EventManagerCte.EVENT_NAME.invalidInput, (response) => {
                this.model.hadValidationErrors = true;
            }));

        this.subscriptions.push(this.eventManager
            .subscribe(EventManagerCte.EVENT_NAME.validInput, (response) => {
                this.model.hadValidationErrors = false;
            }));
    }

    /**
     * Listener déclenchée apres création d'un evt.
     */
    private resolveSuccessfullyInitOrUpdate() {
        this.subscriptions.push(this.eventManager
            .subscribe(EventManagerCte.EVENT_NAME.evenementSucessfullyInitialized, (response) => {
                this.postResolveSuccessfullyInitOrUpdate(response);
            }));

        this.subscriptions.push(this.eventManager
            .subscribe(EventManagerCte.EVENT_NAME.evenementSucessfullyUpdated, (response) => {
                this.cacheService.setObject(CacheConstantes.PREVENT_NON_SAVE_DATA_CTX, false);
                this.postResolveSuccessfullyInitOrUpdate(response);
            }));
    }

    /**
     * Gestion des notifications suite à une intisalisation ou update etat, type d'un evenement.
     * @param  {any}    response [description]
     * @return {[type]}          [description]
     */
    private postResolveSuccessfullyInitOrUpdate(response: any){
        const nomMethode = 'postResolveSuccessfullyInitOrUpdate';

        if (response.content.evenement && response.content.evenement.codeModele ===  EvenementCte.EVT_BAL){
            this.eventManager.broadcast({
                name: EventManagerCte.EVENT_NAME.fireEditBalisage,
                content: { evenement: response.content.evenement, currentCtx: CtxCte.CTX.EDIT_EVENEMENT}
            });
            return;  // l'edition d'un balisage est géré différemment.
        }
        let contexte = response.content.contexte;
        let evt = response.content.evenement;
        this.model.ctx.new = false;
        switch (contexte) {
            case CtxCte.CTX.CREATE_EVENEMENT_MANUALLY:
            case CtxCte.CTX.CREATE_EVENEMENT_FROM_ALERTE:
                this.editedEvenement = evt;
                this.model.currentCtx = CtxCte.CTX.EDIT_EVENEMENT;
                break;
            case CtxCte.CTX.UPDATE_ETAT_EVENEMENT:
                this.model.currentCtx = this.model.sourceCtx || this.model.currentCtx;
                //this.getResumeEvenements();
                break;
            default:
                this.model.currentCtx = this.model.sourceCtx;
                break;
        }
    }

    /**
     * Listener déclenchée apres création d'un evt.
     */
    private resolveLoaddingAnotherEvenement() {
        this.subscriptions.push(this.eventManager
            .subscribe(EventManagerCte.EVENT_NAME.loadAnotherEvenement, (response) => {
                this.cancelEdition(null);
                this.selectEvenement(response.content.identifiant);
                this.editEvenement(null, response.content.identifiant, this.model.contexte.READ, EvenementCte.EVT_EVT);
            }));
    }

    /**
     * Gestion des notifications des updates balisages(cas particulier).
     */
    private resolveBalisageSubscription() {
        this.subscriptions.push(this.eventManager
            .subscribe(EventManagerCte.EVENT_NAME.fireUpdateBalisage, (response) => {
                this.updateEvenement(null, response.content.evenement);
            }));
    }


    /**
     * Charge un évenement à partir d'un résumé évenement.
     * @param  {number} identifiant [description]
     * @param  {string} currentCtx  [description]
     * @param  {string} codeModele  [description]
     * @return {[type]}             [description]
     */
    public editEvenement(event, identifiant:number, currentCtx:string, codeModele?: string) {
        if (event){
            event.stopPropagation();
            event.preventDefault();
        }
        // Exceptionnellement l'edition d'un balisage est géré différemment et dans un autre composant
        if (codeModele === EvenementCte.EVT_BAL){
            this.eventManager.broadcast({
                name: EventManagerCte.EVENT_NAME.fireEditBalisage,
                content: {identifiant: identifiant, currentCtx: currentCtx}
            });
            return;
        }
        this.model.sourceCtx = this.model.currentCtx;
        this.model.currentCtx = currentCtx;
        this.subscriptions.push(this.evenementService.getEvenement(identifiant)
            .subscribe((response) => {
                if (response) {
                    this.editedEvenement = response;
                    if (this.model.currentCtx != this.model.contexte.READ) {
                        this.subscriptions.push(this.evenementService.entrerOuSortirModeEdition(identifiant, "DEBUT")
                            .subscribe((resp) => {
                                this.cacheService.setObject(CacheConstantes.ID_EVT_EDIT, identifiant);
                                this.cacheService.setObject(CacheConstantes.PREVENT_NON_SAVE_DATA_CTX, true); // pour détecter des données éventuellement non sauvegardées.
                                if (resp) {
                                    if(resp && resp.length > 0){
                                        this.initMessageAvertissementEdit(resp[0]);
                                    }
                                }
                            }));
                    }
                }
            }));
    }

    private initMessageAvertissementEdit(session:any){
        this.warningEvtEdit = <AlertMessage> {
            message: "Attention : la fiche événement est déjà ouverte par l'utilisateur " + session.nom+".",
            occurrence:-1
        }

    }

    /**
     * Annulle l'opération d'édition d'un évènement.
     */
    public cancelEdition($event) {
        if ($event){
            $event.stopPropagation();
            $event.preventDefault();
        }
        //this.model.ctx.identifiant = undefined;// pour eventuellement gardé la sélection sur le dernier item.
        this.subscriptions.push(this.evenementService.entrerOuSortirModeEdition(this.editedEvenement.identifiant, "FIN")
            .subscribe((resp) => {

            }));
        this.warningEvtEdit = undefined;
        this.editedEvenement = undefined;
        this.model.currentCtx = this.model.sourceCtx;
        this.cacheService.setObject(CacheConstantes.ID_EVT_EDIT, null);

    }




    /**
     * Gestion du click sur un onglet Evenements courants, prévus.
     * @param  {Date}   dateFrom [description]
     * @param  {Date}   dateTo   [description]
     * @return {[type]}          [description]
     */
    public resolveEvenementsPrevus(dateFrom:Date, dateTo:Date) {
        if (dateFrom > dateTo) return;
        this.initContext();
        this.evenements = this.getEvenementsByEtat([EvenementCte.ETATS_EVENEMENT.prevu], this.allEvenements);
        this.evenements = this.evenements.filter(evenement => {
            let a = evenement.horodateDebutPrevue ? evenement.horodateDebutPrevue.toString().slice(0, 10) : evenement.horodateDebut;
            let from = moment(dateFrom).format(ConfigGenerale.EN_SHORT_FORMAT_DATE);
            let to = moment(dateTo).format(ConfigGenerale.EN_SHORT_FORMAT_DATE);
            return a >= from && a <= to;
        });
        this.groupes = this.resolveGroups(this.evenements);
    }

    /**
     * Débranche sur les évenements d'aujourd'hui.
     */
    public resolveDailyEvenements():void {
        this.resolveTab(this.model.onglet.evenementsPrevus);

        this.initContext();
        this.model.currentOnglet = this.model.onglet.evenementsPrevus;
        this.model.ongletActif.evenementsCourants.actif = false;
        this.model.ongletActif.evenementsPrevus.actif = true;
        this.evenements = this.getEvenementsByEtat([EvenementCte.ETATS_EVENEMENT.prevu], this.allEvenements);
        this.evenements = this.evenements.filter(evenement => {
            let a = evenement.horodateDebutPrevue ? evenement.horodateDebutPrevue.toString().slice(0, 10) : evenement.horodateDebutPrevue;
            let b = moment(new Date()).format(ConfigGenerale.EN_SHORT_FORMAT_DATE);
            return a === b;
        });
        this.model.nbDailyEvenements = this.evenements.length;

        this.groupes = this.resolveGroups(this.evenements);
        this.model.ctx.dailyEvenement = true; // overrive click  evt aujourdhui.
    }

    /**
     * Débranche sur l'onglet cliqué.
     * @aram tab l'onglet cible.
     */
    public resolveTab(tab:string):void {
        this.initContext();
        this.resetOngletAction();
        this.selectedEvenement = this.editedEvenement = undefined;
        this.warningEvtEdit = undefined;
        switch (tab) {
            case this.model.onglet.evenementsCourants:
                this.model.ongletActif.evenementsCourants.actif = true;
                this.model.currentOnglet = this.model.onglet.evenementsCourants;
                this.model.currentCtx = CtxCte.CTX.LIST_EVENEMENT_COURANT;
                this.resolveEvenementFiltre();
                break;
            case this.model.onglet.evenementsPrevus:
                this.model.ongletActif.evenementsPrevus.actif = true;
                this.model.currentOnglet = this.model.onglet.evenementsPrevus;
                this.model.currentCtx = CtxCte.CTX.LIST_EVENEMENT_PREVU;
                this.evenements = this.getEvenementsByEtat([EvenementCte.ETATS_EVENEMENT.prevu], this.allEvenements);
                this.model.nbEvenements.prevus = this.evenements.length;
                this.groupes = this.resolveGroups(this.evenements);
                this.model.ctx.dailyEvenement = false; // override click evt du jour.
                break;
            default:
                break;
        }
        this.initPartieDeDroite();
    }

    private initPartieDeDroite(){
        this.eventManager.broadcast({
            name: EventManagerCte.EVENT_NAME.reinitPlanActionADroite,
            content: undefined
        });
    }

    //----------------------------------------------------------------------------
    //-- GESTION DES GROUPES D'EVENEMENT.
    //----------------------------------------------------------------------------
    /**
     * Edit un groupe
     * @param groupe groupe
     */
    public editGroup($event, groupe) {
        $event.preventDefault();
        $event.stopPropagation();
        groupe.ctx.editable = false;
        groupe.ctx.renamable = false;
        groupe.ctx.evenementMovable = true;

        this.model.currentCtx = CtxCte.CTX.UPDATE_GROUPE_EVENEMENT;
        groupe.evenements.forEach(evenement => {
            evenement[this.model.field.checked] = true;
        });
        this.groupes.forEach(groupe => {
            groupe.ctx.edited = true;
            groupe.ctx.selected = false;
            groupe.ctx.collapse = false;
        });
    }

    /**
     * Select un groupe
     * @param groupe groupe
     */
    public selectGroup($event, groupe) {
        $event.preventDefault();
        $event.stopPropagation();
        if (this.model.currentCtx !== CtxCte.CTX.LIST_EVENEMENT_COURANT) {
            return;
        }
        groupe.ctx.selected = true;
        groupe.ctx.collapse = !groupe.ctx.collapse;
        if (!groupe.ctx.collapse) {
            groupe.ctx.editable = true;
            groupe.ctx.renamable = true;
        } else {
            groupe.ctx.editable = false;
            groupe.ctx.renamable = false;
        }

    }


    /**
     * Valide la creation d'un groupe, move le groupe de l'evenement vers le nouveau groupe.
     * @param $event javascript
     * @param oldGroupe groupe
     * @param groupName nouveau groupe
     * @param evenementToBeMovedToNewGroup evt
     */
    createOrUpdateGroup($event, groupe:any, groupName:string, evenementToBeMovedToNewGroup:Evenement) {
        if (!groupName) return;

        switch (this.model.currentCtx) {
            case CtxCte.CTX.UPDATE_GROUPE_EVENEMENT:
                this.validateRenameGroup($event, groupe);
                break;
            case CtxCte.CTX.CREATE_GROUPE_EVENEMENT:
                this.validateCreateGroup($event, groupe, groupName, evenementToBeMovedToNewGroup);
                break;
            default:
                return;
        }
    }

    /**
     * Renomme un groupe.
     * @param groupe groupe
     */
    public renameGroup($event, groupe) {
        $event.preventDefault();
        $event.stopPropagation();
        this.model.groupName = groupe.groupName;
        this.model.currentCtx = CtxCte.CTX.UPDATE_GROUPE_EVENEMENT;
        groupe.ctx.renameInProgress = true;
        groupe.ctx.renamable = false;
        groupe.ctx.editable = false;
        groupe.ctx.selected = false;
        groupe.ctx.collapse = false;
    }


    /**
     * Crée un groupe.
     * @param $event evenement javascript
     * @param targetGroup evenement à ranger dans le nouveau groupe
     * @param evenement evenement à ranger dans le nouveau groupe
     */
    public createGroup($event, targetGroup:any, evenement:Evenement) {
        $event.preventDefault();
        $event.stopPropagation();
        this.cacheService.setObject(CacheConstantes.PREVENT_NON_SAVE_DATA_CTX, true);
        this.model.currentCtx = CtxCte.CTX.CREATE_GROUPE_EVENEMENT;
        targetGroup.ctx.creationInProgress = true;
        targetGroup.ctx.edited = false;
        targetGroup.ctx.editable = false;
        targetGroup.ctx.renamable = false;
        this.model.evenementToBeMovedToNewGroup = evenement;
        this.model.groupName = `${this.model.i18n.typeEvenement[evenement.codeModele]}`;
    }

    /**
     * Valide la creation d'un groupe, move le groupe de l'evenement vers le nouveau groupe.
     * @param $event javascript
     * @param oldGroupe groupe
     * @param groupName nouveau groupe
     * @param evenementToBeMovedToNewGroup evt
     */
    public validateCreateGroup($event, groupe:any, groupName:string, evenementToBeMovedToNewGroup:Evenement) {
        $event.preventDefault();
        $event.stopPropagation();

        let data:any = {};
        ModeleValeur.setValue(data, groupName);
        delete data.codeValeur;
        delete data.valeur;
        data["evenements"] = [evenementToBeMovedToNewGroup.identifiant];
        this.subscriptions.push(this.groupeService.createGroupe(data)
            .subscribe(response => {
                groupe.ctx.creationInProgress = false;
            },
                error => {
            },
            () => {
                this.model.currentCtx = CtxCte.CTX.LIST_EVENEMENT_COURANT;
            }));
    }

    /**
     * Valide le renommage d'un groupe
     * @param $event
     * @param groupe groupe
     */
    public validateRenameGroup($event, targetGroupe) {
        $event.preventDefault();
        $event.stopPropagation();
        this.model.currentCtx = CtxCte.CTX.LIST_EVENEMENT_COURANT;
        this.model.groupName = this.model.groupName || undefined;
        targetGroupe.groupName = !!this.model.groupName.trim() ? this.model.groupName : targetGroupe.groupName;

        let dataGroup:{ [key: string]: any } = {};
        dataGroup.identifiant = targetGroupe.identifiant;
        dataGroup.params = `?nom=${this.model.groupName}`;

        this.subscriptions.push(this.groupeService.getGroupe(targetGroupe.identifiant)
            .subscribe(response => {
                this.subscriptions.push(this.groupeService.renameGroupe(dataGroup)
                    .subscribe(response => {
                        targetGroupe.ctx.renameInProgress = false;
                        targetGroupe.ctx.renamable = true;
                        targetGroupe.ctx.editable = true;
                    },
                        error => {
                    },
                    () => {
                    }));
            },
                error => {
            },
            () => {
                this.model.currentCtx = CtxCte.CTX.LIST_EVENEMENT_COURANT;
            }));

    }

    /**
     * Valide les opérations d'un groupe
     * @param groupe groupe
     */
    public validateGroup($event, targetGroupe) {
        $event.preventDefault();
        $event.stopPropagation();
        this.cacheService.setObject(CacheConstantes.PREVENT_NON_SAVE_DATA_CTX, false);
        let dataGroup:{ [key: string]: any } = {};
        dataGroup.identifiant = targetGroupe.identifiant;
        //dataGroup.params =`?nom=${targetGroupe.groupName}`;
        dataGroup["a_inserer"] = [];
        dataGroup["a_supprimer"] = [];

        this.groupes.forEach(groupe => {
            groupe.evenements.forEach(evenement => {
                if (evenement[this.model.field.checked] && evenement.attributs[this.model.field.groupe].valeur !== targetGroupe.identifiant) {
                    dataGroup["a_inserer"].push(evenement.identifiant);
                } else if (!evenement[this.model.field.checked] && evenement.attributs[this.model.field.groupe].valeur === targetGroupe.identifiant) {
                    dataGroup["a_supprimer"].push(evenement.identifiant);
                }
            });
        });

        this.subscriptions.push(this.groupeService.getGroupe(targetGroupe.identifiant)
            .subscribe(response => {
                this.subscriptions.push(this.groupeService.updateGroupe(dataGroup)
                        .subscribe(
                            response => {
                        },
                            error => {
                        },
                        () => {
                            this.resetGroupe(targetGroupe);
                        })
                );
            },
                error => {
            },
            () => {
                this.model.currentCtx = CtxCte.CTX.LIST_EVENEMENT_COURANT;
            }));

    }


    private resolveCreatedGroupeNotification(content) {
        let evenementsOfNewGroup = [];
        this.groupes.forEach(groupe => {
            groupe.evenements = groupe.evenements.filter(evenement => {
                if (content.evenements.indexOf(evenement.identifiant) > -1) {
                    evenementsOfNewGroup.push(evenement);
                }
                return (content.evenements.indexOf(evenement.identifiant) < 0);
            });
        });

        let newGroup = this.buildEmpyGroup({
            identifiant: content.identifiant,
            groupName: content.nom,
            evenements: evenementsOfNewGroup
        });
        this.groupes.push(newGroup);
    }

    private resolveUpdatedGroupeNotification(content) {
        this.getResumeEvenements();
    }

    /**
     * Valide les opérations d'un groupe.
     * @param groupe groupe
     */
    public cancelGroup($event, groupe) {
        $event.preventDefault();
        $event.stopPropagation();

        this.model.currentCtx = CtxCte.CTX.LIST_EVENEMENT_COURANT;
        this.model.groupName = '';
        this.groupes.forEach(groupe => {
            groupe.evenements.forEach(evenement => {
                evenement[this.model.field.checked] = false;
                this.resetGroupe(groupe);
            });
        });
        groupe.ctx.renamable = true;
        groupe.ctx.editable = true;
        groupe.ctx.creationInProgress = false;
        groupe.ctx.renameInProgress = false;
        groupe.ctx.evenementMovable = false;
        this.cacheService.setObject(CacheConstantes.PREVENT_NON_SAVE_DATA_CTX, false);
    }

    /**
     * Valide reinitialise les valeurs d'un groupe.
     * @param groupe groupe
     */
    private resetGroupe(groupe) {
        groupe.ctx.renamed = false;
        groupe.ctx.edited = false;
        groupe.ctx.selected = true;
        groupe.ctx.collapse = false;
        this.model.groupName = '';
    }

    /**
     * Range les evenenements dans un groupe.
     */
    private resolveGroups(evenements:ResumeEvenement[]) {
        let result = [];
        if (!evenements || evenements.length <= 0) return;
        let groupMap = {};
        evenements.forEach(evenement => {
            evenement.attributs = evenement.attributs || {};
            evenement.attributs[FieldEvenementCte.FIELD.groupe] = evenement.attributs[FieldEvenementCte.FIELD.groupe] || {valeur: EvenementCte.DEFAULT_GROUP};
            let idGroup = evenement.attributs[FieldEvenementCte.FIELD.groupe].valeur || EvenementCte.DEFAULT_GROUP;
            if (!groupMap[idGroup]) {
                groupMap[idGroup] = {};
                groupMap[idGroup].identifiant = evenement.attributs[FieldEvenementCte.FIELD.groupe].valeur;
                groupMap[idGroup].groupName = evenement.attributs[FieldEvenementCte.FIELD.groupe].nom || EvenementCte.DEFAULT_GROUP;
                groupMap[idGroup].evenements = [];
            }
            groupMap[idGroup].evenements.push(evenement);
        });
        for (const key in groupMap) {
            result.push(this.buildEmpyGroup(groupMap[key]));
        }
        return result;
    }

    /**
     * Crée un groupe vide.
     * @param identifiant id du groupe.
     * @param dataGroup données du groupe
     */
    private buildEmpyGroup(dataGroup:any) {
        return {
            identifiant: dataGroup.identifiant,
            groupName: dataGroup.groupName || EvenementCte.DEFAULT_GROUP,
            evenements: dataGroup.evenements,
            ctx: {
                collapse: false,
                selected: true,
                editable: true,
                renamable: true,
                show: true,
                allowUpdate: dataGroup.groupName !== EvenementCte.DEFAULT_GROUP
            }
        }
    }

    /**
     * Détermine le nombre d'évenements en cours, signalés et terminé.
     */
    public resolveCounts() {
        // reset to zero.
        for (const field in this.model.nbEvenements) {
            this.model.nbEvenements[field] = 0;
        }
        this.allEvenements.forEach(evenement => {
            switch (evenement.codeEtat) {
                case EvenementCte.ETATS_EVENEMENT.enCours:
                    this.model.nbEvenements.enCours += 1;
                    break;
                case EvenementCte.ETATS_EVENEMENT.signale:
                    this.model.nbEvenements.signales += 1;
                    break;
                case EvenementCte.ETATS_EVENEMENT.termine:
                    this.model.nbEvenements.termines += 1;
                    break;
                case EvenementCte.ETATS_EVENEMENT.prevu:
                    this.model.nbEvenements.prevus += 1;
                    break;
                default:
                    break;
            }
        });
        this.model.nbDailyEvenements = this.countDailyEvenements();
    }

    /**
     * retourne les événements qui matchent avec l'état passé en paramètre.
     * @param etats voulus.
     */
    public getEvenementsByEtat(etats:string[], allEvenements:any):any[] {
        return allEvenements.filter(evenement => etats.indexOf(evenement.codeEtat) > -1);
    }


    /**
     * Reset onglet.
     */
    public resetOngletAction() {
        for (const field in this.model.ongletActif) {
            this.model.ongletActif[field].actif = false;
        }
    }


    /**
     * @param statut event
     * @return la classe css à appliquer selon le paramètre en entrée.
     */
    public getCssClasses(item:string) {
        return EvenementUtils.getCssClasses(item);
    }


    /**
     * @param item passé en paramètre.
     * @return vrai si l'item est sélectionné
     */
    public isSelected(evenement:ResumeEvenement):boolean {
        return this.model.ctx.identifiant === evenement.identifiant && this.model.ctx.selected;
    }


    /**
     * Débranche sur les évenements d'aujourd'hui.
     */
    public countDailyEvenements():number {
        let evenements = this.getEvenementsByEtat([EvenementCte.ETATS_EVENEMENT.prevu], this.allEvenements);
        evenements = evenements.filter(evenement => {
            let a = evenement.horodateDebutPrevue ? evenement.horodateDebutPrevue.toString().slice(0, 10) : evenement.horodateDebutPrevue;
            let b = moment(new Date()).format(ConfigGenerale.EN_SHORT_FORMAT_DATE);
            return a === b;
        });
        return evenements.length;
    }

    /**
     * Gestion du click sur un onglet Evenements courants, prévus.
     */
    public gotoEvenementsPrevus(dateFrom:Date, dateTo:Date) {
        if (dateFrom > dateTo) return;
        this.resetOngletAction();
        this.model.ongletActif.evenementsPrevus.actif = true;
        this.evenements = this.evenements.filter(evenement => {
            let a = evenement.horodateDebut ? evenement.horodateDebut.toString().slice(0, 10) : evenement.horodateDebut;
            let from = moment(dateFrom).format(ConfigGenerale.FR_SHORT_FORMAT_DATE);
            let to = moment(dateTo).format(ConfigGenerale.FR_SHORT_FORMAT_DATE);
            return a >= from && a <= to;
        });
    }

    /**
     * Initialisation du contexte.
     */
    public initContext():void {
        this.model.ctx.identifiant = undefined;
        this.model.ctx.selected = false;
        this.model.ctx.edit = false;
        this.model.ctx.new = false;
    }



    /**
     * Localiser une alerte
     * @param $event
     * @param alerte
     */
    public localiserEvenement(event, evt:Evenement) {
        const nomMethode = 'localiserEvenement';
        console.debug(nomMethode + ' : ' + JSON.stringify(evt));


        event.preventDefault();
        event.stopPropagation();

        //On récupère la session
        let poste;
        const session: SessionSae = this.cacheService.getObject(CacheConstantes.SESSION);
        if(session){
            poste = session.poste;
        }

        if (poste) {
            const balisage = evt.codeModele === 'BAL'
            this.subscriptions.push(this.evenementService.localiserEvenement (poste, evt.identifiant, balisage)
                .subscribe(response => {
                    console.log(response);
                }
                ));
        }else{
            console.error("poste opérateur introuvable")
        }
    }




}
