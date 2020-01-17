import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Rx';
import * as _ from 'underscore';
import * as moment from 'moment';
import { EventManager } from '../../../../../app/shared/services/event/event-manager.service';
import { EventManagerCte } from '../../../../../app/shared/services/constantes/event-manager.constantes';
import { FieldMacroCommandeCte } from '../../../../../app/core/macro-commande/constantes/macro-commande.constantes';
import { CtxCte } from '../../../../../app/shared/services/constantes/ctx.constantes';
import { LABELS } from '../gestion-macro-commande/labels'
import { MacroCommandeService } from '../../../../../app/core/macro-commande/services/macro-commande.service';
import { ResumeModeleMacroCommande, MacroCommande } from '../../../../shared/models/generic/models';

/**
 * Componsant de base des macos commandes.
 * @author SPIE.
 */
@Component({
    selector: 'macro-commande-base',
    template: ''
})
export class MacroCommandeBase implements OnInit, OnDestroy {

    model:any = {};
    subscriptions:Subscription[] = [];
    macrosModelesCommandes:ResumeModeleMacroCommande[] = [];
    macrosModelesCommandesEvt:any = [];
    macroCommandesPlanifiees:any = [];
    macrosCommandes:MacroCommande[] = [];
    codeModelMacro:any;

    constructor(protected macroCommandeService:MacroCommandeService, protected eventManager:EventManager) {

        this.model.field = FieldMacroCommandeCte.FIELD;
        this.model.configCte = FieldMacroCommandeCte;
        this.model.contexte = CtxCte.CTX;
        this.model.labels = LABELS;
        this.model.planifieesCount = 0;
        this.model.enCoursCount = 0;
        this.model.total = 0;
        this.model.sort = {}; // initialisation du tri.
        this.model.sort.order = true;
        this.macroCommandesPlanifiees = [];
        this.macrosModelesCommandes = [];
        this.macrosCommandes = [];
        this.getAllModelesMacroCommandes();
    }

