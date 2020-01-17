import { Directive, Input, ElementRef} from '@angular/core';
import { EventManager } from 'app/shared/services/event/event-manager.service';
import { EventManagerCte } from 'app/shared/services/constantes/event-manager.constantes';

@Directive({
  selector: '[cesamRequired]'
})
export class CesamRequiredDirective {

  @Input() fieldName: string;
  @Input() required: boolean; // pour detecter le caractère 'required' dynamiquement
  @Input() class: string; //  classe à injecter en cas d'erreur.
  elementRef: ElementRef;

  constructor(
    private el: ElementRef,
    private eventManager: EventManager
  ){
    this.elementRef = el;
  }

  @Input()
  set model(value) {
    if (!this.required) return ;

    if (!this.elementRef.nativeElement.value){
      this.elementRef.nativeElement.classList.add(this.class);
      this.eventManager.broadcast({name: EventManagerCte.EVENT_NAME.invalidInput, content: ``});
    } else {
      this.eventManager.broadcast({name: EventManagerCte.EVENT_NAME.validInput, content: ``});
      for (const key in this.elementRef.nativeElement.parentNode.children) {
        let element = this.elementRef.nativeElement.parentNode.children[key];
        if (element.classList){
          element.classList.remove(this.class);
        }
      }
   }
 }

}
