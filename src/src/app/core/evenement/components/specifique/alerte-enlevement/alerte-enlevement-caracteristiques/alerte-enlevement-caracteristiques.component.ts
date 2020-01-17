import { Component, OnInit, Input } from '@angular/core';
import { FieldEvenementCte } from 'app/core/evenement/constantes/field-evenement.constantes';
import { Evenement } from 'app/shared/models/generic/Evenement';
import { ModeleEvenementService } from 'app/core/evenement/services/modele-evenement.service';
import { EvenementCte } from 'app/core/evenement/constantes/evenement.constantes';



@Component({
  selector: 'alerte-enlevement-caracteristiques',
  templateUrl: './alerte-enlevement-caracteristiques.component.html',
  styleUrls: ['./alerte-enlevement-caracteristiques.component.scss']
})
export class AlerteEnlevementCaracteristiquesComponent implements OnInit {

    @Input() evenement: Evenement;
    @Input() currentCtx: string; // mode d'accès à la ressource (lecture, edition)
    isCollapsedContent: boolean = true;
    field:{ [key: string]: any };

    //----------------------------------------------------------------------------
    //-- INITIALISATION
    //----------------------------------------------------------------------------
    constructor(private modeleEvenementService: ModeleEvenementService) { }

    ngOnInit() {
      this.field = FieldEvenementCte.FIELD;
    }
}
