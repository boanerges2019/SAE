// import { Directive, ElementRef, Input, HostListener } from '@angular/core';
//
// @Directive({
//   selector: '[SelectItemDirective]'
// })
// export class SelectItemDirective {
//   @Input() applyClassesOnSelect: string; // la classe css à appliquer si l'élément est selectionné
//   elementRef: ElementRef;
//
//   constructor(private el: ElementRef){
//     this.elementRef = el;
//   }
//
//   @HostListener('click', ['$event'])
//   onClick(event) {
//     // event.preventDefault();
//     // event.stopPropagation();
//     if (this.elementRef.nativeElement){
//       for (const key in this.elementRef.nativeElement.parentNode.children) {
//         let element = this.elementRef.nativeElement.parentNode.children[key];
//         if (element.classList){
//           element.classList.remove(this.applyClassesOnSelect);
//         }
//       }
//     }
//     this.elementRef.nativeElement.classList.add(this.applyClassesOnSelect);
//   }
// }
