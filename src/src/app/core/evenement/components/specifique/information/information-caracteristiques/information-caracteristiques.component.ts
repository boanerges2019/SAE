import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'underscore';
import { ModeleEvenementService } from 'app/core/evenement/services/modele-evenement.service';
import { FieldEvenementCte } from 'app/core/evenement/constantes/field-evenement.constantes';
import { EvenementCte } from 'app/core/evenement/constantes/evenement.constantes';
import { Evenement } from 'app/shared/models/generic/Evenement';


@Component({
  selector: 'information-caracteristiques',
  providers: [ModeleEvenementService],
  templateUrl: './information-caracteristiques.component.html',
  styleUrls: ['./information-caracteristiques.component.scss']
})
export class InformationCaracteristiquesComponent implements OnInit {

  @Input() evenement: Evenement;
  @Input() currentCtx: string; // mode d'accès à la ressource (lecture, edition)
  isCollapsedContent: boolean = true;
  field: { [key: string]: any };
  modeleEvenementCte: { [key: string]: any };
  typesInformations: string[];

  //----------------------------------------------------------------------------
  //-- INITIALISATION
  //----------------------------------------------------------------------------
  constructor(protected modeleEvenementService: ModeleEvenementService) { }

  ngOnInit() {
    this.field = FieldEvenementCte.FIELD;
    this.modeleEvenementCte = EvenementCte.INPUT;
    this.typesInformations = _.values(ModeleEvenementService.enumerations[EvenementCte.INPUT.TYPES_INFORMATIONS].valeursEnumerations);
  }

}
