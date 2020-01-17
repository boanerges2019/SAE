import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'underscore';
import { ModeleEvenementService } from 'app/core/evenement/services/modele-evenement.service';
import { FieldEvenementCte } from 'app/core/evenement/constantes/field-evenement.constantes';
import { EvenementCte } from 'app/core/evenement/constantes/evenement.constantes';
import { Evenement } from 'app/shared/models/generic/Evenement';

@Component({
  selector: 'reseau-area-caracteristiques',
  templateUrl: './reseau-area-caracteristiques.component.html',
  styleUrls: ['./reseau-area-caracteristiques.component.scss']
})
export class ReseauAreaCaracteristiquesComponent implements OnInit {

  @Input() evenement: Evenement;
  @Input() currentCtx: string; // mode d'accès à la ressource (lecture, edition)
  isCollapsedContent: boolean = true;
  field: { [key: string]: any };;
  sousTypesReseauArea: string[];
  directionsReseauArea: string[];
  modeleEvenementCte: { [key: string]: any };


  //----------------------------------------------------------------------------
  //-- INITIALISATION
  //----------------------------------------------------------------------------
  constructor(protected modeleEvenementService: ModeleEvenementService) { }

  ngOnInit() {
    this.field = FieldEvenementCte.FIELD;
    this.modeleEvenementCte = EvenementCte.INPUT;
    this.sousTypesReseauArea = _.values(ModeleEvenementService.enumerations[EvenementCte.INPUT.SOUS_TYPES_RESEAU_AREA].valeursEnumerations);
    this.directionsReseauArea = _.values(ModeleEvenementService.enumerations[EvenementCte.INPUT.DIRECTIONS_RESEAU_AREA].valeursEnumerations);
  }
}
