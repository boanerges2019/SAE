import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import * as _ from 'underscore';
import { LABELS } from './labels'
import { StrategieBaseComponent } from '../strategie-base/strategie-base.component';
import { StrategiesService } from '../../../../../app/core/strategies/services/strategies.service';
import { CtxCte } from '../../../../../app/shared/services/constantes/ctx.constantes';
import { EventManager } from '../../../../../app/shared/services/event/event-manager.service';
import { EventManagerCte } from '../../../../../app/shared/services/constantes/event-manager.constantes';
import { DEFAULT_SCROLL_CONFIG } from '../../../../../app/shared/directives/infinite-scroller.directive'
import { FieldStrategieCte } from '../../../../../app/core/strategies/constantes/field-strategie.constante';
import { ResumeStrategie } from '../../../../../app/shared/models/generic/ResumeStrategie';
import { Strategie } from '../../../../../app/shared/models/generic/Strategie';
import { StrategieCte } from '../../../../../app/core/strategies/constantes/strategie.constante';
import * as moment from 'moment';
import { CacheService } from 'app/shared/services/cache/cache.service';
import { CacheConstantes } from 'app/shared/services/cache/cache.constantes';

/**
 * Componsant de gestion des listes de Stratégie d'Affichages.
 * @author SPIE.
 */

@Component({
    selector: 'liste-strategies',
    templateUrl: './liste-strategies.component.html',
    styleUrls: ['./liste-strategies.component.scss']
})
export class ListeStrategiesComponent extends StrategieBaseComponent implements OnInit, OnDestroy {
    @Input() idEvenement?: number;
    @Input() currentCtx:string;
    @Input() strategieType:string; // type de strategie ['manuelle','evenement', 'tps']
    @Input() parentHeight?:number;
    @Input() contentEvStrategiesHeight?:number;
    @Input() contentHeight?:number;

    strategies:ResumeStrategie[] = [];
    editedStrategie:Strategie; // stratégie editée.
    plannedStrategie:Strategie; // stratégie planifiée.
    model:any = {};
    subscriptions:Subscription[] = [];

    constructor(private strategiesService:StrategiesService,
                private eventManager:EventManager, private cacheService: CacheService) {
        super();

        //this.resolveInfiniteScrollSubscription();
        this.resolveSelectionSubscription();
        this.resolveUpdateStrategieSubscription();
        this.resolvePacStrateCreateSubscription();
        this.resolveWebSocketCallbackSubscription();
        this.resolvePlanificationSubscription();
    }

    ngOnInit() {
        super.ngOnInit();
        this.model.currentCtx = this.currentCtx || CtxCte.CTX.LIST_STRATEGIE;
        this.model.labels = LABELS;
        this.model.sort.header = this.model.labels.headers[0];

        this.model.hideExtraVar = true;
        this.model.activesCount = 0;
        this.model.total = 0;

        this.model.parentHeight = this.parentHeight ? this.parentHeight : 630;
        this.model.contentEvStrategiesHeight = this.contentEvStrategiesHeight ? this.contentEvStrategiesHeight : 520;
        this.model.contentHeight = this.contentHeight ? this.contentHeight : 520;

        this.model.infiniteScroll = {};
        this.model.infiniteScroll.sum = 0;//DEFAULT_SCROLL_CONFIG.SCROLL_SUM;

        this.getResumesStrategies();
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }


    //----------------------------------------------------------------------------
    //-- ACTIONS
    //----------------------------------------------------------------------------
    /**
     * Lance le processus de création manuelle d'une strategie
     * @param $event js
     * @param contexte contexte de l'action
     */
    public createStrategie($event, contexte) {
        this.cacheService.setObject(CacheConstantes.PREVENT_NON_SAVE_DATA_CTX, true);
        $event.stopPropagation();
        $event.preventDefault();
        this.model.sourceCtx = this.model.currentCtx;
        this.model.currentCtx = this.currentCtx = contexte;
    }


    /**
     * Supprime une stratégie.
     * @param $event js
     * @param identifiant de la strategie à supprimer
     */
    public removeStrategie($event, identifiant:number) {
        $event.stopPropagation();
        $event.preventDefault();

        this.subscriptions.push(this.strategiesService.removeStrategie(identifiant)
            .subscribe((response) => {
                if (response) {
                    this.strategies = this.strategies.filter((item:Strategie) => item.identifiant !== identifiant);
                    this.resolveCount(this.strategies);
                }
            }));
    }

    /**
     * Supprime une stratégie.
     * @param $event js
     * @param strategie la strategie à planiifer
     */
    public planStrategie($event, strategie:ResumeStrategie) {
        $event.stopPropagation();
        $event.preventDefault();
        this.cacheService.setObject(CacheConstantes.PREVENT_NON_SAVE_DATA_CTX, true);
        this.model.sourceCtx = this.model.currentCtx;
        this.model.currentCtx = this.model.contexte.PLANIFICATION_MACRO;
        this.plannedStrategie = strategie;
        //this.eventManager.broadcast({
        //    name: EventManagerCte.EVENT_NAME.planStrategie,
        //    content: { currentCtx: this.model.currentCtx, strategie: strategie }
        //});
    }


