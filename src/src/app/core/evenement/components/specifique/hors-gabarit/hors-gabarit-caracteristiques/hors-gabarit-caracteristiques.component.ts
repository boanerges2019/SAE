import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'underscore';
import { FieldEvenementCte } from 'app/core/evenement/constantes/field-evenement.constantes';
import { EvenementCte } from 'app/core/evenement/constantes/evenement.constantes';
import { Evenement } from 'app/shared/models/generic/Evenement';
import { ModeleEvenementService } from 'app/core/evenement/services/modele-evenement.service';

@Component({
  selector: 'hors-gabarit-caracteristiques',
  templateUrl: './hors-gabarit-caracteristiques.component.html',
  styleUrls: ['./hors-gabarit-caracteristiques.component.scss']
})
export class HorsGabaritCaracteristiquesComponent implements OnInit {

  @Input() evenement: Evenement;
  @Input() currentCtx: string; // mode d'accès à la ressource (lecture, edition)
  isCollapsedContent: boolean = true;
  field:{ [key: string]: any };
  typesVehicules: string[];
  modeleEvenementCte: { [key: string]: any };

  //----------------------------------------------------------------------------
  //-- INITIALISATION
  //----------------------------------------------------------------------------
  constructor(protected modeleEvenementService: ModeleEvenementService) { }

  ngOnInit() {
    this.field = FieldEvenementCte.FIELD;
    this.modeleEvenementCte = EvenementCte.INPUT;
    this.typesVehicules = _.values(ModeleEvenementService.enumerations[EvenementCte.INPUT.TYPES_VEHICULES].valeursEnumerations);
  }
}
