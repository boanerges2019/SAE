import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import * as _ from 'underscore';
import { EvenementCte } from '../../../../../app/core/evenement/constantes/evenement.constantes';
import { EventManager } from '../../../../../app/shared/services/event/event-manager.service';
import { EventManagerCte } from '../../../../../app/shared/services/constantes/event-manager.constantes';
import { PrOriente } from '../../../../shared/models/generic/models';

@Component({
    selector: 'situation-courante-page',
    templateUrl: './situation-courante-page.component.html',
    styleUrls: ['./situation-courante-page.component.scss']
})
export class SituationCourantePageComponent implements OnInit, OnDestroy {

    idEvenementSelected:number;
    edition:boolean;
    creation:boolean;
    position: PrOriente;
    idAlerteSource:number;
    type: string; // type entité souhaitee [evenement ou balisage]
    subscriptions:Subscription[] = [];
    model: any = {};

    constructor(
        private route:ActivatedRoute,
        private eventManager:EventManager) {
        this.subscriptions.push(this.route.params.subscribe(params => {
            this.edition = params['edition'];   
            this.creation = params['creation'];

            // On récupère éventuellement la position de création
            if(params['position']){
                this.position = JSON.parse(params['position']);           
            }
            
            this.idEvenementSelected = +params['idEvenement']; // (+) converts string 'id' to a number
            this.type = !_.isEmpty(params) && EvenementCte.EVT_BAL === params["type"] ? params["type"] : this.type; // on autorise que le type 'BAL' comme type spécifique.
            this.idAlerteSource = !_.isEmpty(params) && params["idAlerteSource"] ? JSON.parse(params["idAlerteSource"]) : undefined;
        }));
    }

    ngOnInit() {
        this.sendToMenuPrincipaleToGoToSituationCourante();
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    /**
     * J'envois un event pour dire au composant menu principale
     * de se mettre sur situation courante
     *
     */
    private sendToMenuPrincipaleToGoToSituationCourante() {
        this.eventManager.broadcast({
            name: EventManagerCte.EVENT_NAME.selectSituationCouranteInMenuPrincipaleEvent,
            content: this.route.toString()
        });
    }
}
