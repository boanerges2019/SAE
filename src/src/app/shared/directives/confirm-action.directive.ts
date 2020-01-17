import { Directive, HostListener, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { EventManager } from '../../../app/shared/services/event/event-manager.service';
import { EventManagerCte } from '../../../app/shared/services/constantes/event-manager.constantes';
import { CacheService} from '../../../app/shared/services/cache/cache.service';
import { CacheConstantes} from '../../../app/shared/services/cache/cache.constantes';

/**
 * Directive interceptant des evenenements de click susceptibles de changer de contexte.
 * Dans ce cas, la directive envoie une notification d'affichage d'une popup si le changement de contexte
 * risque de faire perdre des données non sauvegardées.
 * @author SPIE.
 */
@Directive({
  selector: '[ConfirmAction]'
})
export class ConfirmActionDirective implements OnInit, OnDestroy{

    @Output() confirmActionResponse: EventEmitter<boolean>; // response du user (oui, non)

    concerned: any;

    subscriptions: Subscription[] = [];

  constructor(
      private eventManager:EventManager,
      private cacheService:CacheService
  ) {
      this.confirmActionResponse = new EventEmitter<boolean>();
  }

  ngOnInit(){
      this.subscriptions.push(this.eventManager
        .subscribe(EventManagerCte.EVENT_NAME.confirmActionResponseYes, (response) => {
            if (this.concerned){
                this.concerned = undefined;
                this.confirmActionResponse.emit(true);
            }
        }));

      this.subscriptions.push(this.eventManager
        .subscribe(EventManagerCte.EVENT_NAME.confirmActionResponseNo, (response) => {
            this.concerned = undefined;
        }));
   }

  ngOnDestroy() {
      this.subscriptions.forEach(s => s.unsubscribe());
  }

  @HostListener('click', ['$event'])
  confirmAction(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    let nonSaveDataCtx = this.cacheService.getObject(CacheConstantes.PREVENT_NON_SAVE_DATA_CTX); // pour détecter des données éventuellement non sauvegardées.
    if (nonSaveDataCtx) {
        this.concerned = true;
        this.eventManager.broadcast({
            name: EventManagerCte.EVENT_NAME.showPopup,
            content: {}
        });
    } else {
         this.concerned = undefined;
         this.confirmActionResponse.emit(true);
    }
  }
}
