import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Rx';
import { EventManager } from '../../../../app/shared/services/event/event-manager.service';
import { EventManagerCte } from '../../../../app/shared/services/constantes/event-manager.constantes';
import { environment } from '../../../../environments/environment';


/*
* Service de gestion des messages web sockets pour le domaine des alertes.
*/
@Injectable()
export class AlerteWebsocketService implements OnDestroy{

  static OPEREATION_TYPE = {
    created: "CREATED",
    updated: "UPDATED",
    deleted: "DELETED"
  };

  subscriptions: Subscription[] = [];
  static BASE_URL = `${environment.webSocketBaseUrl}/agorav2`;  // URL to web api

  constructor(private eventManager: EventManager) {
    const nomMethode = 'AlerteWebsocketService.constructor';

    console.debug(nomMethode + " début");

    this.subscriptions.push(Observable.webSocket(`${AlerteWebsocketService.BASE_URL}/alrt/alertes/subscribe`)
      .subscribe(
         (msg) => this.resolveAlerteMessage(msg)
       ));
   }

   ngOnDestroy() {
     this.subscriptions.forEach(s => s.unsubscribe());
   }


   /**
   * @param message notidication récéption message suite à un changement d'état d'une alerte..
   */
   private resolveAlerteMessage(message: any){
     const nomMethode = 'AlerteWebsocketService.resolveAlerteMessage';
     console.debug(nomMethode + " : <"+JSON.stringify(message)+">");
     if (!message) return;

     switch(message.typeNotification){
         case AlerteWebsocketService.OPEREATION_TYPE.created:
         case AlerteWebsocketService.OPEREATION_TYPE.deleted:
         case AlerteWebsocketService.OPEREATION_TYPE.updated:
           this.eventManager.broadcast({name: EventManagerCte.EVENT_NAME.resumeAlertetUpdatedFromWebSocket, content: message.resume_alerte});
           break;
      default: return;
     }

   }
}
