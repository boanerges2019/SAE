import { Directive, HostListener, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

/**
 * Directive permettant de gerer un upload.
 * @param  {'[CesamUploadDirective]'}} {selector [description]
 * @return {[type]}                              [description]
 */
@Directive({
  selector: '[CesamUploadDirective]'
})
export class CesamUploadDirective {

    elementRef:ElementRef;
    constructor(private el: ElementRef) {
      this.elementRef = el;
    }

    @HostListener('click', ['$event'])
    uploadFiles(event: Event) {
        if(event){
          event.preventDefault();
          event.stopPropagation();
        }

        for (const key in this.elementRef.nativeElement.parentNode.children) {
        let element = this.elementRef.nativeElement.parentNode.children[key];
            if (element.className){
                let classes = element.className.split(" ");
                if (classes.indexOf("input-file-hidden") > -1 || classes.indexOf("exporter_requete_resultat") > -1){
                    let e = new MouseEvent('click', {bubbles: false});
                    element.dispatchEvent(e);
                }
                if(element.className==="exporter_requete_resultat"){
                    break;
                }
            }
        }
    }
}
