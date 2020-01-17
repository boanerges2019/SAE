import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Rx';
import { EventManager } from '../../../../app/shared/services/event/event-manager.service';
import { EventManagerCte } from '../../../../app/shared/services/constantes/event-manager.constantes';
import { environment } from '../../../../environments/environment';


/*
* Service de gestion des messages web sockets pour l'entité ${Evenement}.
*/
@Injectable()
export class PlanActionWebSocketService implements OnDestroy {

    subscriptions: Map<String,Subscription> = new Map<String,Subscription>();
    static BASE_URL = `${environment.webSocketBaseUrl}`;  // URL to web api
    static OPEREATION_TYPE = {
        created: "CREATED",
        updated: "UPDATED",
        deleted: "DELETED"
    };

    constructor(private eventManager: EventManager) { }

    ngOnDestroy() {
        this.unsubscribeAll();
    }

    private unsubscribeAll(){
        if(this.subscriptions.size > 0){
            this.subscriptions.forEach(
                s => s.unsubscribe()
            );
            this.subscriptions.clear();
        }
    }


    /**
    *@param identifiantEvenement
    */
    resolveNewSelectedEvenementSubscription(identifiantEvenement: number) {
        const nomMethode = 'resolveNewSelectedEvenementSubscription';

        if (identifiantEvenement) {
            const key: string = 'PAC:' + identifiantEvenement;

            if(this.subscriptions.has(key)){
                console.log(nomMethode+" : déjà abonné au pac <"+identifiantEvenement+">");
            }else{
                //On supprime les souscritpions courantes
                this.unsubscribeAll();

                //et on s'abonne pour le nouvel événement
                const subscription: Subscription =  Observable.webSocket(`${PlanActionWebSocketService.BASE_URL}/agorav2/pac/evenement/${identifiantEvenement}/subscribe`)
                .subscribe(
                    (msg) => { this.resolveNotifiaction(msg) }
                ); 
                this.subscriptions.set(key,subscription);
            } 
        }else{
            this.unsubscribeAll();
        }

        console.log(nomMethode + ' : <' + this.subscriptions.size + '>');
    }

    /**
    * @param message notification suite à une récéption d'un message pac.
    */
    private resolveNotifiaction(message: any) {
        const nomMethode = 'PlanActionWebSocketService.resolveNotifiaction';
        console.debug(nomMethode + " début");

        if (!message) return;


        if (message.action_applicable) {
            console.debug(nomMethode + " : " + JSON.stringify(message));
            this.eventManager.broadcast({ name: EventManagerCte.EVENT_NAME.actionApplicableUpdated, content: message.action_applicable });
        }
    }

    /**
     * Renvoie des notifications de modification sue la liste des actions unitaires d'un PAC
     */
    public subscribeCalEvenement(identifiantEvenement: number) {
        const nomMethode = 'subscribeCalEvenement';

        if (identifiantEvenement) {
            const key: string = 'CAL:' + identifiantEvenement;

            if (this.subscriptions.has(key)) {
                console.log(nomMethode + " : déjà abonné au cal <" + identifiantEvenement + ">");
            } else {

                //et on s'abonne pour le nouvel événement
                const subscription: Subscription = Observable.webSocket(`${PlanActionWebSocketService.BASE_URL}/agorav2/cal/evenement/${identifiantEvenement}/subscribe`)
                    .subscribe(
                        (msg) => this.resolveSubscribeCalEvenementMessage(msg)
                    );
                this.subscriptions.set(key, subscription);
            }
        } 
        console.log(nomMethode + ' : <' + this.subscriptions.size + '>');
    }

    private resolveSubscribeCalEvenementMessage(message: any) {
        if (!message) return;
        this.eventManager.broadcast({ name: EventManagerCte.EVENT_NAME.actionsUnitairesPacUpdatedFromWebSocket, content: message });
    }
}
