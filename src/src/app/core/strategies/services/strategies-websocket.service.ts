import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Rx';
import { EventManager } from 'app/shared/services/event/event-manager.service';
import { EventManagerCte } from 'app/shared/services/constantes/event-manager.constantes';
import { environment } from 'environments/environment';


/*
* Service de gestion des messages web sockets pour le domaine des alertes.
*/
@Injectable()
export class StrategiesWebsocketService implements OnDestroy{

  static OPEREATION_TYPE = {
    created: "CREATED",
    updated: "UPDATED",
    deleted: "DELETED"
  };

  subscriptions: Subscription[] = [];
  static BASE_URL = `${environment.webSocketBaseUrl}/agorav2`;  // URL to web api

  constructor(private eventManager: EventManager) {

    this.subscriptions.push(Observable.webSocket(`${StrategiesWebsocketService.BASE_URL}/str/strategies/subscribe`)
      .subscribe(
         (msg) => this.resolveMessage(msg)
       ));
   }

   ngOnDestroy() {
     this.subscriptions.forEach(s => s.unsubscribe());
   }


   /**
   * @param message notidication récéption message suite à un changement d'état d'une strategie..
   */
   private resolveMessage(message: any){
     if (!message) return;

     switch(message.typeNotification){
      case StrategiesWebsocketService.OPEREATION_TYPE.updated:
           this.eventManager.broadcast({
               name: EventManagerCte.EVENT_NAME.resumeStrategieUpdatedFromWebSocket,
               content: message.resume_strategie
           });
           break;
      default: return;
     }

   }
}
