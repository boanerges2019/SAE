import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import * as _ from 'underscore';
import { LABELS } from './labels'
import { PmvBaseComponent } from '../equipement-base/pmv-base.component';
import { EquipementService } from 'app/core/strategies/services/equipement.service';
import { CtxCte } from 'app/shared/services/constantes/ctx.constantes';
import { EventManager } from 'app/shared/services/event/event-manager.service';
import { EventManagerCte } from 'app/shared/services/constantes/event-manager.constantes';
import { MessagesEquipementStrategie } from 'app/shared/models/generic/MessagesEquipementStrategie';
import { Strategie } from 'app/shared/models/generic/Strategie';
import { StrategieCte } from 'app/core/strategies/constantes/strategie.constante';
import { StrategiesService } from 'app/core/strategies/services/strategies.service';
import { StrategieModelService } from 'app/core/strategies/services/strategie-modele.service';
import { StrategiesUtils } from 'app/core/strategies/utils/strategies-utils';

/**
 /**
 * Composant de gestion des messages Strategie.
 * @author SPIE
 */

@Component({
    selector: 'msg-strategie',
    templateUrl: './msg-strategie.component.html',
    styleUrls: ['./msg-strategie.component.scss']
})
export class MsgStrategieComponent extends PmvBaseComponent implements OnInit, OnChanges {

    @Input() currentCtx: string;
    @Input() strategie: Strategie;
    subscriptions: Subscription[] = [];
    editedMessage: any;
    messages: any[] = [];
    model: any = {};

    constructor(
        public eventManager: EventManager,
        public strategiesService: StrategiesService,
        public strategieModelService:StrategieModelService
    ) {
        super(strategieModelService);
        this.resolveUpdatingMessageSubscription();
    }

    ngOnInit() {
        super.ngOnInit();
        this.model.currentCtx = this.currentCtx;
        this.model.labels = LABELS;
        this.model.defaultPicto = StrategieCte.PMV_ETAT_PICTO_VIDE; // default picto.
        //this.model.pmvSize = StrategiesUtils.pmvSize(this.formatMessage.nbColonnes);

        this.model.sort = {}; // initialisation du tri.
        this.model.sort.order = true;

        this.model.activesCount = 0;
        this.model.total = 0;
    }

    ngOnChanges(changes: SimpleChanges) {
        this.currentCtx = changes.currentCtx && changes.currentCtx.currentValue ? changes.currentCtx.currentValue : this.currentCtx;
        this.strategie = changes.strategie && changes.strategie.currentValue ? changes.strategie.currentValue : this.strategie;
        this.model.currentCtx = this.currentCtx;
        this.messages = _.values(this.strategie.messages);
    }

    /**
     * Gestion de la notification suite à une msie à jour d'un message stratégie.
     * [resolveUpdatingMessageSubscription description]
     * @return {[type]} [description]
     */
    private resolveUpdatingMessageSubscription() {
        this.subscriptions.push(this.eventManager
            .subscribe(EventManagerCte.EVENT_NAME.updateMessage, (response) => {
                this.strategiesService.getStrategie(response.content.identifiant)
                    .subscribe((response) => {
                        if (response) {
                            this.strategie = response.json();
                            this.messages = _.values(this.strategie.messages);
                            this.editedMessage = undefined;
                        }
                    })
            }));
    }


    /**
     * Edit un message strategie.
     * @param $event js
     * @param message strategie
     */
    public editMessage($event, message) {
        $event.preventDefault();
        $event.stopPropagation();
        this.editedMessage = message;
        let copiedMessage = JSON.parse(JSON.stringify(message));
        this.eventManager.broadcast({
            name: EventManagerCte.EVENT_NAME.editMessage,
            content: { message: copiedMessage }
        });
    }

    /**
     * supprime un message strategie.
     * @param $event js
     * @param message strategie
     */
    public removeMessage($event, message) {
        $event.preventDefault();
        $event.stopPropagation();
        this.subscriptions.push(this.strategiesService.removeMessage(
            this.strategie.identifiant, message.codeEquipement)
            .subscribe(response => {

                this.messages = this.messages.filter((item: any) => {
                    let found = item.identifiant !== message.identifiant;
                    return found;
                });
            }));
    }

    /**
     * Retourne une classe css si un messge est edité.
     * @param message
     * @returns {string}
     */
    public getClasses(message) {
        return this.editedMessage && this.editedMessage.identifiant === message.identifiant ? 'bleu' : '';
    }

    /**
     * Retourne la classe css correspondante.
     * @param text
     */
    public getWhiteSpace(text: string){
        if (text) return "pre"
        else return "normal";
    }
    
}
