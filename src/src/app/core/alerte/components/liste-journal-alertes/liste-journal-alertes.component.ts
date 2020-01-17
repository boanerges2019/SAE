import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { LABELS } from './labels';
import { ListeAlerteBaseComponent } from '../liste-alerte-base/liste-alerte-base.component';
import { EventManager } from '../../../../../app/shared/services/event/event-manager.service';
import { EventManagerCte } from '../../../../../app/shared/services/constantes/event-manager.constantes';
import { Alerte } from '../../../../../app/shared/models/generic/Alerte';
import { AlerteService } from '../../../../../app/core/alerte/services/alerte.service';
import { EnumerationsService } from '../../../../../app/shared/services/reference/enumerations.service';
import { BaseService } from '../../../../../app/core/evenement/services/base.service';
import { FieldAlerteCte } from '../../../../../app/core/alerte/constantes/field-alerte.constantes';
import { AlerteCte } from '../../../../../app/core/alerte/constantes/alerte.constantes';
import { SessionSae } from '../../../../shared/models/generic/SessionSae';
import { CacheConstantes } from '../../../../shared/services/cache/cache.constantes';
import { CacheService } from '../../../../shared/services/cache/cache.service';


@Component({
    selector: 'liste-journal-alertes',
    templateUrl: './liste-journal-alertes.component.html',
    styleUrls: ['./liste-journal-alertes.component.scss']
})
export class ListeJournalAlertesComponent extends ListeAlerteBaseComponent implements OnInit {

    // test: any;
    @Input() idAlerteSelected:number;
    allJournalAlertes:Alerte[] = [];
    journalAlertes:any[] = [];
    subscriptions:Subscription[] = [];
    field:{[ key: string] : any};
    model:{ [key: string]: any } = {};
    evenementsEnCours:number[]; // liste des evenements en cours

    constructor(public eventManager:EventManager,
                public alerteService:AlerteService,
                public enumerationsService:EnumerationsService,
                public baseService:BaseService,
                private cacheService:CacheService,
                public router:Router) {
        super(eventManager, alerteService, enumerationsService, baseService, router);
        this.model.nbAlertes = {};
    }


    ngOnInit() {
        super.ngOnInit();
        this.model.sort = {};
        this.model.alertes = {};
        this.model.alertes.aTraite = true;
        this.model.alertes.termine = true;
        this.model.i18n = LABELS; // constantes labels
        this.model.sort.header = this.model.i18n.alerte.headers[0];
        this.initCount();
        this.getJournalAlertes();

    }


    /**
     * @param header du tableau sur lequel le tri doit se faire.
     * @return Tri le tableau des évenements.
     */
    public sortHeader(header) {
        this.model.sort.header = header;
        this.model.sort.order = !this.model.sort.order;
        this.journalAlertes = super.sortTable(header.model, this.model.sort.order, this.journalAlertes, FieldAlerteCte.FIELD);
        // this.strategies = this.strategies.sort((s1,s2) => {
        //   return this.compare(s1,s2, this.model.sort.header)
        // });
        // if (!this.model.sort.order) this.strategies = this.strategies.reverse();
    }



    private getJournalAlertes() {
        this.alerteService.getJournalAlertes().subscribe(response => {
            this.allJournalAlertes = response;
            this.journalAlertes = response;
            this.initSelectedAlerte();
            this.resolveAlerteFiltre();
            this.resolveCounts();
        })
    }

    public resolveCounts() {
        // reset to zero.
        for (const field in this.model.nbAlertes) {
            this.model.nbAlertes[field] = 0;
        }
        this.allJournalAlertes.forEach(alerte => {
            switch (alerte.codeEtat) {
                case AlerteCte.ETATS.aTraiter:
                    this.model.nbAlertes.atraite += 1;
                    break;
                case AlerteCte.ETATS.termine:
                    this.model.nbAlertes.termine += 1;
                    break;
                default:
                    break;
            }
        });
    }

    /**
     * Gestion du changement de filtre.
     */
    public resolveAlerteFiltre() {
        let states = [];
        states = this.model.alertes.aTraite ? states.concat([AlerteCte.ETATS.aTraiter]) : states;
        states = this.model.alertes.termine ? states.concat([AlerteCte.ETATS.termine]) : states;
        //this.journalAlertes = this.filterByEtat(states, this.allJournalAlertes);// filtrer que les alertes passés dans le paramètres?
    }

    /**
     * retourne les événements qui matchent avec l'état passé en paramètre.
     * @param etats voulus.
     */
    public filterByEtat(etats:string[], allAlertes:any):any[] {
        return allAlertes.filter(item => etats.indexOf(item.codeEtat) > -1);
    }

    /**
     * initialisation de la subscription à la notification
     */
    public initSelectedAlerte() {
        if(this.idAlerteSelected){
            this.journalAlertes.map(alerte => {
                if(alerte.identifiant===this.idAlerteSelected){
                    alerte.isSelect = true;
                }
            });
        }
    }

    initCount() {
        this.model.nbAlertes = {};
        this.model.nbAlertes.total = 0;
        this.model.nbAlertes.atraite = 0;
        this.model.nbAlertes.termine = 0;
    }

    /**
     * Localiser une alerte
     * @param $event
     * @param alerte
     */
    public localiserAlert(event, alerte:Alerte) {
        const nomMethode = 'localiserAlert';
        console.debug(nomMethode + ' : ' + JSON.stringify(alerte));

        event.preventDefault();
        event.stopPropagation();

        //On récupère la session
        let poste;
        const session: SessionSae = this.cacheService.getObject(CacheConstantes.SESSION);
        if(session){
            poste = session.poste;
        }

        if (poste) {
            let codeEqt = '';
            if(alerte.codeInfoObjetSource){
                codeEqt = alerte.codeInfoObjetSource;
            }
            this.subscriptions.push(this.alerteService.localiserAlerte(poste, codeEqt)
                .subscribe(response => {
                    console.log(response);
                }
                ));
        }else{
            console.error("poste opérateur introuvable")
        }
    }

    /**
     * visualiser une alerte
     * @param event
     * @param alerte
     */
    public visualiserAlert(event, alerte:Alerte) {
       /* event.preventDefault();
        event.stopPropagation();*/
        this.subscriptions.push(this.alerteService.visualiserAlert(alerte.identifiant)
            .subscribe(response => {
                console.log(response);
            }
        ));
    }


}
