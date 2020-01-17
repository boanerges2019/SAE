import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'underscore';
import { FieldEvenementCte } from 'app/core/evenement/constantes/field-evenement.constantes';
import { Evenement } from 'app/shared/models/generic/Evenement';
import { ModeleEvenementService } from 'app/core/evenement/services/modele-evenement.service';
import { EvenementCte } from 'app/core/evenement/constantes/evenement.constantes';


@Component({
  selector: 'crue-caracteristiques',
  templateUrl: './crue-caracteristiques.component.html',
  styleUrls: ['./crue-caracteristiques.component.scss']
})
export class CrueCaracteristiquesComponent implements OnInit {

  @Input() evenement: Evenement;
  @Input() currentCtx: string; // mode d'accès à la ressource (lecture, edition)
  isCollapsedContent: boolean = true;
  field:{ [key: string]: any };
  degatsAuxDomaines: boolean;
  typesCrue: string[];
  modeleEvenementCte: { [key: string]: any };

  //----------------------------------------------------------------------------
  //-- INITIALISATION
  //----------------------------------------------------------------------------
  constructor(protected modeleEvenementService: ModeleEvenementService) { }

  ngOnInit() {
    this.field = FieldEvenementCte.FIELD;
    this.modeleEvenementCte = EvenementCte.INPUT;
    this.typesCrue = _.values(ModeleEvenementService.enumerations[EvenementCte.INPUT.TYPES_CRUE].valeursEnumerations);
  }
}
