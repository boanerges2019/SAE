import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Rx';
import * as _ from 'underscore';
import * as moment from 'moment';
import { EventManager } from 'app/shared/services/event/event-manager.service';
import { EventManagerCte } from 'app/shared/services/constantes/event-manager.constantes';
import { FieldStrategieCte } from 'app/core/strategies/constantes/field-strategie.constante';
import { CtxCte } from 'app/shared/services/constantes/ctx.constantes';
import { StrategieModelService } from 'app/core/strategies/services/strategie-modele.service';

/**
* Componsant de base des Equipements
* @author SPIE.
*/
@Component({
    selector: 'pmv-base',
    template: ''
})
export class PmvBaseComponent implements OnInit, OnDestroy {

    model: { [key: string]: any } = {};
    subscriptions: Subscription[] = [];

    constructor(public strategieModelService: StrategieModelService) { }

    ngOnInit() {
        this.model.field = FieldStrategieCte.FIELD;
        this.model.configCte = FieldStrategieCte;
        this.model.contexte = CtxCte.CTX;

        this.model.sort = {}; // initialisation du tri.
        this.model.sort.order = false;

        this.model.ctx = {};

        this.loadReferenceDatas();

    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }


    //----------------------------------------------------------------------------
    //-- ACTIONS
    //----------------------------------------------------------------------------

    /**
     * Chargement des données de référence.
     */
    public loadReferenceDatas() {
        // Chargement des equipements
        this.subscriptions.push(this.strategieModelService.getEquipements().subscribe(response => {
            this.model.equipements = response;
        }));

        // Chargement des familles messages
        this.subscriptions.push(this.strategieModelService.getFormatsMessages().subscribe(response => {
            this.model.formatsMessages = response;
        }));
    }


    //----------------------------------------------------------------------------
    //-- LISTENERS
    //----------------------------------------------------------------------------



    //----------------------------------------------------------------------------
    //-- UTILS.
    //----------------------------------------------------------------------------

    /**
    * @return le field dynamiquement à partir du code Modele equipement
    * @param codeModeleEquipement
    * @param field
    */
    public getDynamicModel(message: any, field: string): string{
        if (!message || !this.model.equipements) return "";
        // Objet equipement.
        let equipementObject = this.model.equipements.filter(item => item.codeInfo === message.codeEquipement)[0];
        return `${equipementObject.codeModele}${field}`;
    }

    public getNbColonnes(message){
        if (!message || !message.codeFormatMessage ||  !this.model.formatsMessages) return undefined;
        let formatMessage = this.model.formatsMessages.filter(formatMessage => {
            return formatMessage.codeInfo === message.codeFormatMessage;
        })[0];
        return formatMessage.nbColonnes * 9;
    }

}
