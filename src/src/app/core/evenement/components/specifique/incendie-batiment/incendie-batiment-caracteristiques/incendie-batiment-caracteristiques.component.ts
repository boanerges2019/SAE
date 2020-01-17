import { Component, OnInit, Input } from '@angular/core';
import { FieldEvenementCte } from 'app/core/evenement/constantes/field-evenement.constantes';
import { Evenement } from 'app/shared/models/generic/Evenement';

@Component({
  selector: 'incendie-batiment-caracteristiques',
  templateUrl: './incendie-batiment-caracteristiques.component.html',
  styleUrls: ['./incendie-batiment-caracteristiques.component.scss']
})
export class IncendieBatimentCaracteristiquesComponent implements OnInit {

  @Input() evenement: Evenement;
  @Input() currentCtx: string; // mode d'accès à la ressource (lecture, edition)
  isCollapsedContent: boolean = true;
  field:{ [key: string]: any };

  //----------------------------------------------------------------------------
  //-- INITIALISATION
  //----------------------------------------------------------------------------
  constructor() { }

  ngOnInit() {
    this.field = FieldEvenementCte.FIELD;
  }
}
