import { Directive, ElementRef, Input, HostListener, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import * as _ from 'underscore';
import { EventManager } from 'app/shared/services/event/event-manager.service';
import { EventManagerCte } from 'app/shared/services/constantes/event-manager.constantes';

/**
 * Gestion de gestion des clicks sur des items liste.
 * Au click sur un item, elle injecte un classe passée en paramètre.
 * Au second click sur le meme item, elle envoie un event pour désélectionné l'item.
 * Après update d'un item, intercepte un event afin de déclencher une sélection sur l'item mis à jour.
 *
 */
@Directive({
    selector: '[selectItemDirective]'
})
export class SelectItemDirective implements OnInit, OnDestroy  {
    @Input() model?:any; // les données de l'élement cliqué.
    @Input() applyClassesOnSelect:string; // la classe css à appliquer si l'élément est selectionné
    @Input() deselectionConcerned: any; // en cas de déselection, filtre supplémentaire ajouté pour cibler que les composants concernés.

    elementRef:ElementRef;
    subscriptions:Subscription[] = [];
    static data:any = []; // cache des elements clickés pour gérer la désecltion.

    constructor(
        private el:ElementRef,
        private eventManager:EventManager
    ) {
        this.elementRef = el;
        this.subscriptions.push(eventManager.subscribe(EventManagerCte.EVENT_NAME.unselectItem, (response) => {
            SelectItemDirective.data = [];
            //this.removeAllClasses();
        }));
    }

    ngOnInit(){

        this.subscriptions.push(this.eventManager.subscribe(EventManagerCte.EVENT_NAME.triggerClick, (response) => {
            if (response.content.identifiant === this.model.identifiant){
                // On le vide dans le cache avant de déclencher un click pour ne pas le confondre  avec une déselection.
                let index = SelectItemDirective.data.indexOf(this.model.identifiant);
                if (index > -1) {
                    // on enlève l'item dans le cache car ce n'est pas une déselection.
                    SelectItemDirective.data.splice(index, 1);
                }
                this.elementRef.nativeElement.click();
            }
        }));
    }


    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }


    @HostListener('click', ['$event'])
    onClick(event) {
        this.removeAllClasses();
        if (this.resolveDeselectedItem()) return;
        SelectItemDirective.data = [];
        SelectItemDirective.data.push(this.model.identifiant);
        this.elementRef.nativeElement.classList.add(this.applyClassesOnSelect);
        this.eventManager.broadcast({
            name: EventManagerCte.EVENT_NAME.selectItem,
            content: {model: this.model}
        });
    }

    /**
     * Gestion de la désélection.
     * @returns {boolean}
     */
    private resolveDeselectedItem():boolean {
        let index = SelectItemDirective.data.indexOf(this.model.identifiant);
        if (index > -1) {
            SelectItemDirective.data.splice(index, 1);
            this.eventManager.broadcast({
                name: EventManagerCte.EVENT_NAME.deselectItem,
                content: {deselectionConcerned: this.deselectionConcerned}
            });
            return true;
        }
        return false;
    }

    /**
     * Supprime la classe applyClassesOnSelect.
     */
    private removeAllClasses() {
        if (this.elementRef.nativeElement) {
            for (const key in this.elementRef.nativeElement.parentNode.children) {
                let element = this.elementRef.nativeElement.parentNode.children[key];
                if (element.classList) {
                    element.classList.remove(this.applyClassesOnSelect);
                }
            }
        }
    }
}
