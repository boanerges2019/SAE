import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'underscore';
import { ModeleEvenementService } from 'app/core/evenement/services/modele-evenement.service';
import { FieldEvenementCte } from 'app/core/evenement/constantes/field-evenement.constantes';
import { EvenementCte } from 'app/core/evenement/constantes/evenement.constantes';
import { Evenement } from 'app/shared/models/generic/Evenement';

@Component({
  selector: 'plan-caracteristiques',
  templateUrl: './plan-caracteristiques.component.html',
  styleUrls: ['./plan-caracteristiques.component.scss']
})
export class PlanCaracteristiquesComponent implements OnInit {

  @Input() evenement: Evenement;
  @Input() currentCtx: string; // mode d'accès à la ressource (lecture, edition)
  isCollapsedContent: boolean = true;
  field:{ [key: string]: any };
  secteursGestionTrafic: string[];
  mesuresGestionTrafic: string[];
  modeleEvenementCte: { [key: string]: any };


  //----------------------------------------------------------------------------
  //-- INITIALISATION
  //----------------------------------------------------------------------------
  constructor(protected modeleEvenementService: ModeleEvenementService) { }

  ngOnInit() {
    this.field = FieldEvenementCte.FIELD;
    this.modeleEvenementCte = EvenementCte.INPUT;
    this.secteursGestionTrafic = _.values(ModeleEvenementService.enumerations[EvenementCte.INPUT.SECTEURS_GESTION_TRAFIC].valeursEnumerations);
    this.mesuresGestionTrafic = _.values(ModeleEvenementService.enumerations[EvenementCte.INPUT.MESURES_GESTION_TRAFIC].valeursEnumerations);
  }
}
