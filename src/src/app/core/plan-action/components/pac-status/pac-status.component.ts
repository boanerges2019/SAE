import { Component, OnInit, Input } from '@angular/core';
import { PlanActionCte } from 'app/core/plan-action/constantes/plan-action.constantes';
import { LABELS } from './labels';
import { PlanActionService } from 'app/core/plan-action/services/plan-action.service';
import { EventManager } from 'app/shared/services/event/event-manager.service';
import { EventManagerCte } from 'app/shared/services/constantes/event-manager.constantes';


@Component({
    selector: 'pac-status',
    templateUrl: './pac-status.component.html',
    styleUrls: ['./pac-status.component.scss']
})
export class PacStatusComponent implements OnInit {

    @Input() idEvenement;
    @Input() idTheme;
    @Input() actionApplicable;
    @Input() isActionUnitaire;
    @Input() modeExecution;
    model:{ [key: string]: any } = {};


    constructor(private planActionService:PlanActionService,
                private eventManager:EventManager) {
    }

    ngOnInit() {
        this.model.labels = LABELS;
        this.model.planActionCte = PlanActionCte;
        this.model.modesExecutions = PlanActionCte.MODES_EXECUTION;

    }

    /**
     * Lance une action applicable.
     * @param $event js
     * @param actionApplicable
     */
    public execAction($event, actionApplicable) {
        let contenu = {
            idEvenement: this.idEvenement,
            actionApplicable: actionApplicable,
            idTheme: this.idTheme,
            isActionUnitaire: this.isActionUnitaire
        }

        this.eventManager.broadcast({
            name: EventManagerCte.EVENT_NAME.launchAction,
            content: contenu
        });
    }

    public getCssStatus(codeEtat) {
        switch (codeEtat) {
            case PlanActionCte.ETATS.SUCCES:
                return "success";
            case PlanActionCte.ETATS.EN_COURS:
                return "en-cours";
            case PlanActionCte.ETATS.ECHEC:
                return "echec";
            case PlanActionCte.ETATS.REFUSE:
                return "refuse";
            case PlanActionCte.ETATS.SUSPENDU:
                return "suspendue";
            default:
                return "en-attente";
        }
    }

}
