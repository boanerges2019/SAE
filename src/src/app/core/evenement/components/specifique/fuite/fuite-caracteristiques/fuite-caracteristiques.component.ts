import { Component, OnInit, Input } from '@angular/core';
import { FieldEvenementCte } from '../../../../../../../app/core/evenement/constantes/field-evenement.constantes';
import { EvenementCte } from '../../../../../../../app/core/evenement/constantes/evenement.constantes';
import { Evenement } from '../../../../../../../app/shared/models/generic/Evenement';
import { ModeleEvenementService } from '../../../../../../../app/core/evenement/services/modele-evenement.service';


@Component({
  selector: 'fuite-caracteristiques',
  templateUrl: './fuite-caracteristiques.component.html',
  styleUrls: ['./fuite-caracteristiques.component.scss']
})
export class FuiteCaracteristiquesComponent implements OnInit {

  @Input() evenement: Evenement;
  @Input() currentCtx: string; // mode d'accès à la ressource (lecture, edition)
  isCollapsedContent: boolean = true;
  field:{ [key: string]: any };
  modeleEvenementCte: { [key: string]: any };

  //----------------------------------------------------------------------------
  //-- INITIALISATION
  //----------------------------------------------------------------------------
  constructor(protected modeleEvenementService: ModeleEvenementService) { }

  ngOnInit() {
    this.field = FieldEvenementCte.FIELD;
    this.modeleEvenementCte = EvenementCte.INPUT;
  }
}
