import { Component, OnInit, Input } from '@angular/core';
import { AstreinteService } from '../../services/astreintes.service';
import { PlanningAstreinte, CelluleAstreinte, GroupeAstreinte } from '../../../../shared/models/generic/models';
import { PlageHoraireAstreinte } from '../../../../shared/models/generic/PlageHoraireAstreinte';
import * as moment from 'moment';
import { Ressource } from '../../../../shared/models/generic/Ressource';
import { NgSelectOption, FormsModule  } from '@angular/forms';
import { EventManager } from '../../../../shared/services/event/event-manager.service';
import { AnnuaireCte } from '../../../annuaires/constantes/annuaire.constantes';
import { AbstractTab } from '../../../../shared/components/abstract-tab/abstract-tab';
import { AstreinteWebsocketService } from '../../services/astreintes-websocket.service';
import { Subscription } from 'rxjs';
import { EventManagerCte } from '../../../../shared/services/constantes/event-manager.constantes';
import { AstreintesCte } from '../../constantes/astreintes-constantes';
import { CtxCte } from 'app/shared/services/constantes/ctx.constantes';

@Component({
  selector: 'suivi-astreintes',
  templateUrl: './suivi-astreintes.component.html',
  styleUrls: ['./suivi-astreintes.component.scss', './timetable.scss']
})
export class SuiviAstreintesComponent  extends AbstractTab implements OnInit {

  @Input() lectureSeule: boolean = false;
  @Input() classiqueEnCours: boolean = true;
  @Input() multipleEnCours: boolean = false;
  duree: number = 1;

  subscriptions:Subscription[] = [];


  hdPlanningSimple: Date = new Date();
  hdPlanningMultiple: Date = new Date();
  libelleDate: String = 'Aujourd\'hui';

  // Les groupes d'astreinte
  groupeSimples: Array<GroupeAstreinte> = [];
  groupeMultiples: Array<GroupeAstreinte> = [];
  groupeEnCours: Array<GroupeAstreinte> = this.groupeSimples;

  // Les plannings
  planningSimples: Map<String, PlanningAstreinte> = new Map();
  planningMultiples: Map<String, PlanningAstreinte> = new Map();
  planningEnCours: Map<String, PlanningAstreinte> = this.planningSimples;


  //L'astreinte séléctionnée
  groupeAstreinteSelectionne: GroupeAstreinte;
  intervenantsGroupeAstreinteSelectionne: Array<Ressource> = [];
  codeIntervenantSelectionne: string = '';

  model:any={};

  nbDailyEvenements;
  constructor(private astreinteService: AstreinteService,
              private eventManager:EventManager) {
    super();
  }

