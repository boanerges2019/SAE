import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { EventManager } from '../../../../../app/shared/services/event/event-manager.service';
import { EventManagerCte } from '../../../../../app/shared/services/constantes/event-manager.constantes';
import { CtxCte } from '../../../../../app/shared/services/constantes/ctx.constantes';
import { BulletinsService } from '../../../../../app/core/bulletins/services/bulletins.service';
import { BulletinsWebsocketService } from '../../../../../app/core/bulletins/services/bulletins-websocket.service';
import { FieldBulletinsCte } from '../../../../../app/core/bulletins/constantes/field-bulletins.constante';
import { EnumerationsService } from '../../../../../app/shared/services/reference/enumerations.service';
import * as _ from 'underscore';
import { BaseService } from '../../../../../app/core/evenement/services/base.service';

@Component({
    selector: 'preparation-envoi-new',
    templateUrl: './preparation-envoi-new.component.html',
    styleUrls: ['./preparation-envoi-new.component.scss']
})
export class PreparationEnvoiNewComponent implements OnInit, OnDestroy {

    @Input() sourceCtx:string; // contexte d'où l'on vient.
    @Input() currentCtx:string; // mode d'accès à la ressource (lecture, edition)

    bulletins:Array<any> = [];
	selectedBulletin:Array<any> = [];
    model:any = {};
    subscriptions:Subscription[] = [];
    isDestinataire:boolean = true;
    paramDestinataires:any = {};
    paramGroupeDestinataires:any = {};
    paramFormats:any = {};
    paramMedias:any = {};
    data:any;
	showListeEvenements:boolean = true;
    evenements:any[]=[];

    constructor(private bulletinsService:BulletinsService, private eventManager:EventManager,
                private enumerationsService:EnumerationsService) {
        this.initData();
        this.resolveCreatePreparationEnvoiBack();
    }

    ngOnInit() {
        this.model.ctx = {}; // initialisation du contexte.
        this.model.field = FieldBulletinsCte.FIELD;
        this.model.currentCtx = this.currentCtx || CtxCte.CTX.BULLETIN_CREATE_PREPARATION_ENVOI;
        this.model.sourceCtx = this.sourceCtx;
        this.model.contexte = CtxCte.CTX;
        this.model.configCte = FieldBulletinsCte;
        this.paramDestinataires = {
            codeInfo: "ACT_ENVOYER_DOC_GENERAL.0",
            codeValeurPossible: "LISTE_RESSOURCES",
			valeurPossibles: []
        };
        this.paramGroupeDestinataires = {
            codeInfo: "ACT_ENVOYER_DOC_EVT_GROUPE.0",
            codeValeurPossible: "LISTE_GROUPES_DIFFUSION",
			valeurPossibles: []
        };
        this.paramFormats = {
            codeInfo: "ACT_ENVOYER_DOC_GENERAL.2",
            codeValeurPossible: "DOC_FORMAT",
			valeurPossibles: []
        };
        this.paramMedias = {
            codeInfo: "ACT_ENVOYER_DOC_GENERAL.3",
            codeValeurPossible: "MEDIA_DOC",
			valeurPossibles: []
        };
        this.getDestinataire();
        this.getFormats();
        this.getMedias();
        this.getBulletins();
        this.getResumeEvenements();
    }

