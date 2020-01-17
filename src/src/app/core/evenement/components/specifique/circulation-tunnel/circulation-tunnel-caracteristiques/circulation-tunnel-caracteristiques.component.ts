import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'underscore';
import { FieldEvenementCte } from 'app/core/evenement/constantes/field-evenement.constantes';
import { Evenement } from 'app/shared/models/generic/Evenement';
import { ModeleEvenementService } from 'app/core/evenement/services/modele-evenement.service';
import { EvenementCte } from 'app/core/evenement/constantes/evenement.constantes';


@Component({
  selector: 'circulation-tunnel-caracteristiques',
  templateUrl: './circulation-tunnel-caracteristiques.component.html',
  styleUrls: ['./circulation-tunnel-caracteristiques.component.scss']
})
export class CirculationTunnelCaracteristiquesComponent implements OnInit {

    @Input() evenement: Evenement;
    @Input() currentCtx: string; // mode d'accès à la ressource (lecture, edition)
    isCollapsedContent: boolean = true;
    field:{ [key: string]: any };
    typesCrue: string[];
    modeleEvenementCte: { [key: string]: any };

    //----------------------------------------------------------------------------
    //-- INITIALISATION
    //----------------------------------------------------------------------------
    constructor(protected modeleEvenementService: ModeleEvenementService) { }

    ngOnInit() {
      this.field = FieldEvenementCte.FIELD;
      this.modeleEvenementCte = EvenementCte.INPUT;
      // TODO Attente disponibilité des données coté back.
      this.typesCrue = _.values(ModeleEvenementService.enumerations[EvenementCte.INPUT.TYPES_CRUE].valeursEnumerations);
    }
  }
