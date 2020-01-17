import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'underscore';
import { ModeleEvenementService } from 'app/core/evenement/services/modele-evenement.service';
import { FieldEvenementCte } from 'app/core/evenement/constantes/field-evenement.constantes';
import { EvenementCte } from 'app/core/evenement/constantes/evenement.constantes';
import { Evenement } from 'app/shared/models/generic/Evenement';

@Component({
  selector: 'stockage-caracteristiques',
  templateUrl: './stockage-caracteristiques.component.html',
  styleUrls: ['./stockage-caracteristiques.component.scss']
})
export class StockageCaracteristiquesComponent implements OnInit {

  @Input() evenement: Evenement;
  @Input() currentCtx: string; // mode d'accès à la ressource (lecture, edition)
  isCollapsedContent: boolean = true;
  field: { [key: string]: any };;
  modesStockage: string[];
  motifsStockage: string[];
  typesVehicule: string[];
  modeleEvenementCte: { [key: string]: any };


  //----------------------------------------------------------------------------
  //-- INITIALISATION
  //----------------------------------------------------------------------------
  constructor(protected modeleEvenementService: ModeleEvenementService) { }

  ngOnInit() {
    this.field = FieldEvenementCte.FIELD;
    this.modeleEvenementCte = EvenementCte.INPUT;
    this.modesStockage = _.values(ModeleEvenementService.enumerations[EvenementCte.INPUT.MODES_STOCKAGE].valeursEnumerations);
    this.motifsStockage = _.values(ModeleEvenementService.enumerations[EvenementCte.INPUT.MOTIFS_STOCKAGE].valeursEnumerations);
    this.typesVehicule = _.values(ModeleEvenementService.enumerations[EvenementCte.INPUT.TYPES_VEHICULES_STOCK].valeursEnumerations);
  }
}
