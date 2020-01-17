import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import * as _ from 'underscore';
import { EventManager } from '../../../../../app/shared/services/event/event-manager.service';
import { EventManagerCte } from '../../../../../app/shared/services/constantes/event-manager.constantes';
import { CtxCte } from '../../../../../app/shared/services/constantes/ctx.constantes';
import { BulletinsService } from '../../../../../app/core/bulletins/services/bulletins.service';
//import { BulletinsPageComponent } from 'app/core/bulletins/components/bulletins-page/bulletins-page.component';
import { BulletinsWebsocketService } from '../../../../../app/core/bulletins/services/bulletins-websocket.service';
import { FieldBulletinsCte } from '../../../../../app/core/bulletins/constantes/field-bulletins.constante';
import { AbstractTab } from '../../../../shared/components/abstract-tab/abstract-tab';
import { CacheService } from '../../../../../app/shared/services/cache/cache.service';
import { CacheConstantes } from '../../../../../app/shared/services/cache/cache.constantes';

@Component({
    selector: 'preparation-envoi-planifies-list',
    templateUrl: './preparation-envoi-planifies-list.component.html',
    styleUrls: ['./preparation-envoi-planifies-list.component.scss']
})
export class PreparationEnvoiPlanifieListComponent extends AbstractTab implements OnInit, OnDestroy {

    @Input() idBulletin:number;
    preparationsEnvoisPlanifies:any[]=[];
    model:any = {};
    subscriptions:Subscription[] = [];
    isValid:any = false;
    isValidModification:any = false;
    isValidPlanification:any = false;
    bulletin:any = {};


    constructor(private bulletinsService:BulletinsService, protected eventManager:EventManager,
                private bulletinsWebsocketService:BulletinsWebsocketService, private cacheService:CacheService) {
        super();
        this.resolvePreparationsSubscription();
        this.resolveShowCreateButton();
        this.resolveShowValiderButton();
        this.resolveShowPlanifierButton();


    }

    ngOnInit() {
        this.model.ctx = {}; // initialisation du contexte.
        this.model.field = FieldBulletinsCte.FIELD;
        this.model.currentCtx = CtxCte.CTX.LIST_BULLETINS_PREPARATIONS_ENVOIES_PLANIFIES;
        this.model.contexte = CtxCte.CTX;
        this.model.configCte = FieldBulletinsCte;
        this.getPreparationEnvois();
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
        this.subscriptions.length = 0;
    }

    getPreparationEnvois() {
        this.subscriptions.push(this.bulletinsService.recupereLaListeDesPreparationsEnvois()
            .subscribe((response) => {
                if (response) {
                    this.preparationsEnvoisPlanifies.length = 0;
                    response.forEach(preparation => {
                        if(preparation.planification){
                            this.preparationsEnvoisPlanifies.push(preparation);
                        }
                    });
                }
            }
        ));
    }

    //----------------------------------------------------------------------------
    //-- EVENTS
    //----------------------------------------------------------------------------
    /**
     * @param $event js
     * @param strategie
     */
    public selectPreparationEnvoi(preparationEnvoi:any) {
        this.model.ctx.identifiant = preparationEnvoi.identifiant;
    }

    public downloadBulletin($event, bulletin) {
        $event.stopPropagation();
        $event.preventDefault();
        /*return window.open(bulletin.src);*/
    }

    /**
     * Gestion des notifications de sélection d'un item.
     */
    private sendSelectedBulletin() {
        this.eventManager.broadcast({
            name: EventManagerCte.EVENT_NAME.bulletinSeclected,
            content: {identifiant: this.bulletin.identifiant, bulletin: this.bulletin}
        });
    }

    private copyBulletin(preparation) {
        let bulletin = {
            "identifiant": preparation.identifiant,
            "codeInfo": preparation.codeInfo,
            "nom": preparation.nom,
            "description": preparation.description,
            "typeObjetSource": preparation.typeObjetSource,
            "idObjetSource": preparation.idObjetSource,
            "codeRessourceDestinataire": preparation.codeRessourceDestinataire,
            "nomRessourceDestinataire": preparation.nomRessourceDestinataire,
            "codeGroupeDestinataire": preparation.codeGroupeDestinataire,
            "nomGroupeDestinataire": preparation.nomGroupeDestinataire,
            "codeModeleDocument": preparation.codeModeleDocument,
            "codeFormat": preparation.codeFormat,
            "codeMedia":  preparation.codeMedia,
            "commentaire": preparation.commentaire,
            "planification": preparation.planification
        }

        return bulletin;
    }

