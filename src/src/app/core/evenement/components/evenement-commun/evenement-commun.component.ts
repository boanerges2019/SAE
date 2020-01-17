import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'underscore';
import { Evenement } from '../../../../../app/shared/models/generic/Evenement';
import { FieldEvenementCte } from '../../../../../app/core/evenement/constantes/field-evenement.constantes';
import { ModeleEvenementService } from '../../../../../app/core/evenement/services/modele-evenement.service';
import { EvenementCte } from '../../../../../app/core/evenement/constantes/evenement.constantes';
import { ModeleValeur } from '../../../../../app/shared/utils/modele-valeur-builder';

@Component({
  selector: 'evenement-commun',
  templateUrl: './evenement-commun.component.html',
  styleUrls: ['./evenement-commun.component.scss']
})
export class EvenementCommunComponent implements OnInit {

  @Input() evenement: Evenement;
  @Input() currentCtx: string; // mode d'accès à la ressource (lecture, edition)
  isCollapsedContent: boolean = false;
  horodateDebutPrevueRequired: boolean;
  origines: string[];
  field:{ [key: string]: any };
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
    this.origines = _.values(ModeleEvenementService.enumerations[EvenementCte.INPUT.ORIGINES].valeursEnumerations);
    this.horodateDebutPrevueRequired = FieldEvenementCte.ETAT[FieldEvenementCte.FIELD.horodateDebutPrevue].indexOf(this.evenement[FieldEvenementCte.FIELD.etat]) > -1;

    /**
     *  this.enumerationsService.getEnumerations(EvenementCte.INPUT.ORIGINES).subscribe(
         response => {
             this.origines  = response["valeursEnumerations"];
         }
     );
     */
  }
}
