import { Component, OnInit, SimpleChanges, OnDestroy, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { AbstractTab } from '../../../../shared/components/abstract-tab/abstract-tab';
import { Subscription } from 'rxjs';
import { JournauxService } from '../../services/journaux.service';
import { EventManager } from '../../../../shared/services/event/event-manager.service';
import { EventManagerCte } from '../../../../shared/services/constantes/event-manager.constantes';
import { DEFAULT_SCROLL_CONFIG } from '../../../../shared/directives/infinite-scroller.directive';
import { JournauxHistoCte } from '../../constantes/journaux-histo-constantes';
import { ExportToCsv } from 'export-to-csv';
import { CtxCte } from 'app/shared/services/constantes/ctx.constantes';



@Component({
  selector: 'journal-histo-extraction',
  templateUrl: './journal-histo-extraction.component.html',
  styleUrls: ['./journal-histo-extraction.component.scss']
  //styleUrls: ['../journaux-historiques-page/journaux-historiques-page.component.scss']
})
export class JournalHistoExtractionComponent extends AbstractTab implements OnInit, OnDestroy, OnChanges {

  subscriptions:Subscription[] = [];
  model:any = {};
  champs: Array<string> = [];
  contenuJournal: Array<any> = []; //TODO: typé avec un message hito extraction
  timeoutRechargement: any;
  tachePolling: any;
  horodatePremiereDonnee: any;
  requeteChoisi:any;
  requetes:any[]=[];
  donneesRequetes:any;
  isExported:boolean=false;
  isExtracted:boolean=false;

    headers:any[] = [];
  @ViewChild('contenuExtractionDonnees') contenuExtractionDonnees: ElementRef;
   constructor(private journauxService:JournauxService,
       private eventManager:EventManager) {
       super();
       this.resolveInfiniteScrollSubscription();
   }

  ngOnInit() {
      this.model.configCte = JournauxHistoCte;
      this.model.field = JournauxHistoCte.FIELDS;
      this.model.currentCtx = CtxCte.CTX.EXTRACTIONS_DONNEES;
      this.model.contexte = CtxCte.CTX;

      this.model.infiniteScroll = {};
      this.model.infiniteScroll.sum = 0;
      this.model.sort={};
      this.getRequetes();
  }

  ngOnChanges(changes: SimpleChanges): void {

  }



    private getRequetes(){
        this.journauxService.recupererLaListeDesRequetesAextraire().subscribe(response =>{
                if(response){
                    response.forEach(req =>{
                       let requete = {
                           codeInfo:req.nom,
                           text:req.nomExtraction,
                           parametres:[]
                       };
                        if(req.parametres){
                            req.parametres.forEach(param =>{
                                let parametre = {
                                    codeInfo:param.nom,
                                    text:param.label,
                                    type:'',
                                    choices:[]
                                };
                                if(param.type===JournauxHistoCte.TYPE.TYPE_STRING){
                                    if(param.format){
                                        if(param.format===JournauxHistoCte.FORMAT.DATE){
                                            parametre.type=JournauxHistoCte.TYPE.DATE;
                                        }
                                        if(param.format===JournauxHistoCte.FORMAT.CHOIX){
                                            parametre.type=JournauxHistoCte.TYPE.LIST;
                                            let choices = [];
                                            if(param.choix){
                                                param.choix.forEach(ch =>{
                                                    let choice = {
                                                        codeInfo:ch.value,
                                                        text:ch.label
                                                    };
                                                    choices.push(choice);
                                                });
                                            }
                                            parametre.choices = choices;
                                        }
                                    }else{
                                        parametre.type = param.type;
                                    }
                                }else{
                                    parametre.type = param.type;
                                }
                                requete.parametres.push(parametre);
                            });
                        }

                        this.requetes.push(requete);
                    });
                }
            }
        );
    }

    public selectRequeteChoisi(value) {
        this.isExported=false;
        this.donneesRequetes = {
            entetes:[],
            values:[]
        };
        for (let i = 0; i < this.requetes.length; i++) {
            if (this.requetes[i].codeInfo === value) {
                this.requeteChoisi = this.requetes[i];
                break;
            }
        }
    }

    private resolveInfiniteScrollSubscription() {

        this.subscriptions.push(this.eventManager
            .subscribe(EventManagerCte.EVENT_NAME.infiniteScrollNewItem, (response) => {
                console.debug(EventManagerCte.EVENT_NAME.infiniteScrollNewItem + ' >> ' + JSON.stringify(response))

                this.model.infiniteScroll.sum = this.donneesRequetes.values.length
                this.charger();
            }));
    }

    charger(){
        const nomMethode = 'JournalHistoExtractionComponent.charger';
        console.debug(nomMethode + ' offset : ' + this.model.infiniteScroll.sum + ' , limit :' +  DEFAULT_SCROLL_CONFIG.SCROLL_ADD);
        this.contenuExtractionDonnees.nativeElement.scrollTop = 0;
        let params = [];
        if(this.requeteChoisi.parametres){
            this.requeteChoisi.parametres.forEach(par => {
                if(par.value){
                    params.push(par);
                }
            });
        }

        this.journauxService.extraireDonneesSuiteExecutionRequete(this.requeteChoisi.codeInfo, DEFAULT_SCROLL_CONFIG.SCROLL_ADD, this.model.infiniteScroll.sum, params).subscribe(response => {
            console.log(response);
            let nameTableauData = Object.keys(response)[0];
            if(response[nameTableauData] && response[nameTableauData][0]){
            //    let entetes = Object.keys(response[nameTableauData][0]);
                let values = response[nameTableauData];
                if(values){
                    values.forEach(val => {
                        this.donneesRequetes.values.push(val);
                    });
                }
            }

        });

    }

    public valueChange($event){
        this.isExtracted=this.isValidForExtract();
    }

    public selectDate(event){
        this.isExtracted=this.isValidForExtract();
    }

    public changeValue(param, $event){
        param.value=$event.value;
        this.isExtracted=this.isValidForExtract();
    }

    public isValidForExtract():boolean{
        if(this.requeteChoisi.parametres){
            for(let i=0; i<this.requeteChoisi.parametres.length; i++){
                if(!this.requeteChoisi.parametres[i].value){
                    return false;
                }
            }
        }
        return true;
    }

    public extraire(){
        let params = [];
        if(this.requeteChoisi.parametres){
            this.requeteChoisi.parametres.forEach(par => {
                if(par.value){
                    params.push(par);
                }
            });
        }
        this.journauxService.extraireDonneesSuiteExecutionRequete(this.requeteChoisi.codeInfo, 20, 0, params).subscribe(response => {
            console.log(response);
            this.isExported=true;
            this.headers=[];
            let nameTableauData = Object.keys(response)[0];
            if(response[nameTableauData] && response[nameTableauData][0]){
                let entetes = Object.keys(response[nameTableauData][0]);
                entetes.forEach(entete => {
                    let header = {
                        identifiant: entete,
                        order:true
                    };
                    this.headers.push(header);
                });
                let values = response[nameTableauData];
                this.donneesRequetes = {
                    entetes:this.headers,
                    values:values
                };
            }else{
                this.isExported=false;
            }

        });
    }

    public sortHeader(entete) {
        this.model.sort.entete = entete;
        entete.order = !entete.order;
        this.donneesRequetes.values = this.donneesRequetes.values.sort((s1, s2) => {
            return this.compare(s1, s2, entete.identifiant)
        });
        if(!entete.order){
            this.donneesRequetes.values = this.donneesRequetes.values.reverse();
        }

    }

    private compare(item1:any, item2:any, property):number {
        if (item1[property] < item2[property]) return -1;
        if (item1[property] > item2[property]) return 1;

        return 0;
    }



    public exporter(){
        let params = [];
        if(this.requeteChoisi.parametres){
            this.requeteChoisi.parametres.forEach(par => {
                if(par.value){
                    params.push(par);
                }
            });
        }
        this.journauxService.exporterDonneesRequete(this.requeteChoisi.codeInfo, params).subscribe(response => {
            console.log(response);

            let nameTableauData = Object.keys(response)[0];
            let entetes = Object.keys(response[nameTableauData][0]);
            let values = response[nameTableauData];
            this.donneesRequetes = {
                entetes:entetes,
                values:values
            };

            var options = {
                fieldSeparator: ',',
                quoteStrings: '"',
                decimalseparator: '.',
                showLabels: true,
                showTitle: false,
                useBom: true,
                headers:entetes
            };

            const exportToCsv = new ExportToCsv(options);
            let csv = exportToCsv.generateCsv(this.donneesRequetes.values, true);
            var a = document.getElementById("exporter_requete_resulta");
            var blob = new Blob([csv], {type:"text/csv;charset=utf8;"});

            var url = window.URL.createObjectURL(blob);
            a.setAttribute("href", url);
            a.setAttribute("download", this.requeteChoisi.codeInfo+".csv");
            a.click();
        });
    }



  ngOnDestroy(): void {
    // Arrêt des souscriptions aux notifications
    this.subscriptions.forEach(s => s.unsubscribe());
    this.subscriptions.length = 0;

    //Arrêt d'une éventuelle demande de rechargement
    if(this.timeoutRechargement){
      clearTimeout(this.timeoutRechargement);
    }

    //Arrêt de la tache de polling
    if(this.tachePolling){
      clearInterval(this.tachePolling);
    }
  }






}
