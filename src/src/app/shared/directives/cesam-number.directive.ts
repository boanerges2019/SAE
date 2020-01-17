import { Directive, Input, HostListener, ElementRef } from '@angular/core';
import { DirectiveUtils } from '../../../app/shared/utils/directive-utils';

@Directive({
    selector: '[cesamNumber]'
})
export class CesamNumberDirective {

    @Input() min:number; // le nombre minimum
    @Input() max:number; // le nombre maximum
    @Input() cesamNumberModel:{ [key: string]: any };
    @Input() overrideAllValues:boolean = true;

    elementRef:ElementRef;

    constructor(el:ElementRef) {
        this.elementRef = el;
    }

    @HostListener('focusout', ['$event']) focusout(event) {
        event.preventDefault();
        event.stopPropagation();
        if (event) {
            if (!this.isNumber(event.target.value) || !this.checkIntervals(event.target.value, this.min, this.max)) {
                event.target.value = null;
                this.elementRef.nativeElement.classList.add('has-error');
            } else if (this.cesamNumberModel) {
                DirectiveUtils.removeClass(this.elementRef, 'has-error');
                if(this.overrideAllValues){
                    this.cesamNumberModel['nom'] = `${event.target.value}`;
                    this.cesamNumberModel['description'] = `${event.target.value}`;
                    this.cesamNumberModel['codeValeur'] = `${event.target.value}`;
                    this.cesamNumberModel['valeur'] = `${event.target.value}`;
                }

            }
        }
    }

    /**
     * Check si la valeur passée en paramètre est un entier.
     * @param value entier.
     * @return true si entier faux sinon.
     */
    private isNumber(value):boolean {
        return !isNaN(parseFloat(value)) && isFinite(value);
    }

    /**
     * Check si l'entier passé en paramètre est compris dans l'intervalle.
     * @param value entier.
     * @param min borne min de l'intervalle.
     * @param max borne max de l'intervalle.
     * @return true si entier est compris dans l'intervalle, faux sinon.
     */
    private checkIntervals(value, min:number, max:number):boolean {
        let result:boolean = true;
        if (this.isNumber(min)) {
            result = result && value >= min;
        }
        if (this.isNumber(max)) {
            result = result && value <= max;
        }
        return result;
    }
}
