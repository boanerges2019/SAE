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
export class NotesInfosWebSocketService implements OnDestroy{

  subscriptions: Subscription[] = [];
  static BASE_URL = `${environment.webSocketBaseUrl}`;  // URL to web api
  static OPEREATION_TYPE = {
    created: "CREATED",
    updated: "UPDATED",
    deleted: "DELETED"
  };

  constructor(private eventManager: EventManager) {
      this.subscribeNotes(); /* Notification sur les notifications */
  }

   ngOnDestroy() {
     this.subscriptions.forEach(s => s.unsubscribe());
   }


    private subscribeNotes(){
        this.subscriptions.push(Observable.webSocket(`${NotesInfosWebSocketService.BASE_URL}/agorav2/ppo/notes/subscribe`)
            .subscribe(
            (msg) => this.resolveSubscribeNotesMessage(msg)
        ));
    }

    private resolveSubscribeNotesMessage(message: any){
        if (!message) return;
        this.eventManager.broadcast({name: EventManagerCte.EVENT_NAME.notesSaeUpdatedFromWebSocket, content: message});
    }
}
