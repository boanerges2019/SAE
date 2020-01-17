import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'underscore';
import { FieldEvenementCte } from '../../../../../../../app/core/evenement/constantes/field-evenement.constantes';
import { Evenement } from '../../../../../../../app/shared/models/generic/Evenement';
import { ModeleEvenementService } from '../../../../../../../app/core/evenement/services/modele-evenement.service';
import { EvenementCte } from '../../../../../../../app/core/evenement/constantes/evenement.constantes';


@Component({
  selector: 'bouchon-caracteristiques',
  templateUrl: './bouchon-caracteristiques.component.html',
  styleUrls: ['./bouchon-caracteristiques.component.scss']
})
export class BouchonCaracteristiquesComponent implements OnInit {

    @Input() evenement: Evenement;
    @Input() currentCtx: string; // mode d'accès à la ressource (lecture, edition)
    isCollapsedContent: boolean = true;
    field:{ [key: string]: any };
    typesBouchon: string[];
    naturesBouchon: string[];
    modeleEvenementCte: { [key: string]: any };

    //----------------------------------------------------------------------------
    //-- INITIALISATION
    //----------------------------------------------------------------------------
    constructor(protected modeleEvenementService: ModeleEvenementService) { }

    ngOnInit() {
      const nomMethode = 'BouchonCaracteristiquesComponent.ngOnInit';

      this.field = FieldEvenementCte.FIELD;
      this.modeleEvenementCte = EvenementCte.INPUT;
      this.typesBouchon = _.values(ModeleEvenementService.enumerations[EvenementCte.INPUT.TYPES_BOUCHON].valeursEnumerations);
      this.naturesBouchon = _.values(ModeleEvenementService.enumerations[EvenementCte.INPUT.NATURES_BOUCHON].valeursEnumerations);

      console.log(nomMethode + ' : ctx = '+this.currentCtx);

    }
}
