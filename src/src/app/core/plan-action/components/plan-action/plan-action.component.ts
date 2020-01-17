import { Component, OnInit, OnDestroy, Input , OnChanges, SimpleChanges, SimpleChange} from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { PacEvenement } from '../../../../../app/shared/models/generic/PacEvenement';
import * as _ from 'underscore';
import { LABELS } from './labels';
import { PlanActionCte } from '../../../../../app/core/plan-action/constantes/plan-action.constantes';
import { FieldPlanActionCte } from '../../../../../app/core/plan-action/constantes/field-plan-action.constantes';
import { ModeleValeur } from '../../../../../app/shared/utils/modele-valeur-builder';
import { ModeleEvenementService } from '../../../../../app/core/evenement/services/modele-evenement.service';
import { PLAN_ACTION } from '../../../../../app/core/plan-action/components/liste-plan-action/mock.plan.action';
import { EventManager } from '../../../../../app/shared/services/event/event-manager.service';
import { EventManagerCte } from '../../../../../app/shared/services/constantes/event-manager.constantes';
import { PlanActionService } from '../../../../../app/core/plan-action/services/plan-action.service';
import { PlanActionWebSocketService } from '../../../../../app/core/plan-action/services/plan-action-web-socket.service';
import { EnumerationsService } from '../../../../../app/shared/services/reference/enumerations.service';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

import { Objet } from '../../../../shared/models/generic/Objet';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs/Rx';
import { Headers, RequestOptions, RequestMethod,  Http, ResponseOptions } from '@angular/http';
import { Commande } from '../../../../shared/models/generic/Commande';
import { CacheService } from 'app/shared/services/cache/cache.service';
import { CacheConstantes } from 'app/shared/services/cache/cache.constantes';

@Component({
    selector: 'plan-action',
    templateUrl: './plan-action.component.html',
    styleUrls: ['./plan-action.component.scss']
})
export class PlanActionComponent implements OnInit, OnDestroy, OnChanges {

    @Input() planAction:PacEvenement;
    @Input() idEvenement:number;
    subscriptions:Subscription[] = [];
    model:{ [key: string]: any } = {};
    primitiveModel:any;
    blocActionsUnitaires:any;
    ordreActionUnitaire:number=1;
    listeItpc: { [key: string]: Objet } = {};
    //----------------------------------------------------------------------------
    //-- INITIALISATION
    //----------------------------------------------------------------------------

    constructor(private eventManager:EventManager,
                private enumerationsService:EnumerationsService,
                private modeleEvenementService:ModeleEvenementService,
                private planActionService:PlanActionService,
                private planActionWebSocketService:PlanActionWebSocketService,
                private sanitizer:DomSanitizer,
                private http:Http, private cacheService:CacheService) {


        this.model.labels = LABELS;
        this.model.field = FieldPlanActionCte.FIELD;
        this.model.modeExecution = PlanActionCte.MODES_EXECUTION;
        this.model.editedActionUnitaire = false;
        this.model.codeType = PlanActionCte.CODE_TYPE;
        this.model.actionIsValid = false;

        //Categories des Primitives
        // this.model.categoriePrimitives = PlanActionCte.CATEGORIE_PRIMITIVES;

        //Primitives associées au catégorie
        //this.model.primitives = PlanActionCte.PRIMITIVES;

        //Paramètres associés à la primitive
        //this.model.fields = PlanActionCte.PARAMETRES_PRIMITIVES;

        this.model.modesExecutions = _.values(ModeleEvenementService.enumerations[PlanActionCte.INPUT.MODE_EXECUTION_THEME].valeursEnumerations);
        this.model.nbActions = {};
        this.initAttributs();


        this.subscriptions.push(eventManager.subscribe(EventManagerCte.EVENT_NAME.actionApplicableUpdated, (response) => {
            this.updateActionApplicable(response.content);

        }));

        this.subscriptions.push(eventManager.subscribe(EventManagerCte.EVENT_NAME.launchAction, (response) => {
            this.execAction(response.content.idEvenement, response.content.idTheme, response.content.actionApplicable, response.content.isActionUnitaire);
            this.resolveCounts();
        }));

        this.subscriptions.push(eventManager.subscribe(EventManagerCte.EVENT_NAME.newPacToBeDisplayed, (response) => {
            this.initCount();
            this.initstartButtons();
        }));

        this.subscriptions.push(eventManager.subscribe(EventManagerCte.EVENT_NAME.demandeOuvertureDocumentEvent, (response) => {
            const cmd: Commande = response.content;
            this.ouvrirDocument(cmd);
        }));

        this.subscriptions.push(eventManager.subscribe(EventManagerCte.EVENT_NAME.demandeOuvertureDossierEvent, (response) => {
            const cmd: Commande = response.content;
            this.ouvrirDossier(cmd);
        }));


    }

