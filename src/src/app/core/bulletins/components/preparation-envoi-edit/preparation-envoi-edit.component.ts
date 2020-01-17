import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { EventManager } from 'app/shared/services/event/event-manager.service';
import { EventManagerCte } from 'app/shared/services/constantes/event-manager.constantes';
import { CtxCte } from 'app/shared/services/constantes/ctx.constantes';
import { BulletinsService } from 'app/core/bulletins/services/bulletins.service';
import { BulletinsWebsocketService } from 'app/core/bulletins/services/bulletins-websocket.service';
import { FieldBulletinsCte } from 'app/core/bulletins/constantes/field-bulletins.constante';
import { EnumerationsService } from 'app/shared/services/reference/enumerations.service';
import { BaseService } from 'app/core/evenement/services/base.service';
import * as _ from 'underscore';

@Component({
    selector: 'preparation-envoi-edit',
    templateUrl: './preparation-envoi-edit.component.html',
    styleUrls: ['./preparation-envoi-edit.component.scss']
})
export class PreparationEnvoiEditComponent implements OnInit, OnDestroy {


    @Input() currentCtx:string;
    @Input() isUpadtePlanif:boolean;

    preparation:any;
    isDestinataire:boolean=true;
    bulletins:any;
    model:any = {};
    subscriptions:Subscription[] = [];
    paramDestinataires:any = {};
    paramGroupeDestinataires:any = {};
    paramFormats:any={};
    paramMedias:any={};
    data:any;
    itemDestinataire:any;
    itemGroupeDestinataire:any;
    itemFormat:any;
    itemMedia:any;
    itemCodeModeleBulletin:any;
    evenements:any[]=[];
    itemEvenementBulletin:any;
    journees:any[] = [];
    plagesHoraires:any[]=[];
    periodicites:any[]=[];
    periodicite:any;


    constructor(private bulletinsService:BulletinsService, private eventManager:EventManager,
                private enumerationsService:EnumerationsService) {
        this.initData();
        this.init();
        this.resolveModifierPreparationEnvoi();
        this.resolveSendPreparation();
        /*setTimeout(() => {
            this.resolveSendPreparation();
        }, 1000);*/

    }


    ngOnInit() {
        /*this.model.ctx = {}; // initialisation du contexte.
        this.model.field = FieldBulletinsCte.FIELD;
        this.model.currentCtx = this.currentCtx || CtxCte.CTX.BULLETIN_EDITION_PREPARATION_ENVOI;
        this.model.contexte = CtxCte.CTX;
        this.model.configCte = FieldBulletinsCte;
        this.isUpadtePlanif = this.isUpadtePlanif || false;
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

        this.initJournnee();
        this.initPlagesHoraires();
        this.getDestinataire();
        this.getGroupeDestinataire();
        this.getFormats();
        this.getMedias();
        this.getBulletins();
        this.getResumeEvenements();*/

    }

    private init(){
        this.model.ctx = {}; // initialisation du contexte.
        this.model.field = FieldBulletinsCte.FIELD;
        this.model.currentCtx = this.currentCtx || CtxCte.CTX.BULLETIN_EDITION_PREPARATION_ENVOI;
        this.model.contexte = CtxCte.CTX;
        this.model.configCte = FieldBulletinsCte;
        this.isUpadtePlanif = this.isUpadtePlanif || false;
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

        this.initJournnee();
        this.initPlagesHoraires();
        this.getDestinataire();
        this.getGroupeDestinataire();
        this.getFormats();
        this.getMedias();
        this.getBulletins();
        this.getResumeEvenements();
    }

    public getResumeEvenements() {
        this.subscriptions.push(this.bulletinsService.getResumeEvenements().subscribe(response => {
                this.evenements = response;
            })
        );
    }

