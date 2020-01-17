import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { EventManager } from '../../../../app/shared/services/event/event-manager.service';
import { EventManagerCte } from '../../../../app/shared/services/constantes/event-manager.constantes';
import { MacroCommandeWebsocketService } from '../../../../app/core/macro-commande/services/macro-commande-websocket.service';
import { CesamPlanificationCte } from './cesam-planification.constantes';
import { CtxCte } from '../../../../app/shared/services/constantes/ctx.constantes';
import * as moment from 'moment';
import { ConfigGenerale } from '../../../../app/shared/services/config/config.generale';
import { CacheService } from 'app/shared/services/cache/cache.service';
import { CacheConstantes } from 'app/shared/services/cache/cache.constantes';

@Component({
    selector: 'cesam-planification',
    templateUrl: './cesam-planification.component.html',
    styleUrls: ['./cesam-planification.component.scss']
})
export class CesamPlanificationComponent implements OnInit {

    @Input() modele: any; // modèle de données.
    @Input() type: any; // type de planification ["macro commande", "strategie"].
    @Input() currentCtx: string;
    @Input() contentHeight: number;
    model:any={};

    data: any;  // données saisie par le user.

    journees:any[] = [];
    plagesHoraires:any[]=[];
    date:any;
    dateDebut:any;
    dateFin:any;

    labelTitle:any;
    labelType:any;
    labelDetailType:any;
    isMacroCtx:boolean=false;
    isValid:boolean=false;




    constructor(private eventManager:EventManager, private cacheService : CacheService) {}

    ngOnInit() {
        this.initJournnee();
        this.initDataPlanif();
        this.initPlagesHoraires();
        this.model.currentCtx = this.currentCtx || CtxCte.CTX.PLANIFICATION_MACRO;
        this.model.field = CesamPlanificationCte.FIELD;
        this.model.configCte = CesamPlanificationCte;
        this.model.contentHeight = this.contentHeight ? this.contentHeight : 270;
        this.initLabel();
    }

    private initLabel(){
        if(this.currentCtx === CtxCte.CTX.GESTION_MACRO_COMMANDE){
            this.labelTitle="PLANIFICATION MACRO";
            this.labelType="Macro";
            this.labelDetailType="Détails macro";
            this.isMacroCtx=true;
        }else{
            this.labelTitle="PLANIFICATION STRATEGIE";
            this.labelType="Stratégie";
            this.labelDetailType="Détails stratégie";
            this.isMacroCtx=false;
        }
    }

    private initPlagesHoraires() {
        this.data.heureDebut=CesamPlanificationCte.PLAGES_HORAIRES[0];
        this.data.heureFin=CesamPlanificationCte.PLAGES_HORAIRES[0];
        this.plagesHoraires = CesamPlanificationCte.PLAGES_HORAIRES;
    }

    private initJournnee() {
        this.journees = CesamPlanificationCte.JOURNEES;
    }

    public selectJournee(journee:any){
        journee.isActive = !journee.isActive;
        this.data[journee.model] = journee.isActive;
    }

    public annulerPlanification(){
        this.cacheService.setObject(CacheConstantes.PREVENT_NON_SAVE_DATA_CTX, false);
        // TODO ROOLBACK
        this.eventManager.broadcast({
            name: EventManagerCte.EVENT_NAME.annulerPlanification,
            content: { modele: this.modele, type: this.type, currentCtx: this.currentCtx }
        });
        this.initDataPlanif();
    }

    public validerPlanification(){

       /* if (!this.isPlanificationValid()){
            return;
        }*/
        this.cacheService.setObject(CacheConstantes.PREVENT_NON_SAVE_DATA_CTX, false);
        this.data.heureDebut = this.data.heureDebut.horaire;
        if(this.isMacroCtx){
            this.data.heureFin = "";
        }else{
            this.data.heureFin = this.data.heureFin.horaire;
        }
        this.eventManager.broadcast({
            name: EventManagerCte.EVENT_NAME.validerPlanification,
            content: { modele: this.modele, type: this.type, currentCtx: this.currentCtx, data: this.data }
        });
    }


    /**
     * clique sur le bouton oui ou non
     */
    public selectConfirmation($event) {
        $event.preventDefault();
        $event.stopPropagation();
        this.data.demandeConfirmationDebut=!this.data.demandeConfirmationDebut;
    }

    /**
     * clique sur le bouton activer ou desactiver
     */
    public selectStatutCalendrier($event) {
        $event.preventDefault();
        $event.stopPropagation();
        this.data.demandeConfirmationFin=!this.data.demandeConfirmationFin;
    }

    /**
     * diminuer plage horaire début
     */
    public decreasePlageHoraire(){
        this.data.heureDebut=this.plagesHoraires[this.data.heureDebut.idPrec];
    }

    /**
     * augmenter plage horaire fin
     */
    public increasePlageHoraire(){
        this.data.heureFin=this.plagesHoraires[this.data.heureFin.idSuiv];
    }


    /**
     * Retoure true si les données sont valid.
     * @return {boolean} [description]
     */
    public isPlanificationValid(): boolean{
        let data = this.data;

        if (!data.lundi && !data.mardi && !data.mercredi && !data.jeudi && !data.vendredi && !data.samedi && !data.dimanche){
            return false;
        }

        if (!data.dateDebut || !data.dateFin) return false;
        if (data.dateDebut > data.dateFin) return false;
        if(!this.isMacroCtx){
            if (!data.heureDebut || !data.heureDebut.horaire) return false;
            if (!data.heureFin ||  !data.heureFin.horaire) return false;
            if (!data.heureDebut.horaire || !data.heureFin.horaire) return false;

            let model: any = {};
            model.heureDebutArray = data.heureDebut.horaire.split(":");
            model.heureFinArray = data.heureFin.horaire.split(":");
            model.heureDebut = +model.heureDebutArray[0];
            model.minDebut = +model.heureDebutArray[1];
            model.heureFin = +model.heureFinArray[0];
            model.minFin = +model.heureFinArray[1];
            if (model.heureDebut > model.heureFin) return false;
            if ((model.heureDebut === model.heureFin) && (model.minDebut >= model.heureFin)) return false;
        }else{
            if (!data.heureDebut || !data.heureDebut.horaire) return false;
        }
        return true;
    }

    private initDataPlanif(){
        this.data = {
            "lundi": false,
            "mardi": false,
            "mercredi": false,
            "jeudi": false,
            "vendredi": false,
            "samedi": false,
            "dimanche": false,
            "dateDebut": undefined,
            "dateFin": undefined,
            "heureDebut": undefined,
            "heureFin": undefined,
            "demandeConfirmationDebut": false,
            "demandeConfirmationFin": false
        };
        this.journees.forEach(journee => journee.isActive=false);
    }

}
