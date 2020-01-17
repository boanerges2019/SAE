import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { Subscription } from 'rxjs/Rx';
import * as _ from 'underscore';
import { LABELS } from './labels'
import { StrategieBaseComponent } from '../strategie-base/strategie-base.component';
import { StrategiesService } from 'app/core/strategies/services/strategies.service';
import { StrategieModelService } from 'app/core/strategies/services/strategie-modele.service';
import { EventManager } from 'app/shared/services/event/event-manager.service';
import { EventManagerCte } from 'app/shared/services/constantes/event-manager.constantes';
import { Strategie } from 'app/shared/models/generic/Strategie';
import { MessagesEquipementStrategie } from 'app/shared/models/generic/MessagesEquipementStrategie';
import { MessageStrategie } from 'app/shared/models/generic/MessageStrategie';
import { ModeleStrategie } from 'app/shared/models/generic/ModeleStrategie';
import { CacheConstantes } from 'app/shared/services/cache/cache.constantes';
import { ModelUtils } from 'app/shared/utils/model-utils';
import { StrategiesUtils } from 'app/core/strategies/utils/strategies-utils';

@Component({
    selector: 'strategie-edit',
    templateUrl: './strategie-edit.component.html',
    styleUrls: ['./strategie-edit.component.scss']
})
export class StrategieEditComponent extends StrategieBaseComponent implements OnInit {


    @Input() currentCtx: string; // mode d'accès à la ressource (lecture, edition)
    @Input() strategie:Strategie;

    model:{ [key: string]: any } = {};
    subscriptions:Subscription[] = [];

    constructor(
                private strategiesService:StrategiesService,
                private strategieModelService:StrategieModelService,
                private eventManager:EventManager,
                private sanitizer:DomSanitizer) {
        super();
        this.resolveEditMessageSubscription();
    }

    ngOnInit() {
        super.ngOnInit();
        this.model.ctx = {};
        this.model.ctx.create = true;
        this.model.currentCtx = this.currentCtx;
        this.model.strategie = {};
        this.model.manualStrategie = true;
        this.model.allFamillesMessages = [];

        this.loadReferenceDatas();
    }


    //----------------------------------------------------------------------------
    //-- ACTIONS
    //----------------------------------------------------------------------------

    /**
     * Permet de mettre à jour un message dans la stratégie.
     */
    public updateMessage() {
        this.fillSpaces();
        this.model.strategie.configMessage.codeEquipement = this.model.equipementObject.codeInfo; // le code de l'équipement n'est pas transmis.
        let message = _.create({}, this.model.strategie.configMessage);
        delete message.id;
        delete message.text;
        if (!this.strategie.messages[this.model.equipementObject.codeInfo]) {
            this.strategie.messages[this.model.equipementObject.codeInfo] = message;
        }

        this.subscriptions.push(this.strategiesService.addOrUpdateMessage(
            this.strategie.identifiant, this.model.equipementObject.codeInfo, message)
            .subscribe(response => {
                this.eventManager.broadcast({
                    name: EventManagerCte.EVENT_NAME.updateMessage,
                    content: { currentCtx: this.currentCtx, identifiant: this.strategie.identifiant, message: message }
                });
                this.resetActionForm();
            }
        ));
    }


    //------------------------------------------------------------------------
    //-- EVENEMENTS
    //------------------------------------------------------------------------

    /**
     * Gestion des notifications de sélection d'un item.
     */
    private resolveEditMessageSubscription() {
        this.subscriptions.push(this.eventManager.subscribe(EventManagerCte.EVENT_NAME.editMessage, (response) => {
            this.model.strategie.configMessage = response.content.message; console.log('message', response.content.message.valeurs);
            this.model.strategie.formatMessage = this.model.formatsMessages.filter(formatMessage => {
                return formatMessage.codeInfo === this.model.strategie.configMessage.codeFormatMessage;
            })[0];

            this.model.equipementObject = this.model.equipements.filter(item =>
                item.codeInfo === this.model.strategie.configMessage.codeEquipement)[0]; // Objet equipement.

            this.resolveAllowPicto(this.model.strategie.formatMessage,
                this.model.strategie.configMessage,
                `${this.model.equipementObject.codeModele}${this.model.field.pictogramme}`);

            this.model.strategie.allowConfigMessage = true;

        }));
    }

