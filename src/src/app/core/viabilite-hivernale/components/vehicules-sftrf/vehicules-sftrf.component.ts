import { Component, OnInit } from '@angular/core';
import { EquipementService} from 'app/core/strategies/services/equipement.service';
import { EquipementWebsocketService} from 'app/core/strategies/services/equipement-websocket.service';
import { ViabilitesHivernalesServiceCte } from '../../constantes/viabilites-hivernales.constante';
import { EventManager } from 'app/shared/services/event/event-manager.service';
import { EventManagerCte } from 'app/shared/services/constantes/event-manager.constantes';
import * as _ from 'underscore';

@Component({
  selector: 'vehicules-sftrf',
  templateUrl: './vehicules-sftrf.component.html',
  styleUrls: ['./vehicules-sftrf.component.scss']
})
export class VehiculesSftrfComponent implements OnInit {

    vehicles:any[]=[];
    vehiclesBack:any[]=[];
    model:any={};
    variablesChanges:any[]=[];
  constructor(private equipementService:EquipementService, private equipementWebsocketService:EquipementWebsocketService,
                private eventManager:EventManager) {
        this.subscriptionsVariablesChange();
  }

  ngOnInit() {
      this.model.configCte =  ViabilitesHivernalesServiceCte;
      this.getVehicles();
  }

    public getVehicles(){
        this.equipementService.getVariablesForVehicles().subscribe(
                response => {
                this.vehiclesBack = response;
                this.intVehs(_.values(response));
            }
        );
    }
    private intVehs(vehs:any[]){
        vehs.forEach(veh =>{
            if(veh.attributs[ViabilitesHivernalesServiceCte.FIELDS.VEHICLE_TYPE].codeValeur===ViabilitesHivernalesServiceCte.FIELDS.VEHICLE_TYPE_PL_SFTRF ||
                veh.attributs[ViabilitesHivernalesServiceCte.FIELDS.VEHICLE_TYPE].codeValeur===ViabilitesHivernalesServiceCte.FIELDS.VEHICLE_TYPE_PL_AFFRETE){
                veh.localisation = veh.variables[ViabilitesHivernalesServiceCte.FIELDS.VEHICLE_AXE].valeur+"/"+veh.variables[ViabilitesHivernalesServiceCte.FIELDS.VEHICLE_SENS].valeur+"/"+
                    veh.variables[ViabilitesHivernalesServiceCte.FIELDS.VEHICLE_PR].valeur+"+"+ veh.variables[ViabilitesHivernalesServiceCte.FIELDS.VEHICLE_PR_DIST].valeur+", "+
                    (veh.variables[ViabilitesHivernalesServiceCte.FIELDS.VEHICLE_POINT_PARTICULIER].valeur !==""?
                        veh.variables[ViabilitesHivernalesServiceCte.FIELDS.VEHICLE_POINT_PARTICULIER].valeur :
                        (veh.variables[ViabilitesHivernalesServiceCte.FIELDS.VEHICLE_HORS_TRACE].valeur==="0" ? "Hors trace:NON":"Hors trace:OUI"));
                this.vehicles.push(veh);
            }
        });
    }

    private subscriptionsVariablesChange(){
        this.eventManager
            .subscribe(EventManagerCte.EVENT_NAME.variablesVehiculeSFTRFUpdatedFromWebSocket, (response) => {
                this.variablesChanges = response.content;
                this.updateVariablesChange();
                this.intVehs(_.values(this.vehiclesBack));
            });
    }

    private updateVariablesChange(){
        if(this.variablesChanges && this.variablesChanges.length > 0){
            this.vehiclesBack[this.variablesChanges[0].codeInfoObjetProprietaire].variables[this.variablesChanges[0].codeModele] = this.variablesChanges[0];
        }
    }
}
