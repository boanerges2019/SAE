import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { EquipementService} from 'app/core/strategies/services/equipement.service';
import { EquipementWebsocketService} from 'app/core/strategies/services/equipement-websocket.service';
import { EventManager } from 'app/shared/services/event/event-manager.service';
import { EventManagerCte } from 'app/shared/services/constantes/event-manager.constantes';
import { ViabilitesHivernalesServiceCte } from '../../constantes/viabilites-hivernales.constante';
import * as _ from 'underscore';
@Component({
    selector: 'meteo-vh',
    templateUrl: './meteo-vh.component.html',
    styleUrls: ['./meteo-vh.component.scss']
})
export class MeteoVhComponent implements OnInit {

    ongletActif: { [key: string]: any }; // onglet actif
    subscriptions:Subscription[] = [];
    stations:any[]=[];
    stationsBack:any[]=[];
    variablesChanges:any[]=[];
    model:any={};
    constructor(private equipementService:EquipementService, private eventManager:EventManager,
                private equipementWebsocketService : EquipementWebsocketService) {
    }

    ngOnInit() {
        this.ongletActif = {
            meteo:true,
            intervenantAstreinte: false,
            vehiculeSftrf: false,
        };
        this.model.configCte =  ViabilitesHivernalesServiceCte;
        this.model.fields =  ViabilitesHivernalesServiceCte.FIELDS;
        this.initStations();
        this.subscriptionsVariablesChange();
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    private initStations(){
        this.subscriptions.push(this.equipementService.getStations()
            .subscribe(response => {
                this.stationsBack = response;
                this.stations = _.values(this.stationsBack);
            }, error => {
                console.log("Erreur lors de l'envoi des données");
            }
        ));
    }

    private subscriptionsVariablesChange(){
        this.subscriptions.push(this.eventManager
            .subscribe(EventManagerCte.EVENT_NAME.variablesStationsUpdatedFromWebSocket, (response) => {
                this.variablesChanges = response.content;
                this.updateVariablesChange();
                this.stations = _.values(this.stationsBack);
            }));
    }

    private updateVariablesChange(){
        if(this.variablesChanges && this.variablesChanges.length > 0){
            let keyStation = this.variablesChanges[0].codeInfo.slice(0, 13);
            this.variablesChanges.forEach(variable => {
                        this.stationsBack[keyStation].variables[variable.codeModele] = variable;
             });
        }
    }

    /**
     * Détermine l'onglet actif.
     */
    private resetOngletAction(){
        for(const field in this.ongletActif){
            this.ongletActif[field] = false;
        }
    }

    /**
     * Débranche sur l'onglet cliqué.
     */
    public gotoOnglet(link): void {
        switch(link){
            case 'meteo':
                this.resetOngletAction();
                this.ongletActif.meteo = true;
                break;
            case 'intervenantAstreinte':
                this.resetOngletAction();
                this.ongletActif.intervenantAstreinte = true;
                break;
            case 'vehiculeSftrf':
                this.resetOngletAction();
                this.ongletActif.vehiculeSftrf= true;
                break;

            default: return;
        }
    }
}
