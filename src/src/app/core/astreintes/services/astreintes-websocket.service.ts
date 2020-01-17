import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Rx';
import { EventManager } from '../../../../app/shared/services/event/event-manager.service';
import { EventManagerCte } from '../../../../app/shared/services/constantes/event-manager.constantes';
import { environment } from '../../../../environments/environment';


/*
* Service de gestion des messages web sockets pour le domaine du référentiel
*/
@Injectable()
export class AstreinteWebsocketService implements OnDestroy{

  static OPEREATION_TYPE = {
    created: "CREATED",
    updated: "UPDATED",
    deleted: "DELETED"
  };

  subscriptions: Subscription[] = [];
  static BASE_URL = `${environment.webSocketBaseUrl}/agorav2`;  // URL to web api

  constructor(private eventManager: EventManager) {
    const nomMethode = 'AstreinteWebsocketService.constructor';

    console.debug(nomMethode + " début");

    //On s'abonne aux notifications des modifications des astreintes
    this.subscriptions.push(Observable.webSocket(`${AstreinteWebsocketService.BASE_URL}/rsc/astreintes/subscribe`)
      .subscribe(
         (msg) => this.resolveAstreinteMessage(msg)
       ));


    //On s'abonne aux notifications des communications pour mettre à jour le panneau de diffusion du message vocal
    this.subscriptions.push(Observable.webSocket(`${AstreinteWebsocketService.BASE_URL}/com/communications/subscribe`)
    .subscribe(
       (msg) => this.resolveCommunication(msg)
     ));    


   }

   ngOnDestroy() {
     this.subscriptions.forEach(s => s.unsubscribe());
     this.subscriptions.length = 0;
   }


   /**
   * @param message notidication récéption message suite à un changement de référentiel
   */
   private resolveAstreinteMessage(message: any){
     const nomMethode = 'AstreinteWebsocketService.resolveAlerteMessage';
     console.debug(nomMethode + " : <"+JSON.stringify(message)+">");
     if (!message) return;

     switch(message.typeNotification){
         case AstreinteWebsocketService.OPEREATION_TYPE.created:
         case AstreinteWebsocketService.OPEREATION_TYPE.updated:
         case AstreinteWebsocketService.OPEREATION_TYPE.deleted:
           this.eventManager.broadcast({name: EventManagerCte.EVENT_NAME.astreintesUpdatedEvent, content: message.codeAstreinte});
           break;
      default: return;
     }
   }


   /**
   * @param message notification récéption message suite à une nouvelle communication
   */
  private resolveCommunication(message: any){
    const nomMethode = 'AstreinteWebsocketService.resolveAlerteMessage';
    console.debug(nomMethode + " : <"+JSON.stringify(message)+">");
    if (!message) return;

    if(message.typeCommunication === 'DIFFUSION' ){
          // Si c'est une notification de diffusion de message vocal, 
          this.eventManager.broadcast({name: EventManagerCte.EVENT_NAME.messageVocalEvent, content: message});
    }
  }



}
