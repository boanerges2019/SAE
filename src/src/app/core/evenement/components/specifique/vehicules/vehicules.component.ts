import { Component, OnInit, Input } from '@angular/core';
import { ModeleEvenementService } from '../../../../../../app/core/evenement/services/modele-evenement.service';
import { FieldEvenementCte } from '../../../../../../app/core/evenement/constantes/field-evenement.constantes';
import { EvenementCte } from '../../../../../../app/core/evenement/constantes/evenement.constantes';
import { Evenement } from '../../../../../../app/shared/models/generic/Evenement';
import { ModeleValeur } from '../../../../../../app/shared/utils/modele-valeur-builder';
import { CtxCte } from '../../../../../../app/shared/services/constantes/ctx.constantes';
import * as _ from 'underscore';


@Component({
  selector: 'vehicules',
  templateUrl: './vehicules.component.html',
  styleUrls: ['./vehicules.component.scss']
})
export class VehiculesComponent  implements OnInit {

  @Input() evenement: Evenement;
  @Input() currentCtx: string; // mode d'accès à la ressource (lecture, edition)
  isCollapsedContent: boolean = true;
  field: { [key: string]: any };;
  listeVehicules: any;
  model: { [key: string]: any };;
  contexte: any;

  //----------------------------------------------------------------------------
  //-- INITIALISATION
  //----------------------------------------------------------------------------
  constructor(private modeleEvenementService: ModeleEvenementService) { }

  ngOnInit() {
    this.contexte = CtxCte.CTX;
    this.field = FieldEvenementCte.FIELD;
    this.model = ModeleValeur.initModel(this.getSubFields(FieldEvenementCte.FIELD.listeVehicules), {});
    if (!this.evenement.attributs[FieldEvenementCte.FIELD.listeVehicules][FieldEvenementCte.FIELD.itemVehicule]){
      this.evenement.attributs[FieldEvenementCte.FIELD.listeVehicules][FieldEvenementCte.FIELD.itemVehicule] = [];
    }
    this.listeVehicules = this.evenement.attributs[FieldEvenementCte.FIELD.listeVehicules];
  }


  //----------------------------------------------------------------------------
  //-- EVENEMENTS
  //----------------------------------------------------------------------------
  addItem(){
    if (!ModeleValeur.isModelNotEmpty(this.model)){
      return;
    }
    let newItem = {};
    newItem[FieldEvenementCte.FIELD.codeInfoModele] = FieldEvenementCte.FIELD.itemVehicule;
    newItem = _.extend(newItem, this.model);
    this.listeVehicules[FieldEvenementCte.FIELD.itemVehicule].push(newItem);
    this.model = ModeleValeur.initModel(this.getSubFields(FieldEvenementCte.FIELD.listeVehicules), {}); // reset the model.
  }

  /**
  * Permet de supprimer une intervention.
  * @param index indice de l'élément à supprimer.
  */
  removeItem(index){
    this.listeVehicules[FieldEvenementCte.FIELD.itemVehicule].splice(index, 1);
  }

  //----------------------------------------------------------------------------
  //-- FONCTIONS UTILITAIRES
  //----------------------------------------------------------------------------

  private getSubFields(suivi): string[]{
    return [
      FieldEvenementCte.FIELD.descriptionVehicule,
      FieldEvenementCte.FIELD.degatVehicule,
      FieldEvenementCte.FIELD.descriptionDegatVehicule
    ];
  }
}
