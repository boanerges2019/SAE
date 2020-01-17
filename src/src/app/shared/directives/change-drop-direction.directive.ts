import { Directive,Input, Output, ElementRef, HostListener, EventEmitter } from '@angular/core';
/**
* Directive permettant d'appliquer un changement de sens du drop (down or up) en fonction du scroll.
* @author SPIE.
*/
@Directive({
  selector: '[changeDropDirection]'
})
export class ChangeDropDirectionDirective {

  @Input() seuil: number; // valeur en pixel à partir de laquelle on applique le dropUp.
  elementRef: ElementRef;

  constructor(
    private el: ElementRef,
  ){
    this.elementRef = el;
  }

  @HostListener('mouseenter', ['$event'])
  onMouseEnter(event) {
    for (const key in this.elementRef.nativeElement.parentNode.children) {
      let element = this.elementRef.nativeElement.parentNode.children[key];
      if (element.classList){
        element.classList.remove("dropdown");
        element.classList.remove("dropup");
      }
    }

    let offsetTop = this.elementRef.nativeElement.offsetTop;
    if (event.pageY < this.seuil ) {
       this.elementRef.nativeElement.classList.add("dropdown");
    } else {
       this.elementRef.nativeElement.classList.add("dropup");
    }
  }

}