    /**
     * Gestion des notifications de sélection d'un item.
     */
    private resolvePreparationsSubscription() {
        this.subscriptions.push(this.eventManager.subscribe(EventManagerCte.EVENT_NAME.sendToListOfBulletinsPlanifiesReload, (response) => {
            this.preparationsEnvoisPlanifies.push(response.content);
        }));

        this.subscriptions.push(this.eventManager.subscribe(EventManagerCte.EVENT_NAME.bulletinsCreatedFromWebSocket, (response) => {
            this.getPreparationEnvois();
            /*if(response.content.planification){
                this.preparationsEnvoisPlanifies.push(response.content);
            }*/
        }));
        this.subscriptions.push(this.eventManager.subscribe(EventManagerCte.EVENT_NAME.bulletinsUpdatedFromWebSocket, (response) => {
            this.getPreparationEnvois()
            /*if(response.content.planification){
                for (let i = 0; i < this.preparationsEnvoisPlanifies.length; i++)
                    if (this.preparationsEnvoisPlanifies[i].identifiant === response.content.identifiant) {
                        this.preparationsEnvoisPlanifies[i] = response.content;
                        break;
                    }
            }*/
        }));
        this.subscriptions.push(this.eventManager.subscribe(EventManagerCte.EVENT_NAME.bulletinsDeletedFromWebSocket, (response) => {
            this.getPreparationEnvois();
           /* if(response.content.planification) {
                this.preparationsEnvoisPlanifies = this.preparationsEnvoisPlanifies.filter(prepa => prepa.identifiant !== response.content.identifiant);
            }*/
        }));
    }

    private resolveShowCreateButton() {
        this.subscriptions.push(this.eventManager.subscribe(EventManagerCte.EVENT_NAME.showCreateButtonPreparationEnvoi, (response) => {
            this.isValid = response.content;
        }));
    }

    private resolveShowValiderButton() {
        this.subscriptions.push(this.eventManager.subscribe(EventManagerCte.EVENT_NAME.showValiderButtonPreparationEnvoi, (response) => {
            this.isValidModification = response.content;
        }));
    }

    private resolveShowPlanifierButton() {
        this.subscriptions.push(this.eventManager.subscribe(EventManagerCte.EVENT_NAME.showPlanifierButtonPreparationEnvoi, (response) => {
            console.info('PreparationEnvoiPlanifieListComponent.resolveShowPlanifierButton : '+response.content);
            this.isValidPlanification = response.content;
        }));
    }

    private sendToPreparationEnvoiCreerPreparationBack() {
        this.eventManager.broadcast({
            name: EventManagerCte.EVENT_NAME.createPreparationEnvoiAndSendToBack,
            content: true
        });
    }

    private sendToPreparationEnvoiModifierPreparationBack() {
        this.eventManager.broadcast({
            name: EventManagerCte.EVENT_NAME.modifierPreparationEnvoiAndSendToBack,
            content: true
        });
    }

    private sendToPreparationEnvoiModifierPlanificationBack() {
        this.eventManager.broadcast({
            name: EventManagerCte.EVENT_NAME.modifierPlanifierPreparationEnvoiAlreadyExistAndSendToBack,
            content: true
        });
    }

    private sendToPreparationEnvoiPlanifierPreparationBack() {
        this.eventManager.broadcast({
            name: EventManagerCte.EVENT_NAME.creerAndplanifierPreparationEnvoiAndSendToBack,
            content: true
        });
    }

    private sendPreparationEnvoiToModification(preparation:any) {
        this.eventManager.broadcast({
            name: EventManagerCte.EVENT_NAME.sendPreparationEnvoiToModification,
            content: preparation
        });
    }

