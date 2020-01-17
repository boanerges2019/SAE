import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'underscore';
import { FieldEvenementCte } from '../../../../../../../app/core/evenement/constantes/field-evenement.constantes';
import { EvenementCte } from '../../../../../../../app/core/evenement/constantes/evenement.constantes';
import { Evenement } from '../../../../../../../app/shared/models/generic/Evenement';
import { ModeleEvenementService } from '../../../../../../../app/core/evenement/services/modele-evenement.service';

@Component({
  selector: 'balisage-caracteristiques',
  templateUrl: './balisage-caracteristiques.component.html',
  styleUrls: ['./balisage-caracteristiques.component.scss']
})
export class BalisageCaracteristiquesComponent implements OnInit {

  @Input() evenement: Evenement;
  @Input() currentCtx: string; // mode d'accès à la ressource (lecture, edition)
  isCollapsedContent: boolean = false;
  field:{ [key: string]: any };
  modeleEvenementCte: { [key: string]: any };
  typesBalisages: string[];
  motifsBalisages: string[];

  //----------------------------------------------------------------------------
  //-- INITIALISATION
  //----------------------------------------------------------------------------
  constructor(protected modeleEvenementService: ModeleEvenementService) { }

  ngOnInit() {
    const nomMethode = 'BalisageCaracteristiquesComponent.ngOnInit';

    this.field = FieldEvenementCte.FIELD;
    this.modeleEvenementCte = EvenementCte.INPUT;
    this.typesBalisages = _.values(ModeleEvenementService.enumerations[EvenementCte.INPUT.TYPE_BALISAGE].valeursEnumerations);
    this.motifsBalisages = _.values(ModeleEvenementService.enumerations[EvenementCte.INPUT.MOTIF_BALISAGE].valeursEnumerations);    
    console.log(nomMethode + ' : ctx = '+this.currentCtx);

  }
}
