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
export class ViabilitesHivernalesWebsocketService implements OnDestroy{

  static OPEREATION_TYPE = {
    created: "CREATED",
    updated: "UPDATED",
    deleted: "DELETED"
  };

  subscriptions: Subscription[] = [];
  static BASE_URL = `${environment.webSocketBaseUrl}/agorav2`;  // URL to web api

  constructor(private eventManager: EventManager) {

    this.subscriptions.push(Observable.webSocket(`${ViabilitesHivernalesWebsocketService.BASE_URL}/vh/circuits/subscribe`)
      .subscribe(
         (msg) => this.resolveMessage(msg)
       ));
   }

   ngOnDestroy() {
     this.subscriptions.forEach(s => s.unsubscribe());
   }


   /**
   * @param message notification viabilités hivernales
   */
   private resolveMessage(message: any){
     if (!message) return;
       this.eventManager.broadcast({
           name: EventManagerCte.EVENT_NAME.viabilitesHivernalesUpdatedFromWebSocket,
           content: message.viabilite
       });
   }
}
