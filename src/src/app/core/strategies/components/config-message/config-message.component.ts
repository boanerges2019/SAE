import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { Subscription } from 'rxjs/Rx';
import { FieldStrategieCte } from 'app/core/strategies/constantes/field-strategie.constante';
import { CtxCte } from 'app/shared/services/constantes/ctx.constantes';
import { StrategieModelService } from 'app/core/strategies/services/strategie-modele.service';
import { EventManager } from 'app/shared/services/event/event-manager.service';
import { EventManagerCte } from 'app/shared/services/constantes/event-manager.constantes';
import { StrategieCte } from 'app/core/strategies/constantes/strategie.constante';
import { EnumerationsService } from 'app/shared/services/reference/enumerations.service';
import { StrategiesUtils } from 'app/core/strategies/utils/strategies-utils';

@Component({
    selector: 'config-message',
    templateUrl: './config-message.component.html',
    styleUrls: ['./config-message.component.scss']
})
export class ConfigMessageComponent implements OnInit, OnChanges {

    @Input() codeModeleEquipement:string;
    @Input() configMessage:any;
    @Input() formatMessage:any;
    @Input() currentCtx:string; // mode d'accès à la ressource (lecture, edition)

    model:{ [key: string]: any } = {};
    subscriptions:Subscription[] = [];

    constructor(private eventManager:EventManager,
                private strategieModelService:StrategieModelService,
                private enumerationsService: EnumerationsService
            ) { }

    ngOnInit() {
        this.model.field = FieldStrategieCte.FIELD;
        this.model.configCte = FieldStrategieCte;
        this.model.contexte = CtxCte.CTX;
        this.model.pmvSize = StrategiesUtils.pmvSize(this.formatMessage.nbColonnes);
        this.model.justification = ""
        this.model.pictogrammes = StrategieModelService.pictogrammes;
        this.model.radios = {
            // Mode
            radioExtinction: {value: StrategieCte.MODE_EXTINCTION},
            radioNeutre: {value: StrategieCte.MODE_NEUTRE},
            radioAffichage: {value: StrategieCte.MODE_AFFICHAGE},
            // Message
            radioSimple: {value: StrategieCte.MESSAGE_SIMPLE},
            radioClignotant: {value: StrategieCte.MESSAGE_CLIGNOTANT},
            radioAlternat: {value: StrategieCte.MESSAGE_ALTERNAT}
        };

        this.loadReferenceDatas();
        this.initAttribut();
    }

    ngOnChanges(changes:SimpleChanges) {
        this.configMessage = changes.configMessage && changes.configMessage.currentValue ? changes.configMessage.currentValue : this.configMessage;
        this.formatMessage = changes.formatMessage && changes.formatMessage.currentValue ? changes.formatMessage.currentValue : this.formatMessage;
    }

    /**
     *
     */
    private initAttribut() {
        this.configMessage.valeurs[this.getDynamicModel(this.model.field.mode)] = this.configMessage.valeurs[this.getDynamicModel(this.model.field.mode)] ||
            this.model.radios.radioAffichage.value; // default mode
        this.configMessage.valeurs[this.getDynamicModel(this.model.field.message)] = this.configMessage.valeurs[this.getDynamicModel(this.model.field.message)] ||
            this.model.radios.radioSimple.value; // default message
        if (this.configMessage.valeurs[this.getDynamicModel(this.model.field.pictogramme)]){
            this.configMessage.valeurs[this.getDynamicModel(this.model.field.pictogramme)] = this.configMessage.valeurs[this.getDynamicModel(this.model.field.pictogramme)] ||
                StrategieCte.PMV_ETAT_PICTO_VIDE; // default picto.
        }

        this.configMessage.valeurs[this.getDynamicModel(this.model.field.flash)] = this.configMessage.valeurs[this.getDynamicModel(this.model.field.flash)] ||
            StrategieCte.FLASH_ALLUMAGE; // default flash.

        this.resolveEditableInputs();
    }

