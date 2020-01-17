import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges, SimpleChange, ViewChild, ElementRef } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { AbstractTab } from '../../../../shared/components/abstract-tab/abstract-tab';
import { Subscription } from 'rxjs';
import { JournauxService } from '../../services/journaux.service';
import { EventManager } from '../../../../shared/services/event/event-manager.service';
import { EventManagerCte } from '../../../../shared/services/constantes/event-manager.constantes';
import { DEFAULT_SCROLL_CONFIG } from '../../../../shared/directives/infinite-scroller.directive';
import { HistoCourtTermeDefinition } from './journal-histo-cour-terme-definition';

@Component({
  selector: 'journal-histo-court-terme',
  templateUrl: './journal-histo-court-terme.component.html',
  //styleUrls: ['./journal-histo-court-terme.component.scss']
  styleUrls: ['../journaux-historiques-page/journaux-historiques-page.component.scss']
})
export class JournalHistoCourtTermeComponent extends AbstractTab  implements OnInit, OnDestroy, OnChanges {


  subscriptions:Subscription[] = [];
  model:any = {filtre:{}};
  champs: Array<string> = [];
  contenuJournal: Array<any> = [];
  refreshFilter: boolean = false;
  timeoutRechargement: any;
  tachePolling: any;
  forceRefresh: boolean = false;
  horodatePremiereDonnee: any;
  listeHistoCourtTerme: Array<HistoCourtTermeDefinition> = [];
  selectedHisto: HistoCourtTermeDefinition;

  @ViewChild('contenuJournalHisto') contenuJournalHisto: ElementRef;


  constructor(private journauxService:JournauxService,
    private eventManager:EventManager) {
    super();
    Object.keys(HistoCourtTermeDefinition.ListeHistoCourtTerme).map(
      key => this.listeHistoCourtTerme.push(HistoCourtTermeDefinition.ListeHistoCourtTerme[key])
    )
  }

  ngOnInit() {
    this.model.infiniteScroll = {};
    this.model.infiniteScroll.sum = 0;
    this.model.currentSearching = this.model.nature;

    // chargement initial
    this.resolveInfiniteScrollSubscription();

    //Polling toutes les 30s
    this.tachePolling = setInterval(() => this.polling() ,30000);
  }

  ngOnChanges(changes: SimpleChanges): void {

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


  private resolveInfiniteScrollSubscription() {

    this.subscriptions.push(this.eventManager
        .subscribe(EventManagerCte.EVENT_NAME.infiniteScrollNewItem, (response) => {
            console.debug(EventManagerCte.EVENT_NAME.infiniteScrollNewItem + ' >> ' + JSON.stringify(response))

            this.model.infiniteScroll.sum = this.contenuJournal.length
            this.charger();
        }));
  }


  clearFilter(){

    this.model.filtre = {};
    this.refreshFilter = true;
    this.charger(true);

  }


  charger(forceRefresh?: boolean){
    const nomMethode = 'JournalHistoCourtTermeComponent.charger';
    console.debug(nomMethode + ' offset : ' + this.model.infiniteScroll.sum + ' , limit :' +  DEFAULT_SCROLL_CONFIG.SCROLL_ADD);

    if(this.refreshFilter || forceRefresh){
      //On vide la table
      this.contenuJournal.length = 0;
      this.model.infiniteScroll.sum = 0;
      this.refreshFilter = false;
      this.forceRefresh = false;
      this.contenuJournalHisto.nativeElement.scrollTop = 0;
    }

    this.journauxService.getDataHistorique(
        this.selectedHisto.url,
        this.selectedHisto.urlFiltre,
        this.model.filtre,
        this.model.infiniteScroll.sum,
        DEFAULT_SCROLL_CONFIG.SCROLL_ADD)
        .subscribe(
          response => {

            const keys: string[] =  Object.keys(response);

            if(keys.length === 1 ){
              response[keys[0]].map(
                item => {
                  this.contenuJournal.push(item);
                }
             );
             //console.debug(nomMethode + ' contenuJournal : ' + JSON.stringify(this.contenuJournal));
             console.debug(nomMethode + ' contenuJournal : ' + this.contenuJournal.length + ' lignes');
            }

            if(this.contenuJournal.length > 0){
              this.horodatePremiereDonnee = this.contenuJournal[0].HORODATE;
            }else{
              this.horodatePremiereDonnee = undefined;
            }

          }
        );
  }


  /**
   * Méthode utilisé pour vérifier s'il y a eu des modifications dans le journal d'activité depuis
   * le dernier rechargement
   */
  polling() {
    const nomMethode = 'JournalActiviteComponent.polling';

    if (!this.forceRefresh) {

      this.journauxService.getDataHistorique(this.selectedHisto.url,
        this.selectedHisto.urlFiltre,
        this.model.filtre, 0, 1)
        .subscribe(
          response => {
            let hd;
            const keys: string[] =  Object.keys(response);
            if (keys.length === 1) {
              response[keys[0]].map(
                  item => {
                    hd = item.HORODATE;
                  }
                );
            }
            console.debug(nomMethode + ' result:' + hd + ' horodatePremiereDonnee:' + this.horodatePremiereDonnee);
            if (hd === this.horodatePremiereDonnee) {
              this.forceRefresh = false;
            } else {
              this.forceRefresh = true;
            }
          }
        );
    }
  }

  selectHisto(selectedHisto){
    const nomMethode = 'selectHisto';
    console.debug(nomMethode + ' : ' +selectedHisto);
    this.selectedHisto = HistoCourtTermeDefinition.getHistoCourtTermeDefinition(selectedHisto);
    this.model.filtre = {};
    this.charger(true);
    if(this.selectedHisto){
      console.debug(nomMethode + ' : ' +  JSON.stringify(this.selectedHisto));
    }else{
      console.debug(nomMethode + ' : undefined' );
    }

  }


  filterChange(colonne: string){
    const nomMethode = "filterChange";
    console.debug(nomMethode+ ' : ' + colonne + ' = ' + this.model.filtre[colonne]);
    this.refreshFilter = true;
    // si on a une demande de rechargement en cours, on l'annule
    if(this.timeoutRechargement){
      console.debug('clearTimeout : ' + this.timeoutRechargement)
      clearTimeout(this.timeoutRechargement);
    }

    this.timeoutRechargement = setTimeout(
      () => {
          console.debug('Rechargement après filtrage');
          this.charger();
        },
      1000
    );
    console.debug('setTimeout : ' + this.timeoutRechargement)

  }

}
