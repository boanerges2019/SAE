import { Component, OnInit, OnDestroy, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import * as _ from 'underscore';
import { CustomValidators } from '../../../../../app/shared/utils/form-validation';
import { Subscription } from 'rxjs/Rx';
import { FieldEvenementCte } from '../../../../../app/core/evenement/constantes/field-evenement.constantes';
import { EVENEMENT_LABELS } from './labels';
import { Evenement } from '../../../../../app/shared/models/generic/Evenement';
import { BaseService } from '../../../../../app/core/evenement/services/base.service';
import { AlertMessage } from '../../../../../app/shared/models/generic/alert-message';
import { ModeleEvenementService } from '../../../../../app/core/evenement/services/modele-evenement.service';
import { EvenementCte } from '../../../../../app/core/evenement/constantes/evenement.constantes';
import { CtxCte } from '../../../../../app/shared/services/constantes/ctx.constantes';
import { EventManager } from '../../../../../app/shared/services/event/event-manager.service';
import { EventManagerCte } from '../../../../../app/shared/services/constantes/event-manager.constantes';
import { Alerte } from '../../../../../app/shared/models/generic/Alerte';
import { AlerteCte } from '../../../../../app/core/alerte/constantes/alerte.constantes';
import { PrOriente } from '../../../../shared/models/generic/models';
import { CacheService } from '../../../../../app/shared/services/cache/cache.service';
import { CacheConstantes } from '../../../../../app/shared/services/cache/cache.constantes';

@Component({
  selector: 'evenement-nouveau',
  providers: [BaseService],
  templateUrl: './evenement-nouveau.component.html',
  styleUrls: ['./evenement-nouveau.component.scss']
})
export class EvenementNouveauComponent implements OnInit, OnDestroy {

    @Input() evenement?: Evenement;
    @Input() idAlerteSource?: number;
    @Input() currentCtx: string; // mode d'accès à la ressource (lecture, edition)
    @Input() currentOnglet: string; // onglet Courant
    @Input() evenementType: string; // type de l'evenement ou balisage.
    @Input() position: PrOriente; //position de l'évt à créer si fournie

    subscriptions: Subscription[] = [];
    field: { [key: string]: any };
    evenementFormGroup: FormGroup;
    alertMessages: AlertMessage[];
    formErrors: { [key: string]: any } = {};
    validationMessages: { [key: string]: any };
    categories: string[];
    evenementsByCategories: any;
    types: { [key: string]: any }[] = [];
    etats: string[];
    labels: { [key: string]: any };
    model: { [key: string]: any } = {};
    isCollapsedContent: boolean = true;
    contexte: { [key: string]: any };
    type:string = ""; // prend la valeur ['BAL, ''] si BAL, elle est alimentée par le routing.

  //----------------------------------------------------------------------------
  //-- INITIALISATION
  //----------------------------------------------------------------------------
  constructor(
    public fb: FormBuilder,
    public baseService: BaseService,
    public eventManager: EventManager,
    public router: Router,
    public route: ActivatedRoute,
    private cacheService: CacheService
  ) { }

  ngOnInit() {
    const nomMethode = 'EvenementNouveauComponent.ngOnInit';
    console.debug(nomMethode);

    this.field = FieldEvenementCte.FIELD;
    this.model.labels = EVENEMENT_LABELS;
    this.model.contexte = CtxCte.CTX;
    this.categories = _.values(ModeleEvenementService.categories);
    this.types = ModeleEvenementService.types;
    let etat = !!this.evenement ? this.evenement[FieldEvenementCte.FIELD.etat] : undefined;

    this.model.etatsPossibles = EvenementCte.getEtatsPossibles(this.currentCtx, this.currentOnglet, etat);
    this.etats = this.model.etatsPossibles.etats || _.values(EvenementCte.ETATS_EVENEMENT);

    this.types = this.types.filter(item => item.codeInfo !== EvenementCte.EVT_BAL); // on exlcut les balisages.
    this.model.categorie = EvenementCte.ALL_CATEGORIES;
    this.initAttributs();
    this.createForm();

    this.route.params.subscribe(params => {
        this.type = !_.isEmpty(params) && EvenementCte.EVT_BAL === params["type"] ? params["type"] : this.type; // on autorise que le type 'BAL' comme type spécifique.
        if (this.type ===  EvenementCte.EVT_BAL){
            this.types = this.types.filter(item => item.codeInfo === EvenementCte.EVT_BAL); // on exlcut les balisages.
            this.etats = this.etats.filter(item => item !== EvenementCte.ETATS_EVENEMENT.signale); // on exlcut les balisages.

            this.evenementFormGroup.controls.categorie.setValue("");
            this.evenementFormGroup.controls.type.setValue(EvenementCte.EVT_BAL);
            //this.evenementFormGroup.controls.prDebut.setValidators([Validators.required]);

            this.evenementFormGroup.controls.categorie.updateValueAndValidity();
            this.evenementFormGroup.controls.type.updateValueAndValidity();

            this.evenementFormGroup.controls.type.disable();
            this.evenementFormGroup.controls.categorie.disable();
        }
    });

    this.initValidationMessages();
    this.initFormErrorsNames();

  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }


    //----------------------------------------------------------------------------
    //-- ACTIONS
    //----------------------------------------------------------------------------

     /**
     * Crée l'évenement.
     */
     public createManually(){
       this.model.isLoading = true;
       if (!this.evenementFormGroup.valid) return;

       this.subscriptions.push(this.baseService.getPrototypeEvenement(
           this.evenementFormGroup.controls.type.value,
           this.idAlerteSource, // cas de la création d'un evt à partir d'une alerte.
           (this.position !== undefined ) ? this.position.codeAxe : undefined,
           (this.position !== undefined ) ? this.position.sens : undefined,
           (this.position !== undefined ) ? this.position.numero : undefined,
           (this.position !== undefined ) ? this.position.abscisse : undefined
       ).subscribe(
           response => {
               response.codeEtat = this.evenementFormGroup.controls.etat.value || EvenementCte.ETATS_EVENEMENT.enCours;
               this.eventManager.broadcast({
                   name: EventManagerCte.EVENT_NAME.evenementSucessfullyInitialized,
                   content: { contexte: this.currentCtx, evenement: response }
               });
               this.position = undefined;
           },
           error => { },
           () => {
               this.model.isLoading = false;
           }
       ));

     }

    /**
    * Met à jour l'évenement.
    */
    public validate(){
      switch (this.currentCtx){
        case CtxCte.CTX.UPDDATE_TYPE_EVENEMENT:
          this.processUpdate("evenement", this.currentCtx, this.baseService.updateTypeEvenement(this.evenement, this.evenementFormGroup.controls.type.value));
          break;
          case CtxCte.CTX.UPDATE_ETAT_EVENEMENT:
            this.processUpdate("evenement", this.currentCtx, this.baseService.updateEtatEvenement(this.evenement, this.evenementFormGroup.controls.etat.value));
          break;
        default: break;
      }
    }


    private processUpdate(type, contexte, subject){
      this.model.isLoading = true;
      subject.subscribe(
          response => {
              this.eventManager.broadcast({
                  name: EventManagerCte.EVENT_NAME.evenementSucessfullyUpdated,
                  content: { contexte: this.currentCtx, evenement: response }
              });
          },
          error => {this.model.isLoading = false;},
          () => {this.model.isLoading = false;}
      );
    }

    /**
    * Annulation opération (création ou update).
    */
    public cancel(){
        this.cacheService.setObject(CacheConstantes.PREVENT_NON_SAVE_DATA_CTX, false);
      this.eventManager.broadcast({name: EventManagerCte.EVENT_NAME.cancelCreateOrCancelUpdateForEvtOrBal, content: { }})
    }



  /**
  * initialise les données du formulaire.
  */
  createForm() {
    switch (this.currentCtx){
      case CtxCte.CTX.CREATE_EVENEMENT_MANUALLY:
        this.evenementFormGroup = this.fb.group({
          categorie: new FormControl(this.model.categorie, Validators.required),
          type: new FormControl(this.model.type, Validators.required),
          etat: new FormControl(this.model.etatsPossibles.default, Validators.required)
        });
        break;
      case CtxCte.CTX.UPDDATE_TYPE_EVENEMENT:
        this.evenementFormGroup = this.fb.group({
          categorie: new FormControl(this.model.categorie, Validators.required),
          type: new FormControl(this.model.type, Validators.required),
          etat: new FormControl(this.model.etat)
        });
        break;
      case CtxCte.CTX.UPDATE_ETAT_EVENEMENT:
        this.evenementFormGroup = this.fb.group({
          categorie: new FormControl(this.model.categorie),
          type: new FormControl(this.model.type),
          etat: new FormControl(this.model.etat, Validators.required)
        });
        break;
      case CtxCte.CTX.CREATE_EVENEMENT_FROM_ALERTE:
          this.evenementFormGroup = this.fb.group({
            categorie: new FormControl(this.model.categorie, Validators.required),
            type: new FormControl(this.model.type, Validators.required),
			// L'état est initialisé à « en cours »
            etat: new FormControl(EvenementCte.ETATS_EVENEMENT.enCours)
          });
          break;
      default: break;

    }
    this.evenementFormGroup.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }





    //----------------------------------------------------------------------------
    //-- EVENEMENTS
    //----------------------------------------------------------------------------

    /**
    * Ecoute et traite les champs qui ont subi des changements.
    * @param data les données qui ont subi des changements.
    */
    onValueChanged(data?: any) {
      if (!data) return;
      if (!!data.categorie && this.model.categorie !== this.evenementFormGroup.controls.categorie.value){
        this.model.categorie = this.evenementFormGroup.controls.categorie.value;
        this.types = _.values(ModeleEvenementService.categories[data.categorie].resumesModelesEvenements);
        //this.resetForm();
      }

      this.formErrors = CustomValidators.validate(this.evenementFormGroup, this.formErrors, this.validationMessages);
      let alertMessages: AlertMessage[] = CustomValidators.buildValidationAlertMessages(this.formErrors);
      this.alertMessages = alertMessages;
    }

    //----------------------------------------------------------------------------
    //-- UTILITAIRES / VALIDATIONS.
    //----------------------------------------------------------------------------
    resetForm(){
      let data = {};
      for(const field in this.evenementFormGroup.controls){
        data[field] = this.evenementFormGroup.controls[field].value
        if (field === 'type')  data[field] = '';
      }
      this.evenementFormGroup.reset(data)
    }

    /**
    * Initialise forms errors name
    */
    initFormErrorsNames(){
      // initialisation des erreurs formName.
      Object.keys(this.validationMessages).map((k, index) => {
        this.formErrors[k] = '';
      });
    }

    /**
    * Initialise les message de validations.
    */
    initValidationMessages(){
      this.validationMessages = {
          categorie: {
            required: "Le champ catégorie est requis.",
          },
          type: {
            required: "Le champ type est requis.",
          },
          etat: {
            required: "Le champ état est requis.",
          }
      }
    }

      /**
      * retourne les événements qui matchent avec l'état passé en paramètre.
      * @param etats voulus.
      */
      private filterStates(selectedStates: string[], etats){
        return etats.filter( etat => selectedStates.indexOf(etat) > -1);
      }


      /**
      * initialise les attributs.
      */
      initAttributs(){
        let evenement = CtxCte.CTX.CREATE_EVENEMENT_MANUALLY === this.currentCtx ? { attributs: {} } : this.evenement || { attributs: {} };
        this.model.categorie = evenement.attributs[FieldEvenementCte.FIELD.categorie] && evenement.attributs[FieldEvenementCte.FIELD.categorie].valeur ? evenement.attributs[FieldEvenementCte.FIELD.categorie].valeur : this.model.categorie;
        this.model.type = evenement[FieldEvenementCte.FIELD.type] ? evenement[FieldEvenementCte.FIELD.type] : '';
        this.model.etat = evenement[FieldEvenementCte.FIELD.etat] ? this.model.etatsPossibles.default : evenement[FieldEvenementCte.FIELD.etat];
      }

}
