import { Directive, ElementRef, Input, HostListener } from '@angular/core';

@Directive({
    selector: '[applyClassOnHover]'
})
export class HoverDirective {
  @Input() applyClassesOnHover: string; // la classe css à appliquer si l'élément est selectionné
  @Input() selectedExtraConditions?: boolean[] // évaluation des conditions supplementaires pour l'application du traitement voulu.
  @Input() unSelectedExtraConditions?: boolean[] // ensemble des conditions supplementaires pour l'application du traitement voulu.

 constructor(private el: ElementRef){  }


 @HostListener('mouseenter', ['$event'])
 onMouseEnter(event) {
   event.preventDefault();
   event.stopPropagation();
   if (this.applyClassesOnHover && this.evaluateExtraConditions(this.selectedExtraConditions)){
     this.applyClass(this.applyClassesOnHover);
   }
 }

 @HostListener('mouseleave', ['$event'])
 onMouseLeave(event) {
   event.preventDefault();
   event.stopPropagation();
   if (this.applyClassesOnHover && this.evaluateExtraConditions(this.unSelectedExtraConditions)){
     this.el.nativeElement.classList.remove(this.applyClassesOnHover);
   }
 }

 private applyClass(applyClassesOnHover: string) {
   this.el.nativeElement.classList.add(this.applyClassesOnHover);
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