    /**
     * Lance le processus de modificaion d'une strategie
     * @param $event js
     * @param contexte contexte de l'action
     * @param strategie à modifier.
     */
    public editStrategie($event, contexte, strategie:any) {
        $event.stopPropagation();
        $event.preventDefault();
        this.cacheService.setObject(CacheConstantes.PREVENT_NON_SAVE_DATA_CTX, true);
        this.subscriptions.push(this.strategiesService.getStrategie(strategie.identifiant)
            .subscribe((response) => {
                if (response) {
                    this.editedStrategie = response.json();
                    this.model.currentCtx = this.currentCtx = contexte;
                    this.eventManager.broadcast({
                        name: EventManagerCte.EVENT_NAME.updateStrategie,
                        content: {currentCtx: contexte, strategie: _.create({}, response.json())}
                    });
                }
            }));
    }

    /**
     * Retourne un ensemble de résumés de strategies
     * @param start indice de début
     * @param end indice de din
     * @param identifiant de la strategie
     */
    private getResumesStrategies() {
        this.subscriptions.push(
            this.strategiesService.getResumesStrategies()
                .subscribe(response => {
                    let resort = this.strategies.length === 0;
                    this.strategies = response;
                    //let disableOrder = false;
                    //if(this.strategies.length === 0) {
                    //    this.strategies = response;
                    //}
                    //else {
                    //    // ajout de la nouvelle stratégie.
                    //    disableOrder = true;// pour eviter de changer l'ordre du tri.
                    //    let newStrategie = undefined;
                    //    response.forEach(item => {
                    //        let res = this.strategies.filter(item2 => item2.identifiant === item.identifiant);
                    //        if (res.length === 0){
                    //            newStrategie = item;
                    //        }
                    //    });
                    //    if (newStrategie){
                    //        this.strategies.push(newStrategie);
                    //    }
                    //
                    //}
                    if (this.idEvenement) {
                        this.strategies = this.strategies.filter(item => item["identifiantObjet"] === this.idEvenement);
                    }
                    if (resort) {
                        this.sortHeader(this.model.sort.header);
                    }
                    this.resolveCount(this.strategies);
                }));
    }


    /**
     * Change la priorité d'une stratégie.
     * @param strategie
     * @param priority (up, down)
     */
    public changePriorite(strategie, priority) {
        let model:any = {};
        let precedent:any, i = -1, index = -1;
        this.strategies.forEach((s:Strategie) => {
            i++;
            if (strategie.identifiant === s.identifiant) index = i;
        });

        this.subscriptions.push(this.strategiesService.movePriority(strategie.identifiant, priority)
            .subscribe(
                response => {
                strategie.priorite += priority;
                this.sortHeader(this.model.sort.header, true); // on retrie
            }));

    }


    /**
     * Change l'étta d'une stratégie.
     * @param $event
     * @param strategie
     * @param sensPriorite (up, down)
     */
    public toogleState($event, strategie, STATE) {
        $event.preventDefault();
        $event.stopPropagation();
        if (strategie.codeEtat === STATE) return;

        let param = strategie.codeEtat === StrategieCte.STRATEGIE_ACTIVE ? 'desactiver' : 'activer';
        this.subscriptions.push(
            this.strategiesService.toogleState(strategie.identifiant, param)
                .subscribe(response => {
                    this.strategies = this.strategies.map(s => {
                        if (s.identifiant === strategie.identifiant) {
                            s.codeEtat = STATE;
                        }
                        return s;
                    })
                }));
    }


    /**
     * Annulle l'opération d'édition d'un événement ou de création d'un evt.
     */
    public cancelCreation() {
        this.cacheService.setObject(CacheConstantes.PREVENT_NON_SAVE_DATA_CTX, false);
        this.model.currentCtx = this.currentCtx = this.model.sourceCtx || CtxCte.CTX.LIST_STRATEGIE;
        this.editedStrategie = undefined;
        this.eventManager.broadcast({name: EventManagerCte.EVENT_NAME.cancelOperation, content: {}})
    }


    //----------------------------------------------------------------------------
    //-- EVENTS
    //----------------------------------------------------------------------------
    /**
     * Gestion des notifications de Creation/Update/Delete de résume d'évenement.
     */
    private resolveWebSocketCallbackSubscription() {
        this.subscriptions.push(this.eventManager
            .subscribe(EventManagerCte.EVENT_NAME.resumeStrategieUpdatedFromWebSocket, (response) => {
                this.getResumesStrategies();
            }));
    }

    /**
     * Gestion des notifications Planification.
     */
    private resolvePlanificationSubscription() {
        this.subscriptions.push(this.eventManager
            .subscribe(EventManagerCte.EVENT_NAME.validerPlanification, (response) => {
                if (response.content.type !== 'strategie') return;
                console.log(response.content);
                this.subscriptions.push(this.strategiesService.plan(response.content.modele.identifiant, response.content.data)
                    .subscribe((response) => {
                        console.log("ok");
                        this.model.currentCtx = this.currentCtx = this.model.sourceCtx || CtxCte.CTX.LIST_STRATEGIE;
                    }));
            }));

        this.subscriptions.push(this.eventManager
            .subscribe(EventManagerCte.EVENT_NAME.annulerPlanification, (response) => {
                if (response.content.type !== 'strategie') return;
                this.model.currentCtx = this.currentCtx = this.model.sourceCtx || CtxCte.CTX.LIST_STRATEGIE;

            }));
    }