    private initItemData(){
        if(this.preparation.codeRessourceDestinataire){
            this.itemDestinataire = this.getItemDestinataire(this.preparation.codeRessourceDestinataire);
        }

        if(this.preparation.codeGroupeDestinataire){
            this.itemGroupeDestinataire = this.getItemGroupeDestinataire(this.preparation.codeGroupeDestinataire);
        }

        if(this.preparation.codeFormat){
            this.itemFormat = this.getItemFormat(this.preparation.codeFormat);
        }

        if(this.preparation.codeMedia){
            this.itemMedia = this.getItemMedia(this.preparation.codeMedia);
        }

        if(this.preparation.codeModeleDocument){
            this.itemCodeModeleBulletin = this.getModelBulletin(this.preparation.codeModeleDocument);
        }

        if(this.preparation.idObjetSource && this.preparation.typeObjetSource===FieldBulletinsCte.TYPE_MODELE.EVENEMENT){
            this.itemEvenementBulletin = this.getEvenementBulletin(this.preparation.idObjetSource);
        }

        if(this.preparation.planification){
            /* les journées */
            this.journees.forEach(journee => {
                if(journee.model===FieldBulletinsCte.JOURNEES[0].model){
                    journee.isActive=this.preparation.planification.lundi;
                }
                if(journee.model===FieldBulletinsCte.JOURNEES[1].model){
                    journee.isActive=this.preparation.planification.mardi;
                }
                if(journee.model===FieldBulletinsCte.JOURNEES[2].model){
                    journee.isActive=this.preparation.planification.mercredi;
                }
                if(journee.model===FieldBulletinsCte.JOURNEES[3].model){
                    journee.isActive=this.preparation.planification.jeudi;
                }
                if(journee.model===FieldBulletinsCte.JOURNEES[4].model){
                    journee.isActive=this.preparation.planification.vendredi;
                }
                if(journee.model===FieldBulletinsCte.JOURNEES[5].model){
                    journee.isActive=this.preparation.planification.samedi;
                }
                if(journee.model===FieldBulletinsCte.JOURNEES[6].model){
                    journee.isActive=this.preparation.planification.dimanche;
                }
            });

            if(this.preparation.planification.heureDebut){
                for(let i = 0; i<FieldBulletinsCte.PLAGES_HORAIRES.length; i++){
                    if(FieldBulletinsCte.PLAGES_HORAIRES[i].horaire===this.preparation.planification.heureDebut){
                        this.preparation.planification.heureDebut = FieldBulletinsCte.PLAGES_HORAIRES[i];
                        break;
                    }
                }
            }

            if(this.preparation.planification.periodiciteSec){
                this.periodicite = this.preparation.planification.periodiciteSec / 60;
                for(let i = 0; i<FieldBulletinsCte.PERIODICITES.length; i++){
                    if(FieldBulletinsCte.PERIODICITES[i].periodicite===this.periodicite){
                        this.periodicite = FieldBulletinsCte.PERIODICITES[i];
                        break;
                    }
                }
            }
        }
    }

    public getEvenementBulletin(idEvenement:any){
        let evt = this.evenements.filter(item => item.id == idEvenement)[0];
        return evt;
    }

