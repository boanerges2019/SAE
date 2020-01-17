import { Component, OnInit, OnDestroy, Input} from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { BulletinsService } from 'app/core/bulletins/services/bulletins.service';
import { CtxCte } from 'app/shared/services/constantes/ctx.constantes';
import { EventManager } from 'app/shared/services/event/event-manager.service';
import { EventManagerCte } from 'app/shared/services/constantes/event-manager.constantes';
import {SafeResourceUrl, DomSanitizer} from '@angular/platform-browser';
import { PlanActionCte } from 'app/core/plan-action/constantes/plan-action.constantes';

@Component({
  selector: 'communication',
  templateUrl: './communication.component.html',
  styleUrls: ['./communication.component.scss']
})
export class CommunicationComponent implements OnInit, OnDestroy{

    @Input() idEvenement:number;
    model:any = {}
    subscriptions:Subscription[] = [];
    url: SafeResourceUrl;
    bulletin:any;
    isPdf:boolean=true;
    isValidModification:any = false;
    communications:any[]=[];
    crs:any[]=[];
    nbrAppels:number=0;
    nbrDiffusion:number=0;
    nbrMail:number=0;
    nbrDocuments:number=0;

  constructor(private bulletinsService:BulletinsService, private eventManager:EventManager,
                private sanitizer: DomSanitizer) {
      this.resolveShowValiderButton();
      this.resolvePreparationsSubscription();
  }

