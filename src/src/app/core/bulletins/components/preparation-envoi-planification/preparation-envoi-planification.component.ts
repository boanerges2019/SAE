import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { EventManager } from 'app/shared/services/event/event-manager.service';
import { EventManagerCte } from 'app/shared/services/constantes/event-manager.constantes';
import { CtxCte } from 'app/shared/services/constantes/ctx.constantes';
import { BulletinsService } from 'app/core/bulletins/services/bulletins.service';
import { BulletinsWebsocketService } from 'app/core/bulletins/services/bulletins-websocket.service';
import { FieldBulletinsCte } from 'app/core/bulletins/constantes/field-bulletins.constante';
import { EnumerationsService } from 'app/shared/services/reference/enumerations.service';
import { Objet } from 'app/shared/models/generic/Objet';
import * as _ from 'underscore';
import { BaseService } from 'app/core/evenement/services/base.service';

@Component({
    selector: 'preparation-envoi-planification',
    templateUrl: './preparation-envoi-planification.component.html',
    styleUrls: ['./preparation-envoi-planification.component.scss']
})
export class PreparationEnvoiPlanificationComponent implements OnInit, OnDestroy {


    @Input() currentCtx:string;

    preparation:any;
    model:any = {};
    subscriptions:Subscription[] = [];

    journees:any[] = [];
    plagesHoraires:any[]=[];
    periodicites:any[]=[];
    periodicite:any;

    bulletins:Array<any> = [];
	selectedBulletin:Array<any> = [];

    isDestinataire:boolean = true;
    paramDestinataires:any = {};
    paramGroupeDestinataires:any = {};

    paramFormats:any = {};
    paramMedias:any = {};
	showListeEvenements:boolean = true;
    evenements:any[]=[];


    constructor(private bulletinsService:BulletinsService, private eventManager:EventManager,
                private enumerationsService:EnumerationsService) {
        this.resolvePreparationsSubscription();
        this.initPreparation();
        this.resolveSendPreparation();
        this.resolvePlanificationPreparationEnvoiBack();
    }

    ngOnInit() {
        this.model.ctx = {}; // initialisation du contexte.
        this.model.field = FieldBulletinsCte.FIELD;
        this.model.currentCtx = this.currentCtx || CtxCte.CTX.BULLETIN_PLANIFICATION_PREPARATION_ENVOI;
        this.model.contexte = CtxCte.CTX;
        this.model.configCte = FieldBulletinsCte;
        this.paramDestinataires = {
            codeInfo: "ACT_ENVOYER_DOC_GENERAL.0",
            codeValeurPossible: "LISTE_RESSOURCES"
        };
        this.paramGroupeDestinataires = {
            codeInfo: "ACT_ENVOYER_DOC_EVT_GROUPE.0",
            codeValeurPossible: "LISTE_GROUPES_DIFFUSION"
        };
        this.paramFormats = {
            codeInfo: "ACT_ENVOYER_DOC_GENERAL.2",
            codeValeurPossible: "DOC_FORMAT"
        };
        this.paramMedias = {
            codeInfo: "ACT_ENVOYER_DOC_GENERAL.3",
            codeValeurPossible: "MEDIA_DOC"
        };

        setTimeout(() => {
            this.initJournnee();
            this.initPlagesHoraires();
            this.getDestinataire();
            this.getFormats();
            this.getMedias();
            this.getBulletins();
            this.getResumeEvenements();
         }, 1000);

    }

    /**************************************************************************************
     *                                 Initialisation
     **************************************************************************************/

    private initPreparation() {
        this.journees.forEach(journee => journee.isActive=false);
        let planification = {
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
            "demandeConfirmationFin": false,
            "periodiciteSec":undefined
        };

        let preparation = {
            "nom": null,
            "description": null,
            "codeRessourceDestinataire": null,
            "nomRessourceDestinataire": null,
            "codeGroupeDestinataire": null,
            "nomGroupeDestinataire": null,
            "codeModeleDocument": null,
            "codeFormat": 'DOC_FORMAT.PDF',
            "codeMedia": 'MEDIA_DOC.MAIL',
            "commentaire": null,
            "planification": planification
        };

        this.preparation = this.preparation || preparation;
    }