    private initData() {
        this.data = {
            "nom": null,
            "description": null,
            "typeObjetSource": null,
            "idObjetSource": null,
            "codeRessourceDestinataire": null,
            "nomRessourceDestinataire": null,
            "codeGroupeDestinataire": null,
            "nomGroupeDestinataire": null,
            "codeModeleDocument": null,
            "codeFormat": 'DOC_FORMAT.PDF',
            "codeMedia": 'MEDIA_DOC.MAIL',
            "commentaire": null,
            "planification": null
        }
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

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

    public getDestinataire() {
        this.isDestinataire = true;
        this.getValeursPossiblesOfParam(this.paramDestinataires, null);
    }

    public getGroupeDestinataire() {
        this.isDestinataire = false;
        this.getValeursPossiblesOfParam(this.paramGroupeDestinataires, null);
    }

    public getFormats() {
        this.getValeursPossiblesOfParam(this.paramFormats, 'DOC_FORMAT.PDF');
    }

    public getMedias() {
        this.getValeursPossiblesOfParam(this.paramMedias, 'MEDIA_DOC.MAIL');
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

    private resolveCreatePreparationEnvoiBack() {
        this.subscriptions.push(this.eventManager.subscribe(EventManagerCte.EVENT_NAME.createPreparationEnvoiAndSendToBack, (response) => {
            this.subscriptions.push(this.bulletinsService.creationOuMiseAjourPreparationEnvoi(this.data)
                .subscribe((response) => {
                    console.log(response);
                }
            ));
        }));
    }

    private sendToListPreparationEnvoiShowCreerButton(isValid:boolean) {
        const nomMethode = 'sendToListPreparationEnvoiShowCreerButton';
        console.info(nomMethode + ' : ' + isValid);
        this.eventManager.broadcast({
            name: EventManagerCte.EVENT_NAME.showCreateButtonPreparationEnvoi,
            content: isValid
        });
    }

    private resolveActionIsValid() {
        let isValid : boolean = false;
        if (this.data.nom && (this.data.codeRessourceDestinataire || this.data.codeGroupeDestinataire)
            && this.data.codeModeleDocument && this.data.codeFormat && this.data.codeMedia) {
            isValid = true;
        }
        this.sendToListPreparationEnvoiShowCreerButton(isValid);
        return isValid;
    }

    public nameChange($event) {
        this.data.nom = $event.target.value;
        this.resolveActionIsValid();
    }

    public descriptionChange($event) {
        this.data.description = $event.target.value;
    }

    public destinataireChange(selectedItem) {
        let destinataire = null;
        if (this.isDestinataire) {
            destinataire = this.paramDestinataires.valeurPossibles.filter(item => item.id === selectedItem.id)[0];
            this.data.codeRessourceDestinataire = destinataire.codeInfo;
            this.data.nomRessourceDestinataire = destinataire.nom;
        } else {
            destinataire = this.paramGroupeDestinataires.valeurPossibles.filter(item => item.id === selectedItem.id)[0];
            this.data.codeGroupeDestinataire = destinataire.codeInfo;
            this.data.nomGroupeDestinataire = destinataire.nom;
        }
        this.resolveActionIsValid();
    }

    public modeleBulletinChange(selectedItem) {
        let bulletin = this.bulletins.filter(item => item.id === selectedItem.id)[0];
		if ('EVT' === bulletin.id) {
			this.showListeEvenements = true;
		} else {
			this.data.codeModeleDocument = bulletin.codeInfo;
			this.data.typeObjetSource = null;
			this.data.idObjetSource = null;
			this.showListeEvenements = false;
		}
        this.resolveActionIsValid();
    }

	public evenementChange(selectedItem) {
        let evt = this.evenements.filter(item => item.id === selectedItem.id)[0];
		this.data.codeModeleDocument = 'BLT_EVENEMENT_' + evt.codeModele;
		this.data.typeObjetSource = FieldBulletinsCte.TYPE_MODELE.EVENEMENT;
		this.data.idObjetSource = evt.identifiant;
        this.resolveActionIsValid();
    }

    public formatChange(selectedItem) {
        let format = this.paramFormats.valeurPossibles.filter(item => item.id === selectedItem.id)[0];
        this.data.codeFormat = format.codeInfo;
        this.resolveActionIsValid();
    }

    public mediaChange(selectedItem) {
        let media = this.paramMedias.valeurPossibles.filter(item => item.id === selectedItem.id)[0];
        this.data.codeMedia = media.codeInfo;
        this.resolveActionIsValid();
    }

    public commentaireChange($event) {
        this.data.commentaire = $event.target.value;
    }

    public getResumeEvenements() {
        this.subscriptions.push(this.bulletinsService.getResumeEvenements()
                .subscribe(response => {
                    this.evenements=response;
                })
        );
    }

}
