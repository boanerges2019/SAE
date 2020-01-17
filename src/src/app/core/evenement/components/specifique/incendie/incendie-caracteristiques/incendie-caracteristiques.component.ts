import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'underscore';
import { ModeleEvenementService } from 'app/core/evenement/services/modele-evenement.service';
import { FieldEvenementCte } from 'app/core/evenement/constantes/field-evenement.constantes';
import { EvenementCte } from 'app/core/evenement/constantes/evenement.constantes';
import { Evenement } from 'app/shared/models/generic/Evenement';

@Component({
  selector: 'incendie-caracteristiques',
  providers: [ModeleEvenementService],
  templateUrl: './incendie-caracteristiques.component.html',
  styleUrls: ['./incendie-caracteristiques.component.scss']
})
export class IncendieCaracteristiquesComponent  implements OnInit {

  @Input() evenement: Evenement;
  @Input() currentCtx: string; // mode d'accès à la ressource (lecture, edition)
  isCollapsedContent: boolean = true;
  field:{ [key: string]: any };
  naturesChargement: string[];
  causesIncendie: string[];
  modeleEvenementCte: { [key: string]: any };

  //----------------------------------------------------------------------------
  //-- INITIALISATION
  //----------------------------------------------------------------------------
  constructor(protected modeleEvenementService: ModeleEvenementService) { }

  ngOnInit() {
    this.field = FieldEvenementCte.FIELD;
    this.modeleEvenementCte = EvenementCte.INPUT;
    this.naturesChargement = _.values(ModeleEvenementService.enumerations[EvenementCte.INPUT.NATURES_CHARGEMENT].valeursEnumerations);
    this.causesIncendie = _.values(ModeleEvenementService.enumerations[EvenementCte.INPUT.CAUSES_INCENDIE].valeursEnumerations);
  }
}
