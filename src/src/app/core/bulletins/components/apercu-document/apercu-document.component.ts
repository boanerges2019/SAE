import { Component, OnInit, OnDestroy, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import * as _ from 'underscore';
import { CtxCte } from 'app/shared/services/constantes/ctx.constantes';
import { EventManager } from 'app/shared/services/event/event-manager.service';
import { EventManagerCte } from 'app/shared/services/constantes/event-manager.constantes';
import {SafeResourceUrl, DomSanitizer} from '@angular/platform-browser';
import { BulletinsService } from 'app/core/bulletins/services/bulletins.service';
import { BulletinsWebsocketService } from 'app/core/bulletins/services/bulletins-websocket.service';
import { FieldBulletinsCte } from 'app/core/bulletins/constantes/field-bulletins.constante';

@Component({
  selector: 'apercu-document',
  templateUrl: './apercu-document.component.html',
  styleUrls: ['./apercu-document.component.scss']
})
export class ApercuDocumentComponent implements OnInit, OnDestroy {

  bulletin?: any;
  model: any = {};
  subscriptions: Subscription[] = [];
  url: SafeResourceUrl;
  bulletinsEmis:any[]=[];
  isEmisPage:boolean=true;
  isPdf:boolean=true;



  constructor( private eventManager: EventManager, private sanitizer: DomSanitizer,
                private bulletinsService : BulletinsService,private bulletinsWebsocketService:BulletinsWebsocketService) {
      this.resolveSelectedBulletinSubscription();
      this.resolveDeSelectedBulletinSubscription();
      this.resolveBulletinEmisChangeSubscription();

  }



  ngOnInit() {
      this.model.ctx = {}; // initialisation du contexte.
      this.model.field = FieldBulletinsCte.FIELD;
      this.model.currentCtx = CtxCte.CTX.LIST_BULLETINS_PREPARATIONS_ENVOIES_PLANIFIES;
      this.model.contexte = CtxCte.CTX;
      this.model.configCte = FieldBulletinsCte;
      this.getBulletinsEmis();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

    public setUrl(){
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.bulletin.src);
    }

    public getBulletinsEmis() {
        this.subscriptions.push(this.bulletinsService.recupereLaListeDesBulletinsEmis().subscribe((response) => {
                this.bulletinsEmis = response;
            }
        ));
    }

  private resolveSelectedBulletinSubscription(){
    this.subscriptions.push(this.eventManager
      .subscribe(EventManagerCte.EVENT_NAME.bulletinSeclected, (response) => {
        this.model.ctx.identifiant = response.content.identifiant;
        this.bulletin = response.content.bulletin;
        this.isPdf = response.content.isPdf;
        if(!this.isPdf){
            this.setUrl();
        }
        this.isEmisPage = false;
      }));
  }

    private resolveBulletinEmisChangeSubscription(){
        this.subscriptions.push(this.eventManager
            .subscribe(EventManagerCte.EVENT_NAME.bulletinsEmisChangeFromWebSocket, (response) => {
               this.getBulletinsEmis();
            }));
    }

  private resolveDeSelectedBulletinSubscription(){
    this.subscriptions.push(this.eventManager
      .subscribe(EventManagerCte.EVENT_NAME.deselectItem, (response) => {
            if (response.content.deselectionConcerned && response.content.deselectionConcerned !=="listeBulletins")
                return; // dans ce cas la désélection ne concerne pas les evets.

        this.model.ctx.identifiant = undefined; // id de la stratégie sélection
        this.bulletin = undefined;
      }));
  }

    public selectBulletinEmis(bulletin:any) {
        this.model.ctx.identifiant = bulletin.identifiant;
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

    public apercuBulletionEmis(bulletin:any){
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

                this.isEmisPage = false;

            }
        ));
    }

    public retourAuxBulletinsEmis(){
        this.isEmisPage = true;
        this.getBulletinsEmis();
    }
}
