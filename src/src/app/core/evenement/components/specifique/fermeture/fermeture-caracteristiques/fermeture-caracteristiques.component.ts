import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'underscore';
import { FieldEvenementCte } from '../../../../../../../app/core/evenement/constantes/field-evenement.constantes';
import { EvenementCte } from '../../../../../../../app/core/evenement/constantes/evenement.constantes';
import { Evenement } from '../../../../../../../app/shared/models/generic/Evenement';
import { ModeleEvenementService } from '../../../../../../../app/core/evenement/services/modele-evenement.service';


@Component({
  selector: 'fermeture-caracteristiques',
  templateUrl: './fermeture-caracteristiques.component.html',
  styleUrls: ['./fermeture-caracteristiques.component.scss']
})
export class FermetureCaracteristiquesComponent implements OnInit {

  @Input() evenement: Evenement;
  @Input() currentCtx: string; // mode d'accès à la ressource (lecture, edition)
  isCollapsedContent: boolean = true;
  field:{ [key: string]: any };
  motifsFermeture: string[];
  modeleEvenementCte: { [key: string]: any };

  //----------------------------------------------------------------------------
  //-- INITIALISATION
  //----------------------------------------------------------------------------
  constructor(protected modeleEvenementService: ModeleEvenementService) { }

  ngOnInit() {
    this.field = FieldEvenementCte.FIELD;
    this.modeleEvenementCte = EvenementCte.INPUT;
    this.motifsFermeture = _.values(ModeleEvenementService.enumerations[EvenementCte.INPUT.MOTIFS_FERMETURE].valeursEnumerations);
  }
}