  ngOnInit() {
      this.model.contexte = CtxCte.CTX;
      this.model.currentCtx = CtxCte.CTX.PAC_COMMUNICATION;
      this.model.types=PlanActionCte.TYPE_COMMUNICATION;
      this.communications = [];
      this.getCommunications();
  }
    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
        this.subscriptions.length = 0;
    }

    getCommunications() {
        this.subscriptions.push(this.bulletinsService.recupereLaListeDeToutesLesCommunicationsPourUnEvenement(this.idEvenement)
            .subscribe((response) => {
                this.communications = response;
                this.communications.forEach(com => {
                    if(com.type===this.model.types.APPEL){
                        this.nbrAppels++;
                    }
                    if(com.type===this.model.types.MESSAGE_VOCAL){
                        this.nbrDiffusion++;
                    }
                    if(com.type===this.model.types.PREPARATION){
                        this.nbrDocuments++;
                    }
                    if(com.type===this.model.types.BULLETIN){
                        this.nbrMail++;
                    }
                });
            }
        ));
    }



    public selectCommunication(communication:any){
        communication.isSelect=!communication.isSelect;
        this.communications.forEach(com =>{
            if(com.identifiant!==communication.identifiant){
                com.isSelect = false;
            }
        });
    }


    public retourEcranCommunication(context:any){
        this.model.currentCtx = context;
    }

    public renvoyerOuRappeller(communication:any){
        // TODO appeler l'api de renvoie et d'appel
    }

    public compteRendu(communication:any, context:any) {
        this.model.currentCtx = context;
        this.subscriptions.push(this.bulletinsService.recupereLeCompteRenduPourUnMessageVocal(communication.identifiant)
            .subscribe((response) => {
                this.crs = response;
            }
        ));
    }

    public apercuCommunication(communication:any, context:any){
        if(communication.type===this.model.types.PREPARATION){
            this.apercuPreparationEnvoi(communication,context);
        }else{
            this.apercuBulletionEmis(communication,context);
        }
    }

    public supprimerPreparationEnvoi(preparation:any) {
        this.subscriptions.push(this.bulletinsService.supprimerPreparationEnvoiParSonIdentifiant(preparation.identifiant)
            .subscribe((response) => {
                this.getCommunications();
            }
        ));
    }

    public emissionPreparationEnvoi(preparation:any) {
        this.subscriptions.push(this.bulletinsService.emettrePreparationEnvoiParSonIdentifiant(preparation.identifiant)
            .subscribe((response) => {
                this.getCommunications();
            }
        ));
    }

    public editionPreparationEnvoi(communication:any, contexte:any) {
        this.model.currentCtx = contexte;
        this.subscriptions.push(this.bulletinsService.recupereUnePreparationEnvoiParSonIdentifiant(communication.identifiant)
            .subscribe((response) => {
                let preparationEnvoi = response;
                this.sendPreparationEnvoiToModification(preparationEnvoi);
                setTimeout(() => {
                    this.sendPreparationEnvoiToModification(preparationEnvoi);
                }, 900);

            }
        ));


    }

    private sendPreparationEnvoiToModification(preparation:any) {
        this.eventManager.broadcast({
            name: EventManagerCte.EVENT_NAME.sendPreparationEnvoiToModification,
            content: preparation
        });
    }

    private resolveShowValiderButton() {
        this.subscriptions.push(this.eventManager.subscribe(EventManagerCte.EVENT_NAME.showValiderButtonPreparationEnvoi, (response) => {
            this.isValidModification = response.content;
        }));
    }

    public modifierPreparationEnvoiAndSendToBack(contexte:any) {
        this.model.currentCtx = contexte;
        this.sendToPreparationEnvoiModifierPreparationBack();
    }

    private sendToPreparationEnvoiModifierPreparationBack() {
        this.eventManager.broadcast({
            name: EventManagerCte.EVENT_NAME.modifierPreparationEnvoiAndSendToBack,
            content: true
        });
    }

    /**************************************************
     *    FONCTIONS POUR APERCU                       *
     **************************************************/

    public setUrl(){
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.bulletin.src);
    }

    public apercuBulletionEmis(bulletin:any, context:any){
        this.bulletin = bulletin;
        this.model.currentCtx = context;
        this.subscriptions.push(this.bulletinsService.recupereApercuBulletinsEmisParSonIdentifiant(bulletin.identifiant)
            .subscribe((response) => {
                this.bulletin = this.copyBulletin(bulletin);
                let contentType : string  = response.headers.get("content-type");
                var url;
                if(contentType==="application/pdf"){
                    var blob = new Blob(
                        [response._body], {
                            type: 'application/pdf'
                        });
                    url = URL.createObjectURL(blob);
                    this.bulletin.src = url;
                    this.isPdf = true;
                }else{
                    var blob = new Blob(
                        [response._body], {
                            type: 'text/html'
                        });
                    url = URL.createObjectURL(blob);
                    this.bulletin.src = url;
                    this.isPdf = false;
                    this.setUrl();
                }
            }
        ));
    }

    public apercuPreparationEnvoi(preparation:any, context:any) {
        this.bulletin = preparation;
        this.model.currentCtx = context;
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
                    this.setUrl();
                }
            }
        ));
    }

    private copyBulletin(bulletinEmis) {
        let bulletin = {
            "identifiant": bulletinEmis.identifiant,
            "codeInfo": bulletinEmis.codeInfo,
            "nom": bulletinEmis.nom,
            "description": bulletinEmis.description,
            "typeObjetSource": bulletinEmis.typeObjetSource,
            "idObjetSource": bulletinEmis.idObjetSource,
            "codeRessourceDestinataire": bulletinEmis.codeRessourceDestinataire,
            "nomRessourceDestinataire": bulletinEmis.nomRessourceDestinataire,
            "codeGroupeDestinataire": bulletinEmis.codeGroupeDestinataire,
            "nomGroupeDestinataire": bulletinEmis.nomGroupeDestinataire,
            "codeModeleDocument": bulletinEmis.codeModeleDocument,
            "codeFormat": bulletinEmis.codeFormat,
            "codeMedia":  bulletinEmis.codeMedia,
            "commentaire": bulletinEmis.commentaire,
            "planification": bulletinEmis.planification
        };
        return bulletin;
    }

    private resolvePreparationsSubscription() {
        this.subscriptions.push(this.eventManager.subscribe(EventManagerCte.EVENT_NAME.bulletinsCreatedFromWebSocket, (response) => {
            this.getCommunications();
        }));
        this.subscriptions.push(this.eventManager.subscribe(EventManagerCte.EVENT_NAME.bulletinsUpdatedFromWebSocket, (response) => {
            this.getCommunications();
        }));
        this.subscriptions.push(this.eventManager.subscribe(EventManagerCte.EVENT_NAME.bulletinsDeletedFromWebSocket, (response) => {
            this.getCommunications();
        }));
    }
}
