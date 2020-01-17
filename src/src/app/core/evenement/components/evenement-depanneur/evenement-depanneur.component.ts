import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { BaseService } from 'app/core/evenement/services/base.service';
import { ModeleEvenementService } from 'app/core/evenement/services/modele-evenement.service';
import { FieldEvenementCte } from 'app/core/evenement/constantes/field-evenement.constantes';
import { EvenementCte } from 'app/core/evenement/constantes/evenement.constantes';
import { Evenement } from 'app/shared/models/generic/Evenement';
import * as _ from 'underscore';
import { ModeleValeur } from 'app/shared/utils/modele-valeur-builder';
import { CtxCte } from 'app/shared/services/constantes/ctx.constantes';



@Component({
  selector: 'evenement-depanneur',
  templateUrl: './evenement-depanneur.component.html',
  styleUrls: ['./evenement-depanneur.component.scss']
})
export class EvenementDepanneurComponent implements OnInit, OnDestroy {

  @Input() evenement: Evenement;
  @Input() currentCtx: string; // mode d'accès à la ressource (lecture, edition)
  subscriptions: Subscription[] = [];
  isCollapsedContent: boolean = true;
  field:{ [key: string]: any };
  listeInterventionsDepanneur: any;
  depanneursAstreinte: string[];
  depanneursMotif: string[];
  depannages: string[];
  depanneurAstreinte: any;
  depanneurMotif: any;
  depannage: any;
  interventionConjointeDepanneur: any;
  idEvenementConjointDepanneur:  any;
  modelDepanneur: any;
  evenementsConjoints: any = ['123405', '123406', '0'];
  modeleEvenementCte: { [key: string]: any };
  contexte: any;

  //----------------------------------------------------------------------------
  //-- INITIALISATION
  //----------------------------------------------------------------------------
  constructor(
      private evenementService: BaseService,
      private modeleEvenementService: ModeleEvenementService
    ) { }

  ngOnInit() {
    this.contexte = CtxCte.CTX;
    this.field = FieldEvenementCte.FIELD;
    this.modeleEvenementCte = EvenementCte.INPUT;
    //this.depanneursAstreinte = _.values(ModeleEvenementService.enumerations[EvenementCte.INPUT.DEPANNEURS_ASTREINTE].valeursEnumerations);
    this.depanneursMotif = _.values(ModeleEvenementService.enumerations[EvenementCte.INPUT.DEPANNEURS_MOTIFS].valeursEnumerations);
    this.depannages = _.values(ModeleEvenementService.enumerations[EvenementCte.INPUT.DEPANNAGES].valeursEnumerations);

    this.modelDepanneur = ModeleValeur.initModel(this.getSubFields(), {});

    if (!this.evenement.attributs[FieldEvenementCte.FIELD.listeInterventionsDepanneur][FieldEvenementCte.FIELD.itemInterventionDepanneur]){
      this.evenement.attributs[FieldEvenementCte.FIELD.listeInterventionsDepanneur][FieldEvenementCte.FIELD.itemInterventionDepanneur] = [];
    }
    this.listeInterventionsDepanneur = this.evenement.attributs[FieldEvenementCte.FIELD.listeInterventionsDepanneur];

    this.load();

  }

    ngOnDestroy() {
      this.subscriptions.forEach(s => s.unsubscribe());
    }

    private load(){
        this.subscriptions.push(this.evenementService.getInterventionsConjointes(this.evenement.identifiant).subscribe(
            response => {                
          }));
    }

  //----------------------------------------------------------------------------
  //-- EVENEMENTS
  //----------------------------------------------------------------------------
  addIntervention(){
    if (!ModeleValeur.isModelNotEmpty(this.modelDepanneur)){
      return;
    }
    let newItem = {};
    newItem[FieldEvenementCte.FIELD.codeInfoModele] = FieldEvenementCte.FIELD.itemInterventionDepanneur;
    newItem = _.extend(newItem, this.modelDepanneur);
    this.listeInterventionsDepanneur[FieldEvenementCte.FIELD.itemInterventionDepanneur].push(newItem);
    this.modelDepanneur = ModeleValeur.initModel(this.getSubFields(), {}); // reset the model.
  }

  /**
  * Permet de supprimer une intervention.
  * @param index indice de l'élément à supprimer.
  */
  removeIntervention(index){
    this.listeInterventionsDepanneur[FieldEvenementCte.FIELD.itemInterventionDepanneur].splice(index, 1);
  }

  //----------------------------------------------------------------------------
  //-- FONCTIONS UTILITAIRES
  //----------------------------------------------------------------------------
  private getSubFields(): string[]{
    return [
      FieldEvenementCte.FIELD.intervenantDepanneur,
      FieldEvenementCte.FIELD.horodateAppelDepanneur,
      FieldEvenementCte.FIELD.horodateArriveeLieuDepanneur,
      FieldEvenementCte.FIELD.horodateQuitteLieuDepanneur,
    ];
  }
}
