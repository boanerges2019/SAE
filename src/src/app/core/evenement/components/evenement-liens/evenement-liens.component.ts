import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { Evenement } from 'app/shared/models/generic/Evenement';
import { BaseService } from 'app/core/evenement/services/base.service';
import { FieldEvenementCte } from 'app/core/evenement/constantes/field-evenement.constantes';
import { LABELS } from './labels';
import { ModeleValeur } from 'app/shared/utils/modele-valeur-builder';
import { EvenementCte } from 'app/core/evenement/constantes/evenement.constantes';
import { EventManager } from 'app/shared/services/event/event-manager.service';
import { EventManagerCte } from 'app/shared/services/constantes/event-manager.constantes';
import { CtxCte } from 'app/shared/services/constantes/ctx.constantes';

@Component({
  selector: 'evenement-liens',
  templateUrl: './evenement-liens.component.html',
  styleUrls: ['./evenement-liens.component.scss']
})
export class EvenementLiensComponent implements OnInit {

  @Input() evenement: Evenement;
  @Input() currentCtx: string; // mode d'accès à la ressource (lecture, edition)

  isCollapsedContent: boolean = false;
  subscriptions: Subscription[] = [];
  model: any = {}
  typeEntities: any // [listeEvevenemens, listeBalisages]
  currentEntity: string // [listeEvevenemens, listeBalisages]
  added: any[] = []// item deja ajoutés dans les entités.
  available: any[] = [] // item disponibles.
  allEntities: any[] = []// tous les evenements ou tous les balisages
  entiteRattachee: any;

  constructor(
      public evenementService: BaseService,
      public router:Router,
      public eventManager:EventManager) {}

  ngOnInit() {
      this.model.field = FieldEvenementCte.FIELD;
      this.model.contexte = CtxCte.CTX;
      this.model.i18n = LABELS;

      this.model.alerteSource = this.model.evenementCause = {};
      this.model.alertesLiees = [];

      this.model.currentCtx = this.currentCtx;

      this.initAttribut();

      if (this.evenement.attributs[FieldEvenementCte.FIELD.evenementCause]  &&
          this.evenement.attributs[FieldEvenementCte.FIELD.evenementCause].codeValeur &&
      this.evenement.attributs[FieldEvenementCte.FIELD.evenementCause].valeur){
          this.getEvenementCause(+this.evenement.attributs[FieldEvenementCte.FIELD.evenementCause].valeur);
      }

      this.getListeEvenementWithoutCause();
      this.getAlertesLiees(this.evenement.identifiant);
  }

  private initAttribut(){

    this.evenement.alertesADelier = this.evenement.alertesADelier || [];
    if (this.evenement.codeModele === EvenementCte.EVT_BAL){
        this.currentEntity = 'balisage';
        this.evenement.attributs[FieldEvenementCte.FIELD.listeEvenements][FieldEvenementCte.FIELD.itemEvenement] =
            this.evenement.attributs[FieldEvenementCte.FIELD.listeEvenements][FieldEvenementCte.FIELD.itemEvenement] || [];
            this.added = this.evenement.attributs[FieldEvenementCte.FIELD.listeEvenements][FieldEvenementCte.FIELD.itemEvenement];
            this.getResumesEvenements(EvenementCte.EVT_EVT, EvenementCte.ETATS_EVENEMENT.enCours);
    } else {
        this.currentEntity = 'evenement';
        this.evenement.attributs[FieldEvenementCte.FIELD.listeBalisages][FieldEvenementCte.FIELD.itemBalisage] =
            this.evenement.attributs[FieldEvenementCte.FIELD.listeBalisages][FieldEvenementCte.FIELD.itemBalisage] || [];
            this.added = this.evenement.attributs[FieldEvenementCte.FIELD.listeBalisages][FieldEvenementCte.FIELD.itemBalisage]
            this.getResumesEvenements(EvenementCte.EVT_BAL, EvenementCte.ETATS_EVENEMENT.enCours);
    }
    this.typeEntities = {
        balisage: {
            listeEntities: FieldEvenementCte.FIELD.listeEvenements,
            itemEntity: FieldEvenementCte.FIELD.itemEvenement,
            entiteRattachee: FieldEvenementCte.FIELD.evenementRattache
        },
        evenement: {
            listeEntities: FieldEvenementCte.FIELD.listeBalisages,
            itemEntity: FieldEvenementCte.FIELD.itemBalisage,
            entiteRattachee: FieldEvenementCte.FIELD.balisageRattache
        }

    };

  }

  /**
   * Récupère la liste des evenements ou balisages.
   * @param  {string} type [description]
   * @param  {string} etat [description]
   * @param  {string} field [description]
   * @return {[type]}       [description]
   */
  private getResumesEvenements(type: string, etat: string){
       this.subscriptions.push(this.evenementService.getResumes(type, etat)
         .subscribe(response => {
           if (response){
             this.available = response;
             this.allEntities = response;
           }
       }));
  }

