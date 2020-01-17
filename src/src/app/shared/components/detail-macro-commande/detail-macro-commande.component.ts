import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { EventManager } from '../../../../app/shared/services/event/event-manager.service';
import { EventManagerCte } from '../../../../app/shared/services/constantes/event-manager.constantes';
import { MacroCommandeWebsocketService } from '../../../../app/core/macro-commande/services/macro-commande-websocket.service';
import { MacroCommandeService } from '../../../../app/core/macro-commande/services/macro-commande.service';
import * as _ from 'underscore';
import { CtxCte } from '../../../../app/shared/services/constantes/ctx.constantes';
import { FieldMacroCommandeCte } from '../../../../app/core/macro-commande/constantes/macro-commande.constantes';
import { MacroCommande } from '../../models/generic/models';


@Component({
    selector: 'detail-macro-commande',
    templateUrl: './detail-macro-commande.component.html',
    styleUrls: ['./detail-macro-commande.component.scss']
})
export class DetailMacroCommandeComponent implements OnInit {
    @Input() idMacro:number;
    @Input() idEvenement:number;
    @Input() currentCtx:string;
    @Input() macroCommande:MacroCommande;
    @Input() contentHeight:number;
    @Input() contenuHeight:number;
    @Input() emptyHeight:number;

    model:any = {};
    isSuspend:boolean = false;
    subscriptions:Subscription[] = [];
    nbrActionsEffectuees:number;
    nbrErreursSignalees:number;

    constructor(private eventManager:EventManager, private macroCommandeWebsocketService:MacroCommandeWebsocketService,
                private macroCommandeService:MacroCommandeService) {

    }

    ngOnInit() {
        this.macroCommande = this.macroCommande || undefined;
        this.idMacro = this.idMacro || undefined;
        this.idEvenement = this.idEvenement || undefined;
        this.model.currentCtx = this.currentCtx || CtxCte.CTX.DETAIL_MACRO;
        this.model.field = FieldMacroCommandeCte.FIELD;
        this.model.configCte = FieldMacroCommandeCte;
        this.model.contentHeight = this.contentHeight ? this.contentHeight : 520;
        this.model.contenuHeight = this.contenuHeight ? this.contenuHeight : 487;
        this.model.emptyHeight = this.emptyHeight ? this.emptyHeight : 630;
        this.nbrActionsEffectuees = 0;
        this.nbrErreursSignalees = 0;
        this.initMacroCommande();
        this.initSubscriptions();
        this.resolveWebSocketCallbackSubscription();
    }

    /**
     * initialise la macroCommande
     */
    private initMacroCommande(){
        const nomMethode = 'initMacroCommande';
        console.log(nomMethode+' : <'+this.idMacro+'>');
        if(this.idMacro){
            this.subscriptions.push(this.macroCommandeService.getDetailMacroById(this.idMacro)
                .subscribe(detailMacro => {
                    this.macroCommande = detailMacro;
                    this.initIsSuspend();
                }
            ));
        }
    }

    /**
     * Initialisation de toutes les souscriptions aux websockets et evenements succeptible
     * de mettre à jour la vue du détail d'une macro
     */
    public initSubscriptions() {
        this.initSubscriptionMacroCommande();
    }

    /**
     * initialisation de la subscription à la macrocommande
     */
    public initSubscriptionMacroCommande() {
        const nomMethode = 'initSubscriptionMacroCommande';
        if(this.idEvenement){
            this.subscriptions.push(this.eventManager.subscribe(EventManagerCte.EVENT_NAME.instanceOfMacroCommandeSelected, (response) => {
                this.initEcouteSurLaMacroExecutee(response.content.macro);
            }));
        }else{
            this.subscriptions.push(this.eventManager.subscribe(EventManagerCte.EVENT_NAME.modeleMacroCommandeSelected, (response) => {
                this.initEcouteSurLaMacroExecutee(response.content.macro);
            }));
        }
        console.log(nomMethode+' : subscriptions<'+this.subscriptions.length+'>');
    }

    private initIsSuspend() {
        const nomMethode = "initIsSuspend";
        console.log(nomMethode+" avant <"+this.isSuspend+">");
        this.isSuspend = this.macroCommande && this.macroCommande.code_etat === FieldMacroCommandeCte.CODE_ETAT_MACRO.SUSPENDU ? true : false;
        console.log(nomMethode+" après <"+this.isSuspend+">");
    }

