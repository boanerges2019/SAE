import { Directive, Input, ElementRef,  OnChanges, SimpleChanges } from '@angular/core';
import { FieldEvenementCte } from '../../../app/core/evenement/constantes/field-evenement.constantes';
import { CtxCte } from '../../../app/shared/services/constantes/ctx.constantes';
//import { UserCte } from 'app/shared/services/constantes/user.constantes';
//import { UserService } from 'app/shared/services/user/user.service';
import { CacheService } from '../../../app/shared/services/cache/cache.service';
import { CacheConstantes } from '../../../app/shared/services/cache/cache.constantes';
import * as _ from 'underscore';

/**
* Gestion l'accès d'une ressource (input, bouton...) en fonction des droits
* du user connecté et des droits prédéfinis de la ressource.
* @author SPIE
*/
@Directive({
  selector: '[ctxAccess]' //ctx-access
})
export class CtxAccessDirective implements  OnChanges {
  @Input() fieldName: string; // la resource à protéger (input, bouton...)
  @Input() currentCtx: string; // contexte d'accès à la ressource (lecture, edition, list)
  @Input() state?: string; // facultatif /  etat de la donnée qui alimente le champ.
  @Input() configCte?: any; // object le fichier de config des fields, contexte, etc...
  @Input() extraConditions?: boolean[] // facultatif / évaluation des conditions supplementaires true => champ inaccessible, false accessible
  @Input() hideExtraVar?: boolean // facultatif/ applique un comportement hide au lieu de disabled (default)

  private elementRef: ElementRef;

  private connectedUser;

  //----------------------------------------------------------------------------
  //-- INITIALISATION
  //----------------------------------------------------------------------------
  constructor(
      private el: ElementRef,
      private cacheService: CacheService
  ) {
    this.elementRef = el; // element à protéger.
    this.connectedUser = this.cacheService.getObject(CacheConstantes.SESSION) || {};

  }

  //----------------------------------------------------------------------------
  //-- EVENEMENTS
  //----------------------------------------------------------------------------
  ngOnChanges(changes: SimpleChanges) {
    this.fieldName = changes.fieldName && changes.fieldName.currentValue  ? changes.fieldName.currentValue : this.fieldName;
    this.currentCtx = changes.currentCtx && changes.currentCtx.currentValue ? changes.currentCtx.currentValue : this.currentCtx;
    this.state = changes.state && changes.state.currentValue ? changes.state.currentValue : this.state;
    this.configCte = changes.configCte && changes.configCte.currentValue ? changes.configCte.currentValue : this.configCte;
    this.extraConditions = changes.extraConditions && changes.extraConditions.currentValue ? changes.extraConditions.currentValue : this.extraConditions;
    this.hideExtraVar = changes.hideExtraVar && changes.hideExtraVar.currentValue ? changes.hideExtraVar.currentValue : this.hideExtraVar;

    this.resolveAccess();
  }

  /**
  * Détermine l'affichage de l'élément en fonction de l'access.
  * @param notAccess
  */
  private resolveAccess(){
    let notAccess = this.isAccessNotAllowed(this.currentCtx);
    if (notAccess && this.hideExtraVar ) {
      this.elementRef.nativeElement.style.display = "none";
    } else if (notAccess){
       this.elementRef.nativeElement.disabled = notAccess;
     } else {
       this.elementRef.nativeElement.disabled = false;
       this.elementRef.nativeElement.style.display = "block";
     }
  }

  //----------------------------------------------------------------------------
  //-- UTILITAIRES / VALIDATIONS.
  //----------------------------------------------------------------------------
  /**
  * Gestion de l'accès à un élément.
  * @return true si l'element n'est pas accesssible(editable), false => accessible.
  * @param currentCtx
  */
  private isAccessNotAllowed(currentCtx: string): boolean {
    const nomMethode = 'isAccessNotAllowed';
    if (!!this.extraConditions){ // quels sont les extra conditions pour lesquelles le champ est eventuellement modifiable.
      let result = true;
      this.extraConditions.forEach(predicate => {
        result = result && !!predicate;
      });
      if (result){
        return true;
      }
    }

    let configCte = this.configCte || FieldEvenementCte;

    //-- Check contextes d'appel
    if (!this.fieldName || !currentCtx || currentCtx === CtxCte.CTX.READ) {
      return true;
    }

    let contextes = configCte["CTX"][this.fieldName] || []; // quels sont les contextes pour lesquels le champ est modifiable.
    if (contextes.indexOf(currentCtx) < 0) {
      return true;
    }

    //-- Check état
    if (this.state){ // quels sont les états pour lesquels le champ est modifiable.
      let states = configCte["ETAT"][this.fieldName];
      if (!states){
        return true;
      }

      let result =  states.indexOf(this.state) >-1;
      if (!result) {
        return true;
      }
    }


    //-- Check Droits user
    let droitsField = configCte["DROIT"][this.fieldName]; // quels sont les droits pour lesquels le champ est modifiable.
    if (!droitsField) {
      return true;
    }


    if (!this.connectedUser.droits) {
      return true;
    }
    let droitsUser = [];
    for(let key in this.connectedUser.droits){
        droitsUser.push(this.connectedUser.droits[key].codeInfo);
    }
    
    let intersection = _.intersection(droitsField, droitsUser);
    if (intersection.length > 0) {
      // console.log(nomMethode + ' : droits OK');
      // console.log(nomMethode + ' : droitField' + JSON.stringify(droitsField) );
      // console.log(nomMethode + ' : droitUser' + JSON.stringify(droitsUser) );
      // console.log(nomMethode + ' : intersection' + JSON.stringify(intersection) );
      return false;
    } else {
      return true;
    }
  }

}
