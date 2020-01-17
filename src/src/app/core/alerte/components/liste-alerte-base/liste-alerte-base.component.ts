import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import * as _ from 'underscore';
import { EventManager } from '../../../../../app/shared/services/event/event-manager.service';
import { EventManagerCte } from '../../../../../app/shared/services/constantes/event-manager.constantes';
import { Alerte } from '../../../../../app/shared/models/generic/Alerte';
import { AlerteCte } from '../../../../../app/core/alerte/constantes/alerte.constantes';
import { AlerteService } from '../../../../../app/core/alerte/services/alerte.service';
import { EnumerationsService } from '../../../../../app/shared/services/reference/enumerations.service';
import { FieldAlerteCte } from '../../../../../app/core/alerte/constantes/field-alerte.constantes';
import { BaseService } from '../../../../../app/core/evenement/services/base.service';
import { DateUtils } from '../../../../../app/shared/utils/date-utils';
import { AbstractBase } from '../../../../../app/shared/components/abstract-base/abstract-base';
import { EvenementUtils } from '../../../../../app/shared/utils/evenement-utils';
import { EvenementCte } from '../../../../../app/core/evenement/constantes/evenement.constantes';

/**
 * Comoposant Parent de gestion des Alertes.
 * @author SPIE.
 */
@Component({
  selector: 'liste-alerte-base',
  template: ''
})
export class ListeAlerteBaseComponent extends AbstractBase implements OnInit, OnDestroy {

  alertes: Alerte[] = [];
  subscriptions: Subscription[] = [];
  field: {[ key: string] : any};
  evenementsEnCours: number[]; // liste des evenements en cours
  informerWebTrafic: boolean = false;
  model: any = {};

  static CME_TYPE_ALERTE: string = "CME_TYPE_ALERTE";

  constructor(
    public eventManager: EventManager,
    public alerteService: AlerteService,
    public enumerationsService: EnumerationsService,
    public baseService: BaseService,
    public router: Router
  ) {
    super();
    this.resolveWebSocketCallbackSubscription();
  }

  ngOnInit() {
    this.field = FieldAlerteCte.FIELD;
    this.getAlertes();
    this.resolveAlertesSubscription();
    this.getEvenementEnCours();
    this.getTypesAlertes();
  }


  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  //----------------------------------------------------------------------------
  //-- ACTIONS
  //----------------------------------------------------------------------------

  /**
  * Récupère la liste des alertes "A TRAITER"
  */
  private getAlertes(){
      const nomMethode = 'ListeAlerteBaseComponent.getAlertes';
      console.debug(nomMethode + ' : début' );
      this.subscriptions.push(this.alerteService.getAlertes().subscribe(response => {
        this.alertes = _.union(this.alertes, response);
		this.alertes = _.sortBy(this.alertes, 'horodateDebut').reverse();
      }
    ));
  }

  /**
  * Récupère la liste des types d'alertes.
  */
  private getTypesAlertes(){
    this.subscriptions.push(this.enumerationsService.getValeursEnumerations(ListeAlerteBaseComponent.CME_TYPE_ALERTE).subscribe(
        response => {
            this.model.typesAlertes = response;
        }
    ));
  }



  /**
  * Validation d'une alerte en créant un evenement au click sur le bouton "Creer evenement"
  *@param $event js
  *@param $event alerte
  */
  public createEvenement(event, alerte: Alerte){
    event.preventDefault();
    event.stopPropagation();
    this.router.navigate(['/situation-courante/create-evenement-from-alerte', {'idAlerteSource': alerte.identifiant, 'creation': true}]);
  }

  /**
  * Validation d'une alerte sans evenement au click sur le bouton "VRAIE"
  *@param $event js
  *@param $event alerte
  */
  private validateAlertWithoutEvenement(event, alerte: Alerte){
    event.preventDefault();
    event.stopPropagation();
    this.subscriptions.push(this.alerteService.changeAlertState(alerte, AlerteCte.ETATS.valideeSansEvenement ).subscribe());
    // on traite de la réponse se fera à la notification du callback via webSocket
  }

