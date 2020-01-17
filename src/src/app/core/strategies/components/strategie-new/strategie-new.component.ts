import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { FormBuilder, FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms';
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
import { BaseService } from 'app/core/evenement/services/base.service';
import { ModelUtils } from 'app/shared/utils/model-utils';
import { CacheService } from 'app/shared/services/cache/cache.service';


@Component({
    selector: 'strategie-new',
    templateUrl: './strategie-new.component.html',
    styleUrls: ['./strategie-new.component.scss']
})
export class StrategieNewComponent extends StrategieBaseComponent implements OnInit {

    @Input() sourceCtx:string; // contexte d'où l'on vient.
    @Input() currentCtx:string; // mode d'accès à la ressource (lecture, edition)
    @Input() idEvenement?:number; //identifiant de l'événement.
    @Input() strategieType?:string; // type de strategie ['manuelle','evenement', 'tps']

    formGroup:FormGroup;
    model:{ [key: string]: any } = {};
    subscriptions:Subscription[] = [];

     public items:Array<any> = [];

    constructor(private fb:FormBuilder,
                private strategiesService:StrategiesService,
                private strategieModelService:StrategieModelService,
                private baseService:BaseService,
                private eventManager:EventManager,
                private sanitizer:DomSanitizer, private cacheService : CacheService) {
        super();

    }

    ngOnInit() {
        super.ngOnInit();
        this.model.ctx = {};
        this.model.ctx.create = true;
        this.model.strategie = {};
        this.model.sourceCtx = this.sourceCtx;
        this.model.currentCtx = this.currentCtx;

        this.model.hideExtraVar = true;
        this.model.strategieModels = {};
        this.model.strategieModels.current = [];

        this.model.radios = {
            radioManuel: {value: "manuelle"},
            radioEvenement: {value: "evenement"}, // evenement
            radioTempsParcours: {value: "tdp"} // temps de parcours
        };
        this.resolveDefaultStrategieType();
        this.loadReferenceDatas();
        this.createForm();
    }

    /**
     * Déternine la strategie par defaut.
     */
    private resolveDefaultStrategieType(){
        if (!this.strategieType) {
            this.model.defaultStrategieType = this.model.radios.radioManuel.value;
        }
        switch(this.strategieType){
            case 'manuelle': this.model.defaultStrategieType = this.model.radios.radioManuel.value;break;
            case 'evenement': this.model.defaultStrategieType = this.model.radios.radioEvenement.value;break;
            case 'tdp': this.model.defaultStrategieType = this.model.radios.tdp.value;break;
            default: this.model.defaultStrategieType = this.model.radios.radioManuel.value;
        }

    }

    /**
     * initialise les données du formulaire.
     */
    createForm() {
        this.formGroup = this.fb.group({
            typeStrategie: new FormControl(this.model.defaultStrategieType),
            strategieModel: new FormControl('', Validators.required)
        });
    }

    //----------------------------------------------------------------------------
    //-- ACTIONS
    //----------------------------------------------------------------------------
    /**
     * Initialise une stratégie à partir d'un modele.
     */
    public typeStrategieChange(event, value) {
        this.formGroup.controls.typeStrategie.setValue(value);
        this.formGroup.controls.typeStrategie.updateValueAndValidity();
        this.formGroup.controls.strategieModel.setValue("");
        this.formGroup.controls.strategieModel.updateValueAndValidity();
        this.model.strategieModels.current = this.model.strategieModels[this.formGroup.controls.typeStrategie.value];
    }

    /**
     * Initialise une stratégie à partir d'un modele.
     */
    public instantiateStrategie() {
        /*this.cacheService.setObject(CacheConstantes.PREVENT_NON_SAVE_DATA_CTX, false);*/
        if (!this.formGroup.controls.strategieModel.value && this.formGroup.controls.strategieModel.value.length < 1) return;

        let data:any = {};
        data.strategieModel = this.model.strategieModels.current
            .filter(item => item.codeInfo === this.formGroup.controls.strategieModel.value[0].id)[0];

        this.subscriptions.push(this.strategiesService.instantiateStrategie(data.strategieModel.identifiant, this.idEvenement)
                .subscribe(response => {
                    switch(this.sourceCtx){
                        case this.model.contexte.LIST_STRATEGIE:
                            this.eventManager.broadcast({
                                name: EventManagerCte.EVENT_NAME.updateStrategie,
                                content: {currentCtx: this.model.contexte.UPDATE_STRATEGIE, strategie: response}
                            });
                            break;
                        case this.model.contexte.PAC_LIST_STRATEGIE:
                            this.eventManager.broadcast({
                                name: EventManagerCte.EVENT_NAME.createStrategieFromPacSuccess,
                                content: {currentCtx: this.model.contexte.PAC_LIST_STRATEGIE, strategie: response}
                            });
                            break;

                    }
                })
        );
    }

    //------------------------------------------------------------------------
    //-- EVENEMENTS
    //------------------------------------------------------------------------

    /**
     * Chargement des données de référence.
     */
    public loadReferenceDatas() {
        // Chargement des modeles de strategies manuelles
        this.subscriptions.push(this.strategieModelService.getStrategieModels(CacheConstantes.STRATEGIE_MODELS_MANUAL).subscribe(response => {
            this.model.strategieModels[this.model.radios.radioManuel.value] = response;
            if (this.model.defaultStrategieType === "manuelle") this.model.strategieModels.current = ModelUtils.buildNgSelectModel('codeInfo', 'nom', response);
        }));

        // Chargement des modeles de strategies évenement
        this.subscriptions.push(this.strategieModelService.getStrategieModels(CacheConstantes.STRATEGIE_MODELS_EVT).subscribe(response => {
            this.model.strategieModels[this.model.radios.radioEvenement.value] = response;
            if (this.model.defaultStrategieType === "evenement") this.model.strategieModels.current = ModelUtils.buildNgSelectModel('codeInfo', 'nom', response);
        }));

        // Chargement des modeles de strategies temps de parcours
        this.subscriptions.push(this.strategieModelService.getStrategieModels(CacheConstantes.STRATEGIE_MODELS_TDP).subscribe(response => {
            this.model.strategieModels[this.model.radios.radioTempsParcours.value] = response;
            if (this.model.defaultStrategieType === "tdp") this.model.strategieModels.current = ModelUtils.buildNgSelectModel('codeInfo', 'nom', response);
        }));
    }


}