    private initEcouteSurLaMacroExecutee(macro:any){
        const nomMethode = 'initEcouteSurLaMacroExecutee';
        console.log(nomMethode);
        this.macroCommande = macro;
        if (this.macroCommande) {
            this.idMacro = macro.identifiant;
            console.log(nomMethode+' : macro<'+macro.identifiant+'>');
            this.macroCommandeWebsocketService.subscribeUneMacroCommande(this.macroCommande.identifiant);
            this.subscriptionPourUneMacroCommande(this.macroCommande.identifiant);
        }else{
            this.idMacro = -1; 
        }
        this.initIsSuspend();
    }
    /**
     * mise à jour du détail d'une macro suite à une notification
     * de websocket sur la macro en cours d'exécution
     */
    private subscriptionPourUneMacroCommande(identifiant:number) {
        this.subscriptions.push(this.eventManager.subscribe(EventManagerCte.EVENT_NAME.uneMacroCommandeCreateFromWebSocket + identifiant, (response) => {
            if (response.content) {
                this.updateActionApplicableInMacro(response.content);
            }
        }));
        this.subscriptions.push(this.eventManager.subscribe(EventManagerCte.EVENT_NAME.uneMacroCommandeUpdateFromWebSocket + identifiant, (response) => {
            if (response.content) {
                this.updateActionApplicableInMacro(response.content);
                //this.updateNbrEffectuesOrErreursSignaleesInMacro();
            }
        }));
        this.subscriptions.push(this.eventManager.subscribe(EventManagerCte.EVENT_NAME.uneMacroCommandeDeleteFromWebSocket + identifiant, (response) => {
            if (response.content) {
                this.updateNbrEffectuesOrErreursSignaleesInMacro();
            }
        }));
    }

    /**
     * Mettre à jour l'action applicable dans la macro commande
     */
    private updateActionApplicableInMacro(contenu:any) {
        const nomMethode = "updateActionApplicableInMacro";
        console.log(nomMethode+" : <"+JSON.stringify(contenu)+">");

        if (this.macroCommande && (contenu.value.identifiant===this.macroCommande.identifiant || contenu.value.codeInfo.indexOf(this.macroCommande.code_modele) > -1)) {
            if (contenu.isMacro) {
                //Mise à jour de l'état de la macro commande
                this.macroCommande.code_etat = contenu.value.code_etat;
                this.macroCommande.pourcentage_avancement = contenu.value.pourcentage_avancement;
                this.initIsSuspend();
            } else if(contenu.isPrecondition) {
                //Mise à jour de la précondition ?
                let p =
                this.macroCommande.preconditions.find(
                    p => p.identifiant===contenu.value.identifiant
                )
                p.resultat = contenu.value.resultat;                
            } else{
                //Mise à jour d'une action de la macro
                if(this.macroCommande.etapes){
                    for (let i = 0; i < this.macroCommande.etapes.length; i++) {
                        for (let j = 0; j < this.macroCommande.etapes[i].actionsApplicables.length; j++) {
                            if (this.macroCommande.etapes[i].actionsApplicables[j].identifiant === contenu.value.identifiant) {
                                this.macroCommande.etapes[i].actionsApplicables[j] = contenu.value;
                                console.log("updateActionApplicableInMacro : " + this.macroCommande);
                                break;
                            }
                        }
                    }
                }
            }
            this.updateNbrEffectuesOrErreursSignaleesInMacro();
        }
    }

    /**
     * Mettre à jour le nombre d'action effectuées et celles finissent en erreur
     */
    private updateNbrEffectuesOrErreursSignaleesInMacro() {
        if(this.macroCommande){
            this.nbrActionsEffectuees = 0;
            this.nbrErreursSignalees = 0;
            if(this.macroCommande.etapes) {
                for (let i = 0; i < this.macroCommande.etapes.length; i++) {
                    for (let j = 0; j < this.macroCommande.etapes[i].actionsApplicables.length; j++) {
                        for (let k = 0; k < this.macroCommande.etapes[i].actionsApplicables[j].actionsAppliquees.length; k++) {
                            if (this.macroCommande.etapes[i].actionsApplicables[j].actionsAppliquees[k].codeEtat === FieldMacroCommandeCte.CODE_ETAT_ACTION.ECHEC) {
                                this.nbrErreursSignalees++;
                            }
                            if (this.macroCommande.etapes[i].actionsApplicables[j].actionsAppliquees[k].codeEtat === FieldMacroCommandeCte.CODE_ETAT_ACTION.SUCCES) {
                                this.nbrActionsEffectuees++;
                            }
                        }
                    }
                }
            }
        }
    }

