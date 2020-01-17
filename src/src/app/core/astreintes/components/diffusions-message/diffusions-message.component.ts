import { Component, Input, OnInit } from '@angular/core';
import { AbstractTab } from '../../../../shared/components/abstract-tab/abstract-tab';
import { AstreinteService } from '../../services/astreintes.service';
import { Planification } from '../../../../shared/models/generic/models';
import { CesamPlanificationCte } from '../../../../shared/components/planification/cesam-planification.constantes';
import { DiffusionMessageTest } from './diffusion-message-test';
import { CompteRenduDiffusion } from './cr-diffusion';
import { Subscription } from 'rxjs';
import { EventManagerCte } from '../../../../shared/services/constantes/event-manager.constantes';
import { EventManager } from '../../../../shared/services/event/event-manager.service';
import { AstreintesCte } from '../../constantes/astreintes-constantes';
import { CtxCte } from 'app/shared/services/constantes/ctx.constantes';

@Component({
  selector: 'diffusions-message',
  templateUrl: './diffusions-message.component.html',
  styleUrls: ['./diffusions-message.component.scss']
})
export class DiffusionsMessageComponent extends AbstractTab implements OnInit {

  subscriptions:Subscription[] = [];
  modificationEnCours: boolean = false;

  model: any = {};
  data: any = {};  // données saisie par le user.
  journees: any[] = [];
  plagesHoraires: any[] = [];

  planification: Planification;

  derniereDiffusion: DiffusionMessageTest;
  compteRendus: Array<CompteRenduDiffusion> = [];

  constructor(private astreinteService: AstreinteService,
              private eventManager:EventManager) {
    super();
  }

  ngOnInit() {

      this.model.field = AstreintesCte.FIELDS;
      this.model.currentCtx = CtxCte.CTX.ASTREINTES_DIFFUSSION_MESSAGES;
      this.model.contexte = CtxCte.CTX;
      this.model.configCte =  AstreintesCte;

    //On charge la planification de diffusion de message vocal de test d'astreinte
    this.astreinteService.getPlanificationDiffusionMessageVocalTestAstreinte().subscribe(
      response => {
        this.planification = response;
        this.initDataPlanif();
      }
    );


    this.initJournnee();
    this.initPlagesHoraires();
    this.initDataPlanif();
    //this.model.currentCtx = this.currentCtx || CtxCte.CTX.PLANIFICATION_MACRO;
    /*this.model.field = CesamPlanificationCte.FIELD;
    this.model.configCte = CesamPlanificationCte;*/

    this.modificationEnCours = false;


    //On s'abonne aux notifications des diffusions de messages vocaux
    this.subscriptions.push(this.eventManager.subscribe(EventManagerCte.EVENT_NAME.messageVocalEvent,
      (response) => {
        console.log('Diffusion  : réception notif websocket ' + JSON.stringify(response));
        //On recharge le planning d'astreinte
        this.refreshDerniereDiffusion();
      }));

  }


  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.subscriptions.length = 0;
 }



  private initPlagesHoraires() {
    this.data.heureDebut = CesamPlanificationCte.PLAGES_HORAIRES[0];
    this.data.heureFin = CesamPlanificationCte.PLAGES_HORAIRES[0];
    this.plagesHoraires = CesamPlanificationCte.PLAGES_HORAIRES;
  }

  private initJournnee() {
    this.journees = CesamPlanificationCte.JOURNEES;
  }


  private initDataPlanif() {

    if (this.planification) {
      this.data = {

        "lundi": this.planification.lundi,
        "mardi": this.planification.mardi,
        "mercredi": this.planification.mercredi,
        "jeudi": this.planification.jeudi,
        "vendredi": this.planification.vendredi,
        "samedi": this.planification.samedi,
        "dimanche": this.planification.dimanche,
        "heureDebut": this.plagesHoraires.find(pl => pl.horaire === this.planification.heureDeDebut),
      };
    } else {
      this.data = {
        "lundi": false,
        "mardi": false,
        "mercredi": false,
        "jeudi": false,
        "vendredi": false,
        "samedi": false,
        "dimanche": false,
        "heureDebut": undefined,
      };
    }
    this.journees.forEach(journee => journee.isActive = this.data[journee.model]);
  }

  public selectJournee(journee: any) {
    journee.isActive = !journee.isActive;
    this.data[journee.model] = journee.isActive;
    this.modificationEnCours = true;
  }

  modifierCalendrierPlanification() {
    const nomMethode = 'modifierCalendrierPlanification';
    console.log(nomMethode);
    //Appel de la méthode de modification de la planification

    let nouvellePlanification: Planification = {
      "horodateProchaineExecutionDebut": this.planification.horodateProchaineExecutionDebut,
      "horodateProchaineExecutionFin": this.planification.horodateProchaineExecutionFin,
      "lundi": this.data.lundi,
      "mardi": this.data.mardi,
      "mercredi": this.data.mercredi,
      "jeudi": this.data.jeudi,
      "vendredi": this.data.vendredi,
      "samedi": this.data.samedi,
      "dimanche": this.data.dimanche,
      "jourFerie": this.planification.jourFerie,
      "dateDebut": this.planification.dateDebut,
      "dateFin": this.planification.dateFin,
      "heureDeDebut": this.data.heureDebut.horaire,
      "heureDeFin": this.planification.heureDeFin,
      "demandeConfirmationDebut": this.planification.demandeConfirmationDebut,
      "demandeConfirmationFin": this.planification.demandeConfirmationFin
    }


    //On invoke le service de mise à jour de la planification
    this.astreinteService.updatePlanificationDiffusion(nouvellePlanification).subscribe(
      //Mise à jour de la planification courante en cas de succès
      response => {
        this.planification = nouvellePlanification;
        this.initDataPlanif();
        this.modificationEnCours = false;
      }
    );
  }

  annuler() {
    const nomMethode = 'annuler';
    console.log(nomMethode);
    this.initDataPlanif();
    this.modificationEnCours = false;
  }

  forcerDiffusionMessageVocal() {
    const nomMethode = 'forcerDiffusionMessageVocal';
    console.log(nomMethode);

    //Appel de la méthode de forçage d'exécution de la diffusion
    this.astreinteService.forcerDiffusionMessageVocalTest().subscribe();
    //on devrait recevoir le retour par websocket pour mettre à jour
    //Le compte rendu

  }


  refreshDerniereDiffusion(){
    this.astreinteService.getPlanificationDiffusionMessageVocalTestAstreinte().subscribe(
      response => {
        this.derniereDiffusion = response;
        //Et on met à jour la liste des comptes rendus
        if(this.derniereDiffusion){
          this.refreshCompteRenduDerniereDiffusion(this.derniereDiffusion.ID_COMMUNICATION);
        }
      }
    );
  }

  refreshCompteRenduDerniereDiffusion(idDiffusion: number){
    this.astreinteService.getCompteRenduDiffusionMessageVocalTest(idDiffusion).subscribe(
      response => {
        this.compteRendus = response
      }
    );
  }

}