    ngOnInit() {

    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    /**
     * Met le bon codeEtat pour les elements de la liste des modeles
     */
    private initStateModel() {
        for (let i = 0; i < this.macrosModelesCommandes.length; i++) {
            if (this.macrosCommandes.length === 0) {
                this.macrosModelesCommandes[i].codeEtat = null;
            } else {
                for (let j = 0; j < this.macrosCommandes.length; j++) {
                    if (this.macrosModelesCommandes[i].codeInfo === this.macrosCommandes[j].code_modele) {
                        this.macrosModelesCommandes[i].codeEtat = this.macrosCommandes[j].code_etat;
                        break;
                    }
                }
            }

        }
    }

    private initStateModelMacrosModelesCommandesEvt() {
        this.macrosModelesCommandesEvt = [];
        if (this.macrosCommandes.length === 0) {
            for (let i = 0; i < this.macrosModelesCommandes.length; i++) {
                this.macrosModelesCommandes[i].codeEtat = null;
            }
            this.macrosModelesCommandesEvt = this.macrosModelesCommandes;
        } else {
            for (let i = 0; i < this.macrosModelesCommandes.length; i++) {
                let find = false;
                for (let j = 0; j < this.macrosCommandes.length; j++) {
                    if (this.macrosModelesCommandes[i].codeInfo === this.macrosCommandes[j].code_modele) {
                        this.macrosModelesCommandes[i].codeEtat = this.macrosCommandes[j].code_etat;
                        find = true;
                        break;
                    }
                }
                if (!find) {
                    this.macrosModelesCommandesEvt.push(this.macrosModelesCommandes[i]);
                }
            }

        }
    }


    /**
     * Recupérations des modèles de macros
     */
    public getAllModelesMacroCommandes() {
        this.subscriptions.push(
            this.macroCommandeService.getAllModelesMacroCommandes()
                .subscribe(response => {
                    this.macrosModelesCommandes = response.types_macros.filter(
                        mmc => mmc.virtuel !== true
                    );
                    this.codeModelMacro = this.macrosModelesCommandes[0];
                    this.resolveNbrModeleMacroCommandes(this.macrosModelesCommandes);
                    this.model.planifieesCount = this.macroCommandesPlanifiees.length;
                    this.getAllMacroCommandes();
                },
                    error => {
                    console.log("Erreur lors de la récupération des modèles de macro commandes")
                },
                () => {
                    //Finally
                })
        );
    }

    /**
     * Récupérations de toutes les instances de modèles de macro commandes
     */

    public getAllMacroCommandes() {
        this.subscriptions.push(
            this.macroCommandeService.getAllMacroCommandes()
                .subscribe(response => {
                    this.macrosCommandes = response.macros;
                    this.resolveCountMacroCommandes(this.macrosCommandes);
                   // this.initStateModel();
                    this.initStateModelMacrosModelesCommandesEvt();
                },
                    error => {
                    console.log("Erreur lors de la récupération des macro commandes")
                },
                () => {
                    //Finally
                })
        );
    }

    /**
     * compte le nombre total de modele macro commande
     * @param macrosCommandesFromBack
     */
    private resolveNbrModeleMacroCommandes(modelesMacrosCommandesFromBack:any) {
        if (!modelesMacrosCommandesFromBack) return;
        this.macroCommandesPlanifiees = [];
        this.model.total = modelesMacrosCommandesFromBack.length;
        modelesMacrosCommandesFromBack.map(m => {
            m.id = m.codeInfo;
            m.text = m.nom;
            m.isSelect = false;
            if (m.planification) {
                this.macroCommandesPlanifiees.push(m);
            }
        });
        this.mettreLaDateDansLeBonFormat();
    }

    private mettreLaDateDansLeBonFormat() {
        this.macroCommandesPlanifiees.map(macro => {
            this.initDate(macro);
        });
    }

    private initDate(macro:any) {
        let annee = macro.planification.dateDebut.substring(0, 4);
        let mois = macro.planification.dateDebut.substring(5, 7);
        let jour = macro.planification.dateDebut.substring(8, 10);
        let heure = macro.planification.dateDebut.substring(11, 13);
        let minute = macro.planification.dateDebut.substring(14, 16);
        macro.nextDate = jour + "/" + mois + "/" + annee + " " + macro.planification.heureDebut;
    }

    /**
     * J'envois la macroCommande pour affichage
     * de son détail
     * @param macroCommande
     */
    public sendMacroCommandeToShow(macroCommande:any) {
        this.eventManager.broadcast({
            name: EventManagerCte.EVENT_NAME.modeleMacroCommandeSelected,
            content: {macro: macroCommande}
        });
    }

    /**
     * J'envois l'instance de la  macroCommande
     * pour affichage de son détail
     * @param macroCommande
     */
    public sendInstanceOfMacroCommandeToShow(macroCommande:any) {
        this.eventManager.broadcast({
            name: EventManagerCte.EVENT_NAME.instanceOfMacroCommandeSelected,
            content: {macro: macroCommande}
        });
    }

    /**
     * compte le nombre d'instance de modele macro commande en cours d'execution
     * @param macrosCommandesFromBack
     */
    private resolveCountMacroCommandes(macrosCommandesFromBack:any) {
        if (!macrosCommandesFromBack) return;
        this.model.enCoursCount = 0;
        macrosCommandesFromBack.map(m => {
            if (m.code_etat === FieldMacroCommandeCte.CODE_ETAT_MACRO.EN_COURS) {
                this.changeStateModel(m.code_modele, m.code_etat);
                this.model.enCoursCount++;
            }
            if (m.code_etat === FieldMacroCommandeCte.CODE_ETAT_MACRO.SUSPENDU) {
                this.changeStateModel(m.code_modele, FieldMacroCommandeCte.CODE_ETAT_MACRO.SUSPENDU);
            }
            if (m.code_etat === FieldMacroCommandeCte.CODE_ETAT_MACRO.ECHEC) {
                this.changeStateModel(m.code_modele, FieldMacroCommandeCte.CODE_ETAT_MACRO.ECHEC);
            }
            if (m.code_etat === FieldMacroCommandeCte.CODE_ETAT_MACRO.ANNULE) {
                this.changeStateModel(m.code_modele, FieldMacroCommandeCte.CODE_ETAT_MACRO.ANNULE);
            }
            if (m.code_etat === FieldMacroCommandeCte.CODE_ETAT_MACRO.SUCCES) {
                this.changeStateModel(m.code_modele, FieldMacroCommandeCte.CODE_ETAT_MACRO.SUCCES);
            }
            m.isSelect = false;
        });
    }

    /**
     * Change l'état du modele de la macro avec l'etat passé en paramètre
     */
    protected changeStateModel(codeModele:string, codeEtat:string):boolean {
        let ok:boolean = true;
        this.macrosModelesCommandes.forEach(m => {
            if (m.codeInfo === codeModele) {
                if (m.codeEtat === FieldMacroCommandeCte.CODE_ETAT_MACRO.EN_COURS) {
                    ok = false;
                }
                m.codeEtat = codeEtat;
            }
        });
        return ok;
    }

}
