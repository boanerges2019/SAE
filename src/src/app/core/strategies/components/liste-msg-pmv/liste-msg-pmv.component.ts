import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import * as _ from 'underscore';
import { LABELS } from './labels'
import { PmvBaseComponent } from '../equipement-base/pmv-base.component';
import { StrategiesService } from 'app/core/strategies/services/strategies.service';
import { CtxCte } from 'app/shared/services/constantes/ctx.constantes';
import { EventManager } from 'app/shared/services/event/event-manager.service';
import { EventManagerCte } from 'app/shared/services/constantes/event-manager.constantes';
import { MessagesEquipementStrategie } from 'app/shared/models/generic/MessagesEquipementStrategie';
import { StrategieModelService } from 'app/core/strategies/services/strategie-modele.service';
import { StrategieCte } from 'app/core/strategies/constantes/strategie.constante';

/**
 * Liste des messages des PMV.
 * @author SPIE
 */
@Component({
    selector: 'liste-msg-pmv',
    templateUrl: './liste-msg-pmv.component.html',
    styleUrls: ['./liste-msg-pmv.component.scss']
})
export class ListeMsgPmvComponent extends PmvBaseComponent implements OnInit, OnDestroy {

    @Input() currentCtx?:string;
    @Input() parentHeight?: number;
    @Input() contentEvStrategiesHeight?: number;
    @Input() contentHeight?: number;

    allEquipements:MessagesEquipementStrategie[] = [];
    equipements:MessagesEquipementStrategie[] = [];
    model:any = {};
    subscriptions:Subscription[] = [];

    constructor(
        public strategiesService:StrategiesService,
        public strategieModelService:StrategieModelService,
        public eventManager:EventManager
    ) {
        super(strategieModelService);
        this.resolveSelectedStrategieSubscription();
        this.resolveCancelOperationSubscription();
        this.resolveDeselectionSubscription();
        this.resolveWebSocketCallbackSubscription();
    }


    ngOnInit() {
        super.ngOnInit();
        this.model.currentCtx = CtxCte.CTX.LIST_STRATEGIE;
        this.model.currentCtx = this.currentCtx || CtxCte.CTX.LIST_STRATEGIE;
        this.model.labels = LABELS;
        this.model.defaultPicto = StrategieCte.PMV_ETAT_PICTO_VIDE; // default picto.

        this.model.parentHeight = this.parentHeight ? this.parentHeight :  630;
        this.model.contentEvStrategiesHeight = this.contentEvStrategiesHeight ? this.contentEvStrategiesHeight :  520;
        this.model.contentHeight = this.contentHeight ? this.contentHeight : 487;

        this.model.sort = {}; // initialisation du tri.
        this.model.sort.order = true;

        this.model.activesCount = 0;
        this.model.total = 0;

        this.getMessagesEquipements();
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }


    //----------------------------------------------------------------------------
    //-- ACTIONS
    //----------------------------------------------------------------------------

    /**
     * Récupère les equipements, éventuellement qui  match la strategie passée en paramètre.
     * @param start indice min
     * @param end indice max
     * @param identifiant du strategie
     */
    private getMessagesEquipements() {
        this.subscriptions.push(this.strategiesService.getMessagesEquipements()
                .subscribe(response => {
                    this.allEquipements = response;
                    this.equipements = response;
                    this.resolveCount(response);
                })
        );
    }


    //----------------------------------------------------------------------------
    //-- EVENTS
    //----------------------------------------------------------------------------

    /**
     * Gestion des notifications de Creation/Update/Delete de résume d'évenement.
     */
    private resolveWebSocketCallbackSubscription(){
        this.subscriptions.push(this.eventManager
            .subscribe(EventManagerCte.EVENT_NAME.resumeStrategieUpdatedFromWebSocket, (response) => {
                this.getMessagesEquipements();
            }));
    }

    /**
     * [Applique un filtre sur la strategie sélectionnée]
     * @param  {[type]} value [description]
     * @return {[type]}       [description]
     */
    public resolveFilterBySelectedStrategie(value) {
        if (value) {  // on ne filtre plus suite à une sélectin d'une stratégie.
            let data = [];
            this.allEquipements.forEach( equipement => {
                    if (equipement.messagePrioritaire.identifiantStrategie === this.model.ctx.identifiant){
                        data.push(equipement);
                    }else{
                        equipement.messagesEnAttentes.forEach(message => {
                            if (message.identifiantStrategie === this.model.ctx.identifiant){
                                data.push(equipement);
                            }
                        });
                    }
            });
            this.equipements = data;
        } else {
            this.equipements = this.allEquipements;
        }
    }

    // private getMatchEvenement(idStragies: number, message: any[])

    private resolveSelectedStrategieSubscription() {
        this.subscriptions.push(this.eventManager
            .subscribe(EventManagerCte.EVENT_NAME.strategieSeclected, (response) => {
                this.model.ctx.identifiant = response.content.identifiant; // id de la stratégie sélection
                this.resolveFilterBySelectedStrategie(this.model.selectedStrategie);
            }));
    }

    private resolveCancelOperationSubscription() {
        this.subscriptions.push(this.eventManager
            .subscribe(EventManagerCte.EVENT_NAME.cancelOperation, (response) => {
                this.model.ctx.identifiant = undefined;
                this.model.currentCtx = CtxCte.CTX.LIST_STRATEGIE;
                this.getMessagesEquipements();
            }));
    }


    /**
     * Gestion des notifications de sélection d'un item.
     */
    private resolveDeselectionSubscription() {
        this.subscriptions.push(this.eventManager.subscribe(EventManagerCte.EVENT_NAME.deselectItem, (response) => {
            if (response.content.deselectionConcerned && response.content.deselectionConcerned !=="listeStrategies")
                return; // dans ce cas la désélection ne concerne pas les evets.

            this.model.ctx.identifiant = undefined;
            this.getMessagesEquipements();
        }));
    }


    //----------------------------------------------------------------------------
    //-- UTILS
    //----------------------------------------------------------------------------
    /***
     * Effectue les comptes des items actifs.
     * @param strategies liste des strategies.
     */
    private resolveCount(strategies:any) {
        this.model.activesCount = this.model.total = 0;
        if (!strategies) return;
        strategies.forEach(s => {
            if (s.codeEtat === "ACTIF") this.model.activesCount++;
            this.model.total++;
        });
    }

    /**
     * Retourne la classe css correspondante.
     * @param text
     */
    public getWhiteSpace(text: string){
        if (text) return "pre"
        else return "normal";
    }
}
