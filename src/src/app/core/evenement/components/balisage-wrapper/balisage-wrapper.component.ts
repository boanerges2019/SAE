import { Component, OnInit, OnDestroy, Input} from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Rx';
import * as _ from 'underscore';
import * as moment from 'moment';
import { LABELS } from './labels';
import { EventManager } from '../../../../../app/shared/services/event/event-manager.service';
import { EventManagerCte } from '../../../../../app/shared/services/constantes/event-manager.constantes';
import { BaseService } from '../../../../../app/core/evenement/services/base.service';
import { Evenement } from '../../../../../app/shared/models/generic/Evenement';
import { ResumeEvenement } from '../../../../../app/shared/models/generic/ResumeEvenement';
import { EvenementCte } from '../../../../../app/core/evenement/constantes/evenement.constantes';
import { CtxCte } from '../../../../../app/shared/services/constantes/ctx.constantes';
import { FieldEvenementCte } from '../../../../../app/core/evenement/constantes/field-evenement.constantes';
import { CacheService } from '../../../../../app/shared/services/cache/cache.service';
import { CacheConstantes } from '../../../../../app/shared/services/cache/cache.constantes';
import { ModeleEvenementService } from '../../../../../app/core/evenement/services/modele-evenement.service';
import { PrOriente } from '../../../../shared/models/generic/models';

@Component({
    selector: 'balisage-wrapper',
    templateUrl: './balisage-wrapper.component.html',
    styleUrls: ['./balisage-wrapper.component.scss'],
    providers: [BaseService],
})
export class BalisageWrapperComponent implements OnInit, OnDestroy {

    editedEvenement:Evenement; // évenement à editer.
    model:any = {};
    subscriptions:Subscription[] = [];

    //----------------------------------------------------------------------------
    //-- INITIALISATION
    //----------------------------------------------------------------------------
    constructor(
        private evenementService:BaseService,
        private eventManager:EventManager,
        private cacheService:CacheService
    ) {

    }

    ngOnInit() {
        const nomMethode = 'BalisageWrapperComponent.ngOnInit';
        console.debug(nomMethode);

        this.model.i18n = LABELS; // constantes labels
        this.model.field = FieldEvenementCte.FIELD;
        this.model.ctx = {};
        this.model.contexte = CtxCte.CTX;
        this.subscriptions.push(this.eventManager
            .subscribe(EventManagerCte.EVENT_NAME.fireEditBalisage,(response) => {
                this.cacheService.setObject(CacheConstantes.PREVENT_NON_SAVE_DATA_CTX, true);
                this.resolveEditSubscription(
                    response.content.identifiant,
                    response.content.evenement,
                    response.content.currentCtx,
                    response.content.currentOnglet,
                    response.content.idAlerteSource,
                    response.content.position
                );
            }));

        this.subscriptions.push(this.eventManager
            .subscribe(EventManagerCte.EVENT_NAME.evenementSucessfullyUpdated, (response) => {
                this.cacheService.setObject(CacheConstantes.PREVENT_NON_SAVE_DATA_CTX, false);
                this.resolveBack();
            }));

        this.subscriptions.push(this.eventManager
            .subscribe(EventManagerCte.EVENT_NAME.cancelCreateOrCancelUpdateForEvtOrBal, (response) => {
                this.cacheService.setObject(CacheConstantes.PREVENT_NON_SAVE_DATA_CTX, false);
                this.resolveBack();
            }));

    }



    ngOnDestroy() {
        this.cacheService.setObject(CacheConstantes.PREVENT_NON_SAVE_DATA_CTX, null); // vide cache des données éventuellement non sauvegardées.
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    /**
     * Gestion des notifications d'edition.
     * @param  {number} identifiant    [description]
     * @param  {any}    evenement      [description]
     * @param  {string} currentCtx     [description]
     * @param  {string} currentOnglet  [description]
     * @param  {number} idAlerteSource [description]
     * @param  {PrOriente} position    [description]
     * @return {[type]}                [description]
     */
    private resolveEditSubscription(identifiant: number,
                                    evenement: any,
                                    currentCtx: string,
                                    currentOnglet?: string,
                                    idAlerteSource?: number,
                                    position?: PrOriente){
        this.model.currentCtx = currentCtx;
        this.model.currentOnglet = currentOnglet;
        this.editedEvenement = evenement;
        this.model.idAlerteSource = idAlerteSource;
        this.model.position = position;
        if (identifiant){
            this.editEvenement(identifiant, currentCtx);
        }
    }

    /**
     * Charge un evenment balisage à partir d'un résumé évenement.
     * @param  {number} identifiant [description]
     * @param  {string} currentCtx  [description]
     * @return {[type]}             [description]
     */
    public editEvenement(identifiant:number, currentCtx:string) {
        this.model.sourceCtx = this.model.currentCtx;
        this.model.currentCtx = currentCtx;
        this.subscriptions.push(this.evenementService.getEvenement(identifiant)
            .subscribe((response) => {
                if (response) {
                    if (this.model.currentCtx != this.model.contexte.READ) {
                        this.cacheService.setObject(CacheConstantes.PREVENT_NON_SAVE_DATA_CTX, true); // pour détecter des données éventuellement non sauvegardées.
                    }
                    this.editedEvenement = response;
                }
            }));
    }

    /**
     * Met à jour un évenement.
     * @param evenement l'évenement.
     */
    public updateEvenement($event, evenement:Evenement) {
        $event.stopPropagation();
        $event.preventDefault();
        this.eventManager.broadcast({
            name: EventManagerCte.EVENT_NAME.fireUpdateBalisage,
            content: {evenement: evenement}
        });
        this.resolveBack();
    }

    /**
     * Gestion du bouton retour.
     */
    public cancelEdition($event) {
        $event.stopPropagation();
        $event.preventDefault();
        this.resolveBack();
    }

    /**
     * gestion de l'action retour suite à une creation, update etat, type balisage etc
     * @return {[type]} [description]
     */
    private resolveBack(){
        this.editedEvenement = undefined;
        this.model.currentCtx = this.model.contexte.LIST_EVENEMENT_COURANT;
        this.model.position = undefined;
        this.cacheService.setObject(CacheConstantes.PREVENT_NON_SAVE_DATA_CTX, null); // vide cache des données éventuellement non sauvegardées.
    }


}