  /**
  * Récupération de l'evt cause
  * @param identifiant de l'evt cause
  */
  private getEvenementCause(identifiant: number){
    this.subscriptions.push(this.evenementService.getEvenement(identifiant)
      .subscribe((response) => {
        if (response){
          this.model.evenementCause = response;
        }
    }));
  }


   /**
    *  Récupération de liste des événements qui n'ont pas d'événement cause.
    * @param  {[type]} identifiant [description]
    * @return {[type]}             [description]
    */
    private getListeEvenementWithoutCause(){
      this.subscriptions.push(this.evenementService.getListeEvenementWithoutCause()
        .subscribe(response => {
          if (response){
            this.model.listeEvenementWithoutCause = response.filter(item => item.idenifiant !== this.evenement.identifiant);
          }
      }));
    }


  /**
   * Traite l'alerte source de l'événement.
   * @param  {any[]}  listeAlertes
   * @return {[type]}      [description]
   */
   private resolveAlerteSource(listeAlertes: any[]){
       if (!listeAlertes || listeAlertes.length < 1) return;
       listeAlertes.forEach(item => {
           if (item.idEvenementGenere){
               this.model.alerteSource = item;
           }
       })
   }

  /**
  * Récupération de la liste des alertes liées.
  * @param identifiant de l'evt.
  */
  private getAlertesLiees(identifiant: number){
    this.subscriptions.push(this.evenementService.getAlertesLiees(identifiant)
      .subscribe((response) => {
        if (response){
          this.model.alertesLiees = response;
          this.resolveAlerteSource(response)
        }
      }))
  }

  public updateEvenementCause(evenementCause){
      ModeleValeur.setValue(this.evenement.attributs[FieldEvenementCte.FIELD.evenementCause], evenementCause.identifiant);
      this.model.evenementCause = this.evenement.attributs[FieldEvenementCte.FIELD.evenementCause];
  }


/**
 * Casse le lien evenemen t<=> alerte.
 * @param  {number} identifiant [description]
 * @return {[type]}             [description]
 */

  public cancelLink(identifiant: number){
      this.model.alertesLiees = this.model.alertesLiees.filter(item => item.identifiant !== identifiant);
      this.evenement.alertesADelier.push(identifiant);
  }

  public addToAlreadyAdded(item: any){
      //pushToAdd
      let entiteRattachee  = this.buildItem(item);
      this.evenement.attributs[this.typeEntities[this.currentEntity].listeEntities][this.typeEntities[this.currentEntity].itemEntity].push(entiteRattachee);

      // removeFromAvailable
      this.available = this.available.filter(a => a.identifiant !== item.identifiant);
  }

    public removeFromAlreadyAdded(item: any){
        //pushToAvailable
        let identifiant = item[this.typeEntities[this.currentEntity].entiteRattachee].valeur;
        let originalItem = undefined;
        if(this.allEntities && this.allEntities.length > 0){
            for(let i=0; i < this.allEntities.length; i++){
                if(this.allEntities[i].identifiant===identifiant){
                    originalItem = this.allEntities[i];
                    break;
                }
            }
        }
        if(originalItem){
            this.available.unshift(originalItem);
        }
        // remove from added
        this.added = this.added.filter( entity => {
            return entity[this.typeEntities[this.currentEntity].entiteRattachee].valeur !== identifiant;
        });
        this.evenement.attributs[this.typeEntities[this.currentEntity].listeEntities][this.typeEntities[this.currentEntity].itemEntity] = this.added;
    }


    private buildItem(item: any){
        let result = {};
        result[this.typeEntities[this.currentEntity].entiteRattachee] =  {
                "valeur": item.identifiant,                   // <------------ identifiant du balisage rattaché
                "description": item.description || item.nomLocalisant,
                "nom": item.nom || item.nomLocalisant,
                "codeInfoModele": "EVT.BALISAGE_RATTACHE"
        }
        return result;
    }

    public gotoEvenement(evenement){
        if (this.currentEntity === 'evenement'){
            this.router.navigate(['/balisages', { idEvenement: evenement[FieldEvenementCte.FIELD.balisageRattache].valeur, type: 'BAL'}])
        } else {
            this.router.navigate(['/situation-courante', { idEvenement: evenement[FieldEvenementCte.FIELD.evenementRattache].valeur}])
        }
    }


    public loadAnotherEvenement(identifiant){
        //this.router.navigate(['/situation-courante', { idEvenement: identifiant}]);
        this.eventManager.broadcast({
            name: EventManagerCte.EVENT_NAME.loadAnotherEvenement,
            content: {identifiant: identifiant}
        });
    }
}
