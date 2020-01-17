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
export class BulletinsWebsocketService implements OnDestroy{

  static OPEREATION_TYPE = {
    created: "CREATED",
    updated: "UPDATED",
    deleted: "DELETED"
  };

  subscriptions: Subscription[] = [];
  static BASE_URL = `${environment.webSocketBaseUrl}/agorav2`;  // URL to web api

  constructor(private eventManager: EventManager) {
     this.subscriptions.push(Observable.webSocket(`${BulletinsWebsocketService.BASE_URL}/blt/preparations_envois/subscribe`)
      .subscribe(
         (msg) => this.resolveMessageBulletins(msg)
       ));
      this.subscriptions.push(Observable.webSocket(`${BulletinsWebsocketService.BASE_URL}/com/communications/subscribe`)
          .subscribe(
          (msg) => this.resolveMessageBulletinsEmis(msg)
      ));
  }

   ngOnDestroy() {
     this.subscriptions.forEach(s => s.unsubscribe());
   }

    private resolveMessageBulletins(message: any){
     if (!message) return;
       switch (message.typeNotification){
           case BulletinsWebsocketService.OPEREATION_TYPE.created :
               this.eventManager.broadcast({
                   name: EventManagerCte.EVENT_NAME.bulletinsCreatedFromWebSocket,
                   content: message.preparationEnvoi
               });
               break;
           case BulletinsWebsocketService.OPEREATION_TYPE.updated :
               this.eventManager.broadcast({
                   name: EventManagerCte.EVENT_NAME.bulletinsUpdatedFromWebSocket,
                   content: message.preparationEnvoi
               });
               break;
           case BulletinsWebsocketService.OPEREATION_TYPE.deleted :
               this.eventManager.broadcast({
                   name: EventManagerCte.EVENT_NAME.bulletinsDeletedFromWebSocket,
                   content: message.preparationEnvoi
               });
               break;

       }
   }

    private resolveMessageBulletinsEmis(message: any){
        if (!message) return;
        this.eventManager.broadcast({
            name: EventManagerCte.EVENT_NAME.bulletinsEmisChangeFromWebSocket,
            content: null
        });
    }
}