    public getValeursPossiblesOfParam(param, defaultValue) {
        this.enumerationsService.getValeursPossibles(param.codeValeurPossible)
            .subscribe(response => {
                let valeurPossible = response[0];
                switch (valeurPossible.codeType) {
                    case FieldBulletinsCte.CODE_TYPE.ENTIER_BORNEE :
                        // param.codeTypeValeurPossible = FieldBulletinsCte.CODE_TYPE.ENTIER_BORNEE;
                        param.paramValue = {
                            nom: valeurPossible.nom,
                            description: valeurPossible.description,
                            codeInfo: valeurPossible.codeInfo,
                            valeur: valeurPossible.min
                        };
                        param.valeurPossible = valeurPossible;
                        break;
                    case FieldBulletinsCte.CODE_TYPE.ENUMERATION :
                        //param.codeTypeValeurPossible = FieldBulletinsCte.CODE_TYPE.ENUMERATION;
                        this.enumerationsService.getValeursPossiblesByCodeInfoEnumerations(valeurPossible.codeInfo)
                            .subscribe(response => {
                                param.valeurPossibles = [];
                                response.forEach(valeurEnum => {
                                    let val = {
                                        nom: valeurEnum.nom,
                                        description: valeurEnum.description,
                                        codeInfo: valeurEnum.codeInfo,
                                        valeur: valeurEnum.valeur,
                                        id: valeurEnum.codeInfo,
                                        text: valeurEnum.nom
                                    };
                                    if (defaultValue && val.id === defaultValue) {
										param.paramValue = val;
									}
                                    param.valeurPossibles.push(val);
                                });
								if (!param.paramValue && param.valeurPossibles.length > 0) param.paramValue = param.valeurPossibles[0];
                            });
                        break;
                    case FieldBulletinsCte.CODE_TYPE.EXPRESSION_REGULIERE :
                        // TODO on ne sait pas si dans le cadre du PAC on aura à l'implementer
                        break;
                    case FieldBulletinsCte.CODE_TYPE.LIBRE :
                        // TODO à voir ce que je dois faire
                        break;
                    case FieldBulletinsCte.CODE_TYPE.LOCALISANT :
                        // TODO pas possible dans le cadre du PAC
                        break;
                    case FieldBulletinsCte.CODE_TYPE.NUMERIQUE_BORNEE :
                        //param.codeTypeValeurPossible = FieldBulletinsCte.CODE_TYPE.NUMERIQUE_BORNEE;
                        param.paramValue = {
                            nom: valeurPossible.nom,
                            description: valeurPossible.description,
                            codeInfo: valeurPossible.codeInfo,
                            valeur: valeurPossible.min
                        };
                        param.valeurPossible = valeurPossible;
                        break;
                    case FieldBulletinsCte.CODE_TYPE.OBJET_INFERENCE :
                        // TODO pas possible dans le cadre du PAC
                        break;
                    case FieldBulletinsCte.CODE_TYPE.REQUETE :
                        //param.codeTypeValeurPossible = FieldBulletinsCte.CODE_TYPE.REQUETE;
                        this.enumerationsService.getValeursPossiblesByCodeInfoRequetes(valeurPossible.codeInfo)
                            .subscribe(response => {
                                param.valeurPossibles = [];
                                response.forEach(valeurRequete => {
                                    let val = {
                                        nom: valeurRequete.valeur,
                                        description: valeurRequete.valeur,
                                        codeInfo: valeurRequete.codeInfo,
                                        valeur: valeurRequete.valeur,
                                        id: valeurRequete.codeInfo,
                                        text: valeurRequete.valeur
                                    };
                                    param.valeurPossibles.push(val);
									if (defaultValue && val.id === defaultValue) {
										param.paramValue = val;
									}
                                });
                                if (!param.paramValue && param.valeurPossibles.length > 0) param.paramValue = param.valeurPossibles[0];
                            });
                        break;

                    case FieldBulletinsCte.CODE_TYPE.TEXTUELLE_BORNEE :
                        // param.codeTypeValeurPossible = FieldBulletinsCte.CODE_TYPE.TEXTUELLE_BORNEE;
                        param.paramValue = {
                            nom: valeurPossible.nom,
                            description: valeurPossible.description,
                            codeInfo: valeurPossible.codeInfo
                        };
                        param.valeurPossible = valeurPossible;
                        break;
                    default :
                        if (FieldBulletinsCte.CODE_TYPE.ENTIER_BORNEE.indexOf(valeurPossible.codeType) > -1) {
                            //  param.codeTypeValeurPossible = FieldBulletinsCte.CODE_TYPE.ENTIER_BORNEE;
                            param.paramValue = {
                                nom: valeurPossible.nom,
                                description: valeurPossible.description,
                                codeInfo: valeurPossible.codeInfo,
                                valeur: valeurPossible.min
                            };
                            param.valeurPossible = valeurPossible;
                        }
                        break;
                }
            });
    }