  ngOnInit() {

      this.model.field = AstreintesCte.FIELDS;
      this.model.currentCtx = CtxCte.CTX.ASTREINTES;
      this.model.contexte = CtxCte.CTX;
      this.model.configCte =  AstreintesCte;
    const nomMethode = 'SuiviAstreintesComponent.ngOnInit';


    // On charge les groupes d'astreintes
    this.chargerGroupeAstreintes();

    // On initialise avec les planning du jours
    this.refreshPlanningAstreintes(false, this.hdPlanningSimple);
    this.refreshPlanningAstreintes(true, this.hdPlanningMultiple);

    // On se met sur les astreintes classiques par défaut
    this.changeOnglet(this.classiqueEnCours, this.multipleEnCours);


    //On s'abonne aux notifications de modification des astreintes
    this.subscriptions.push(this.eventManager.subscribe(EventManagerCte.EVENT_NAME.astreintesUpdatedEvent,
      (response) => {
        console.log('Suivi astreinte : réception notif websocket ' + JSON.stringify(response));
        //On recharge le planning d'astreinte
        this.rechargerPlanning();
    }));


  }


  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.subscriptions.length = 0;
  }



  public sethdPlanningSimple(hd: Date) {
    this.hdPlanningSimple = hd;
    this.refreshPlanningAstreintes(false, this.hdPlanningSimple);
  }

  public sethdPlanningMultiple(hd: Date) {
    this.hdPlanningMultiple = hd;
    this.refreshPlanningAstreintes(true, this.hdPlanningMultiple);
  }



  private chargerGroupeAstreintes() {
    const nomMethode = 'chargerGroupeAstreintes';

    // On vide les tableaux
    this.groupeMultiples.length = 0;
    this.groupeSimples.length = 0;

    // On récupère les groupes d'astreintes sue le serveur

    this.astreinteService.getGroupeAstreintes().subscribe(
      response => {

        if (Object.keys(response)) {
          for (const key of Object.keys(response)) {
            const ga: GroupeAstreinte = response[key];
            if ( ga.multiple === true) {
              this.groupeMultiples.push(ga);
            } else {
              this.groupeSimples.push(ga);
            }
          }
          this.groupeEnCours = this.groupeSimples;
          if ( this.multipleEnCours ) {
            this.groupeEnCours = this.groupeMultiples;
          }
          console.debug(nomMethode + ' : ' + JSON.stringify(this.groupeEnCours));
        }
      }
    );


    // On trie les tableaux
    this.groupeSimples.sort((a1, a2) => a1.nom.localeCompare(a2.nom));
    this.groupeMultiples.sort((a1, a2) => a1.nom.localeCompare(a2.nom));

  }


  private refreshPlanningAstreintes(multiple: boolean, hd: Date) {
    const nomMethode = 'refreshPlanningAstreintes';

    const plannings: Map<String, PlanningAstreinte> = multiple ? this.planningMultiples : this.planningSimples;
    plannings.clear();
    this.astreinteService.getPlanningAstreintes(multiple, hd).subscribe(
      response => {
        console.debug(nomMethode + ' : ' + JSON.stringify(response));
        if (Object.keys(response)) {
          for (const key of Object.keys(response)) {
            const pl: PlanningAstreinte = response[key];
            this.calculPlagesHoraires(pl);
            plannings.set(key, pl);
          }
        }
        this.selectionnerGroupeAstreinte(this.groupeEnCours[0]);
      }
    );
  }



  private calculPlagesHoraires(planning: PlanningAstreinte) {
    const nomMethode = 'calculPlagesHoraires';

    const retour: Array<PlageHoraireAstreinte> = [];
    const hds: Array<Date> =  [];
    const hdLimites: Array<Date> =  this.getHorodateFiltre();

    // On parcours les cellules d'astreintes pour déterminer des plages d'astreintes disjointes
    for ( const cell of planning.cellules){
      let hd1: Date = moment( cell.horodateDebut).toDate();
      let hd2: Date = moment( cell.horodateFin).toDate();
      hd1.setSeconds(0, 0);
      if (hd1 < hdLimites[0]) {
          hd1 = hdLimites[0];
      }
      hd2.setSeconds(59, 0);
      if (hd2 > hdLimites[1]) {
        hd2 = hdLimites[1];
      }
      hds.push(hd1);
      hds.push(hd2);
    }

    // On trie le tableau des horodate par ordre chronologique
    hds.sort((h1 , h2) => h1.getTime() - h2.getTime());


    // On parcours le tableau pour construire les plages horaires
    let idx = 0;

    while ( idx < hds.length) {
      const hd1 = hds[idx];
      while (idx < hds.length && (hds[idx].getTime() - hd1.getTime()  < 59001) ) {
        idx++;
      }
      if (idx < hds.length) {
        const hd2 = hds[idx];
        const plage = new PlageHoraireAstreinte(hd1, hd2);
        retour.push(plage);
      }
    }


    // Dispatcher les cellules d'astreintes dans les plages horaires
    for (const plage of retour) {
      for (const cell of planning.cellules) {
        if (plage.estDansLaPlage( moment( cell.horodateDebut).toDate(), moment( cell.horodateFin).toDate())) {
          plage.addCelluleAstreinte(cell);
        }
      }
    }

    // On initialise les plages horaires du planning
    planning.plages = retour;

    // On détermine le nombre max de cellule par plage horaire
    planning.maxCelluleParPlage =  Math.max(1, Math.max.apply(Math, retour.map(function(o){ return o.cellules.length; })));



  }


  rechargerPlanning() {
    const nomMethode = 'rechargerPlanning';
    console.log(nomMethode );

    // Rechargement des plannings classique
     this.refreshPlanningAstreintes(false, this.hdPlanningSimple);

    // Rechargement des plannings multiples
    this.refreshPlanningAstreintes(true, this.hdPlanningMultiple);
  }


  changeOnglet(classique: boolean, multiple: boolean) {
    const nomMethode = 'changeOnglet';
    console.log(nomMethode + ' : <' + this.classiqueEnCours + ',' + this.multipleEnCours + '> avant');
    this.classiqueEnCours = classique;
    this.multipleEnCours = multiple;
    if (this.classiqueEnCours) {
      this.planningEnCours = this.planningSimples;
      this.groupeEnCours = this.groupeSimples;
    }else {
      this.planningEnCours = this.planningMultiples;
      this.groupeEnCours = this.groupeMultiples;
    }
    this.selectionnerGroupeAstreinte(this.groupeEnCours[0]);
    console.log(nomMethode + ' : <' + this.classiqueEnCours + ',' + this.multipleEnCours + '> après');
  }


  private getHorodateFiltre(): Array<Date> {
    const retour: Array<Date> = [];

    let m1 = moment(this.hdPlanningSimple).startOf('day');
    if (this.multipleEnCours) {
      m1 = moment(this.hdPlanningMultiple).startOf('day');
    }
    retour.push(m1.toDate());
    const m2 = m1.endOf('day');
    retour.push(m2.toDate());

    return retour;
  }







  getMaxCellule(codeGroupe: string): number {
      let retour = 1;
      if (this.planningEnCours.has(codeGroupe)) {
          retour = this.planningEnCours.get(codeGroupe).maxCelluleParPlage;
      }
      return retour;
  }

  public selectionnerGroupeAstreinte(groupe: GroupeAstreinte) {
    const nomMethode = 'selectioneGroupeAstreinte';
    console.debug(nomMethode + ' : ' + JSON.stringify(groupe));
    this.groupeAstreinteSelectionne = groupe;
    this.intervenantsGroupeAstreinteSelectionne.length = 0;
    this.codeIntervenantSelectionne = undefined;
    // Et on récupère les intervenants de ce groupe d'astreinte
    if(groupe){
      this.astreinteService.getIntervenantAstreintes(groupe.codeInfo).subscribe(
        ressources => {
          if ( Object.keys(ressources)){
            for ( const codeRess of Object.keys(ressources)){
              const ress = ressources[codeRess];
              ress.label = ress.nom;
              ress.value = ress.codeInfo;
              this.intervenantsGroupeAstreinteSelectionne.push(ressources[codeRess]);
            }
          }
          console.debug(nomMethode + ' : ' + JSON.stringify(this.intervenantsGroupeAstreinteSelectionne));
        }
      );
    }
  }


  public selectionnerIntervenantCelluleAstreinte(codeIntervenant: string){
    const nomMethode = 'selectionnerIntervenantCelluleAstreinte';
    console.debug(nomMethode + ' : ' + codeIntervenant);
    //Emettre en event avec le code de l'intervenant
    this.eventManager.broadcast(
      {
        name: AnnuaireCte.EVENT_NAME.fireCodeRessourceSelectionnee,
        content: codeIntervenant
      }
    );
  }


  public selectionnerIntervenant(event){
    const nomMethode = 'selectionnerIntervenant';
    console.debug(nomMethode + ' : ' + event.currentTarget.value);
    this.codeIntervenantSelectionne = event.currentTarget.value;
  }



  public resetHorodateSelectionne(value){
    const nomMethode = 'resetHorodateSelectionne';
    console.debug(nomMethode + ' : ' + JSON.stringify(value));
    let hd: Date;
    if (value) {
      hd = moment(value, 'DD/MM/YYYY').toDate();
      this.libelleDate = value;
    } else {
      hd = moment().toDate();
      this.libelleDate = 'Aujourd\'hui';
    }

    // On met à jour les horodates
    this.hdPlanningMultiple = hd;
    this.hdPlanningSimple = hd;

  }

  /**
   * Calcule le nombre d'heure max de maintenant à la fin de la journée
  */
  getDureeMax(): number {
    const nomMethode = 'getDureeMax';
    let retour = 1;
    const m0 = moment();
    const m1 = moment().endOf('day');
    retour = m1.diff(m0, 'hours') + 1;
    //console.log(nomMethode + ' : m0(' + m0.toISOString() + ') m1(' + m1.toISOString() + ')');
    //console.log(nomMethode + ' : ' + retour);
    return retour;
  }


  changeDuree(value){
    const nomMethode = 'changeDuree';
    console.log(nomMethode + ' : ' + value);
    this.duree = value;
  }

  forcerPlageAstreinte() {
    const nomMethode = 'forcerPlageAstreinte';
    console.log(nomMethode + ' : ' + this.duree + ' / ' + this.codeIntervenantSelectionne);

    let dureeMinutes: number = this.duree * 60;
    const finPrev = moment().add(this.duree, 'hours');
    const finJour = moment().endOf('day');
    if (finPrev.isAfter(finJour)) {
        dureeMinutes = finJour.diff(moment(), 'minutes');
    }
    console.log(nomMethode + ' : ' + dureeMinutes + ' minutes ' );

    this.astreinteService.forcerIntervenantAstreinte (this.groupeAstreinteSelectionne.codeInfo,
                                                      this.codeIntervenantSelectionne, dureeMinutes).subscribe(
      response => {
        //setTimeout(() => { this.rechargerPlanning(); }, 1000);
        console.info(nomMethode + ': retour OK');
      },
      error => {
        console.error(nomMethode + ':' + error);
      },
      () => {}
    );
  }

  appelerAstreinte(){
    const nomMethode = 'appelerAstreinte';
    console.log(nomMethode );
    this.astreinteService.appelerAstreinte(this.groupeAstreinteSelectionne.codeInfo).subscribe(
      response => {
        console.info(nomMethode + ': (' + this.groupeAstreinteSelectionne.codeInfo + ')' + response.statusText);
      },
      error => {
        console.error(nomMethode + ':' + error);
      },
      () => {}
    );
  }
}
