import { Directive, Input, HostListener, ElementRef } from '@angular/core';
import { EvenementUtils } from 'app/shared/utils/evenement-utils';
import { EventManager } from 'app/shared/services/event/event-manager.service';
import { EventManagerCte } from 'app/shared/services/constantes/event-manager.constantes';
import { EvenementCte } from 'app/core/evenement/constantes/evenement.constantes';

/**
* Check la validité d'une sous emprise.
* @author spie
*/
@Directive({
  selector: '[checkSousEmpriseDirective]'
})
export class CheckSousEmpriseDirective  {

  @Input() emprise;
  @Input() isSectionsSens2;
  elementRef:  ElementRef;

  constructor(
    private el: ElementRef,
    private eventManager: EventManager
  ) {
    this.elementRef = el;
  }

  @HostListener('focusout', ['$event']) focusout(event){
    event.preventDefault();
    event.stopPropagation();
    if(event){
      let newPr = EvenementUtils.stringToPr(event.target.value);
      if (!newPr || typeof newPr.numero  !== "number" || typeof newPr.abscisse  !== "number" ) return false;

      let currentPr = newPr.numero + newPr.abscisse/1000;
      let prDebut = !this.isSectionsSens2  ? this.emprise.prDebut : this.emprise.prFin;
      let prFin = !this.isSectionsSens2 ? this.emprise.prFin : this.emprise.prDebut;

      let borneInf = prDebut.numero + prDebut.abscisse/1000;
      let borneSup = prFin.numero + prFin.abscisse/1000;
      if ( currentPr <= borneInf  ||  currentPr >= borneSup ){
        this.elementRef.nativeElement.classList.add('has-error');
        this.elementRef.nativeElement.classList.add('form-control:focus');
        this.eventManager.broadcast({name: EventManagerCte.EVENT_NAME.invalidSubEmprise, content: { }});
      } else {
        this.elementRef.nativeElement.classList.remove('has-error');
        this.elementRef.nativeElement.classList.remove('form-control:focus');
        this.eventManager.broadcast({name: EventManagerCte.EVENT_NAME.validSubEmprise, content: { }});
      }
    }
  }
}
