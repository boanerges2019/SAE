import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'underscore';
import { FieldEvenementCte } from 'app/core/evenement/constantes/field-evenement.constantes';
import { Evenement } from 'app/shared/models/generic/Evenement';
import { ModeleEvenementService } from 'app/core/evenement/services/modele-evenement.service';
import { EvenementCte } from 'app/core/evenement/constantes/evenement.constantes';



@Component({
  selector: 'accident-industriel-caracteristiques',
  templateUrl: './accident-industriel-caracteristiques.component.html',
  styleUrls: ['./accident-industriel-caracteristiques.component.scss']
})
export class AccidentIndustrielCaracteristiquesComponent implements OnInit {

  @Input() evenement: Evenement;
  @Input() currentCtx: string; // mode d'accès à la ressource (lecture, edition)
  isCollapsedContent: boolean = true;
  field:{ [key: string]: any };
  sitesIndustriel: string[];
  modeleEvenementCte: { [key: string]: any };

  //----------------------------------------------------------------------------
  //-- INITIALISATION
  //----------------------------------------------------------------------------
  constructor(private modeleEvenementService: ModeleEvenementService) { }

  ngOnInit() {
    this.field = FieldEvenementCte.FIELD;
    this.modeleEvenementCte = EvenementCte.INPUT;
    this.sitesIndustriel = _.values(ModeleEvenementService.enumerations[EvenementCte.INPUT.SITES_INDUSTRIEL].valeursEnumerations);
  }
}
