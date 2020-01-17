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
export class EvenementWebsocketService implements OnDestroy {

    static OPEREATION_TYPE = {
        created: "CREATED",
        updated: "UPDATED",
        deleted: "DELETED"
    };

    subscriptions:Subscription[] = [];
    static BASE_URL = `${environment.webSocketBaseUrl}`;  // URL to web api

    constructor(private eventManager:EventManager) {

        this.subscriptions.push(Observable.webSocket(`${EvenementWebsocketService.BASE_URL}/agorav2/evt/evenements/subscribe`)
            .subscribe(
            (msg) => this.resolveEvenementMessage(msg)
        ));

        this.subscriptions.push(Observable.webSocket(`${EvenementWebsocketService.BASE_URL}/cesam2/evt/groupes_evenements/subscribe`)
            .subscribe(
            (msg) => this.resolveGroupeMessage(msg)
        ));
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    /**
     * @param message notidicatino récéption message CRUD d'un événement.
     */
    private resolveGroupeMessage(message:any) {
        if (!message) return;
        switch (message.typeNotification) {
            case EvenementWebsocketService.OPEREATION_TYPE.created:
                this.eventManager.broadcast({
                    name: EventManagerCte.EVENT_NAME.groupCreated,
                    content: message.groupe_evenement
                });
                break;
            case EvenementWebsocketService.OPEREATION_TYPE.updated:
                this.eventManager.broadcast({
                    name: EventManagerCte.EVENT_NAME.groupUpdated,
                    content: message.groupe_evenement
                });
                break;
            case EvenementWebsocketService.OPEREATION_TYPE.deleted:
                this.eventManager.broadcast({
                    name: EventManagerCte.EVENT_NAME.groupDeleted,
                    content: message.groupe_evenement
                });
                break;
            default:
                return;
        }
    }

    /**
     * @param message notidication récéption message CRUD d'un événement.
     */
    private resolveEvenementMessage(message:any) {
        if (!message) return;
        switch (message.typeNotification) {
            case EvenementWebsocketService.OPEREATION_TYPE.created:
                this.eventManager.broadcast({
                    name: EventManagerCte.EVENT_NAME.resumeEvenementCreatedFromWebSocket,
                    content: message.resume_evenement
                });
                break;
            case EvenementWebsocketService.OPEREATION_TYPE.updated:
                this.eventManager.broadcast({
                    name: EventManagerCte.EVENT_NAME.resumeEvenementUpdatedFromWebSocket,
                    content: message.resume_evenement
                });
                break;
            case EvenementWebsocketService.OPEREATION_TYPE.deleted:
                this.eventManager.broadcast({
                    name: EventManagerCte.EVENT_NAME.resumeEvenementDeletedFromWebSocket,
                    content: message.resume_evenement
                });
                break;
            default:
                return;
        }

    }
}
