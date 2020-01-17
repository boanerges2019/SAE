import { Directive, HostListener, ElementRef, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { EventManager } from '../../../app/shared/services/event/event-manager.service';
import { EventManagerCte } from '../../../app/shared/services/constantes/event-manager.constantes';


export const DEFAULT_SCROLL_CONFIG = {
  SCROLL_SUM: 20,
  SCROLL_ADD: 20,
}

@Directive({
  selector: '[appInfiniteScroller]'
})
export class InfiniteScrollerDirective  {

  constructor(
    private elm: ElementRef,
    private eventManager: EventManager
  ) { }


 @HostListener('ps-y-reach-end', ['$event'])
 scrollyReachend(event) {
   this.eventManager.broadcast({name: EventManagerCte.EVENT_NAME.infiniteScrollNewItem, content: {}});
 }

}
