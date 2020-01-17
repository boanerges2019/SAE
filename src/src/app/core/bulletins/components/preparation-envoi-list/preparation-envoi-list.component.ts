import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import * as _ from 'underscore';
import { EventManager } from '../../../../../app/shared/services/event/event-manager.service';
import { EventManagerCte } from '../../../../../app/shared/services/constantes/event-manager.constantes';
import { CtxCte } from '../../../../../app/shared/services/constantes/ctx.constantes';
import { BulletinsService } from '../../../../../app/core/bulletins/services/bulletins.service';
import { BulletinsWebsocketService } from '../../../../../app/core/bulletins/services/bulletins-websocket.service';
import { FieldBulletinsCte } from '../../../../../app/core/bulletins/constantes/field-bulletins.constante';
import { AbstractTab } from '../../../../../app/shared/components/abstract-tab/abstract-tab';
import { CacheService } from '../../../../../app/shared/services/cache/cache.service';
import { CacheConstantes } from '../../../../../app/shared/services/cache/cache.constantes';


@Component({
    selector: 'preparation-envoi-list',
    templateUrl: './preparation-envoi-list.component.html',
    styleUrls: ['./preparation-envoi-list.component.scss']
})
export class PreparationEnvoiListComponent extends AbstractTab implements OnInit, OnDestroy {

    @Input() idBulletin:number;
    preparationsEnvois:any[]=[];
    model:any = {};
    subscriptions:Subscription[] = [];
    isValid:any = false;
    isValidModification:any = false;
    isValidPlanification:any = false;
    bulletin:any = {};
    isPdf:boolean=true;
    isUpadtePlanif:boolean=false;


    constructor(private bulletinsService:BulletinsService, private eventManager:EventManager,
                private bulletinsWebsocketService:BulletinsWebsocketService, private cacheService : CacheService) {
        super();
        this.resolvePreparationsSubscription();
        this.resolveShowCreateButton();
        this.resolveShowValiderButton();
        this.resolveShowPlanifierButton();
    }

    ngOnInit() {
        this.model.ctx = {}; // initialisation du contexte.
        this.model.field = FieldBulletinsCte.FIELD;
        this.model.currentCtx = CtxCte.CTX.LIST_BULLETINS_PREPARATIONS_ENVOIES;
        this.model.sourceCtx = CtxCte.CTX.LIST_BULLETINS_PREPARATIONS_ENVOIES;
        this.model.contexte = CtxCte.CTX;
        this.model.configCte = FieldBulletinsCte;
        this.getPreparationEnvois();
    }

    ngOnDestroy() {
        console.info('PreparationEnvoiListComponent.ngOnDestroy')
        this.subscriptions.forEach(s => s.unsubscribe());
        this.subscriptions.length = 0;
    }

    private selectBulletinAndShowApercu(){
        if(this.idBulletin){
            this.model.ctx.identifiant = this.idBulletin;
            this.subscriptions.push(this.bulletinsService.recupereUnePreparationEnvoiParSonIdentifiant(this.idBulletin)
                .subscribe((response) => {
                    if (response) {
                        this.apercuPreparationEnvoi(response);
                    }
                }
            ));
        }
    }
    getPreparationEnvois() {
        this.subscriptions.push(this.bulletinsService.recupereLaListeDesPreparationsEnvois()
            .subscribe((response) => {
                if (response) {
                    this.preparationsEnvois = response;
                    this.selectBulletinAndShowApercu();
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
            content: {identifiant: this.bulletin.identifiant, bulletin: this.bulletin, isPdf:this.isPdf}
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
        };
        return bulletin;
    }

    /**
     * Gestion des notifications de sélection d'un item.
     */
    private resolvePreparationsSubscription() {
        this.subscriptions.push(this.eventManager.subscribe(EventManagerCte.EVENT_NAME.bulletinsCreatedFromWebSocket, (response) => {
            this.getPreparationEnvois();
            //this.preparationsEnvois.push(response.content);

        }));
        this.subscriptions.push(this.eventManager.subscribe(EventManagerCte.EVENT_NAME.bulletinsUpdatedFromWebSocket, (response) => {
            this.getPreparationEnvois();
            /*for (let i = 0; i < this.preparationsEnvois.length; i++){
                if (this.preparationsEnvois[i].identifiant === response.content.identifiant) {
                    this.preparationsEnvois[i] = response.content;
                    break;
                }
            }*/
        }));
        this.subscriptions.push(this.eventManager.subscribe(EventManagerCte.EVENT_NAME.bulletinsDeletedFromWebSocket, (response) => {
            this.getPreparationEnvois();
            /*this.preparationsEnvois = this.preparationsEnvois.filter(prepa => prepa.identifiant !== response.content.identifiant);*/
        }));
    }

    private resolveShowCreateButton() {
        this.subscriptions.push(this.eventManager.subscribe(EventManagerCte.EVENT_NAME.showCreateButtonPreparationEnvoi, (response) => {
            console.info('PreparationEnvoiListComponent.resolveShowCreateButton : '+response.content);
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
            console.info('PreparationEnvoiListComponent.resolveShowPlanifierButton : '+response.content);
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

    private sendToPreparationEnvoiPlanifierPreparationBack() {
        this.eventManager.broadcast({
            name: EventManagerCte.EVENT_NAME.planifierPreparationEnvoiAlreadyExistAndSendToBack,
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

    public showFormCreatePreparationEnvoi(contexte:any) {
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

    public planifierPreparationEnvoiAlreadyCreatedAndSendToBack(contexte:any) {
        this.cacheService.setObject(CacheConstantes.PREVENT_NON_SAVE_DATA_CTX, false);
        this.model.currentCtx = contexte;
        this.sendToPreparationEnvoiPlanifierPreparationBack();
    }

    public cancelCreation(contexte:any) {
        this.cacheService.setObject(CacheConstantes.PREVENT_NON_SAVE_DATA_CTX, false);
        this.model.currentCtx = contexte;
    }

    public apercuPreparationEnvoi(preparation:any) {
        this.subscriptions.push(this.bulletinsService.recupereApercuPreparationEnvoiParSonIdentifiant(preparation.identifiant)
            .subscribe((response) => {
                this.bulletin = this.copyBulletin(preparation);
                let contentType : string  = response.headers.get("content-type");
                var url;
                if(contentType==="application/pdf"){
                    var blob = new Blob(
                        [response._body], {
                            type: 'application/pdf'
                        });
                    url = URL.createObjectURL(blob);
                    this.bulletin.src = url;
                    this.isPdf=true;
                }else{
                    var blob = new Blob(
                        [response._body], {
                            type: 'text/html'
                        });
                    url = URL.createObjectURL(blob);
                    this.bulletin.src = url;
                    this.isPdf=false;
                }
                this.sendSelectedBulletin();
            }
        ));
    }

    public editionPreparationEnvoi(preparation:any, contexte:any, isUpadtePlanif:boolean) {
        this.cacheService.setObject(CacheConstantes.PREVENT_NON_SAVE_DATA_CTX, true);
        this.isUpadtePlanif = isUpadtePlanif;
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

            }
        ));
    }

    public gotoOngletPreparationEnvoiPlanifie(){
        const nomMethode = 'PreparationEnvoiListComponent.gotoOngletPreparationEnvoiPlanifie';
        console.debug(nomMethode);
    }
}
