import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'underscore';
import { ModeleEvenementService } from 'app/core/evenement/services/modele-evenement.service';
import { FieldEvenementCte } from 'app/core/evenement/constantes/field-evenement.constantes';
import { EvenementCte } from 'app/core/evenement/constantes/evenement.constantes';
import { Evenement } from 'app/shared/models/generic/Evenement';
import { ModeleValeur } from 'app/shared/utils/modele-valeur-builder';
import { CtxCte } from 'app/shared/services/constantes/ctx.constantes';

@Component({
  selector: 'evenement-sftrf',
  templateUrl: './evenement-sftrf.component.html',
  styleUrls: ['./evenement-sftrf.component.scss']
})
export class EvenementSftrfComponent implements OnInit {

  @Input() evenement: Evenement;
  @Input() currentCtx: string; // mode d'accès à la ressource (lecture, edition)
  isCollapsedContent: boolean = true;
  field:{ [key: string]: any };
  listeInterventionsSftrf: any;
  model: any;
  evenementsConjoints: any = ['123405', '123406', '0'];
  modeleEvenementCte: { [key: string]: any };
  contexte: any;

  //----------------------------------------------------------------------------
  //-- INITIALISATION
  //----------------------------------------------------------------------------
  constructor(
      private modeleEvenementService: ModeleEvenementService
    ) {
  }

  ngOnInit() {
    this.contexte = CtxCte.CTX;
    this.field = FieldEvenementCte.FIELD;
    this.model = ModeleValeur.initModel(this.getSubFields(), {});

    if (!this.evenement.attributs[FieldEvenementCte.FIELD.listeInterventionsSftrf][FieldEvenementCte.FIELD.itemInterventionSftrf]){
      this.evenement.attributs[FieldEvenementCte.FIELD.listeInterventionsSftrf][FieldEvenementCte.FIELD.itemInterventionSftrf] = [];
    }

    this.listeInterventionsSftrf = this.evenement.attributs[FieldEvenementCte.FIELD.listeInterventionsSftrf];
  }

  //----------------------------------------------------------------------------
  //-- EVENEMENTS
  //----------------------------------------------------------------------------
  addIntervention(){
    if (!ModeleValeur.isModelNotEmpty(this.model)){
      return;
    }
    let newItem = {};
    newItem[FieldEvenementCte.FIELD.codeInfoModele] = FieldEvenementCte.FIELD.itemInterventionSftrf;
    newItem = _.extend(newItem, this.model);
    this.listeInterventionsSftrf[FieldEvenementCte.FIELD.itemInterventionSftrf].push(newItem);
    this.model = ModeleValeur.initModel(this.getSubFields(), {}); // reset the model.
  }

  /**
  * Permet de supprimer une intervention.
  * @param index indice de l'élément à supprimer.
  */
  removeIntervention(index){
    this.listeInterventionsSftrf[FieldEvenementCte.FIELD.itemInterventionSftrf].splice(index, 1);
  }

  //----------------------------------------------------------------------------
  //-- FONCTIONS UTILITAIRES
  //----------------------------------------------------------------------------


  private getSubFields(): string[]{
    return [
      FieldEvenementCte.FIELD.intervenantSftrf,
      FieldEvenementCte.FIELD.horodateAppelSftrf,
      FieldEvenementCte.FIELD.horodateArriveeLieuSftrf,
      FieldEvenementCte.FIELD.horodateQuitteLieuSftrf,
    ];
  }
}