  /**
  * Rejet d'une alerte sans evenement au click sur le bouton "FAUSSE"
  *@param $event js
  *@param $event alerte
  */
  private rejectAlert(event, alerte: Alerte){
    event.preventDefault();
    event.stopPropagation();
    this.subscriptions.push(this.alerteService.changeAlertState(alerte, AlerteCte.ETATS.fausse).subscribe());
    // on traite de la réponse se fera à la notification du callback via webSocket
  }

  /**
  * Validation d'une alerte avec evenement au click sur le bouton "LIER"
  *@param $event alerte
  */
  public validateAlertWithEvenement(alerte: any){
    if (!this.model.linkWithEvenement)return;
    this.subscriptions.push(this.alerteService.changeAlertState(alerte, AlerteCte.ETATS.valideeAvecEvenement, this.model.linkWithEvenement)
      .subscribe(
          response => {
              this.model.linkWithEvenement = undefined;
          }
      ));
      // on traite de la réponse se fera à la notification du callback via webSocket
  }

  //----------------------------------------------------------------------------
  //-- EVENEMENTS
  //----------------------------------------------------------------------------
  /**
  * @return le type de l'alerte
  * @param codeModele
  */
  getTypeAlerte(codeModele: string){
    return { nom: "type  alerte"};
    // let data = this.model.typesAlertes.filter(item => item.codeModele === codeModele);
    // return data && data.length > -1 ? data[0] : {};
  }

  /**
  * Gestion des notifications suite à un changement d'état d'une alerte.
  */
  private resolveWebSocketCallbackSubscription(){
    this.subscriptions.push(this.eventManager
      .subscribe(EventManagerCte.EVENT_NAME.resumeAlertetUpdatedFromWebSocket, (response) => {
            const nomMethode = 'resolveWebSocketCallbackSubscription';
            const alerte = response.content;
            console.debug(nomMethode + ' réception d\'une notification d\'alerte <' + alerte + '>' );
            if(alerte.codeEtat === AlerteCte.ETATS.aTraiter){
                this.addAlerteTobandeauAlerte(alerte);
            }else{
                this.alertes = this.removeAlerte(response.content, this.alertes);
            }

      }));
}

  /**
  * Rècupère et traite une alerte envoyée par le back
  */
  private resolveAlertesSubscription(){
    this.subscriptions.push(this.eventManager.subscribe(EventManagerCte.EVENT_NAME.newAlerte, (response) => {
      const alerte = response.content;
        this.addAlerteTobandeauAlerte(alerte);
      }));
  }



  /**
  * Transforme une date en string.
  */
  public toStringDate(date: string): string {
    const dateString =  `${date.slice(11,13)}:${date.slice(14,16)}:${date.slice(17,19)}`;
    //return !!date ? dateString : "";
    return !!date ? date : "";
  }

  //----------------------------------------------------------------------------
  //-- UTILITAIRES / VALIDATIONS.
  //----------------------------------------------------------------------------

  /**
  * Permet d'obtenir la liste ids des événements en cours.
  */
  private getEvenementEnCours(){
      const params = `types=EVT-EVT&etat=${EvenementCte.ETATS_EVENEMENT.enCours}`;
    this.subscriptions.push(this.baseService.getEvenementsEnCours(params).subscribe(
        response => {
            this.evenementsEnCours = response;
        }));
  }

  private removeAlerte(alerte: Alerte, alertes: Alerte[]){
    return alertes.filter(a => a.identifiant != alerte.identifiant)
  }


  /**
  * @param statut event
  * @return la classe css à appliquer selon le paramètre en entrée.
  */
  public getCssClasses(item: string){
    return EvenementUtils.getCssClasses(item);
  }

    /**
     * rejoute une alerte en tête
     * de tableau des alertes
     * @param alerte
     */
    private addAlerteTobandeauAlerte(alerte : Alerte){
        this.alertes.unshift(alerte);//ajout alerte au début du tableau
        var audio = new Audio();
        audio.src = "../assets/bgm/sonnerie.mp3";
        audio.load();
        audio.play();
    }
}
