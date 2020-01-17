import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'underscore';
import { FieldEvenementCte } from '../../../../../../../app/core/evenement/constantes/field-evenement.constantes';
import { Evenement } from '../../../../../../../app/shared/models/generic/Evenement';
import { ModeleEvenementService } from '../../../../../../../app/core/evenement/services/modele-evenement.service';
import { EvenementCte } from '../../../../../../../app/core/evenement/constantes/evenement.constantes';
import { Objet } from '../../../../../../shared/models/generic/Objet';
import { EnumerationsService } from '../../../../../../shared/services/reference/enumerations.service';


@Component({
  selector: 'basculement-caracteristiques',
  templateUrl: './basculement-caracteristiques.component.html',
  styleUrls: ['./basculement-caracteristiques.component.scss']
})
export class BasculementCaracteristiquesComponent  implements OnInit {

    @Input() evenement: Evenement;
    @Input() currentCtx: string; // mode d'accès à la ressource (lecture, edition)
    isCollapsedContent: boolean = true;
    field:{ [key: string]: any };
    modesDeCirculation: string[];
    modeleEvenementCte: { [key: string]: any };
    listeItpc: { [key: string]: Objet } = {};
    itemsItpc: any[] = [];

    //----------------------------------------------------------------------------
    //-- INITIALISATION
    //----------------------------------------------------------------------------
    constructor(private modeleEvenementService: ModeleEvenementService,
                private enumerationsService: EnumerationsService) { }


    ngOnInit() {
      const nomMethode = 'ngOnInit';

      this.field = FieldEvenementCte.FIELD;
      this.modeleEvenementCte = EvenementCte.INPUT;
      this.modesDeCirculation = _.values(ModeleEvenementService.enumerations[EvenementCte.INPUT.MODES_CIRCULATION].valeursEnumerations);

      //On récupère la liste des ITPC
      this.enumerationsService.getValeursPossiblesByCodeInfoRequetes('LISTE_ITPC').subscribe(
        response => {
            for(let item of response){
                this.listeItpc[item.codeInfo] = item;    
                this.itemsItpc.push(item);      
            }
        }
      );
    }
}
