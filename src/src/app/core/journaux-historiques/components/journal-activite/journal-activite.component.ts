import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges, SimpleChange, ViewChild, ElementRef } from '@angular/core';
import { AbstractTab } from '../../../../shared/components/abstract-tab/abstract-tab';
import { LABELS } from '../journaux-historiques-page/labels';
import { DEFAULT_SCROLL_CONFIG } from '../../../../shared/directives/infinite-scroller.directive';
import { MessageJournalActivite } from '../../../../shared/models/generic/models';
import { JournauxService, FiltreJournalActivite } from '../../services/journaux.service';
import { EventManager } from '../../../../../app/shared/services/event/event-manager.service';
import { EventManagerCte } from '../../../../../app/shared/services/constantes/event-manager.constantes';
import { Subscription } from 'rxjs';
import { Moment } from 'moment';

@Component({
  selector: 'journal-activite',
  templateUrl: './journal-activite.component.html' ,
  //styleUrls: ['./journal-activite.component.scss']
  styleUrls: ['../journaux-historiques-page/journaux-historiques-page.component.scss']
})


export class JournalActiviteComponent extends AbstractTab implements OnInit, OnDestroy, OnChanges {

  subscriptions:Subscription[] = [];
  model:any = {};
  filtre: FiltreJournalActivite = new FiltreJournalActivite();
  contenuJournal: Array<MessageJournalActivite> = [];
  refreshFilter: boolean = false;  
  timeoutRechargement: any;
  tachePolling: any;
  forceRefresh: boolean = false;
  horodatePremiereDonnee: any;

  @ViewChild('contenuJournalActivite') contenuJournalActivite: ElementRef;


  constructor(private journauxService:JournauxService,
              private eventManager:EventManager) {
    super();
  }

  ngOnInit() {
    
    this.model.labels = LABELS;

    this.model.labels = LABELS;
    this.model.infiniteScroll = {};
    this.model.infiniteScroll.sum = 0;
    this.model.currentSearching = this.model.nature;
    //this.model.infiniteScroll.sum = DEFAULT_SCROLL_CONFIG.SCROLL_ADD;

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



  public filterChange(field) {
    const nomMethode = 'filterChange';
    console.debug(nomMethode + ' : ' + field);
    console.debug(nomMethode + ' : ' + JSON.stringify(this.filtre));
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



  private resolveInfiniteScrollSubscription() {
    
    this.subscriptions.push(this.eventManager
        .subscribe(EventManagerCte.EVENT_NAME.infiniteScrollNewItem, (response) => {
            console.debug(EventManagerCte.EVENT_NAME.infiniteScrollNewItem + ' >> ' + JSON.stringify(response))
          
            this.model.infiniteScroll.sum = this.contenuJournal.length
            this.charger();
        }));
  }


  clearFilter(){

    this.filtre = {};
    this.refreshFilter = true;
    this.charger(true);

  }

  charger(forceRefresh?: boolean){
    const nomMethode = 'JournalActiviteComponent.charger';
    console.debug(nomMethode + ' offset : ' + this.model.infiniteScroll.sum + ' , limit :' +  DEFAULT_SCROLL_CONFIG.SCROLL_ADD);
            
    if(this.refreshFilter || forceRefresh){
      //On vide la table
      this.contenuJournal.length = 0;
      this.model.infiniteScroll.sum = 0;
      this.refreshFilter = false;
      this.forceRefresh = false;
      this.contenuJournalActivite.nativeElement.scrollTop = 0;
    }  

    this.journauxService
        .getJournalActivite(this.filtre, this.model.infiniteScroll.sum, DEFAULT_SCROLL_CONFIG.SCROLL_ADD)
        .subscribe(
          response => {   
                   
            if(response.messages){
              response.messages.map(                
                item => {
                  let message: MessageJournalActivite = {};
                  message.identifiant = item.ID_HST_MESSAGE_FIL_EAU;
                  message.nom = item.NOM;
                  message.description = item.DESCRIPTION;
                  message.etat = item.ETAT;
                  message.nature = item.NATURE;
                  message.operateur = item.OPERATEUR;
                  message.poste = item.POSTE;
                  message.equipement = item.EQUIEPEMENT;
                  message.horodate = item.DATE_LIGNE;
                  message.localisation = item.LOCALISATION;
                  this.contenuJournal.push(message);
                }  
             );
             //console.debug(nomMethode + ' contenuJournal : ' + JSON.stringify(this.contenuJournal));
             console.debug(nomMethode + ' contenuJournal : ' + this.contenuJournal.length + ' lignes');
            }

            if(this.contenuJournal.length > 0){
              this.horodatePremiereDonnee = this.contenuJournal[0].horodate;
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
      this.journauxService
        .getJournalActivite(this.filtre, 0, 1)
        .subscribe(
          response => {
            let hd;
            if (response.messages) {
              response.messages.map(
                item => {
                  hd = item.DATE_LIGNE;
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



}
