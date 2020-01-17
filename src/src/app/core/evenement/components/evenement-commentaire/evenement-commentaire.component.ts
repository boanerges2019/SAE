import { Component, OnInit,  Input } from '@angular/core';
import { ModeleValeur } from 'app/shared/utils/modele-valeur-builder';
import { FieldEvenementCte } from 'app/core/evenement/constantes/field-evenement.constantes';
import { Evenement } from 'app/shared/models/generic/Evenement';
import * as _ from 'underscore';

@Component({
  selector: 'evenement-commentaire',
  templateUrl: './evenement-commentaire.component.html',
  styleUrls: ['./evenement-commentaire.component.scss']
})
export class EvenementCommentaireComponent  implements OnInit {

  @Input() evenement: Evenement;
  @Input() currentCtx: string; // mode d'accès à la ressource (lecture, edition)
  isCollapsedContent: boolean = true;
  field: { [key: string]: any };
  commentaires: any;
  model:  { [key: string]: any };

  //----------------------------------------------------------------------------
  //-- INITIALISATION
  //----------------------------------------------------------------------------
  constructor() { }

  ngOnInit() {
    this.field = FieldEvenementCte.FIELD;
    this.model = ModeleValeur.initModel(this.getSubFields(), {});

    if (!this.evenement.attributs[FieldEvenementCte.FIELD.listeCommentaires][FieldEvenementCte.FIELD.itemCommentaire]){
      this.evenement.attributs[FieldEvenementCte.FIELD.listeCommentaires][FieldEvenementCte.FIELD.itemCommentaire] = [];
    }
    this.commentaires = this.evenement.attributs[FieldEvenementCte.FIELD.listeCommentaires];
  }


  //----------------------------------------------------------------------------
  //-- EVENEMENTS
  //----------------------------------------------------------------------------
  addCommentaire(){
    if (!ModeleValeur.isModelNotEmpty(this.model)){
      return;
    }
    this.model[FieldEvenementCte.FIELD.horodateCommentaire].valeur = new Date();
    let newItem = {};
    newItem[FieldEvenementCte.FIELD.codeInfoModele] = FieldEvenementCte.FIELD.itemCommentaire;
    newItem = _.extend(newItem, this.model);
    this.evenement.attributs[FieldEvenementCte.FIELD.listeCommentaires][FieldEvenementCte.FIELD.itemCommentaire].push(newItem);
    this.model = ModeleValeur.initModel(this.getSubFields(), {}); // reset the model.
  }

  /**
  * Permet de supprimer une intervention.
  * @param index indice de l'élément à supprimer.
  */
  removeCommentaire(index){
    this.commentaires[FieldEvenementCte.FIELD.itemCommentaire].splice(index, 1);
  }

  //----------------------------------------------------------------------------
  //-- FONCTIONS UTILITAIRES
  //----------------------------------------------------------------------------
  private getSubFields(): string[]{
    return [
      FieldEvenementCte.FIELD.descriptionCommentaire,
      FieldEvenementCte.FIELD.horodateCommentaire,
    ];
  }
}
