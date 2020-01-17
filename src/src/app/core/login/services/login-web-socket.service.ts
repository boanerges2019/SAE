import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Rx';
import { EventManager } from 'app/shared/services/event/event-manager.service';
import { EventManagerCte } from 'app/shared/services/constantes/event-manager.constantes';
import { environment } from 'environments/environment';


/*
* Service de gestion des messages web sockets pour l'entité ${Evenement}.
*/
@Injectable()
export class LoginWebSocketService implements OnDestroy{

  subscriptions: Subscription[] = [];
  static BASE_URL = `${environment.webSocketBaseUrl}`;  // URL to web api
  static OPEREATION_TYPE = {
    created: "CREATED",
    updated: "UPDATED",
    deleted: "DELETED"
  };

  constructor(private eventManager: EventManager) {
      this.subscribeSession(); /* Notification sur l'état du user connecté */
  }

   ngOnDestroy() {
     this.subscriptions.forEach(s => s.unsubscribe());
   }



    /**
     * Renvoie des notifications de modification sue la liste des actions unitaires d'un PAC
     */
    private subscribeSession(){
        this.subscriptions.push(Observable.webSocket(`${LoginWebSocketService.BASE_URL}/agorav2/ppo/session_sae/subscribe`)
            .subscribe(
            (msg) => this.resolveSubscribeSessionMessage(msg)
        ));
    }

    private resolveSubscribeSessionMessage(message: any){
        if (!message) return;
        this.eventManager.broadcast({name: EventManagerCte.EVENT_NAME.sessionUserUpdatedFromWebSocket, content: message.session});
       /* switch(message.typeNotification){
            case PlanActionWebSocketService.OPEREATION_TYPE.created:
               // this.eventManager.broadcast({name: EventManagerCte.EVENT_NAME.macroCommandesCreateFromWebSocket, content: message.macro});
                break;
            case PlanActionWebSocketService.OPEREATION_TYPE.updated:
               // this.eventManager.broadcast({name: EventManagerCte.EVENT_NAME.macroCommandesUpdateFromWebSocket, content: message.macro});
                break;
            case PlanActionWebSocketService.OPEREATION_TYPE.deleted:
              //  this.eventManager.broadcast({name: EventManagerCte.EVENT_NAME.macroCommandesDeleteFromWebSocket, content: message.macro});
                break;
            default: return;
        }*/
    }
}
