import { Component, OnInit, OnDestroy, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import * as _ from 'underscore';
import { Subscription } from 'rxjs/Rx';
import { LABELS } from './labels';
import { EventManager } from '../../../../../app/shared/services/event/event-manager.service';
import { EventManagerCte } from '../../../../../app/shared/services/constantes/event-manager.constantes';
import { Evenement } from '../../../../../app/shared/models/generic/Evenement';
import { Pr } from '../../../../../app/shared/models/generic/Pr';
import { ModeleValeur } from '../../../../../app/shared/utils/modele-valeur-builder';
import { AlertMessage } from '../../../../../app/shared/models/generic/alert-message';
import { CustomValidators } from '../../../../../app/shared/utils/form-validation';
import { FieldEvenementCte } from '../../../../../app/core/evenement/constantes/field-evenement.constantes';
import { EvenementCte } from '../../../../../app/core/evenement/constantes/evenement.constantes';
import { ModeleEvenementService } from '../../../../../app/core/evenement/services/modele-evenement.service';
import { EvenementUtils } from '../../../../../app/shared/utils/evenement-utils';

@Component({
  selector: 'evenement-localisation',
  templateUrl: './evenement-localisation.component.html',
  styleUrls: ['./evenement-localisation.component.scss']
})
export class EvenementLocalisationComponent implements OnInit, OnDestroy {
  @Input() evenement: Evenement;
  @Input() currentCtx: string; // mode d'accès à la ressource (lecture, edition)
  @Output('alertMessages') validationMessageEventEmitter = new EventEmitter<AlertMessage[]>();
  subscriptions: Subscription[] = [];
  evenementFormGroup: FormGroup;
  formErrors: any = {};
  validationMessages: { [key: string]: any };
  isCollapsedContent: boolean = false;
  isLieu: boolean = false;
  isPrFin: boolean = false;
  typesLocalisant: string[];
  axes: string[];
  sens: any[];
  typesLieux: string[];
  lieux: string[];
  complementsLocalisation: string[];
  regExpNumeroAxe: any;
  regExpAbscisseAxe: any;
  defaultRegExpNoAxe = "\\d+"
  localisant: any;
  i18n: { [key: string]: any };
  field: { [key: string]: any };
  impliqueDeuxSens: boolean;
  //----------------------------------------------------------------------------
  //-- INITIALISATION
  //----------------------------------------------------------------------------
  constructor(
    private fb: FormBuilder,
    private modeleEvenementService: ModeleEvenementService,
    private eventManager: EventManager
  ) { }

  ngOnInit() {
    this.impliqueDeuxSens = this.evenement.localisant.impliqueDeuxSens;
    this.field = FieldEvenementCte.FIELD;
    this.i18n = LABELS;
    this.typesLocalisant = _.values(ModeleEvenementService.enumerations[EvenementCte.INPUT.TYPES_LOCALISANT].valeursEnumerations);
    this.axes = _.keys(ModeleEvenementService.axes).sort();
    this.sens = ModeleValeur.getSens(_.values(ModeleEvenementService.enumerations[EvenementCte.INPUT.SENS].valeursEnumerations));
    this.complementsLocalisation =  _.values(ModeleEvenementService.enumerations[EvenementCte.INPUT.COMPLEMENTS_LOCALISATION].valeursEnumerations);
    this.typesLieux = _.values(ModeleEvenementService.typesLieux);
    this.initAttributs();
    this.isLieu = this.resolveIsLieu();
    this.lieux = this.isLieu ? _.values(ModeleEvenementService.lieux) : [];
    this.isPrFin = this.resolveIsPrFin();
    this.initValidationMessages();
    this.createForm();
    this.initFormErrorsNames();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }


  /**
  * initialise les données du formulaire.
  */
  private createForm() {
    this.evenementFormGroup = this.fb.group({
      typeLocalisant: new FormControl(this.localisant[FieldEvenementCte.FIELD.typeLocalisant], Validators.required), // type de localisant
      axe: new FormControl(this.localisant.prDebut.codeAxe || '', ),
      sens: new FormControl(this.localisant[FieldEvenementCte.FIELD.sens]),
      typeLieu: new FormControl(),
      lieu: new FormControl(this.localisant[FieldEvenementCte.FIELD.lieu]),
      prDebut: new FormControl(EvenementUtils.prToString(this.evenement.localisant.prDebut), [Validators.pattern(EvenementCte.PR_REGEXP)]),
      prFin: new FormControl(EvenementUtils.prToString(this.evenement.localisant.prFin), this.isPrFin ? [Validators.pattern(EvenementCte.PR_REGEXP)]:[]),
      complementLocalisation: new FormControl(this.evenement.attributs[FieldEvenementCte.FIELD.complementLocalisation].codeValeur),
      impliqueDeuxSens: new FormControl( this.evenement.localisant.impliqueDeuxSens || false ),
      commune: new FormControl(this.evenement.attributs[FieldEvenementCte.FIELD.commune].description),
      longeurLocalisation: new FormControl(this.evenement.attributs[FieldEvenementCte.FIELD.longeurLocalisation].valeur),
    });
    setTimeout(() => {
      if (this.isLieu){
        this.evenementFormGroup.controls.axe.disable();
        this.evenementFormGroup.controls.sens.disable();
        this.evenementFormGroup.controls.prDebut.disable();
        this.evenementFormGroup.controls.prFin.disable();
      }
    }, 10);


    this.subscriptions.push(this.evenementFormGroup.valueChanges.subscribe(data => this.onValueChanged(data)));
    this.onValueChanged(); // (re)set validation messages now
  }

  /**
  * Initialise forms errors name
  */
  private initFormErrorsNames(){
    // initialisation des erreurs formName.
    Object.keys(this.validationMessages).map((k, index) => {
      this.formErrors[k] = '';
    });
  }


  //----------------------------------------------------------------------------
  //-- ACTIONS
  //----------------------------------------------------------------------------
  /**
  * Traite le formulaire dès que le formulaire est valide.
  */
  public validate(){
    if (!this.evenementFormGroup.valid) return;

    this.evenement.localisant[FieldEvenementCte.FIELD.typeLocalisant] = this.evenementFormGroup.controls.typeLocalisant.value || this.evenement.localisant[FieldEvenementCte.FIELD.typeLocalisant];

    this.evenement.localisant.prDebut.codeAxe = this.evenementFormGroup.controls.axe.value || this.evenement.localisant.prDebut.codeAxe
    this.evenement.localisant[FieldEvenementCte.FIELD.sens] = this.evenementFormGroup.controls.sens.value || this.evenement.localisant[FieldEvenementCte.FIELD.sens];
    this.evenement.localisant.codeSensFin = this.evenement.localisant.codeSensDebut;
    if (this.isLieu){
      this.evenement.localisant[FieldEvenementCte.FIELD.lieu] = this.evenementFormGroup.controls.lieu.value;
    } else {
      this.evenement.localisant[FieldEvenementCte.FIELD.lieu] = null;
    }


    let prDebut = EvenementUtils.stringToPr(this.evenementFormGroup.controls.prDebut.value);
    if (!!prDebut){
      this.evenement.localisant.prDebut.codeAxe = this.evenement.localisant.prDebut.codeAxe;
      this.evenement.localisant.prDebut.abscisse = prDebut.abscisse;
      this.evenement.localisant.prDebut.numero = prDebut.numero;
    }
    if (this.isPrFin && this.evenementFormGroup.controls.prFin.value && this.evenement.localisant.prFin){
      let prFin = EvenementUtils.stringToPr(this.evenementFormGroup.controls.prFin.value);
      this.evenement.localisant.prFin.codeAxe = this.evenement.localisant.prDebut.codeAxe;
      this.evenement.localisant.prFin.abscisse = prFin.abscisse;
      this.evenement.localisant.prFin.numero = prFin.numero;
    }
    else if (this.evenement.localisant.prFin){
      this.resetPr(this.evenement.localisant.prFin);
    }

    if (this.evenementFormGroup.controls.complementLocalisation.value){
      ModeleValeur.setEnumValue(this.evenement.attributs[FieldEvenementCte.FIELD.complementLocalisation],
        ModeleEvenementService.enumerations[EvenementCte.INPUT.COMPLEMENTS_LOCALISATION].valeursEnumerations,
        this.evenementFormGroup.controls.complementLocalisation.value);
    }

    if (EvenementUtils.isSectionCallable(this.evenement.localisant, this.evenement)){
      this.eventManager.broadcast({name: EventManagerCte.EVENT_NAME.sectionCallable, content: this.localisant });
    }
  }

  //----------------------------------------------------------------------------
  //-- EVENEMENTS
  //----------------------------------------------------------------------------
  /**
  * Ecoute et traite les champs qui ont subi des changements.
  * @param data les données qui ont subi des changements.
  */
  private onValueChanged(data?: any) {
    if (!data) return;

    this.formErrors = CustomValidators.validate(this.evenementFormGroup, this.formErrors, this.validationMessages);
    let alertMessages: AlertMessage[] = CustomValidators.buildValidationAlertMessages(this.formErrors)
    if (!_.isEmpty(alertMessages)){
      this.eventManager.broadcast({name: EventManagerCte.EVENT_NAME.invalidInput, content: { alertMessages: alertMessages}});
    }
    else if (this.evenementFormGroup.valid){
     this.eventManager.broadcast({name: EventManagerCte.EVENT_NAME.validInput, content: { alertMessages: alertMessages}});
     this.validate();
    }
  }

  /**
  * Gestion du changement de la valeur de l'attribut correspondant.
  * @param value la  nouvelle valeur de l'attribut.
  */
  public impliqueDeuxSensChange(value){
    this.evenement.localisant.impliqueDeuxSens = value;
    this.validate();
  }

  /**
  * Listener sur le changement de valeur du type de localisant
  * @param value la  nouvelle valeur de l'attribut.
  */
  public resolveTypeLocalisationChange(value){
      this.evenement.localisant.emprises = [];
      this.evenement.localisant.emprisesSensInverse = [];
    switch (value){
      case EvenementCte.INPUT.TYPES_LOCALISANT_PONCTUEL:
        this.isLieu = false;
        this.isPrFin = false;
        this.addAxeValidators();
        this.addSensValidators();
        this.addPrDebutValidators();
        this.removePrFinValidators();
        this.removeLieuValidators();

        this.evenementFormGroup.controls.axe.enable();
        this.evenementFormGroup.controls.sens.enable();
        this.evenementFormGroup.controls.prDebut.enable();
        this.evenementFormGroup.controls.prFin.enable();

        break;
      case EvenementCte.INPUT.TYPES_LOCALISANT_ETENDU:
        this.isPrFin = true;
        this.isLieu = false;

        this.addAxeValidators();
        this.addSensValidators();
        this.addPrDebutValidators();
        this.addPrFinValidators();
        this.removeLieuValidators();

        this.evenementFormGroup.controls.axe.enable();
        this.evenementFormGroup.controls.sens.enable();
        this.evenementFormGroup.controls.prDebut.enable();
        this.evenementFormGroup.controls.prFin.enable();
        break;
      case EvenementCte.INPUT.TYPES_LOCALISANT_LIEU:
        this.isLieu = true;
        this.isPrFin = true;
        this.evenementFormGroup.controls.lieu.setValue("");
        this.evenementFormGroup.controls.axe.setValue("");
        this.evenementFormGroup.controls.sens.setValue("");
        this.evenementFormGroup.controls.prDebut.setValue("");
        this.evenementFormGroup.controls.prFin.setValue("");
        this.addLieuValidators();
        break;
      default:
        this.removeAxeValidators();
        this.removeSensValidators();
        this.removeLieuValidators();
        this.removePrDebutValidators();
        this.removePrFinValidators();
        break;
    }
    this.validate();
  }

  /**
  * Listener sur le changement de valeur du type de lieu
  * @param value la  nouvelle valeur de l'attribut.
  */
  public resolveTypeLieuChange(value){
      this.evenement.localisant.emprises = [];
      this.evenement.localisant.emprisesSensInverse = [];
    if (value){
      this.lieux = ModeleValeur.getLieu(value, _.values(ModeleEvenementService.lieux));
    }
    this.validate();
  }

  /**
  * Listener sur le changement de valeur du lieu
  * @param value la  nouvelle valeur de l'attribut.
  */
  public resolveLieuChange(value){
      this.evenement.localisant.emprises = [];
      this.evenement.localisant.emprisesSensInverse = [];
    if (value){
      this.evenement.localisant = ModeleEvenementService.lieux[value].localisant || this.evenement.localisant;

      this.evenementFormGroup.controls.axe.setValue(this.evenement.localisant.prDebut.codeAxe);
      this.evenementFormGroup.controls.sens.setValue(this.evenement.localisant.codeSensDebut);
      this.evenementFormGroup.controls.sens.setValue(this.evenement.localisant.codeSensFin);
      this.evenementFormGroup.controls.prDebut.setValue(EvenementUtils.prToString(this.evenement.localisant.prDebut));
      this.evenementFormGroup.controls.prFin.setValue(EvenementUtils.prToString(this.evenement.localisant.prFin));

      this.addAxeValidators(true);
      this.addSensValidators(true);
      this.addPrDebutValidators(true);
      this.addPrFinValidators(true);

      this.evenementFormGroup.controls.axe.updateValueAndValidity();
      this.evenementFormGroup.controls.sens.updateValueAndValidity();
      this.evenementFormGroup.controls.prDebut.updateValueAndValidity();
      this.evenementFormGroup.controls.prFin.updateValueAndValidity();

      if (!this.evenement.localisant.prFin) {
        this.isPrFin = false;
          this.removePrFinValidators();
        return;
      }

      setTimeout(() => {
        if (this.isLieu){
          this.validate();
        }
      }, 10);
    }
  }

  /**
  * Listener sur un changement de l'axe.
  * @param $event js
  */
  public resolveAxeChange($event?: any){
      this.evenement.localisant.emprises = [];
      this.evenement.localisant.emprisesSensInverse = [];
    if($event){
      $event.preventDefault();
      $event.stopPropagation();
    }
    this.resolveRegExpNumeroAxe($event.target.value);
    this.resolvePrValidation();
  }

  /**
  * Listener sur un changement du sens.
  * @param $event js
  */
  public resolveSensChange($event?: any){
      this.evenement.localisant.emprises = [];
      this.evenement.localisant.emprisesSensInverse = [];
    if($event){
      $event.preventDefault();
      $event.stopPropagation();
    }
    this.resolvePrValidation();
  }

  /**
  * Gestion de la validation des prDebut , prFin.
  * @param $event js
  */
  public resolvePrValidation($event?: any){
    if($event){
      $event.preventDefault();
      $event.stopPropagation();
    }
    this.resolveRegExpNumeroAxe(this.evenementFormGroup.controls.axe.value);

    let prConverted, result, prTypes, axe;
    axe = this.evenementFormGroup.controls.axe.value;
    prTypes = this.evenementFormGroup.controls.axe.value ? ModeleEvenementService.axes[axe].prTypes : [];
    prConverted  = EvenementUtils.stringToPr(this.evenementFormGroup.controls.prDebut.value);
    result = this.checkPr(prConverted, prTypes, this.evenementFormGroup.controls.sens.value);

    let prValidatorNumero = this.regExpNumeroAxe || this.defaultRegExpNoAxe;
    let prValidatorAbsisse = result ? result.abscisseInterval : this.regExpAbscisseAxe || this.defaultRegExpNoAxe;
    let validator = EvenementCte.setPrvalidator(prValidatorNumero, prValidatorAbsisse);
    let listValidators = [Validators.required, Validators.pattern(validator)];

    let minMaxValidator = this.buildMinMaxValidator(_.first(ModeleEvenementService.axes[axe].prTypes), _.last(ModeleEvenementService.axes[axe].prTypes));
    if (minMaxValidator) {
      listValidators.push(minMaxValidator.prDebutValidator);
    }
    this.evenementFormGroup.controls.prDebut.setValidators(listValidators);
    this.evenementFormGroup.controls.prDebut.updateValueAndValidity();

   if (this.isPrFin){
    listValidators = [Validators.required, Validators.pattern(validator)];
    if (minMaxValidator) {
      listValidators.push(minMaxValidator.prFinValidator);
    }
    this.evenementFormGroup.controls.prFin.setValidators(listValidators);
    this.evenementFormGroup.controls.prFin.updateValueAndValidity();
   }
   this.validate();
  }
  //----------------------------------------------------------------------------
  //-- UTILITAIRES / VALIDATIONS.
  //----------------------------------------------------------------------------
  /**
  *
  * @param prConverted
  * @param prs
  * @param sens
  */
  private checkPr(prConverted: Pr, prs, sens){
    let result: any = {};
    let max = (a, b) => { return a > b ? a : b }

    prs.forEach(pr => {
        if (prConverted && pr && pr.numero == prConverted.numero){
          result.abscisseInterval =  `(${this.buildRangeRegExp(0, max(pr.distancePrTypeSuivantSensCroissant, pr.distancePrTypeSuivantSensDecroissant))})`; // calcule des abscisses saisissables.
        }
    })
    return result;
  }

  /***
  * Constuit une regex intervalle.
  * @param from le plus pr saisissable
  * @param to le plus grand pr saisissable
  */
  private buildRangeRegExp(from: number, to: number){
    let result = "";
    for(let i=from; i<=to;i++){
      result += i+"|";
    }
    if  (result.length > 0 ) result = result.slice(0, result.length-1)
    return result;
  }

  /**
  * Fixe la regex qui permet de valider.
  * @param axe code axe.
  */
  private resolveRegExpNumeroAxe(axe: string){
    if (axe){
      let first = _.first(ModeleEvenementService.axes[axe].prTypes);
      let last = _.last(ModeleEvenementService.axes[axe].prTypes);
      this.regExpNumeroAxe = !!first && !!last ? `(${this.buildRangeRegExp(first.numero, last.numero)})` : undefined;
      this.regExpAbscisseAxe = !!first && !!last ? `0`: undefined;
    }
    else {
      this.regExpNumeroAxe = undefined;
      this.regExpAbscisseAxe = undefined;
    }
  }

  /**
  * @return true si le champ lieu doit etre affiché, false sinon.
  */
  private resolveIsLieu(): boolean {
    if (!this.evenement.localisant[FieldEvenementCte.FIELD.lieu]){
      return false;
    }
    if (!!this.evenement.localisant[FieldEvenementCte.FIELD.lieu]) {
      return true;
    }
    return EvenementCte.INPUT.TYPES_LOCALISANT_LIEU === this.localisant[FieldEvenementCte.FIELD.typeLocalisant];
  }

  /**
  * @return true si le champ pr doit etre affiché, false sinon.
  */
  private resolveIsPrFin(): boolean {
    if (this.evenement.localisant.prFin && this.evenement.localisant.prFin.numero != null) return true;
    return EvenementCte.INPUT.TYPES_LOCALISANT_ETENDU === this.localisant[FieldEvenementCte.FIELD.typeLocalisant] ;
  }

  /**
  * Constuit un validateur min et max.
  * @param from le plus petit pr saisissable
  * @param to le plus grand pr saisissable
  * @return un objet contenant les valideur des prDebut et prfin.
  */
  private buildMinMaxValidator(lowestPr: any, highestPr: any): any{
    if (!this.evenementFormGroup.controls.prDebut.value || !this.evenementFormGroup.controls.prFin.value) return undefined;
    let model: any = {};
    model.prDebutConverted  = EvenementUtils.stringToPr(this.evenementFormGroup.controls.prDebut.value);
    model.prFinConverted  = EvenementUtils.stringToPr(this.evenementFormGroup.controls.prFin.value);
    model.isSensInverse = EvenementUtils.isSensInverse(this.evenementFormGroup.controls.sens.value);
    model.result = {};

    if (model.isSensInverse){
      // sens 2
      model.result.prDebutValidator = CustomValidators.prMinMaxValidators(model.prFinConverted, {numero: highestPr.numero, abscisse: 0});
      model.result.prFinValidator = CustomValidators.prMinMaxValidators({numero: lowestPr.numero, abscisse: 0}, model.prDebutConverted);
    } else {
      // sens 1
      model.result.prDebutValidator = CustomValidators.prMinMaxValidators({numero: lowestPr.numero, abscisse: 0}, model.prFinConverted);
      model.result.prFinValidator = CustomValidators.prMinMaxValidators(model.prDebutConverted, {numero: highestPr.numero, abscisse: 0});
    }
    return model.result;
  }


  private initAttributs(){
    this.localisant = this.localisant || this.evenement.localisant || {};
    // Valeur par défaut.
    this.localisant[FieldEvenementCte.FIELD.typeLocalisant] = this.localisant[FieldEvenementCte.FIELD.typeLocalisant] || EvenementCte.DEFAULT_TYPE_LOCALISANT;
    this.localisant.prDebut.codeAxe = this.localisant.prDebut.codeAxe || EvenementCte.DEFAULT_AXE;
    this.localisant[FieldEvenementCte.FIELD.sens] = this.localisant[FieldEvenementCte.FIELD.sens] || EvenementCte.DEFAULT_SENS;
  }

  private addAxeValidators(disabled?: boolean){
    this.evenementFormGroup.controls.axe.setValidators(Validators.required);
    this.initAttributs();
    this.evenementFormGroup.controls.axe.updateValueAndValidity();
    if (disabled) this.evenementFormGroup.controls.axe.disable();
  }

  private removeAxeValidators(){
    this.evenementFormGroup.controls.axe.setValidators([]);
    this.evenementFormGroup.controls.axe.updateValueAndValidity();
  }

  private addSensValidators(disabled?: boolean){
    this.evenementFormGroup.controls.sens.setValidators(Validators.required);
    this.evenementFormGroup.controls.sens.updateValueAndValidity();
    if (disabled) this.evenementFormGroup.controls.sens.disable();
  }

  private removeSensValidators(){
    this.evenementFormGroup.controls.sens.setValidators([]);
    this.evenementFormGroup.controls.sens.updateValueAndValidity();
  }

  private addLieuValidators(){
    this.evenementFormGroup.controls.lieu.setValidators(Validators.required);
    this.evenementFormGroup.controls.lieu.updateValueAndValidity();
  }

  private removeLieuValidators(){
    this.evenementFormGroup.controls.lieu.setValidators([]);
    this.evenementFormGroup.controls.lieu.updateValueAndValidity();
  }

  private addPrDebutValidators(disabled?: boolean){
    this.evenementFormGroup.controls.prDebut.setValidators([Validators.required, Validators.pattern(EvenementCte.PR_REGEXP)]);
    this.evenementFormGroup.controls.prDebut.updateValueAndValidity();
    if (disabled) this.evenementFormGroup.controls.prDebut.disable();
  }

  private removePrDebutValidators(){
    this.evenementFormGroup.controls.prDebut.setValidators([]);
    this.evenementFormGroup.controls.prDebut.updateValueAndValidity();
  }

  private addPrFinValidators(disabled?: boolean){
    this.evenementFormGroup.controls.prFin.setValidators([Validators.required,  Validators.pattern(EvenementCte.PR_REGEXP)]);
    this.evenementFormGroup.controls.prFin.updateValueAndValidity();
    if (disabled) this.evenementFormGroup.controls.prFin.disable();

  }

  private removePrFinValidators(){
    this.evenementFormGroup.controls.prFin.setValidators([]);
    this.evenementFormGroup.controls.prFin.updateValueAndValidity();
  }

  /**
  * Reset à null le pr passé en paramètre.
  * @param pr
  */
  private resetPr(pr){
    if (!pr) return;
    pr.codeAxe = null;
    pr.abscisse = null;
    pr.numero = null;
  }

  /**
  * Initialise les message de validations.
  */
  private initValidationMessages(){
    this.validationMessages = {
        typeLocalisant: {
          required: "Block Localisation: Le champ type de Localisant est requis.",
        },
        axe: {
          required: "Block Localisation: Le champ axe est requis.",
        },
        sens: {
          required: "Block Localisation: Le champ sens est requis.",
        },
        lieu: {
          required: "Block Localisation: Le champ lieu est requis.",
        },
        prDebut: {
          required: "Block Localisation: Le champ PR Début est requis.",
          pattern: "Block Localisation: le format du champ prDébut n'est pas correct. (127+57)"
        },
        prFin: {
          required: "Block Localisation: Le champ PR Fin est requis.",
          pattern: "Block Localisation: le format du champ prFin n'est pas correct. (127+57)"
        }
    }
  }


}