    /**************************************************************************************
     * methodes pour le nom de la préparation
     **************************************************************************************/

    public nameChange($event) {
        this.preparation.nom = $event.target.value;
        this.resolveActionIsValid();
    }

    /**************************************************************************************
     * methodes pour la description de la préparation
     **************************************************************************************/

    public descriptionChange($event) {
        this.preparation.description = $event.target.value;
        this.resolveActionIsValid();
    }

    /**************************************************************************************
     * methodes pour le destinataire ou groupe destinataire de la préparation
     **************************************************************************************/

    public getDestinataire() {
        this.isDestinataire = true;
        this.getValeursPossiblesOfParam(this.paramDestinataires, null);
    }

    public getGroupeDestinataire() {
        this.isDestinataire = false;
        this.getValeursPossiblesOfParam(this.paramGroupeDestinataires, null);
    }

    public destinataireChange(selectedItem) {
        let destinataire : Objet = null;
        if(this.isDestinataire){
            destinataire =  this.paramDestinataires.valeurPossibles.filter(item => item.id === selectedItem.id)[0];
            this.preparation.codeRessourceDestinataire = destinataire.codeInfo;
            this.preparation.nomRessourceDestinataire = destinataire.nom;
        }else{
            destinataire =  this.paramGroupeDestinataires.valeurPossibles.filter(item => item.id === selectedItem.id)[0];
            this.preparation.codeGroupeDestinataire = destinataire.codeInfo;
            this.preparation.nomGroupeDestinataire = destinataire.nom;
        }
        this.resolveActionIsValid();
    }

    public getItemDestinataire(codeDestinataire:any){
        return this.paramDestinataires.valeurPossibles.filter(item => item.id === codeDestinataire)[0]
    }

    public getItemGroupeDestinataire(codeGroupeDestinataire:any){
        return this.paramGroupeDestinataires.valeurPossibles.filter(item => item.id === codeGroupeDestinataire)[0]
    }

    /**************************************************************************************
     * methodes pour les modèles de bulletins de la préparation
     **************************************************************************************/

    getBulletins() {
        this.subscriptions.push(this.bulletinsService.recupereTousLesModelesDocuments()
            .subscribe((response) => {
                if (response) {
                    this.bulletins = response.filter(
                        mb => {
							return mb.codeModeleHerite === 'BLT_GENERAL' && mb.virtuel === false;
						}
                    );
                    this.bulletins.map(bul => {
                        bul.id = bul.codeInfo;
                        bul.text = bul.nom;
                    });
					this.bulletins.splice(0,0,{ id: 'EVT', text: 'Lié à l\'événement', active: true});
					this.selectedBulletin = [this.bulletins[0]];
                }
            }
        ));
    }