    /**
     * Listener appelé au change de séléction d'un équipement.
     */
    public equipementChange(selectedItem) {

        this.model.strategie.formatMessage = this.model.strategie.configMessage = this.model.equipementObject = undefined; //reinitialisation.
        this.model.equipement = selectedItem ? selectedItem.id : this.model.equipement
        if (!this.model.equipement) {
            return;
        }
        this.model.equipementObject = this.model.equipements.filter(item => item.codeInfo === selectedItem.id)[0];

        let data:any = {};

        this.model.strategie.formatMessage = this.model.formatsMessages.filter(formatMessage => {
            return formatMessage.codeModeleEquipement === this.model.equipementObject.codeModele;
        })[0];
        this.model.famillesMessages = [];
        this.model.allFamillesMessages.forEach(familleMessage => {
            let messages = _.values(familleMessage.messages);
            messages.forEach(message => {
                if (message.codeFormatMessage === this.model.strategie.formatMessage.codeInfo) {
                    message.id = message.codeInfo;
                    message.text = message.nom;
                    this.model.famillesMessages.push(message);
                }
            });
        });
    }

    /**
     * Listener appelé au change de séléction d'une famille message.
     * @param $event
     * @param value value de la famille message
     */
    public familleMessageChange(selectedMessage:any) {
        if (!selectedMessage) return;

        this.model.strategie.configMessage = this.model.famillesMessages.filter(familleMessage => {
            return familleMessage.codeInfo === selectedMessage.id;
        })[0];
        if (!this.model.strategie.configMessage) return false;

        this.resolveAllowPicto(this.model.strategie.formatMessage,
            this.model.strategie.configMessage,
            `${this.model.equipementObject.codeModele}${this.model.field.pictogramme}`);

        this.model.strategie.allowConfigMessage = true;
    }


    /**
     * Reset les données du formulaire action afin que le user puisse en ajouter d'autres
     */
    private resetActionForm() {
        this.model.equipement = undefined;
        this.model.familleMessage = undefined;
        this.model.strategie.allowConfigMessage = false;
        this.model.strategie = {};
    }


    /**
     * Chargement des données de référence.
     */
    public loadReferenceDatas() {
        // Chargement des modeles desfamilles messages
        this.subscriptions.push(this.strategieModelService.getFamillesMessages().subscribe(response => {
            this.model.allFamillesMessages = response;
        }));

        // Chargement des familles messages
        this.subscriptions.push(this.strategieModelService.getFormatsMessages().subscribe(response => {
            this.model.formatsMessages = response;
        }));

        // Chargement des equipements
        this.subscriptions.push(this.strategieModelService.getEquipements().subscribe(response => {
            this.model.equipements = ModelUtils.buildNgSelectModel('codeInfo', 'description', response);
        }));
    }

    private resolveAllowPicto(formatMessage, configMessage, field){
        if (!formatMessage || !formatMessage.codeInfo) return;
        let lastChar = formatMessage.codeInfo.slice(formatMessage.codeInfo.length - 1, formatMessage.codeInfo.length);
        let allowPictogramme = lastChar ? lastChar.toUpperCase() === 'P': false;
        if (!allowPictogramme && field){
            delete configMessage.valeurs[field];
        }

    }

    private fillSpaces(){
        StrategiesUtils.fillSpaces(this.model.strategie.configMessage, this.model.strategie.formatMessage, `${this.model.equipementObject.codeModele}${this.model.field.ligne1}`);
        StrategiesUtils.fillSpaces(this.model.strategie.configMessage, this.model.strategie.formatMessage, `${this.model.equipementObject.codeModele}${this.model.field.ligne2}`);
        StrategiesUtils.fillSpaces(this.model.strategie.configMessage, this.model.strategie.formatMessage, `${this.model.equipementObject.codeModele}${this.model.field.ligne3}`);
        StrategiesUtils.fillSpaces(this.model.strategie.configMessage, this.model.strategie.formatMessage, `${this.model.equipementObject.codeModele}${this.model.field.ligne4}`);

        StrategiesUtils.fillSpaces(this.model.strategie.configMessage, this.model.strategie.formatMessage, `${this.model.equipementObject.codeModele}${this.model.field.ligne1Alternee}`);
        StrategiesUtils.fillSpaces(this.model.strategie.configMessage, this.model.strategie.formatMessage, `${this.model.equipementObject.codeModele}${this.model.field.ligne2Alternee}`);
        StrategiesUtils.fillSpaces(this.model.strategie.configMessage, this.model.strategie.formatMessage, `${this.model.equipementObject.codeModele}${this.model.field.ligne3Alternee}`);
        StrategiesUtils.fillSpaces(this.model.strategie.configMessage, this.model.strategie.formatMessage, `${this.model.equipementObject.codeModele}${this.model.field.ligne4Alternee}`);

    }
}
