import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { EventManager } from 'app/shared/services/event/event-manager.service';
import { EventManagerCte } from 'app/shared/services/constantes/event-manager.constantes';
import { CtxCte } from 'app/shared/services/constantes/ctx.constantes';
import { Strategie } from 'app/shared/models/generic/Strategie';

@Component({
    selector: 'strategies-page',
    templateUrl: './strategies-page.component.html',
    styleUrls: ['./strategies-page.component.scss']
})
export class StrategiesPageComponent implements OnInit {

    subscriptions:Subscription[] = [];
    model:any = {};
    strategie:Strategie;

    constructor(private eventManager:EventManager) {
        this.resolveCreatedStrategieSubscription();
        //this.resolvePlanificationSubscription();
        this.resolveCancelOperationSubscription();
    }

    ngOnInit() {
        this.model.contexte = CtxCte.CTX;
        this.model.currentCtx = undefined;
        this.sendToMenuPrincipaleToGoToStrategieAffichage();
    }

    private resolveCreatedStrategieSubscription() {
        this.subscriptions.push(this.eventManager
            .subscribe(EventManagerCte.EVENT_NAME.updateStrategie, (response) => {
                this.model.currentCtx = response.content.currentCtx;
                this.model.messageStrategie = true
                this.strategie = response.content.strategie;
            }));
    }


    //private resolvePlanificationSubscription() {
    //    this.subscriptions.push(this.eventManager
    //        .subscribe(EventManagerCte.EVENT_NAME.planStrategie, (response) => {
    //            this.model.currentCtx = response.content.currentCtx;
    //            this.strategie = response.content.strategie
    //        }));
    //}

    private resolveCancelOperationSubscription() {
        this.subscriptions.push(this.eventManager
            .subscribe(EventManagerCte.EVENT_NAME.cancelOperation, (response) => {
                this.model.currentCtx = response.content.currentCtx;
                this.model.messageStrategie = false;
                this.strategie = undefined;
            }));
    }

    /**
     * J'envois un event pour dire au composant menu principale
     * de se mettre sur stretegie
     *
     */
    private sendToMenuPrincipaleToGoToStrategieAffichage() {
        this.eventManager.broadcast({
            name: EventManagerCte.EVENT_NAME.selectStrategieAffichageInMenuPrincipaleEvent,
            content: null
        });
    }
}
