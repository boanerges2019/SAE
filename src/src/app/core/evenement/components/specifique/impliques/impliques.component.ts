import { Component, OnInit, Input } from '@angular/core';
import { ModeleValeur } from 'app/shared/utils/modele-valeur-builder';
import { BaseService } from 'app/core/evenement/services/base.service';
import { ModeleEvenementService } from 'app/core/evenement/services/modele-evenement.service';
import { FieldEvenementCte } from 'app/core/evenement/constantes/field-evenement.constantes';
import { Evenement } from 'app/shared/models/generic/Evenement';
import { CtxCte } from 'app/shared/services/constantes/ctx.constantes';
import * as _ from 'underscore';

@Component({
  selector: 'impliques',
  templateUrl: './impliques.component.html',
  styleUrls: ['./impliques.component.scss']
})
export class ImpliquesComponent implements OnInit {

  @Input() evenement: Evenement;
  @Input() currentCtx: string; // mode d'accès à la ressource (lecture, edition)
  isCollapsedContent: boolean = true;
  field:{ [key: string]: any };
  listeImpliques: any;
  model: any;
  contexte: any;

  //----------------------------------------------------------------------------
  //-- INITIALISATION
  //----------------------------------------------------------------------------
  constructor() { }

  ngOnInit() {
    this.contexte = CtxCte.CTX;
    this.field = FieldEvenementCte.FIELD;
    this.model = ModeleValeur.initModel(this.getSubFields(), {});

    if (!this.evenement.attributs[FieldEvenementCte.FIELD.listeImpliques][FieldEvenementCte.FIELD.itemImplique]){
      this.evenement.attributs[FieldEvenementCte.FIELD.listeImpliques][FieldEvenementCte.FIELD.itemImplique] = [];
    }
    this.listeImpliques = this.evenement.attributs[FieldEvenementCte.FIELD.listeImpliques];
  }



  //----------------------------------------------------------------------------
  //-- EVENEMENTS
  //----------------------------------------------------------------------------
  addIntervention(){
    if (!ModeleValeur.isModelNotEmpty(this.model)){
      return;
    }
    let newItem = {};
    newItem[FieldEvenementCte.FIELD.codeInfoModele] = FieldEvenementCte.FIELD.itemImplique;
    newItem = _.extend(newItem, this.model);
    this.evenement.attributs[FieldEvenementCte.FIELD.listeImpliques][FieldEvenementCte.FIELD.itemImplique].push(newItem);
    this.model = ModeleValeur.initModel(this.getSubFields(), {}); // reset the model.
  }

  /**
  * Permet de supprimer une intervention.
  * @param index indice de l'élément à supprimer.
  */
  removeIntervention(index){
    this.listeImpliques[FieldEvenementCte.FIELD.itemImplique].splice(index, 1);
  }

  //----------------------------------------------------------------------------
  //-- FONCTIONS UTILITAIRES
  //----------------------------------------------------------------------------


  private getSubFields(){
    return [
      FieldEvenementCte.FIELD.coordonneesImpliquees,
    ];
  }
}