    ngOnInit() {
        // apres chargement du PAC.
        this.planActionWebSocketService.subscribeCalEvenement(this.idEvenement); /* souscription aux notifications sur les actions unitaires */
        this.initstartButtons();
        this.initCount();
        this.resolveCounts();
        this.getModelesPrimitives();
        this.initializeFormatters();
        this.orderThemesPlanActionOfPlan();
        this.getActionUnitairesByIdEvenement();
        this.initSubscriptionListeActionUnitaires();
        this.ordreActionUnitaire=1;
    }

    /**
     * Positionner les actions réflexes en tête,
     * après semi-auto et manuelles en dernier
     */
    private orderThemesPlanActionOfPlan() {
        let sortThemes:any[] = new Array(3);
        this.planAction.themes.forEach(theme => {
            if(theme.codeModeExecution===PlanActionCte.MODES_EXECUTION.REFLEXE){
                sortThemes[0]=theme;
            }
            if(theme.codeModeExecution===PlanActionCte.MODES_EXECUTION.AUTOMATIQUE) {
                sortThemes[1] = theme;
            }
            if(theme.codeModeExecution===PlanActionCte.MODES_EXECUTION.MANUEL){
                sortThemes[2]=theme;
            }

        });
        this.planAction.themes=sortThemes;

    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    initstartButtons() {
        this.planAction.themes.forEach(theme => {
            this.model.startButtons = this.model.startButtons || {};
            this.model.startButtons[theme.identifiant] = {}
            this.model.startButtons[theme.identifiant].hide = false;
        });
    }

    ngOnChanges(changes:SimpleChanges) {
        this.planAction = changes.planAction.currentValue;
        this.ngOnInit();
    }

    initCount() {
        this.model.nbActions.total = 0;
        this.model.nbActions.succes = 0;
        this.model.nbActions.echec = 0;
        this.model.nbActions.refuse = 0;
        this.model.nbActions.enCours = 0;
    }

    private initAttributs() {
        //this.planAction.attributs[FieldPlanActionCte.FIELD.listeActions] = this.planAction.attributs[FieldPlanActionCte.FIELD.listeActions] || [];
    }

    /**
     * Description
     * @param xxx
     */
    private initCurrentParamretre() {
        this.model.currentParametre = this.model.currentParametre || {};
        for (const field in this.model.fields[this.model.currentPrimitive]) {
            let key = this.model.fields[this.model.currentPrimitive][field].key;
            this.model.currentParametre[key] = undefined;
        }
    }



    //----------------------------------------------------------------------------
    //-- ACTIONS
    //----------------------------------------------------------------------------

    public getActionUnitairesByIdEvenement(){
        this.planActionService.getActionUnitairesByIdEvenement(this.idEvenement)
            .subscribe(response => {
                if(response.identifiant){
                    this.blocActionsUnitaires = response;
                    this.model.startButtons = this.model.startButtons || {};
                    this.model.startButtons[this.blocActionsUnitaires.identifiant] = {};
                    this.model.startButtons[this.blocActionsUnitaires.identifiant].hide = false;
                }
        });
    }

    public createActionUnitaire() {
        this.cacheService.setObject(CacheConstantes.PREVENT_NON_SAVE_DATA_CTX, false);
        let modelAction = this.transformActionUnitaireToModeleAction();
        modelAction.nom = this.model.nomAction;
        modelAction.description = this.model.description;
        modelAction.ordre = this.ordreActionUnitaire;
        this.ordreActionUnitaire++;
        this.planActionService.addAction(this.idEvenement, modelAction)
            .subscribe(response => {
                this.model.editedActionUnitaire = false;
            });
    }

    public addActionUnitaire() {
        this.cacheService.setObject(CacheConstantes.PREVENT_NON_SAVE_DATA_CTX, true);
        this.model.editedActionUnitaire = true;
        this.model.nomAction="";
        this.model.currentPrimitive = null;
        let actionUnitairesDiv = document.getElementById("actions_unitaires");
        actionUnitairesDiv.scrollIntoView();

    }



    private transformActionUnitaireToModeleAction():any {
        let modelAction:any = {};
        modelAction.codeModelePrimitive = this.primitiveModel.codeInfo;
        modelAction.parametres = {};
        this.primitiveModel.modelesParametres.forEach(param => {
            let paramValueBack = {
                nom: param.paramValue.nom,
                description: param.paramValue.description,
                codeInfo: param.paramValue.codeInfo,
                valeur: param.paramValue.valeur,
                codeValeur: param.paramValue.codeValeur,
                codeModele:param.codeInfo
            };
            modelAction.parametres[param.codeInfo] = paramValueBack;
        });
        return modelAction;
    }

    public cancelActionUnitaire() {
        this.cacheService.setObject(CacheConstantes.PREVENT_NON_SAVE_DATA_CTX, false);
        this.model.editedActionUnitaire = false;
    }

    //----------------------------------------------------------------------------
    //-- EVENEMENTS
    //----------------------------------------------------------------------------

    public getCssThemeProgressBar(modeExecution) {
        switch (modeExecution) {
            case PlanActionCte.INPUT.MODE_EXECUTION_THEME_RFELEXE:
                return "refuse";
            case PlanActionCte.INPUT.MODE_EXECUTION_THEME_MANUEL:
                return "refuse";
            case PlanActionCte.INPUT.MODE_EXECUTION_THEME_AUTOMATIQUE:
                return "refuse";
            default:
                return "";
        }
    }



    /**
     * Retourne les 5 derniers actions appliquées
     */
    public getLastAction(actions:any[]) {
        if (!actions) return actions;
        actions = _.sortBy(actions, function (o) {
            return o.horodateFinExecution;
        });
        return actions.reverse().slice(0, 5);
    }


    //----------------------------------------------------------------------------
    //-- UTILS
    //----------------------------------------------------------------------------
    /**
     * Détermine le nombre d'évenements en cours, signalés et terminé.
     */
    public resolveCounts() {
        if (!this.planAction.themes || !this.planAction.themes) return;
        this.initCount();
        this.planAction.themes.forEach(theme => {
            if (!theme.actionsApplicables) return;
            theme.actionsApplicables.forEach(action => {
                this.model.nbActions.total += 1;
                switch (action.codeEtatDerniereExecution) {
                    case PlanActionCte.ETATS.SUCCES:
                        this.model.nbActions.succes += 1;
                        break;
                    case PlanActionCte.ETATS.EN_COURS:
                    case PlanActionCte.ETATS.SUSPENDU:
                        this.model.nbActions.enCours += 1;
                        break;
                    case PlanActionCte.ETATS.REFUSE:
                        this.model.nbActions.refuse += 1;
                        break;
                    case PlanActionCte.ETATS.ECHEC:
                        this.model.nbActions.echec += 1;
                        break;
                    default:
                        break;
                }
            });
        });
    }


    /**
     * Excécution des actions semi automatique ou reflexe automatique
     * @param $event
     */
    public execThemeAction($event, idTheme, actionApplicables) {
        this.model.startButtons[idTheme].hide = true;
        for (let actionApplicable of actionApplicables) {
            actionApplicable.codeEtatDerniereExecution = PlanActionCte.ETATS.EN_COURS;
            //this.execAction(this.planAction.identifiantEvenement, idTheme, actionApplicable)
        }

        this.planActionService.execActionsOfTheme(this.planAction.identifiantEvenement, idTheme)
            .subscribe(
                response => {
                this.model.startButtons[idTheme].hide = false;
                console.log("Actions du theme éxécutées avec succès ! ", response);
            },
                error => {
                this.model.startButtons[idTheme].hide = false;
                console.log("Erreur lors de l'éxécution des actions du theme", error);
            },
            () => {
                this.model.startButtons[idTheme].hide = false;
            }
        );
        this.resolveCounts();
    }


    /**
     * Lance une action applicable.
     * @param $event js
     * @param actionApplicable
     */
    public execAction(idEvenement:number, idTheme:number, actionApplicable:any, isActionUnitaire:boolean) {
        this.model.startButtons[idTheme].hide = true;
        actionApplicable.codeEtatDerniereExecution = PlanActionCte.ETATS.EN_COURS;
        this.planActionService.executerAction(idEvenement, idTheme, actionApplicable.identifiant, isActionUnitaire)
                .subscribe(
                    response => {
                    this.model.startButtons[idTheme].hide = false;
                    console.log("Action éxécutée avec succés ! ", response);
                },
                    error => {
                    this.model.startButtons[idTheme].hide = false;
                    console.log("Erreur lors de l'éxécution de l'action", error);
                },
                ()=> {
                    this.model.startButtons[idTheme].hide = false;
                }
            );
    }


    /**
     * Met à jour l'action applicable.
     * @param actionApplicable
     */
    private updateActionApplicable(actionApplicable:any) {
        const nomMethode = 'updateActionApplicable';
        console.debug(nomMethode + ' : ' + JSON.stringify(actionApplicable));
        this.planAction.themes = this.planAction.themes.map(theme => {
            theme.actionsApplicables = theme.actionsApplicables.map(action => {
                if (action.identifiant === actionApplicable.identifiant) {
                    action = actionApplicable;
                }
                return action;
            });
            return theme;
        });
        this.resolveCounts();
    }


    /**
     * Recupère toute la liste des
     * types de primitives du système
     * SAE
     */
    private getModelesPrimitives() {
        this.subscriptions.push(
            this.enumerationsService.getModelesPrimitivesActionsUnitaires()
                .subscribe(response => {
                    this.model.primitivesBack = response.modelesPrimitives;
                    this.model.primitives = _.values(response.modelesPrimitives);
                    this.initPrimitive();
                }
            )
        );
    }

    /**
     * Init tous les modèles de primitives pour
     * la ng-select
     */
    private initPrimitive() {
        this.model.primitives.forEach(primitive => {
            primitive.id = primitive.codeInfo;
            primitive.text = primitive.nom;
        });

        this.model.primitives = this.model.primitives.sort((prim1,prim2) => {
            return prim1.text < prim2.text ? -1 : prim1.text === prim2.text ? 0 : 1
        });
    }

    /**
     * Charge les valeurs possibles de la primitive selectionnée
     */
    private chargeValeursPossibleParams() {
        this.primitiveModel.modelesParametres = _.values(this.primitiveModel.modelesParametres);
        this.primitiveModel.modelesParametres.forEach(param => {
            this.getValeursPossiblesOfParam(param);
        });
        this.model.currentPrimitive = this.primitiveModel;
    }

    /**
     * Chaque changement du nom de l'action donne
     * d'entrée dans cette fonction
     * @param $event
     */
    public actionChange($event) {
        this.model.nomAction = $event.target.value;
        this.resolveactionIsValid();
    }

    /**
     * choix du modèle de primitive
     * @param selectedItem
     */
    public primitiveChange(selectedItem) {
        this.primitiveModel = this.model.primitivesBack[selectedItem.id];
        this.chargeValeursPossibleParams();
        this.resolveactionIsValid();
        // Scroll automatique vers le bas
        let actionUnitairesDiv = document.getElementById("actions_unitaires");
        actionUnitairesDiv.scrollIntoView();
    }

    public parametreChange(selectedItem, param:any) {
        switch (param.codeTypeValeurPossible) {
            case PlanActionCte.CODE_TYPE.ENTIER_BORNEE:
            case PlanActionCte.CODE_TYPE.EXPRESSION_REGULIERE:
            case PlanActionCte.CODE_TYPE.LIBRE:
            case PlanActionCte.CODE_TYPE.NUMERIQUE_BORNEE:
            case PlanActionCte.CODE_TYPE.TEXTUELLE_BORNEE:
                param.paramValue.codeValeur = param.paramValue.valeur;
            break;
            case PlanActionCte.CODE_TYPE.ENUMERATION :
            case PlanActionCte.CODE_TYPE.REQUETE :
                param.paramValue = param.valeurPossibles.filter(item => item.id === selectedItem.id)[0];
            break;
           default : break;
        }
        this.resolveactionIsValid();

        // Scroll automatique vers le bas
        let actionUnitairesDiv = document.getElementById("actions_unitaires");
        actionUnitairesDiv.scrollIntoView();

    }


    private resolveactionIsValid() {
        const nomMethode = 'PlanActionComponent.resolveactionIsValid';

        this.model.actionIsValid = false;
        if (this.model.nomAction) {
            if (this.model.currentPrimitive) {
                if (this.model.currentPrimitive.modelesParametres) {
                    let uneValeurNonRenseigne = false;
                    this.model.currentPrimitive.modelesParametres.forEach(param => {

                        if (!param.paramValue || !param.paramValue.valeur) {
                            //TODO : comprendre ce qui a voulu être fait
                            console.debug(nomMethode + ' : ' + JSON.stringify(param));

                            if(param.paramValue && param.paramValue.valeur!==0){
                                uneValeurNonRenseigne = true;
                            }
                        }
                    });
                    this.model.actionIsValid = !uneValeurNonRenseigne;
                } else {
                    /* cas de primitive sans paramètres */
                    this.model.actionIsValid = true;
                }
            }
        }
    }


    public getValeursPossiblesOfParam(param) {
        this.enumerationsService.getValeursPossibles(param.codeValeurPossible)
            .subscribe(response => {
                let valeurPossible = response[0];
                switch (valeurPossible.codeType) {
                    case PlanActionCte.CODE_TYPE.ENTIER_BORNEE :
                        param.codeTypeValeurPossible = PlanActionCte.CODE_TYPE.ENTIER_BORNEE;
                        param.paramValue = {
                            nom: valeurPossible.nom,
                            description: valeurPossible.description,
                            codeInfo: valeurPossible.codeInfo,
                            valeur: valeurPossible.min,
                            codeValeur: valeurPossible.min
                        };
                        param.valeurPossible = valeurPossible;
                        break;
                    case PlanActionCte.CODE_TYPE.ENUMERATION :
                        param.codeTypeValeurPossible = PlanActionCte.CODE_TYPE.ENUMERATION;
                        this.enumerationsService.getValeursPossiblesByCodeInfoEnumerations(valeurPossible.codeInfo)
                            .subscribe(response => {
                                console.log(response)
                                param.valeurPossibles = [];
                                response.forEach(valeurEnum => {
                                    let val = {
                                        nom: valeurEnum.nom,
                                        description: valeurEnum.description,
                                        codeInfo: valeurEnum.codeInfo,
                                        valeur: valeurEnum.valeur,
                                        codeValeur: valeurEnum.codeInfo,
                                        id: valeurEnum.codeInfo,
                                        text: valeurEnum.nom
                                    };
                                    param.valeurPossibles.push(val);
                                });
                                param.paramValue = param.valeurPossibles[0];
                            });
                        break;
                    case PlanActionCte.CODE_TYPE.EXPRESSION_REGULIERE :
                        // TODO on ne sait pas si dans le cadre du PAC on aura à l'implementer
                        break;
                    case PlanActionCte.CODE_TYPE.LIBRE :
                        // TODO à voir ce que je dois faire
                        break;
                    case PlanActionCte.CODE_TYPE.LOCALISANT :
                        // TODO pas possible dans le cadre du PAC
                        break;
                    case PlanActionCte.CODE_TYPE.NUMERIQUE_BORNEE :
                        param.codeTypeValeurPossible = PlanActionCte.CODE_TYPE.NUMERIQUE_BORNEE;
                        param.paramValue = {
                            nom: valeurPossible.nom,
                            description: valeurPossible.description,
                            codeInfo: valeurPossible.codeInfo,
                            valeur: valeurPossible.min,
                            codeValeur: valeurPossible.min
                        };
                        param.valeurPossible = valeurPossible;
                        break;
                    case PlanActionCte.CODE_TYPE.OBJET_INFERENCE :
                        // TODO pas possible dans le cadre du PAC
                        break;
                    case PlanActionCte.CODE_TYPE.REQUETE :
                        param.codeTypeValeurPossible = PlanActionCte.CODE_TYPE.REQUETE;
                        this.enumerationsService.getValeursPossiblesByCodeInfoRequetes(valeurPossible.codeInfo)
                            .subscribe(response => {
                                console.log(response)
                                param.valeurPossibles = [];
                                response.forEach(valeurRequete => {
                                    let val = {
                                        nom: valeurRequete.valeur,
                                        description: valeurRequete.valeur,
                                        codeInfo: valeurRequete.codeInfo,
                                        valeur: valeurRequete.valeur,
                                        codeValeur: valeurRequete.codeInfo,
                                        id: valeurRequete.codeInfo,
                                        text: valeurRequete.valeur
                                    };
                                    param.valeurPossibles.push(val);
                                });
                                param.paramValue = param.valeurPossibles[0];
                            });
                        break;

                    case PlanActionCte.CODE_TYPE.TEXTUELLE_BORNEE :
                        param.codeTypeValeurPossible = PlanActionCte.CODE_TYPE.TEXTUELLE_BORNEE;
                        param.paramValue = {
                            nom: valeurPossible.nom,
                            description: valeurPossible.description,
                            codeInfo: valeurPossible.codeInfo,
                            valeur: '',
                            codeValeur: ''
                        };
                        param.valeurPossible = valeurPossible;
                        break;
                    default :
                        if(PlanActionCte.CODE_TYPE.ENTIER_BORNEE.indexOf(valeurPossible.codeType)>-1){
                            param.codeTypeValeurPossible = PlanActionCte.CODE_TYPE.ENTIER_BORNEE;
                            param.paramValue = {
                                nom: valeurPossible.nom,
                                description: valeurPossible.description,
                                codeInfo: valeurPossible.codeInfo,
                                valeur: valeurPossible.min,
                                codeValeur: valeurPossible.min
                            };
                            param.valeurPossible = valeurPossible;
                        }
                        break;
                }
            });
    }

    public initializeFormatters() {
        this.model.genericFormatter = (data:any):SafeHtml => {
            let html = `<span>${data.nom}</span>`;
            return this.sanitizer.bypassSecurityTrustHtml(html);
        }
    }

    /**
     * Mettre à jour la liste des actions
     * unitaires via la websocket
     */
    public initSubscriptionListeActionUnitaires() {
        this.subscriptions.push(this.eventManager.subscribe(EventManagerCte.EVENT_NAME.actionsUnitairesPacUpdatedFromWebSocket, (response) => {
            if(response.content.calEvenement){
                if(response.content.calEvenement.identifiant){
                    if(this.blocActionsUnitaires){
                        this.blocActionsUnitaires = response.content.calEvenement;
                    }else{
                        this.blocActionsUnitaires = response.content.calEvenement;
                        this.model.startButtons = this.model.startButtons || {};
                        this.model.startButtons[this.blocActionsUnitaires.identifiant] = {};
                        this.model.startButtons[this.blocActionsUnitaires.identifiant].hide = false;
                    }
                }
            }

            if(response.content.action_applicable){
                for(let i=0; i<this.blocActionsUnitaires.actionsApplicables.length; i++){
                    if(this.blocActionsUnitaires.actionsApplicables[i].identifiant==response.content.action_applicable.identifiant){
                        this.blocActionsUnitaires.actionsApplicables[i] = response.content.action_applicable;
                        break;
                    }
                }
            }
        }));
    }

    public ouvrirDocument(cmd: Commande){
        const nomMethode = 'ouvrirDocument';
        console.info(nomMethode + ' : ' + JSON.stringify(cmd));
        const VARIABLE_CODE_DOCUMENT = 'CODE_FICHIER_EXPLOITATION';
        const codeDocument = cmd.variables[VARIABLE_CODE_DOCUMENT];
        if(codeDocument){
            //On récupère le document
            this.planActionService.getDocumentExploitation(codeDocument).subscribe(
                response => {

                    //On récupère le contenu du fichier
                    let contentType : string  = response.headers.get("content-type");
                    var url;
                    let isPdf = false;
                    if(contentType==="application/pdf"){
                        var blob = new Blob(
                            [response._body], {
                                type: 'application/pdf'
                            });
                        url = URL.createObjectURL(blob);
                        isPdf = true;
                    }else{
                        var blob = new Blob(
                            [response._body], {
                                type: 'text/html'
                            });
                        url = URL.createObjectURL(blob);
                    }

                    //TODO: Afficher le fichier
                    alert("TODO: afficher le fichier");
                }
            )
        }
    }

    public ouvrirDossier(cmd: Commande){
        const nomMethode = 'ouvrirDossier';
        console.info(nomMethode + ' : ' + JSON.stringify(cmd));
        const VARIABLE_DOSSIER = 'DOSSIER';

        //On récupère le chemin du dossier
        const dossier: string = cmd.variables[VARIABLE_DOSSIER];
        if(dossier){
            //TODO: ouvrir le dossier
            alert("TODO: ouvrir le dossier");
        }
    }


}
