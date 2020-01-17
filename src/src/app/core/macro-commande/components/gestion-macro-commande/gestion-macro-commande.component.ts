import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import * as _ from 'underscore';
import { LABELS } from './labels'
import { MacroCommandeService } from '../../../../../app/core/macro-commande/services/macro-commande.service';
import { EventManagerCte } from '../../../../../app/shared/services/constantes/event-manager.constantes';
import { EventManager } from '../../../../../app/shared/services/event/event-manager.service';
import { CtxCte } from '../../../../../app/shared/services/constantes/ctx.constantes';
import { FieldMacroCommandeCte } from '../../../../../app/core/macro-commande/constantes/macro-commande.constantes';
import {MacroCommandeBase} from '../macro-commande-base/macro-commande-base.component';

@Component({
    selector: 'gestion-macro-commande',
    templateUrl: './gestion-macro-commande.component.html',
    styleUrls: ['./gestion-macro-commande.component.scss']
})
export class GestionMacroCommandeComponent extends MacroCommandeBase implements OnInit, OnDestroy {

    isPlanifier:boolean = false;
    modelMacroCommande:any;
    @Input() idMacro:number;

    constructor(protected macroCommandeService:MacroCommandeService, protected eventManager:EventManager) {
        super(macroCommandeService, eventManager);
        this.resolveSubscriptionOfPlanificationModeleMacro();
    }

    ngOnInit() {
        this.model.currentCtx = CtxCte.CTX.GESTION_MACRO_COMMANDE;
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    private resolveSubscriptionOfPlanificationModeleMacro() {
        this.subscriptions.push(this.eventManager
            .subscribe(EventManagerCte.EVENT_NAME.creerPlanificationModeleMacroCommande, (response) => {
                this.modelMacroCommande = response.content;
                this.isPlanifier = true;
            }));

        this.subscriptions.push(this.eventManager
            .subscribe(EventManagerCte.EVENT_NAME.annulerPlanification, (response) => {
                this.isPlanifier = false;
            }));

        this.subscriptions.push(this.eventManager
            .subscribe(EventManagerCte.EVENT_NAME.validerPlanification, (response) => {
                if (response.content.type !== 'macro') return;
                this.subscriptions.push(this.macroCommandeService.planifierMacro(response.content.modele.codeInfo, response.content.data)
                    .subscribe(response => {
                        console.log(response);
                        this.isPlanifier = false;
                        this.getAllModelesMacroCommandes();
                    }, error => {
                        this.isPlanifier = false;
                    }
                ));
            }));
    }

    public supprimerPlanificationMacro(modeleMacroCommande) {
        this.subscriptions.push(this.macroCommandeService.suppressionPlanifierMacro(modeleMacroCommande.codeInfo)
            .subscribe(response => {
                console.log(response);
                this.getAllModelesMacroCommandes();
            }, error => {
            }
        ));
    }

    public desactiverPlanificationMacro(modeleMacroCommande) {
        // TODO

        let data = {
            "lundi": modeleMacroCommande.planification.lundi,
            "mardi": modeleMacroCommande.planification.mardi,
            "mercredi": modeleMacroCommande.planification.mercredi,
            "jeudi": modeleMacroCommande.planification.jeudi,
            "vendredi": modeleMacroCommande.planification.vendredi,
            "samedi": modeleMacroCommande.planification.samedi,
            "dimanche": modeleMacroCommande.planification.dimanche,
            "dateDebut": modeleMacroCommande.planification.dateDebut,
            "dateFin": modeleMacroCommande.planification.dateFin,
            "heureDebut": modeleMacroCommande.planification.heureDebut,
            "heureFin": "",
            "demandeConfirmationDebut": modeleMacroCommande.planification.demandeConfirmationDebut,
            "demandeConfirmationFin": modeleMacroCommande.planification.demandeConfirmationFin

        }

        this.subscriptions.push(this.macroCommandeService.planifierMacro(modeleMacroCommande.codeInfo, data)
            .subscribe(response => {
                console.log(response);
            }, error => {
            }
        ));
    }

    //----------------------------------------------------------------------------
    //-- EVENTS
    //----------------------------------------------------------------------------
    /**
     * @param header du tableau sur lequel le tri doit se faire.
     * @return Tri le tableau des évenements.
     */
    public sortHeader(header) {
        this.model.sort.header = header;
        this.model.sort.order = !this.model.sort.order;
        if(header===this.model.labels.headers[1].model){
            this.macroCommandesPlanifiees = this.macroCommandesPlanifiees.sort((s1, s2) => {
                return this.compare(s1.planification, s2.planification, this.model.sort.header)
            });
        }else{
            this.macroCommandesPlanifiees = this.macroCommandesPlanifiees.sort((s1, s2) => {
                return this.compare(s1, s2, this.model.sort.header)
            });
        }
        if (!this.model.sort.order) this.macroCommandesPlanifiees = this.macroCommandesPlanifiees.reverse();
    }

    /**
     * Compare les 2 items selon le critère passé  en paramètres
     * @param emprises
     * @return trie les emprise
     */
    private compare(item1:any, item2:any, property):number {
        if (item1[property] < item2[property]) return -1;
        if (item1[property] > item2[property]) return 1;

        return 0;
    }
}