    private sendPreparationEnvoiToPlanification(preparation:any) {
        this.eventManager.broadcast({
            name: EventManagerCte.EVENT_NAME.sendPreparationEnvoiToPlanification,
            content: preparation
        });
    }

    public showFormPlanificationPreparationEnvoi(contexte:any) {
        this.cacheService.setObject(CacheConstantes.PREVENT_NON_SAVE_DATA_CTX, true);
        this.model.currentCtx = contexte;
    }

    public createPreparationEnvoiAndSendToBack(contexte:any) {
        this.cacheService.setObject(CacheConstantes.PREVENT_NON_SAVE_DATA_CTX, false);
        this.model.currentCtx = contexte;
        this.sendToPreparationEnvoiCreerPreparationBack();
    }

    public modifierPreparationEnvoiAndSendToBack(contexte:any) {
        this.cacheService.setObject(CacheConstantes.PREVENT_NON_SAVE_DATA_CTX, false);
        this.model.currentCtx = contexte;
        this.sendToPreparationEnvoiModifierPreparationBack();
    }

    public creerAndPlanifierPreparationEnvoiAndSendToBack(contexte:any) {
        this.cacheService.setObject(CacheConstantes.PREVENT_NON_SAVE_DATA_CTX, false);
        this.model.currentCtx = contexte;
        this.sendToPreparationEnvoiPlanifierPreparationBack();
    }

    public modifierPlanificationPreparationEnvoiAndSendToBack(contexte:any){
        this.cacheService.setObject(CacheConstantes.PREVENT_NON_SAVE_DATA_CTX, false);
        this.model.currentCtx = contexte;
        this.sendToPreparationEnvoiModifierPlanificationBack();
    }

    public cancelCreation(contexte:any) {
        this.cacheService.setObject(CacheConstantes.PREVENT_NON_SAVE_DATA_CTX, false);
        this.model.currentCtx = contexte;
    }

    public regenererPreparationEnvoi(preparation:any) {

    }

    public apercuPreparationEnvoi(preparation:any) {
        this.subscriptions.push(this.bulletinsService.recupereApercuPreparationEnvoiParSonIdentifiant(preparation.identifiant)
            .subscribe((response) => {
                var blob = new Blob(
                    [response._body], {
                        type: 'application/pdf'
                    });
                var url = URL.createObjectURL(blob);
                this.bulletin = this.copyBulletin(preparation);
                this.bulletin.src = url;
                this.sendSelectedBulletin();
            }
        ));
    }

    public editionCommentairePreparationEnvoi(preparation:any, contexte:any) {
        this.sendPreparationEnvoiToModification(preparation);
        this.model.currentCtx = contexte;
    }

    public emissionPreparationEnvoi(preparation:any) {
        this.subscriptions.push(this.bulletinsService.emettrePreparationEnvoiParSonIdentifiant(preparation.identifiant)
            .subscribe((response) => {
                console.log(response);
            }
        ));
    }

    public supprimerPreparationEnvoi(preparation:any) {
        this.subscriptions.push(this.bulletinsService.supprimerPreparationEnvoiParSonIdentifiant(preparation.identifiant)
            .subscribe((response) => {

            }
        ));
    }

    public supprimerPlanificationPreparationEnvoi(preparation:any) {
        this.subscriptions.push(this.bulletinsService.supprimerPlanificationPreparationEnvoiParSonIdentifiant(preparation.identifiant)
            .subscribe((response) => {
                this.preparationsEnvoisPlanifies = this.preparationsEnvoisPlanifies.filter(prepa => prepa.identifiant !== preparation.identifiant);
            }
        ));
    }

    public planifierPreparationEnvoi(preparation:any, contexte:any) {
        this.cacheService.setObject(CacheConstantes.PREVENT_NON_SAVE_DATA_CTX, true);
        this.sendPreparationEnvoiToModification(preparation);
        this.model.currentCtx = contexte;
    }


    public gotoOngletPreparationEnvoi(){
        const nomMethode = 'PreparationEnvoiPlanifieListComponent.gotoOngletPreparationEnvoi';
        console.debug(nomMethode);
    }



}