    public getModelBulletin(codeModeleDocument:any){
        return this.bulletins.filter(item => item.id === codeModeleDocument)[0]
    }

    public modeleBulletinChange(selectedItem) {
        let bulletin = this.bulletins.filter(item => item.id === selectedItem.id)[0];
		if ('EVT' === bulletin.id) {
			this.showListeEvenements = true;
		} else {
			this.preparation.codeModeleDocument = bulletin.codeInfo;
			this.preparation.typeObjetSource = null;
			this.preparation.idObjetSource = null;
			this.showListeEvenements = false;
		}
        this.resolveActionIsValid();
    }

    /**************************************************************************************
     * methodes pour les évènements de la préparation
     **************************************************************************************/

    public getResumeEvenements() {
        this.subscriptions.push(this.bulletinsService.getResumeEvenements().subscribe(response => {
                this.evenements = response;
            })
        );
    }

    public evenementChange(selectedItem){
		let evt = this.evenements.filter(item => item.id === selectedItem.id)[0];
		this.preparation.codeModeleDocument = 'BLT_EVENEMENT_' + evt.codeModele;
		this.preparation.typeObjetSource = FieldBulletinsCte.TYPE_MODELE.EVENEMENT;
		this.preparation.idObjetSource = evt.identifiant;
        this.resolveActionIsValid();
    }

    public getEvenementBulletin(idEvenement:any){
        return this.evenements.filter(item => item.id === idEvenement)[0]
    }

    /**************************************************************************************
     * methodes pour le format de la préparation
     **************************************************************************************/

    public getFormats() {
        this.getValeursPossiblesOfParam(this.paramFormats, 'DOC_FORMAT.PDF');
    }

    public formatChange(selectedItem) {
        let format = this.paramFormats.valeurPossibles.filter(item => item.id === selectedItem.id)[0];
        this.preparation.codeFormat = format.codeInfo;
        this.resolveActionIsValid();
    }
    public getItemFormat(codeFormat:any){
        return this.paramFormats.valeurPossibles.filter(item => item.id === codeFormat)[0];
    }

    /**************************************************************************************
     * methodes pour le media de la préparation
     **************************************************************************************/

    public getMedias() {
        this.getValeursPossiblesOfParam(this.paramMedias, 'MEDIA_DOC.MAIL');
    }

    public getItemMedia(codeMedia:any){
        return this.paramMedias.valeurPossibles.filter(item => item.id === codeMedia)[0];
    }

    public mediaChange(selectedItem) {
        let media = this.paramMedias.valeurPossibles.filter(item => item.id === selectedItem.id)[0];
        this.preparation.codeMedia = media.codeInfo;
        this.resolveActionIsValid();
    }

    /**************************************************************************************
     * methodes pour le commentaire de la préparation
     **************************************************************************************/

    public commentaireChange($event) {
        this.preparation.commentaire = $event.target.value;
        this.resolveActionIsValid();
    }


    /**************************************************************************************
     * methodes pour le calendrier de la planification de la préparation
     **************************************************************************************/
    private initPlagesHoraires() {
        this.preparation.planification.heureDebut=FieldBulletinsCte.PLAGES_HORAIRES[0];
        this.periodicite = FieldBulletinsCte.PERIODICITES[0];
        this.preparation.planification.periodiciteSec = this.periodicite.periodicite * 60;
        this.plagesHoraires = FieldBulletinsCte.PLAGES_HORAIRES;
        this.periodicites = FieldBulletinsCte.PERIODICITES;

    }

    private initJournnee() {
        this.journees = FieldBulletinsCte.JOURNEES;
    }

    public selectJournee(journee:any){
        journee.isActive = !journee.isActive;
        this.preparation.planification[journee.model] = journee.isActive;
        this.resolveActionIsValid();
    }

    /**
     * clique sur le bouton oui ou non
     */
    public selectConfirmation($event) {
        $event.preventDefault();
        $event.stopPropagation();
        this.preparation.planification.demandeConfirmationDebut=!this.preparation.planification.demandeConfirmationDebut;
    }

