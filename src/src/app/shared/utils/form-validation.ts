import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, AbstractControl, ValidatorFn, Validators } from '@angular/forms';
import * as _ from 'underscore';
import { AlertMessage } from 'app/shared/models/generic/alert-message';
import { EvenementUtils } from 'app/shared/utils/evenement-utils';

/**
* Gestion des Validations spécifiques.
* @author SPIE
*/
export class CustomValidators {
  /**
   *  Procède à la validation du formulaire passé en paramètre.
   * @param form le formulaire.
   * @param formErrors les éléments du formulaire.
   * @param validationMessages les messages de validation.
   */
  static validate( form: FormGroup, formErrors: {},  validationMessages: {}): any {
    if (!form) { return formErrors; }
    for (const field in formErrors) {

      formErrors[field] = ''; // réinitialise les erreurs de validations précédentes.
      const control = form.get(field);

      if (control && !control.valid) {
        const messages = validationMessages[field];
        for (const key in control.errors) {
          formErrors[field] += messages[key] + ' ';
        }
      }
    }
    return formErrors;
  }


  /**
  * Crée les messages d'erreurs.
  * @param formErrors les données du formulaire qui contiennent des erreurs.
  */
  static buildValidationAlertMessages(formErrors): AlertMessage[] {
    let alertMessages: AlertMessage[] = [];
    _.mapObject(formErrors, function(val, key) {
      if (!!val){
        let alertMessage: AlertMessage = {
          type: "danger",
          message: val
        };
        alertMessages.push(alertMessage);
      }
    });
    return alertMessages;
  }

  /**
  * Crée un validateur custum pour les prDebut, prFin.
  * @param prString le pr saisi
  * @param lowestPr pr le plus petit
  * @param highestPr pr le plus grand
  */
  static prMinMaxValidators (lowestPr: any, highestPr: any): ValidatorFn {
      return (c: AbstractControl): { [key: string]: boolean } | null => {
        if (c.value){
          if (CustomValidators.isPrInMinMax(c.value, lowestPr, highestPr)) {
              return { 'range': true };
          }
          return null;
        }
      };
  }

  /**
  * Determine si un pr est compris dans [lowestPr,highestPr ]
  * @param prString le pr saisi
  * @param lowestPr pr le plus petit
  * @param highestPr pr le plus grand
  */
  static isPrInMinMax(prString: string, lowestPr: any, highestPr: any): boolean{
    let model: any = {};
    model.pr = EvenementUtils.stringToPr(prString);

    if (!model.pr || typeof model.pr.numero !== "number"  || typeof model.pr.abscisse !== "number") return true;

    if (model.pr.numero < lowestPr.numero ) return true;
    if (model.pr.numero > highestPr.numero ) return true;

    if (model.pr.numero === lowestPr.numero  && model.pr.abscisse < lowestPr.abscisse) return true;
    if (model.pr.numero === highestPr.numero  && model.pr.abscisse > highestPr.abscisse) return true;

    return false;
  }
}
