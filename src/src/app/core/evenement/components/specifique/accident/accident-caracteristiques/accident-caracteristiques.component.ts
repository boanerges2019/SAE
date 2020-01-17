import { Component, OnInit, Input, OnChanges} from '@angular/core';
import * as _ from 'underscore';
import { FieldEvenementCte } from '../../../../../../../app/core/evenement/constantes/field-evenement.constantes';
import { Evenement } from '../../../../../../../app/shared/models/generic/Evenement';
import { ModeleEvenementService } from '../../../../../../../app/core/evenement/services/modele-evenement.service';
import { EvenementCte } from '../../../../../../../app/core/evenement/constantes/evenement.constantes';



/**
* Composant de Gestion des accidents caractéristiques.
* @author 'spie'
*/
@Component({
  selector: 'accident-caracteristiques',
  templateUrl: './accident-caracteristiques.component.html',
  styleUrls: ['./accident-caracteristiques.component.scss']
})
export class AccidentCaracteristiquesComponent implements OnInit  {

  @Input() evenement: Evenement;
  @Input() currentCtx: string; // mode d'accès à la ressource (lecture, edition)
  isCollapsedContent: boolean = true;
  field:{ [key: string]: any };
  naturesChargement: string[];
  causesAccident: string[];
  modeleEvenementCte: { [key: string]: any };


  //----------------------------------------------------------------------------
  //-- INITIALISATION
  //----------------------------------------------------------------------------
  constructor(
    private modeleEvenementService: ModeleEvenementService
  ) { }

  ngOnInit() {
    this.field = FieldEvenementCte.FIELD;
    this.modeleEvenementCte = EvenementCte.INPUT;
    this.naturesChargement = _.values(ModeleEvenementService.enumerations[EvenementCte.INPUT.NATURES_CHARGEMENT].valeursEnumerations);
    this.causesAccident = _.values(ModeleEvenementService.enumerations[EvenementCte.INPUT.CAUSES_ACCIDENT].valeursEnumerations);
  }
}