    /**
     * repondre à une question
     */
    public repondreOuiOuNon(identifiant:number, identifiantEtape:number, identifiantAction:number, commentaire:string, oui:boolean) {
        this.sendToBandeauToRemoveNotification(identifiant);
        if (oui) {
            this.subscriptions.push(
                this.macroCommandeService.confirmerAction(identifiant, identifiantEtape, identifiantAction, commentaire)
                    .subscribe(response => {
                        console.log(response);
                    },
                        error => {
                        console.log("Erreur lors de la récupération des modèles de macro commandes")
                    },
                    () => {
                        //Finally
                    })
            );
        } else {
            this.subscriptions.push(
                this.macroCommandeService.infirmerAction(identifiant, identifiantEtape, identifiantAction, commentaire)
                    .subscribe(response => {
                        console.log(response);
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

    /**
     * Suspendre une macro commande
     * @param identifiant
     */
    public suspendreMacroCommande(identifiant:number) {
        this.subscriptions.push(
            this.macroCommandeService.suspendreMacroCommande(identifiant)
                .subscribe(response => {
                    this.isSuspend = true;
                    console.log("la macro id = " + identifiant + " a été suspendu avec succès");
                },
                    error => {
                    console.log("Erreur lors de la suspension de la macro")
                },
                () => {
                    //Finally
                })
        );
    }

    /**
     * Reprendre l'éxécution d'une macro commande
     * @param identifiant
     */
    public reprendreMacroCommande(identifiant:number) {
        this.sendToBandeauToRemoveNotification(identifiant);
        this.subscriptions.push(
            this.macroCommandeService.reprendreMacroCommande(identifiant)
                .subscribe(response => {
                    this.isSuspend = false;
                    console.log("la macro id = " + identifiant + " a repris son execution");
                },
                    error => {
                    console.log("Erreur lors de la suspension de la macro")
                },
                () => {
                    //Finally
                })
        );
    }

    /**
     * Arreter une macro commande
     * @param identifiant
     */
    public interrompreMacroCommande(identifiant:number) {
        this.sendToBandeauToRemoveNotification(identifiant);
        let code_modele = this.macroCommande.code_modele;
        this.subscriptions.push(
            this.macroCommandeService.interrompreMacroCommande(identifiant)
                .subscribe(response => {
                    this.macroCommande = undefined;
                    console.log("la macro id = " + identifiant + " a été arretée avec succès");
                },
                    error => {
                    console.log("Erreur lors de l'interruption de la macro")
                },
                () => {
                    //Finally
                })
        );
    }

    /**
     * Vérifier précondition
     * @param idMacro
     * @param idPrerequis
     */
    public verifierPrecondition(idMacro:number, idPrerequis:number){
        this.subscriptions.push(
            this.macroCommandeService.verifierPrecondition(idMacro, idPrerequis)
                .subscribe(response => {

                })
        );
    }

    public sendToBandeauToRemoveNotification(identifiant:number) {
        this.eventManager.broadcast({
            name: EventManagerCte.EVENT_NAME.removeNotificationMacroToBandeau,
            content: identifiant
        });
    }

    private resolveWebSocketCallbackSubscription() {
        this.subscriptions.push(this.eventManager
            .subscribe(EventManagerCte.EVENT_NAME.macroCommandesCreateFromWebSocket, (response) => {
                this.recupereMacroEcouter(response.content,"CREATE");
            }));
        this.subscriptions.push(this.eventManager
            .subscribe(EventManagerCte.EVENT_NAME.macroCommandesUpdateFromWebSocket, (response) => {
                this.recupereMacroEcouter(response.content,"UPDATE");
            }));
        this.subscriptions.push(this.eventManager
            .subscribe(EventManagerCte.EVENT_NAME.macroCommandesDeleteFromWebSocket, (response) => {
                this.recupereMacroEcouter(response.content,"DELETE");
            }));
    }

    private recupereMacroEcouter(macro:any,typeNotif:string){
        const nomMethode = "recupereMacroEcouter";
        console.log(nomMethode+" : <"+typeNotif+">  this.macro = <"+this.macroCommande+"> / macro = <"+macro+">");
        if(this.macroCommande){
            console.log(nomMethode+" : <"+typeNotif+">  this.macro = <"+this.macroCommande.identifiant+"> / macro = <"+macro.identifiant+">");
            if(typeNotif==="DELETE"){
                //La macro est terminé, on peut la supprimer
                if(macro.identifiant===this.macroCommande.identifiant){
                    delete this.macroCommande;
                }                
            }else if(macro.identifiant===this.macroCommande.identifiant){
                this.macroCommande.code_etat = macro.code_etat;
                this.macroCommande.pourcentage_avancement = macro.pourcentage_avancement;
                this.initIsSuspend();
            }
        }else{            
            this.subscriptions.push(this.macroCommandeService.getDetailMacroById(macro.identifiant)
                .subscribe(detailMacro => {
                    this.initEcouteSurLaMacroExecutee(detailMacro);
                }
            ));
        }
    }
}
