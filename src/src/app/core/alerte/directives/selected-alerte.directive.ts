import { Directive, ElementRef, Input, HostListener } from '@angular/core';

@Directive({
    selector: '[selectAlerteDirective]',
    host: {
        '(document:click)': 'handleClick($event)',
    },
})
export class SelectedAlerteDirective {
  @Input() applyClassesOnSelect: string; // la classe css à appliquer si l'élément est selectionné
  @Input() applyClassesOnDeSelect: string; // la classe css à appliquersi si l'élémement n'est pas selectionné
  @Input() selectedExtraConditions: boolean[] // évaluation des conditions supplementaires pour l'application du traitement voulu.
  @Input() unSelectedExtraConditions: boolean[] // ensemble des conditions supplementaires pour l'application du traitement voulu.
  elementRef: ElementRef;

  constructor(private el: ElementRef){
    this.elementRef = el;
  }

  handleClick(event){
      var clickedComponent = event.target;
      var inside = false;
      do {
          if (clickedComponent === this.elementRef.nativeElement) {
              inside = true;
          }
          clickedComponent = clickedComponent.parentNode;
      } while (clickedComponent);
      if(inside){
        this.resolveClickInside(event);
      }else{
        this.resolveClickOutside(event)
      }

  }


  // @HostListener('click', ['$event'])
  resolveClickInside(event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.applyClassesOnSelect && this.evaluateExtraConditions(this.selectedExtraConditions)){
      this.applyClass(this.applyClassesOnSelect);
    }
  }

  // @HostListener('mousedownOutside', ['$event'])
  resolveClickOutside(event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.applyClassesOnSelect){
      this.el.nativeElement.classList.remove(this.applyClassesOnSelect);
    }
    if (this.applyClassesOnDeSelect){
      this.el.nativeElement.classList.add(this.applyClassesOnDeSelect);
    }
  }

  private applyClass(applyClassesOnSelect: string) {
    this.el.nativeElement.classList.add(this.applyClassesOnSelect);
  }

  private evaluateExtraConditions(extraConditions: boolean[]){
    if (!extraConditions || extraConditions.length === 0) return true;
    let result = true;
    extraConditions.forEach(predicate => {
      result = result && !!predicate
    });
    return result;
  }

}