    public getDynamicModel(field: string): string{
        return `${this.codeModeleEquipement}${field}`;
    }


    //------------------------------------------------------------------------
    //-- EVENEMENTS
    //------------------------------------------------------------------------

    /**
     * Gestion du bouton chagement du radio bouton mode
     * @param event js.
     * @param  value nouvelle valeur
     */
    public modeChange(event, value) {
        event.stopPropagation();
        this.configMessage.valeurs[this.getDynamicModel(this.model.field.mode)] = value;
        this.resolveEditableInputs();
    }

    /**
     * Gestion du bouton chagement du radio bouton message
     * @param event js.
     * @param  value nouvelle valeur
     */
    public messageChange(event, value) {
        event.stopPropagation();
        this.configMessage.valeurs[this.getDynamicModel(this.model.field.message)] = value;
    }


    /**
     * Chargement des données de référence.
     */
    private loadReferenceDatas() {
        this.subscriptions.push(this.enumerationsService.getValeursEnumerations(StrategieCte.CODE_MODELE_PICTO).subscribe(response => {
          this.model.pictogrammes = response;
        }));
        this.subscriptions.push(this.enumerationsService.getValeursEnumerations(StrategieCte.CODE_MODELE_LUMINOSITE).subscribe(response => {
          this.model.luminosites = response;
        }));
    }


    /**
    * gestion des champs blocs saisables en fonction de la valeurs du mode.
    */
    private resolveEditableInputs(){
        if ([StrategieCte.MODE_EXTINCTION, StrategieCte.MODE_NEUTRE].indexOf(this.configMessage.valeurs[this.getDynamicModel(this.model.field.mode)]) > -1){
            this.model.allowEdit = false;
        } else {
            this.model.allowEdit = true;
        }
    }

    /**
     * @param position de la justification.
     * @param line à ligne [normal, alternée
     */
    public setJustification(position:string, line:string) {
        if (line === 'normal'){
            if (this.formatMessage.nbLignes >= 1) StrategiesUtils.resolveSpaces(this.configMessage, this.formatMessage, position, this.getDynamicModel(this.model.field.ligne1));
            if (this.formatMessage.nbLignes >= 2) StrategiesUtils.resolveSpaces(this.configMessage, this.formatMessage, position, this.getDynamicModel(this.model.field.ligne2));
            if (this.formatMessage.nbLignes >= 3) StrategiesUtils.resolveSpaces(this.configMessage, this.formatMessage, position, this.getDynamicModel(this.model.field.ligne3));
            if (this.formatMessage.nbLignes >= 4) StrategiesUtils.resolveSpaces(this.configMessage, this.formatMessage, position, this.getDynamicModel(this.model.field.ligne4));
        } else {
            if (this.formatMessage.nbLignes >= 1) StrategiesUtils.resolveSpaces(this.configMessage, this.formatMessage, position, this.getDynamicModel(this.model.field.ligne1Alternee));
            if (this.formatMessage.nbLignes >= 2) StrategiesUtils.resolveSpaces(this.configMessage, this.formatMessage, position, this.getDynamicModel(this.model.field.ligne2Alternee));
            if (this.formatMessage.nbLignes >= 3) StrategiesUtils.resolveSpaces(this.configMessage, this.formatMessage, position, this.getDynamicModel(this.model.field.ligne3Alternee));
            if (this.formatMessage.nbLignes >= 4) StrategiesUtils.resolveSpaces(this.configMessage, this.formatMessage, position, this.getDynamicModel(this.model.field.ligne4Alternee));

        }
    }

    public resolveSpaces(value, dynamicFieldName: string){
        if (!value) {
            value = "";
        }
        let spaces = Math.abs(this.formatMessage.nbColonnes - value.length);
        this.configMessage.valeurs[dynamicFieldName] = value + " ".repeat(spaces);
    }


}