    private initData() {
        this.data = {
            "nom": null,
            "description": null,
            "codeRessourceDestinataire": null,
            "nomRessourceDestinataire": null,
            "codeGroupeDestinataire": null,
            "nomGroupeDestinataire": null,
            "codeModeleDocument": null,
            "codeFormat": null,
            "codeMedia": null,
            "commentaire": null,
            "planification": null
        }
        this.initPreparation();
    }

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
            "codeFormat": null,
            "codeMedia": null,
            "commentaire": null,
            "planification": planification
        };

        this.preparation = this.preparation || preparation;
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    getBulletins() {
        this.subscriptions.push(this.bulletinsService.recupereTousLesModelesDocuments()
            .subscribe((response) => {
                if (response) {
                    this.bulletins = response;
                    this.bulletins.map(bul => {
                        bul.id = bul.codeInfo;
                        bul.text = bul.nom;
                    });
                }
            }
        ));
    }

    public getDestinataire() {
        this.getValeursPossiblesOfParam(this.paramDestinataires);
    }

    public getGroupeDestinataire() {
        this.getValeursPossiblesOfParam(this.paramGroupeDestinataires);
    }

    public getFormats(){
        this.getValeursPossiblesOfParam(this.paramFormats);
    }

    public getMedias(){
        this.getValeursPossiblesOfParam(this.paramMedias);
    }

    public getValeursPossiblesOfParam(param) {
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
                                    param.valeurPossibles.push(val);
                                });
                                param.paramValue = param.valeurPossibles[0];
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
                                });
                                param.paramValue = param.valeurPossibles[0];
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

   private resolveSendPreparation() {
        this.subscriptions.push(this.eventManager.subscribe(EventManagerCte.EVENT_NAME.sendPreparationEnvoiToModification, (response) => {
            this.preparation = response.content;
            if(!this.preparation.planification){
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
                this.preparation.planification = planification;
            }

            this.initItemData();
        }));
    }

    private resolveModifierPreparationEnvoi() {
        this.subscriptions.push(this.eventManager.subscribe(EventManagerCte.EVENT_NAME.modifierPreparationEnvoiAndSendToBack, (response) => {
            if(this.preparation.planification && this.preparation.planification.heureDebut){
                this.preparation.planification.heureDebut = this.preparation.planification.heureDebut.horaire;
            }
            this.subscriptions.push(this.bulletinsService.creationOuMiseAjourPreparationEnvoi(this.preparation)
                .subscribe((response) => {

                }
            ));
        }));

        this.subscriptions.push(this.eventManager.subscribe(EventManagerCte.EVENT_NAME.planifierPreparationEnvoiAlreadyExistAndSendToBack, (response) => {
            this.preparation.planification.heureDebut = this.preparation.planification.heureDebut.horaire;
            this.subscriptions.push(this.bulletinsService.planifierPreparationEnvoiParSonIdentifiant(this.preparation)
                .subscribe((response) => {

                }
            ));
        }));

        this.subscriptions.push(this.eventManager.subscribe(EventManagerCte.EVENT_NAME.modifierPlanifierPreparationEnvoiAlreadyExistAndSendToBack, (response) => {
            this.preparation.planification.heureDebut = this.preparation.planification.heureDebut.horaire;
            this.subscriptions.push(this.bulletinsService.planifierPreparationEnvoiParSonIdentifiant(this.preparation)
                .subscribe((response) => {

                }
            ));
        }));


    }



    private sendToListPreparationEnvoiShowValidButton(isValid:boolean) {
        this.eventManager.broadcast({
            name: EventManagerCte.EVENT_NAME.showValiderButtonPreparationEnvoi,
            content: isValid
        });
    }

    private sendToListPreparationEnvoiShowPlanifierButton(isValid:boolean) {
        this.eventManager.broadcast({
            name: EventManagerCte.EVENT_NAME.showPlanifierButtonPreparationEnvoi,
            content: isValid
        });
    }

   /* private resolveactionIsValid() {
        if (this.preparation.commentaire) {
            this.sendToListPreparationEnvoiShowValidButton();
        }
    }*/

    private resolveactionIsValid() {
        /* vérification sur les champs de la préparation d'envoi */
        let isValid : boolean = false;
        if(this.isUpadtePlanif){
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
        }else{
            if (this.preparation.commentaire) {
                isValid = true;
            }
            this.sendToListPreparationEnvoiShowValidButton(isValid);
        }
        return isValid;
    }


    public nameChange($event) {
        this.data.nom = $event.target.value;
        this.resolveactionIsValid();
    }

    public descriptionChange($event) {
        this.data.description = $event.target.value;
        this.resolveactionIsValid();
    }

    public destinataireChange(selectedItem) {
        let destinataire = null;
        if(this.isDestinataire){
            destinataire =  this.paramDestinataires.valeurPossibles.filter(item => item.id === selectedItem.id)[0];
            this.data.codeRessourceDestinataire = destinataire.codeInfo;
            this.data.nomRessourceDestinataire = destinataire.nom;
        }else{
            destinataire =  this.paramGroupeDestinataires.valeurPossibles.filter(item => item.id === selectedItem.id)[0];
            this.data.codeGroupeDestinataire = destinataire.codeInfo;
            this.data.nomGroupeDestinataire = destinataire.nom;
        }
        this.resolveactionIsValid();
    }

    public modeleBulletinChange(selectedItem){
        let bulletin = this.bulletins.filter(item => item.id === selectedItem.id)[0];
        this.data.codeModeleDocument = bulletin.codeInfo;
        this.resolveactionIsValid();
    }

    public formatChange(selectedItem) {
        let format = this.paramFormats.valeurPossibles.filter(item => item.id === selectedItem.id)[0];
        this.data.codeFormat = format.codeInfo;
        this.resolveactionIsValid();
    }

    public mediaChange(selectedItem) {
        let media = this.paramMedias.valeurPossibles.filter(item => item.id === selectedItem.id)[0];
        this.data.codeMedia = media.codeInfo;
        this.resolveactionIsValid();
     }

    public commentaireChange($event) {
        this.preparation.commentaire = $event.target.value;
        this.resolveactionIsValid();
    }

    public getItemDestinataire(codeDestinataire:any){
        return this.paramDestinataires.valeurPossibles.filter(item => item.id === codeDestinataire)[0]
    }

    public getItemGroupeDestinataire(codeGroupeDestinataire:any){
        return this.paramGroupeDestinataires.valeurPossibles.filter(item => item.id === codeGroupeDestinataire)[0]
    }

    public getModelBulletin(codeModeleDocument:any){
        if(!this.bulletins){
            this.subscriptions.push(this.bulletinsService.recupereTousLesModelesDocuments()
                .subscribe((response) => {
                    if (response) {
                        this.bulletins = response;
                        this.bulletins.map(bul => {
                            bul.id = bul.codeInfo;
                            bul.text = bul.nom;
                        });
                        return this.bulletins.filter(item => item.id === codeModeleDocument)[0];
                    }
                }
            ));
        }
        return this.bulletins.filter(item => item.id === codeModeleDocument)[0];
    }

    public getItemFormat(codeFormat:any){
        return this.paramFormats.valeurPossibles.filter(item => item.id === codeFormat)[0];
    }

    public getItemMedia(codeMedia:any){
        return this.paramMedias.valeurPossibles.filter(item => item.id === codeMedia)[0];
    }

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
        this.resolveactionIsValid();
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
        this.resolveactionIsValid();
    }

    public selectHoraire(event){
        this.resolveactionIsValid();
    }

    public selectDate(event){
        this.resolveactionIsValid();
    }


}