    /**
     * clique sur le bouton activer ou desactiver
     */
    public selectStatutCalendrier($event) {
        $event.preventDefault();
        $event.stopPropagation();
        this.preparation.planification.demandeConfirmationFin=!this.preparation.planification.demandeConfirmationFin;
    }

    public selectPeriodicite(event){
        let i = +event.currentTarget.value.split(":")[0];
        this.preparation.planification.periodiciteSec = this.periodicites[i].periodicite * 60;
        this.resolveActionIsValid();
    }

    public selectHoraire(event){
        this.resolveActionIsValid();
    }

    public selectDate(event){
        this.resolveActionIsValid();
    }

    /**************************************************************************************
     * methodes de traitements
     **************************************************************************************/
    private resolvePlanificationPreparationEnvoiBack() {
        this.subscriptions.push(this.eventManager.subscribe(EventManagerCte.EVENT_NAME.creerAndplanifierPreparationEnvoiAndSendToBack, (response) => {
            this.preparation.planification.heureDebut = this.preparation.planification.heureDebut.horaire;
            this.subscriptions.push(this.bulletinsService.creationOuMiseAjourPreparationEnvoi(this.preparation)
                .subscribe((response) => {
                    console.log(response);
                }
            ));

        }));
    }

    private resolvePreparationsSubscription() {
        this.subscriptions.push(this.eventManager.subscribe(EventManagerCte.EVENT_NAME.bulletinsCreatedFromWebSocket, (response) => {
            this.preparation.identifiant = response.content.identifiant;
            // Au retour de la création je planifie
            this.subscriptions.push(this.bulletinsService.planifierPreparationEnvoiParSonIdentifiant(this.preparation)
                .subscribe((response) => {
                    this.sendToListOfBulletinsPlanifiesReload();
                }
            ));
        }));
    }

    private sendToListOfBulletinsPlanifiesReload() {
        this.eventManager.broadcast({
            name: EventManagerCte.EVENT_NAME.sendToListOfBulletinsPlanifiesReload,
            content: this.preparation
        });
    }

    private sendToListPreparationEnvoiShowPlanifierButton(isValid :boolean) {
        this.eventManager.broadcast({
            name: EventManagerCte.EVENT_NAME.showPlanifierButtonPreparationEnvoi,
            content: isValid
        });
    }

    private resolveSendPreparation() {
        this.subscriptions.push(this.eventManager.subscribe(EventManagerCte.EVENT_NAME.sendPreparationEnvoiToPlanification, (response) => {
            this.preparation = response.content;
       //     this.initItemData();
        }));
    }

    private resolveActionIsValid() {
        /* vérification sur les champs de la préparation d'envoi */
        let isValid : boolean = false;
        if (!this.preparation.nom || (!this.preparation.codeRessourceDestinataire && !this.preparation.codeGroupeDestinataire)
            || !this.preparation.codeModeleDocument || (this.preparation.typeObjetSource && !this.preparation.idObjetSource)
            || !this.preparation.codeFormat || !this.preparation.codeMedia) {
            isValid = false;
        }

        /* teste obligatoire sur la planification */
        if (!this.preparation.planification.lundi && !this.preparation.planification.mardi && !this.preparation.planification.mercredi
            && !this.preparation.planification.jeudi && !this.preparation.planification.vendredi && !this.preparation.planification.samedi
            && !this.preparation.planification.dimanche){
            isValid = false;
        }else if (!this.preparation.planification.dateDebut || !this.preparation.planification.dateFin){ isValid = false;}
        else if (this.preparation.planification.dateDebut > this.preparation.planification.dateFin){ isValid = false;}
        else if (!this.preparation.planification.heureDebut || !this.preparation.planification.heureDebut.horaire){ isValid = false;}
        else{
            isValid = true;
        }
        this.sendToListPreparationEnvoiShowPlanifierButton(isValid);
        return isValid;
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

}
