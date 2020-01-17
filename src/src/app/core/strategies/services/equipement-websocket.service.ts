import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Rx';
import { EventManager } from 'app/shared/services/event/event-manager.service';
import { EventManagerCte } from 'app/shared/services/constantes/event-manager.constantes';
import { environment } from 'environments/environment';
import { ViabilitesHivernalesServiceCte } from 'app/core/viabilite-hivernale/constantes/viabilites-hivernales.constante';
import { AppConstantesCte } from 'app/app.constantes';


/*
* Service de gestion des messages web sockets pour le domaine des alertes.
*/
@Injectable()
export class EquipementWebsocketService implements OnDestroy{

  static OPEREATION_TYPE = {
    created: "CREATED",
    updated: "UPDATED",
    deleted: "DELETED"
  };

  subscriptions: Subscription[] = [];
  static BASE_URL = `${environment.webSocketBaseUrl}/agorav2`;  // URL to web api

  constructor(private eventManager: EventManager) {
        this.stationVariableChange();
        this.connexionSaeVariableChange();
        this.variableVehiculeSFTRFChange();
   }

   ngOnDestroy() {
     this.subscriptions.forEach(s => s.unsubscribe());
   }


    private stationVariableChange(){
        let equipements = ViabilitesHivernalesServiceCte.FIELDS.SME;
        let variables = ViabilitesHivernalesServiceCte.FIELDS.TEMPERATURE+","+ViabilitesHivernalesServiceCte.FIELDS.TEMPERATURE_CHAUSSE+","+
            ViabilitesHivernalesServiceCte.FIELDS.TEMPERATURE_POINT_CONGELATION+","+ViabilitesHivernalesServiceCte.FIELDS.TEMPERATURE_PT_ROSEE+","+
            ViabilitesHivernalesServiceCte.FIELDS.TEMPERATURE_SOUS_SOL+","+ViabilitesHivernalesServiceCte.FIELDS.HUMIDITE_RELATIF_AIR+","+
            ViabilitesHivernalesServiceCte.FIELDS.VITESSE_DU_VENT+","+ViabilitesHivernalesServiceCte.FIELDS.ALARME_PLUIE+","+ViabilitesHivernalesServiceCte.FIELDS.ALARME_VERGLAS
            +","+ViabilitesHivernalesServiceCte.FIELDS.ALARME_NEIGE+","+ViabilitesHivernalesServiceCte.FIELDS.ETAT_CHAUSSEE;

        this.subscriptions.push(Observable.webSocket(`${EquipementWebsocketService.BASE_URL}/eqt/variables/subscribe?types_equipements=${equipements}&types_variables=${variables}`)
            .subscribe(
            (msg) => this.resolveMessage(msg, EventManagerCte.EVENT_NAME.variablesStationsUpdatedFromWebSocket)
        ));
    }

    private connexionSaeVariableChange(){
        let equipements = AppConstantesCte.FIELDS.SAE+","+AppConstantesCte.FIELDS.SSCC;
        let variables = AppConstantesCte.FIELDS.SAE_DPR_ETAT_ACTIF+","+AppConstantesCte.FIELDS.SSCC_DPS_ACTIF;

        this.subscriptions.push(Observable.webSocket(`${EquipementWebsocketService.BASE_URL}/eqt/variables/subscribe?types_equipements=${equipements}&types_variables=${variables}`)
            .subscribe(
            (msg) => this.resolveMessage(msg, EventManagerCte.EVENT_NAME.variablesConnexionSaeUpdatedFromWebSocket)
        ));
    }

    private variableVehiculeSFTRFChange(){
        let equipements = ViabilitesHivernalesServiceCte.FIELDS.GEO
        let variables = ViabilitesHivernalesServiceCte.FIELDS.HORADATE_POSITION+","+ ViabilitesHivernalesServiceCte.FIELDS.VEHICLE_AXE
            +","+ ViabilitesHivernalesServiceCte.FIELDS.VEHICLE_SENS+","+ ViabilitesHivernalesServiceCte.FIELDS.VEHICLE_PR
            +","+ ViabilitesHivernalesServiceCte.FIELDS.VEHICLE_POINT_PARTICULIER+","+ ViabilitesHivernalesServiceCte.FIELDS.VEHICLE_PR_DIST
            +","+ ViabilitesHivernalesServiceCte.FIELDS.VEHICLE_HORS_TRACE;

        this.subscriptions.push(Observable.webSocket(`${EquipementWebsocketService.BASE_URL}/eqt/variables/subscribe?types_equipements=${equipements}&types_variables=${variables}`)
            .subscribe(
            (msg) => this.resolveMessage(msg, EventManagerCte.EVENT_NAME.variablesVehiculeSFTRFUpdatedFromWebSocket)
        ));
    }

   /**
   * @param message notidication récéption message suite à un changement d'état d'une strategie..
   */
   private resolveMessage(message: any, event){
     if (!message) return;
       this.eventManager.broadcast({
           name: event,
           content: message.variables
       });
   }

}