    ///**
    //* Gestin du scroll infini.
    //*/
    //private resolveInfiniteScrollSubscription() {
    //    this.subscriptions.push(this.eventManager
    //        .subscribe(EventManagerCte.EVENT_NAME.infiniteScrollNewItem, (response) => {
    //            let start = this.model.infiniteScroll.sum;
    //            this.model.infiniteScroll.sum += DEFAULT_SCROLL_CONFIG.SCROLL_ADD;
    //            this.getResumesStrategies(this.model.ctx.identifiant);
    //        }));
    //}


    /**
     * @param $event js
     * @param strategie
     */
    public selectStrategie($event:any, strategie:any) {
        // expceptionnnement, la propagation de $event n'est pas arretée car interceptée par la directive.
        this.model.ctx.identifiant = strategie.identifiant;
    }

    /**
     * Gestion des notifications de sélection d'un item.
     */
    private resolveSelectionSubscription() {
        this.subscriptions.push(this.eventManager.subscribe(EventManagerCte.EVENT_NAME.selectItem, (response) => {
            if (!response.content.model || !response.content.model.identifiant) return;
            this.eventManager.broadcast({
                name: EventManagerCte.EVENT_NAME.strategieSeclected,
                content: {identifiant: response.content.model.identifiant}
            });
        }));
    }

    /**
     * Gestion des notifications de sélection d'un item.
     */
    private resolveUpdateStrategieSubscription() {
        this.subscriptions.push(this.eventManager.subscribe(EventManagerCte.EVENT_NAME.updateStrategie, (response) => {
            this.currentCtx = this.model.currentCtx = response.content.currentCtx;
            this.editedStrategie = response.content.strategie;
        }));
    }

    /**
     * Gestion des notifications suite une création d'une stratégie depuis un pac.
     */
    private resolvePacStrateCreateSubscription() {
        this.subscriptions.push(this.eventManager.subscribe(EventManagerCte.EVENT_NAME.createStrategieFromPacSuccess, (response) => {
            this.currentCtx = this.model.currentCtx = response.content.currentCtx;
        }));
    }


    /**
     * @param header du tableau sur lequel le tri doit se faire.
     * @param disableOrder option pour trier sans toucher l'ordres
     * @return Tri le tableau des évenements.
     */
    public sortHeader(header:any, disableOrder?:boolean) {
        this.model.sort.header = header;
        if (!disableOrder) {
            this.model.sort.order = !this.model.sort.order;
        }
        this.strategies = super.sortTable(header.model, this.model.sort.order, this.strategies, FieldStrategieCte.FIELD);

    }

    /**
     * @return la classe adequate d'une stratégie.
     * @param strategie
     */
    public getSuitableCalandarClass(strategie) {
        if (!strategie.debrayable) return "permanent active";
        else if (strategie.codeEtat === StrategieCte.STRATEGIE_ACTIVE) return "active";
        else if (strategie.codeEtat === StrategieCte.STRATEGIE_INACTIVE) return "desactive";
        //else if (strategie.codeEtat === StrategieCte.STRATEGIE_INACTIVE) return "desactive"; // planifié.
        return ""
    }

    /**
     * @return la classe adequate d'une stratégie.
     * @param strategie
     */
    public getSuitableLabel(strategie) {
        const nomMethode = 'getSuitableLabel';
        if (!strategie.debrayable) {
            return "Permanente";
        }else if (strategie.codeEtat === StrategieCte.STRATEGIE_ACTIVE){
            return "";
        } else if (strategie.codeEtat === StrategieCte.STRATEGIE_INACTIVE){
            if(strategie.planification && strategie.planification.horodateProchaineExecutionDebut){
                //On formatte l'horodate
                let dt : Date = new Date(''+strategie.planification.horodateProchaineExecutionDebut);
                let retour : string = moment(strategie.planification.horodateProchaineExecutionDebut).format('DD/MM/YYYY HH:mm');
                console.debug(nomMethode+' : '+strategie.planification.horodateProchaineExecutionDebut+' -> '+retour+ ' ' + dt.toString());
                return ''+retour;
            }
        }

        return ""
    }


    //----------------------------------------------------------------------------
    //-- UTILS
    //----------------------------------------------------------------------------
    /***
     * Effectue les comptes des items actifs.
     * @param strategies liste des strategies.
     */
    private resolveCount(strategies:any) {
        this.model.total = 0;
        this.model.activesCount = 0;
        if (!strategies) return;
        strategies.forEach(s => {
            if (s.codeEtat === StrategieCte.STRATEGIE_ACTIVE) this.model.activesCount++;
            this.model.total++;
        });
    }




}
