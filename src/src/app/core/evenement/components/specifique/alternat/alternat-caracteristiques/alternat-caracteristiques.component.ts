import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'underscore';
import { FieldEvenementCte } from 'app/core/evenement/constantes/field-evenement.constantes';
import { Evenement } from 'app/shared/models/generic/Evenement';
import { ModeleEvenementService } from 'app/core/evenement/services/modele-evenement.service';
import { EvenementCte } from 'app/core/evenement/constantes/evenement.constantes';


@Component({
  selector: 'alternat-caracteristiques',
  templateUrl: './alternat-caracteristiques.component.html',
  styleUrls: ['./alternat-caracteristiques.component.scss']
})
export class AlternatCaracteristiquesComponent implements OnInit {

  @Input() evenement: Evenement;
  @Input() currentCtx: string; // mode d'accès à la ressource (lecture, edition)
  isCollapsedContent: boolean = true;
  field:{ [key: string]: any };
  planificationsAlternat: string[];
  alternatExceptionnel: boolean;
  modeleEvenementCte: { [key: string]: any };

  //----------------------------------------------------------------------------
  //-- INITIALISATION
  //----------------------------------------------------------------------------
  constructor(private modeleEvenementService: ModeleEvenementService) { }


  ngOnInit() {
    this.field = FieldEvenementCte.FIELD;
    this.modeleEvenementCte = EvenementCte.INPUT;
    this.planificationsAlternat = _.values(ModeleEvenementService.enumerations[EvenementCte.INPUT.PLANIFICATIONS_ALTERNAT].valeursEnumerations);
  }
}
