import { Component, OnInit, Input } from '@angular/core';
import { ModeleValeur } from 'app/shared/utils/modele-valeur-builder';
import * as _ from 'underscore';
import { ModeleEvenementService } from 'app/core/evenement/services/modele-evenement.service';
import { FieldEvenementCte } from 'app/core/evenement/constantes/field-evenement.constantes';
import { EvenementCte } from 'app/core/evenement/constantes/evenement.constantes';
import { Evenement } from 'app/shared/models/generic/Evenement';

@Component({
  selector: 'travaux-caracteristiques',
  templateUrl: './travaux-caracteristiques.component.html',
  styleUrls: ['./travaux-caracteristiques.component.scss']
})
export class TravauxCaracteristiquesComponent implements OnInit {

  @Input() evenement: Evenement;
  @Input() currentCtx: string; // mode d'accès à la ressource (lecture, edition)
  isCollapsedContent: boolean = true;
  field: { [key: string]: any };
  naturesTravaux: string[];
  listeIntervenantsTravaux: any;
  model: { [key: string]: any };
  modeleEvenementCte: { [key: string]: any };

  //----------------------------------------------------------------------------
  //-- INITIALISATION
  //----------------------------------------------------------------------------
  constructor(protected modeleEvenementService: ModeleEvenementService) { }


  ngOnInit() {
    this.field = FieldEvenementCte.FIELD;
    this.modeleEvenementCte = EvenementCte.INPUT;
    this.model = ModeleValeur.initModel(this.getSubFields(), {});
    this.naturesTravaux = _.values(ModeleEvenementService.enumerations[EvenementCte.INPUT.NATURES_TRAVAUX].valeursEnumerations);

    if (!this.evenement.attributs[FieldEvenementCte.FIELD.listeIntervenantsTravaux][FieldEvenementCte.FIELD.itemIntervenantTravaux]){
      this.evenement.attributs[FieldEvenementCte.FIELD.listeIntervenantsTravaux][FieldEvenementCte.FIELD.itemIntervenantTravaux] = [];
    }
    this.listeIntervenantsTravaux = this.evenement.attributs[FieldEvenementCte.FIELD.listeIntervenantsTravaux];
  }


  //----------------------------------------------------------------------------
  //-- EVENEMENTS
  //----------------------------------------------------------------------------
  addIntervention(){
    if (!ModeleValeur.isModelNotEmpty(this.model)){
      return;
    }
    let newItem = {};
    newItem[FieldEvenementCte.FIELD.codeInfoModele] = FieldEvenementCte.FIELD.itemIntervenantTravaux;
    newItem = _.extend(newItem, this.model);
    this.listeIntervenantsTravaux[FieldEvenementCte.FIELD.itemIntervenantTravaux].push(newItem);
    this.model = ModeleValeur.initModel(this.getSubFields(), {}); // reset the model.
  }


  /**
  * Permet de supprimer une intervention.
  * @param index indice de l'élément à supprimer.
  */
  removeIntervention(index){
    this.listeIntervenantsTravaux[FieldEvenementCte.FIELD.itemIntervenantTravaux].splice(index, 1);
  }


  //----------------------------------------------------------------------------
  //-- FONCTIONS UTILITAIRES
  //----------------------------------------------------------------------------

  private getSubFields(): string[]{
    return [
      FieldEvenementCte.FIELD.entrepriseTravaux,
      FieldEvenementCte.FIELD.nbPersonnesTravaux,
      FieldEvenementCte.FIELD.nbVehiculesTravaux,
      FieldEvenementCte.FIELD.autorisationTravaux,
      FieldEvenementCte.FIELD.mobileTravaux,
      FieldEvenementCte.FIELD.radioTravaux,
      FieldEvenementCte.FIELD.dateDebutTravaux,
      FieldEvenementCte.FIELD.dateFinTravaux,
    ]
  }
}
