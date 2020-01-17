import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { PLAN_ACTION } from './mock.plan.action';
import * as _ from 'underscore';
import { PlanActionService } from 'app/core/plan-action/services/plan-action.service';
import { PlanActionWebSocketService } from 'app/core/plan-action/services/plan-action-web-socket.service';
import { EventManager } from 'app/shared/services/event/event-manager.service';
import { EventManagerCte } from 'app/shared/services/constantes/event-manager.constantes';
import { PacEvenement } from 'app/shared/models/generic/PacEvenement';
import { PlanActionComponent } from 'app/core/plan-action/components/plan-action/plan-action.component';

@Component({
    selector: 'liste-plan-action',
    templateUrl: './liste-plan-action.component.html',
    styleUrls: ['./liste-plan-action.component.scss']
})
export class ListePlanActionComponent implements OnDestroy {

    idEvenement:number;
    subscriptions:Subscription[] = [];
    evenementSubscriptions:Subscription[] = [];
    planAction:PacEvenement;
    ongletActif:{ [key: string]: any }; // onglet actif
    mockPlanAction = PLAN_ACTION;

    //----------------------------------------------------------------------------
    //-- INITIALISATION
    //----------------------------------------------------------------------------
    constructor(private eventManager:EventManager,
                private planActionService:PlanActionService,
                private planActionWebSocketService:PlanActionWebSocketService) {
        this.initOnglets();
        this.subscriptions.push(eventManager.subscribe(EventManagerCte.EVENT_NAME.evenementEdited, (response) => {
            this.planAction = null;
            const idEvenement = response.content;
            this.idEvenement = idEvenement;
            this.resetOngletAction();
            this.ongletActif.planAction = true;
            this.resolveNewSelectedEvenementSubscription(idEvenement);
        }));

        this.subscriptions.push(this.eventManager.subscribe(EventManagerCte.EVENT_NAME.createEvenement, (response) => {
            this.ongletActif.planAction = false;
            this.planAction = null;
            this.idEvenement = undefined;
        }));

        this.subscriptions.push(eventManager.subscribe(EventManagerCte.EVENT_NAME.unselectItem, (response) => {
            this.ongletActif.planAction = false;
            this.planAction = null;
            this.idEvenement = undefined;
        }));

        this.resolveDeselectionSubscription();
        this.reInitView();
    }


    initOnglets() {
        this.ongletActif = {
            planAction: false,
            strategie: false,
            macro: false,
            communication: false
        }
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    //----------------------------------------------------------------------------
    //-- ACTIONS
    //----------------------------------------------------------------------------
    private resolveNewSelectedEvenementSubscription(idEvenement:number) {
        this.subscriptions.push(this.planActionService.getPacForEvenement(idEvenement)
            .subscribe(
                response => {
                this.planAction = <PacEvenement> response;
                this.eventManager.broadcast({
                    name: EventManagerCte.EVENT_NAME.newPacToBeDisplayed,
                    content: {planAction: this.planAction}
                });
                this.planActionWebSocketService.resolveNewSelectedEvenementSubscription(idEvenement);
            }
        ));
    }

    //----------------------------------------------------------------------------
    //-- EVENEMENTS
    //----------------------------------------------------------------------------
    /**
     * Débranche sur l'onglet cliqué.
     */
    public gotoOnglet(link):void {
        if (!this.planAction) return;

        switch (link) {
            case 'plan-action':
                this.resetOngletAction();
                this.ongletActif.planAction = true;
                break;
            case 'strategie':
                this.resetOngletAction();
                this.ongletActif.strategie = true;
                break;
            case 'macro':
                this.resetOngletAction();
                this.ongletActif.macro = true;
                break;
            case 'communication':
                this.resetOngletAction();
                this.ongletActif.communication = true;
                break;
            default:
                return;
        }
    }


    //----------------------------------------------------------------------------
    //-- UTILITAIRES / VALIDATIONS.
    //----------------------------------------------------------------------------
    /**
     * Détermine l'onglet actif.
     */
    private resetOngletAction() {
        for (const field in this.ongletActif) {
            this.ongletActif[field] = false;
        }
    }

    private resolveDeselectionSubscription() {
        this.subscriptions.push(this.eventManager.subscribe(EventManagerCte.EVENT_NAME.evenementNotEdited, (response) => {
            this.ongletActif.planAction = false;
            this.planAction = null;
        }));

        this.subscriptions.push(this.eventManager.subscribe(EventManagerCte.EVENT_NAME.deselectItem, (response) => {
            if (response.content.deselectionConcerned && response.content.deselectionConcerned !== "listeEvenements")
                return; // dans ce cas la désélection ne concerne pas le pac.

            this.ongletActif.planAction = false;
            this.planAction = null;
        }));
    }

    private reInitView(){
        this.subscriptions.push(this.eventManager
            .subscribe(EventManagerCte.EVENT_NAME.reinitPlanActionADroite, (response) => {
                this.planAction = response.content;
            }));
    }

}
