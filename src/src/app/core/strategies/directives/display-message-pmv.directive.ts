import { Directive, Input, ElementRef, Renderer, OnInit, OnDestroy, OnChanges, SimpleChanges, HostListener } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { StrategieModelService } from 'app/core/strategies/services/strategie-modele.service';

import { EventManager } from 'app/shared/services/event/event-manager.service';
import { EventManagerCte } from 'app/shared/services/constantes/event-manager.constantes';

/**
 * Directive se chargeant de l'affichage du message du PMV.
 * attention la Directive rajoute des espaces dans le model.
 * Ce qui n'est pas propre du tout, car le message est persisté dans la base
 * avec des espaces en guise d'indentation.
 * @author SPIE
 */
@Directive({
    selector: '[DisplayMessagePmv]'
})
export class DisplayMessagePmvDirective implements OnChanges {

    @Input() innerHTML:string;
    @Input() nbColonnes:any;

    elementRef:ElementRef;
    private renderer:Renderer

    constructor(private el:ElementRef,
                private r:Renderer,
                private eventManager:EventManager) {
        this.elementRef = el;
        this.renderer = r;

    }


    ngOnChanges(changes: SimpleChanges) {
        this.innerHTML = changes.innerHTML && changes.innerHTML.currentValue  ? changes.innerHTML.currentValue : this.innerHTML;
        this.nbColonnes = changes.nbColonnes && changes.nbColonnes.currentValue ? changes.nbColonnes.currentValue : this.nbColonnes;


        let whiteSpace = this.innerHTML ? "pre" : "normal";
        this.elementRef.nativeElement.style.whiteSpace = whiteSpace;
        if (this.nbColonnes) {
            this.elementRef.nativeElement.style.width = `${ this.nbColonnes  * 9 }!important`;

            //this.renderer.setElementStyle(this.elementRef.nativeElement, 'min-width', `${ this.nbColonnes  * 9 }!important`);
            //this.renderer.setElementStyle(this.elementRef.nativeElement, 'width', `${ this.nbColonnes  * 9 }!important`);

            //const dashCaseName = toDashCaseStyleName(styleName);
            //this.elementRef.nativeElement.style.setProperty('min-width', this.clearPriority('min-width'), 'important');
        }
    }

    private clearPriority(styleValue: string): string {
        const IMPORTANT_RULE: string = '!important';
        return styleValue.replace(IMPORTANT_RULE, '').trim();
    }
}



