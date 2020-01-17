import { Component, Input, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import * as _ from 'underscore';
import { MacroCommandeService } from '../../../../app/core/macro-commande/services/macro-commande.service';
import { MacroCommandeWebsocketService } from '../../../../app/core/macro-commande/services/macro-commande-websocket.service';

import { EventManagerCte } from '../../../../app/shared/services/constantes/event-manager.constantes';
import { EventManager } from '../../../../app/shared/services/event/event-manager.service';
import { CtxCte } from '../../../../app/shared/services/constantes/ctx.constantes';
import { FieldMacroCommandeCte } from '../../../../app/core/macro-commande/constantes/macro-commande.constantes';
import {MacroCommandeBase} from '../../../../app/core/macro-commande/components/macro-commande-base/macro-commande-base.component';
import { CacheService} from '../../../../app/shared/services/cache/cache.service';
import { CacheConstantes} from '../../../../app/shared/services/cache/cache.constantes';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { ToastsManager} from 'ng2-toastr/ng2-toastr';


@Component({
    selector: 'list-model-macro',
    templateUrl: './list-model-macro.component.html',
    styleUrls: ['./list-model-macro.component.scss']
})
export class ListModelMacroComponent extends MacroCommandeBase implements OnInit, OnDestroy {
    @Input() idMacro:number;
    @Input() idEvenement:number
    @Input() currentCtx:string;
    @Input() contentHeight:number;
    @Input() contenuHeight:number;

    isPlanifier:boolean = false;
    codeModeleAnnule:any;
    macrosCommandesEvts:any[];
    createMacroFromPac:any = false;
    modelCodeSelect:string;


    constructor(protected macroCommandeService:MacroCommandeService,
                protected eventManager:EventManager, private cacheService:CacheService,
                private sanitizer:DomSanitizer, private macroCommandeWebsocketService:MacroCommandeWebsocketService) {
        super(macroCommandeService, eventManager);
        this.resolveWebSocketCallbackSubscription();
        this.resolveSubscriptionOfPlanificationModeleMacro();
    }

    ngOnInit() {
        this.model.currentCtx = this.currentCtx || CtxCte.CTX.LIST_MODELE_MACRO;
        this.model.contentHeight = this.contentHeight ? this.contentHeight : 380;
        this.model.contenuHeight = this.contenuHeight ? this.contenuHeight : 330;
        this.model.isPacMacro = this.currentCtx === CtxCte.CTX.PAC_MACRO_COMMANDE ? true : false;
        this.model.enCoursCountEvt = 0;
        console.log("ListModelMacroComponent idEvenement : " + this.idEvenement);
        this.getAllModelesMacroCommandesEvts();
        this.initializeFormatters();
        this.initMacroCommande();
        this.resolveMacroCommandesTypeObjetWebSocketCallbackSubscription();
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    /**
     * init modeleMacro selectionné
     */
    private initMacroCommande(){
        if(this.idMacro){
            this.subscriptions.push(this.macroCommandeService.getDetailMacroById(this.idMacro)
                .subscribe(detailMacro => {
                    this.macrosModelesCommandes.map(m => {
                        if (m.codeInfo === detailMacro.code_modele) {
                            m.isSelect = true;
                        }
                    });
               }
            ));
        }
    }
    /**
     * Recupérations des modèles de macros commandes liées à un evenement
     */
    private getAllModelesMacroCommandesEvts() {
        if (this.model.isPacMacro) {
            if (this.idEvenement) {
                this.subscriptions.push(
                    this.macroCommandeService.getAllModelesMacroCommandesEvts("evenement", this.idEvenement)
                        .subscribe(response => {
                            this.macroCommandeWebsocketService.subscribeMacroCommandesTypeObjet("evenement", this.idEvenement);
                            this.macrosCommandesEvts = response.macros;
                            this.resolveNbrMacrosCommandesEvts(this.macrosCommandesEvts);
                        },
                            error => {
                            console.log("Erreur lors de la récupération des modèles de macro commandes")
                        },
                        () => {
                            //Finally
                        })
                );
            }
        }
    }

    /**
     * initialise le nombre de modèle de macro commande
     */
    private resolveNbrMacrosCommandesEvts(macrosCommandesEvtsFromBack:any) {
        if (!macrosCommandesEvtsFromBack) return;
        this.model.enCoursCountEvt = macrosCommandesEvtsFromBack.length;
        macrosCommandesEvtsFromBack.map(m => {
            m.isSelect = false;
        });
    }

    /**
     * initialise le nombre de modèle de macro commande
     */
    private resolveNbrMacroCommandes(modeleMacrosCommandesFromBack:any) {
        if (!modeleMacrosCommandesFromBack) return;
        this.model.total = modeleMacrosCommandesFromBack.length;
    }

    /**
     * Lorsqu'on lance une macro manuellement depuis l'ihm
     * en cliquant sur le bouton lancer cette méthode est
     * appélée pour lancer l'exécution de la macro
     * @param macroCommande
     */
    public lancerMacroCommande($event, modeleMacroCommande:any) {
        $event.preventDefault();
        $event.stopPropagation();
        this.subscriptions.push(
            this.macroCommandeService.lancerMacroCommande(modeleMacroCommande.codeInfo, this.idEvenement)
                .subscribe(response => {
                    this.getAllMacroCommandes();
                    modeleMacroCommande.isSelect = true;
                    this.selectOneModeleMacro(modeleMacroCommande);
                    console.log("La macro commande a été lancée avec succès", response);
                }, error => {
                    console.log("Erreur lors de la récupération des macro commandes");
                },
                () => {
                    //Finally
                })
        );
    }

    public lancerMacroCommandePac(){
        this.subscriptions.push(
            this.macroCommandeService.lancerMacroCommande(this.modelCodeSelect, this.idEvenement)
                .subscribe(response => {
                    this.getAllModelesMacroCommandesEvts();
                    this.createMacroFromPac = false;
                    this.getAllMacroCommandes();
                    console.log("La macro commande a été lancée avec succès", response);
                }, error => {
                    console.log("Erreur lors de la récupération des macro commandes");
                },
                () => {
                    //Finally
                })
        );
    }

    public selectModelMacroCommande(selectedItem){
        this.modelCodeSelect = selectedItem.id;
    }

    private initializeFormatters() {
        this.model.genericFormatter = (data:any):SafeHtml => {
            // let html = `<span>${ data.identifiant + '-' + data.nom }</span>`;
            let html = `<span>${data.nom }</span>`;
            return this.sanitizer.bypassSecurityTrustHtml(html);
        }
    }

    /**
     * Lancer macro depuis pac
     */
    public lancerMacroDepuisPac($event){
        $event.preventDefault();
        $event.stopPropagation();
        this.createMacroFromPac = true;

    }

    public annulerLancerMacroDepuisPac($event){
        $event.preventDefault();
        $event.stopPropagation();
        this.createMacroFromPac = false;
    }
    /**
     *recupère l'instance du modele de macro qui s'éxécute
     * et l'envoit pour affichage
     * @param identifiant
     */
    private getInstanceOfMacroByCodeModele(codeInfo:string) {
        let macro = _.find(this.macrosCommandes, function (macroCommande) {
            return macroCommande.code_modele === codeInfo;
        });

        if (!macro) {
            this.sendMacroCommandeToShow(undefined);
        } else {
            this.subscriptions.push(this.macroCommandeService.getDetailMacroById(macro.identifiant)
                .subscribe(
                    response => {
                    this.sendMacroCommandeToShow(response);
                },
                    error => {
                    this.sendMacroCommandeToShow(undefined);
                }
            ));
        }

    }

    /**
     * Lorsqu'on sélectionne une macro dans l'ihm partie gauche cette méthode est
     * appélée pour afficher à droite le détail de la macro sélectionnée.
     * @param macroCommande
     */
    public selectMacroCommande($event, modeleMacroCommande:any) {
        $event.preventDefault();
        $event.stopPropagation();
        modeleMacroCommande.isSelect = !modeleMacroCommande.isSelect;
        this.selectOneModeleMacro(modeleMacroCommande);
    }

    private selectOneModeleMacro(modeleMacroCommande:any){
        if (modeleMacroCommande.isSelect) {
            this.getInstanceOfMacroByCodeModele(modeleMacroCommande.codeInfo);
            this.macrosModelesCommandes.map(m => {
                if (modeleMacroCommande.identifiant !== m.identifiant) {
                    m.isSelect = false;
                }
            });
        } else {
            this.sendMacroCommandeToShow(undefined);
        }
    }

    public selectMacroCommandePac($event, macroCommande:any) {
        $event.stopPropagation();
        $event.preventDefault();
        macroCommande.isSelect = !macroCommande.isSelect;
        this.selectOneMacroCommande(macroCommande);
    }

    private selectOneMacroCommande(macroCommande:any){
        if (macroCommande.isSelect) {
            this.subscriptions.push(this.macroCommandeService.getDetailMacroById(macroCommande.identifiant)
                .subscribe(
                    response => {
                    this.sendInstanceOfMacroCommandeToShow(response);
                    this.macrosCommandesEvts.map(m => {
                    if (macroCommande.identifiant !== m.identifiant) {
                        m.isSelect = false;
                    }});
                },
                    error => {
                    this.sendInstanceOfMacroCommandeToShow(undefined);
                }
            ));


        } else {
            this.sendInstanceOfMacroCommandeToShow(undefined);
        }
    }



    /**
     * Retire de la liste des macros passées en paramètre la macro
     * passée en paramètre.
     * @param listMacros
     * @param macroCommande
     * @returns {any[]}
     */
    private removeMacroFromList(listMacros:any[], macroCommande:any):any[] {
        const nomMethode = 'removeMacroFromList';
        if(listMacros){
            console.debug(nomMethode + ' <'+ JSON.stringify(listMacros) +'> / macroCommande <' + JSON.stringify(macroCommande) + '>');
            listMacros = listMacros.filter(function (item, index, array) {
                return item.identifiant !== macroCommande.identifiant;
            });
        }else{
            listMacros = [];
        }
        console.debug(nomMethode + ' <'+ JSON.stringify(listMacros) +'>');
        return listMacros;
    }


    /**
     * Gestion des notifications suite à un changement d'état d'une macro commande.
     */
    private resolveWebSocketCallbackSubscription() {
        this.subscriptions.push(this.eventManager
            .subscribe(EventManagerCte.EVENT_NAME.macroCommandesCreateFromWebSocket, (response) => {
                this.getAllMacroCommandes();
            }));
        this.subscriptions.push(this.eventManager
            .subscribe(EventManagerCte.EVENT_NAME.macroCommandesUpdateFromWebSocket, (response) => {
                this.getAllMacroCommandes();
            }));
        this.subscriptions.push(this.eventManager
            .subscribe(EventManagerCte.EVENT_NAME.macroCommandesDeleteFromWebSocket, (response) => {
                this.getAllMacroCommandes();
            }));
    }

    private resolveMacroCommandesTypeObjetWebSocketCallbackSubscription() {
        const nomMethode = 'resolveMacroCommandesTypeObjetWebSocketCallbackSubscription';
        this.subscriptions.push(this.eventManager
            .subscribe(EventManagerCte.EVENT_NAME.macroCommandesTypeObjetUpdateFromWebSocket, (response) => {
                console.log(nomMethode + ' : ' + JSON.stringify(response));
                this.getAllModelesMacroCommandesEvts();
            }));
        this.subscriptions.push(this.eventManager
            .subscribe(EventManagerCte.EVENT_NAME.macroCommandesDeleteFromWebSocket, (response) => {
                console.log(nomMethode + ' : ' + JSON.stringify(response));
                this.macrosCommandesEvts = this.removeMacroFromList(this.macrosCommandesEvts,response.content);
            }));            
    }

    public clickOnPlanifierBtn($event, modelMacroCommande:any) {
        $event.preventDefault();
        $event.stopPropagation();
        this.isPlanifier = true;
        // Envoit du modèle de macro commande au composant
        // de planification
        this.eventManager.broadcast({
            name: EventManagerCte.EVENT_NAME.creerPlanificationModeleMacroCommande,
            content: modelMacroCommande
        });
    }


    private resolveSubscriptionOfPlanificationModeleMacro() {
        this.subscriptions.push(this.eventManager
            .subscribe(EventManagerCte.EVENT_NAME.annulerPlanification, (response) => {
                this.isPlanifier = false;
            }));

        this.subscriptions.push(this.eventManager
            .subscribe(EventManagerCte.EVENT_NAME.validerPlanification, (response) => {
                this.isPlanifier = false;
            }));
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
        this.macrosModelesCommandes = this.macrosModelesCommandes.sort((s1, s2) => {
            return this.compare(s1, s2, this.model.sort.header)
        });
        if (!this.model.sort.order) this.macrosModelesCommandes = this.macrosModelesCommandes.reverse();
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
