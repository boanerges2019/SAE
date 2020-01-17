import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import * as _ from 'underscore';
import { EventManager } from 'app/shared/services/event/event-manager.service';
import { EventManagerCte } from 'app/shared/services/constantes/event-manager.constantes';
import { Evenement } from 'app/shared/models/generic/Evenement';
import { Emprise } from 'app/shared/models/generic/Emprise';
import { Voie } from 'app/shared/models/generic/Voie';
import { Pr } from 'app/shared/models/generic/Pr';
import { Localisant } from 'app/shared/models/generic/Localisant';
import { Section } from 'app/shared/models/generic/Section';
import { ModeleValeur } from 'app/shared/utils/modele-valeur-builder';
import { ReferenceService } from 'app/shared/services/reference/reference.service';
import { FieldEvenementCte } from 'app/core/evenement/constantes/field-evenement.constantes';
import { EvenementCte } from 'app/core/evenement/constantes/evenement.constantes';
import { EvenementUtils } from 'app/shared/utils/evenement-utils';
import { ModeleEvenementService } from 'app/core/evenement/services/modele-evenement.service';

/**
 * Composant qui gère les emprises
 */
@Component({
    selector: 'evenement-emprise',
    providers: [ReferenceService],
    templateUrl: './evenement-emprise.component.html',
    styleUrls: ['./evenement-emprise.component.scss']

})
export class EvenementEmpriseComponent implements OnInit,  OnDestroy {

    @Input() evenement:Evenement;
    @Input() currentCtx:string; // mode d'accès à la ressource (lecture, edition)
    subscriptions:Subscription[] = [];
    sens:any[];
    sections:Section[] = [];
    sectionsSensInverse:Section[] = [];
    isCollapsedContent:boolean = false;
    field:{ [key: string]: any };
    model:{ [ key: string]: any } = {};

    //----------------------------------------------------------------------------
    //-- INITIALISATION
    //----------------------------------------------------------------------------
    constructor(private referenceService:ReferenceService,
                private modeleEvenementService:ModeleEvenementService,
                private eventManager:EventManager) {
        this.subscriptions.push(this.eventManager
            .subscribe(EventManagerCte.EVENT_NAME.sectionCallable, (response) => {
                this.resolveSectionsSubscription(response.content);
            }));

        this.subscriptions.push(this.eventManager
            .subscribe(EventManagerCte.EVENT_NAME.invalidSubEmprise, (response) => {
                this.model.hadValidationErrors = true;
            }));

        this.subscriptions.push(this.eventManager
            .subscribe(EventManagerCte.EVENT_NAME.validSubEmprise, (response) => {
                this.model.hadValidationErrors = false;
            }));

    }

    ngOnInit() {
        this.model.ctx = {};
        this.model.ctx.section = {};
        this.field = FieldEvenementCte.FIELD;
        this.model.hadValidationErrors = true; // par défaut.
        this.sens = ModeleValeur.getSens(_.values(ModeleEvenementService.enumerations[EvenementCte.INPUT.SENS].valeursEnumerations));

        // this.model.isEmprise = this.resolveIsEmprise();
        if (EvenementUtils.isSectionCallable(this.evenement.localisant, this.evenement)) {
            this.resolveSectionsSubscription(this.evenement.localisant);
        }
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    //----------------------------------------------------------------------------
    //-- ACTIONS
    //----------------------------------------------------------------------------

    /**
     * Ajoute ou supprime une voie dans une emprise.
     * @param voie
     * @param currentEmprise courante
     * @param sens
     */
    public addOrRemoveVoie(voie:Voie, currentEmprise:Emprise, emprises:Emprise[]) {
        //let emprises = emprisesModelType === 'emprises-1' ? this.evenement.localisant.emprises : this.evenement.localisant.emprisesSensInverse;
        this.resolveAddOrRemoveVoie(voie, currentEmprise, emprises);
        //emprisesModelType === 'emprises-1' ? this.evenement.localisant.emprises = emprises : this.evenement.localisant.emprisesSensInverse = emprises;
    }

    /**
     * Valide l'ajout d'une sous section.
     * @param $event js
     * @param empriseToBeSplited à spliter
     * @param emprises
     * @param sens
     */
    public validateAddSousEmprise($event, empriseToBeSplited:Emprise, emprises:Emprise[], emprisesModelType:string) {
        $event.stopPropagation();
        $event.preventDefault();
        //let emprises = this.evenement.localisant[this.getEmprisesModel(emprisesModelType)];

        if (!this.model.pr || this.model.hadValidationErrors) return;
        let newPr:Pr;
        let newEmprises = [];
        emprises.forEach(emprise => {
            if (this.compareEmprise(emprise, empriseToBeSplited) === 0) {
                newPr = EvenementUtils.stringToPr(this.model.pr);

                let splitedEmprises = this.splitEmprise(empriseToBeSplited, newPr);
                splitedEmprises.newEmprise2.voies = [];
                newEmprises.push(splitedEmprises.newEmprise1);
                newEmprises.push(splitedEmprises.newEmprise2);
            } else {
                newEmprises.push(emprise);
            }
        });
        this.model.pr = undefined;
        this.model.ctx.emprise = {};

        //emprises = newEmprises;
        this.evenement.localisant[this.getEmprisesModel(emprisesModelType)] = newEmprises;
    }

    /**
     * Valide l'ajout d'une sous section.
     * @param $event js
     * @param emprises à spliter
     * @param emprises js
     */
    public cancelAddSousEmprise($event) {
        $event.preventDefault();
        $event.stopPropagation();
        this.model.pr = undefined;
        this.model.ctx.emprise = {};
    }


    /**
     * Supprime une sous emprise.
     * @param  {Emprise}   currentEmprise [description]
     * @param  {Emprise[]} emprises       [description]
     * @return {[type]}                   [description]
     */
    public removeSousEmprise(currentEmprise:Emprise, emprises:Emprise[], emprisesModelType:string) {
        let emprisesModel = this.getEmprisesModel(emprisesModelType);

        let newPr:Pr;
        // Recherche des 2 emprises à merger
        let emprise1ToBeMerged:Emprise;
        let i = -1, indexEmpriseToBeRemoved = -1;
        emprises = emprises.map(emprise => {
            i++;
            if (emprise.codeSection === currentEmprise.codeSection &&
                this.comparePr(emprise.prDebut, currentEmprise.prDebut) === 0 &&
                this.comparePr(emprise.prFin, currentEmprise.prFin) === 0) {
                indexEmpriseToBeRemoved = i;
            }
            if (emprise.codeSection === currentEmprise.codeSection &&
                this.comparePr(currentEmprise.prDebut, emprise.prFin) === 0) {
                emprise.prFin = _.extend(emprise.prFin, {
                    abscisse: currentEmprise.prFin.abscisse,
                    numero: currentEmprise.prFin.numero
                });
            }
            return _.create({}, emprise);
        });
        // l'idée est de merger l'emprise à supprimer avec l'emprise précédente.
        emprise1ToBeMerged = emprises[indexEmpriseToBeRemoved - 1];
        if (!emprise1ToBeMerged) return; //Errueur si merged emprise est nulle ou undefined.
        emprises.splice(indexEmpriseToBeRemoved, 1);

        this.evenement.localisant[emprisesModel] = emprises;
    }

    //----------------------------------------------------------------------------
    //-- LISTENERS
    //----------------------------------------------------------------------------
    /**
     * Détermine si le bouton remove doit etre affiché.
     * @param currentEmprise courante
     * @param emprises
     * @param sections
     */
    public sousEmpriseRemoveBtnDisplayable(currentEmprise:Emprise, sections:any):boolean {
        if (!sections || this.evenement.localisant[FieldEvenementCte.FIELD.typeLocalisant] === EvenementCte.INPUT.TYPES_LOCALISANT_PONCTUEL)
            return false;

        if (this.comparePr(this.evenement.localisant.prDebut, currentEmprise.prDebut) === 0)
            return false;

        let isSectionsSens2 = this.isSectionsSens2(sections);
        let keys = Object.keys(sections).sort();
        if (isSectionsSens2) keys.reverse(); // si sens 2

        let res:boolean = false;
        for (let i = 0; i < keys.length; i++) {
            let section = sections[keys[i]];
            if (currentEmprise.codeSection === section.codeInfo && this.comparePr(section.prDebut, currentEmprise.prDebut) !== 0) {
                res = true;
            }
        }
        ;
        return res;
    }

    /**
     * Retourne les voies disponibles
     * @param currentEmprise
     * @param emprisesModelType { "emprises-1(celles qui sont affichées sur la partie gauche de l'écran )"}
     */
    public getVoiesDisponibles(currentEmprise:Emprise, sections:any) {
        if (!sections || sections.length < 1) return;
        return !!sections[currentEmprise.codeSection] ? this.sortVoies(sections[currentEmprise.codeSection].voies) : [];
    }

    /**
     * Retourne le sens de l'emprise
     * @param emprise
     * @param sections
     */
    public getSens(emprise:Emprise, sections:any) {
        if (!sections) return;
        return !!sections[emprise.codeSection] ? sections[emprise.codeSection].codeSens : '';
    }

    /**
     * Retourne le prFin de l'emprise à Afficher.
     * @param emprise
     * @param sections
     */
    public getPrFinEmprise(emprise:Emprise, sections:any) {
        if (!sections) return;
        if (EvenementUtils.existPr(emprise.prFin)) return emprise.prFin;
        let model:any = {};
        model.sens1 = !this.isSectionsSens2(sections);
        model.keys = Object.keys(sections);
        if (!model.keys || model.keys.length < 1) return {};
        // cas ou l'événnement n'a pas de section
        return model.sens1 ? sections[model.keys[0]].prFin : sections[model.keys[0]].prDebut;
    }


    /**
     * Détermine les voies actives.
     * @param voie
     * @param emprises
     * @param section
     */
    public isActive(voie:string, currentEmprise:Emprise, emprises:Emprise[]) {
        let result = false;
        if (emprises) {
            emprises.forEach(emprise => {
                if (emprise && emprise.voies.length > 0 &&
                    emprise.voies.indexOf(voie) > -1 &&
                    this.compareEmprise(emprise, currentEmprise) === 0) {
                    result = true;
                    return;
                }
            })
        }
        return result;
    }

    /**
     * @return le model {emprises,emprisesSensInverse } dans lequel les emprises sont persistées en fonction du sens de l'évenement et éventuellement de la notion de 2 sens.
     * @param emprisesModelType.
     */
    private getEmprisesModel(emprisesModelType:string):string {
        let impliqueDeuxSens:boolean = this.evenement.localisant.impliqueDeuxSens;
        let sensCroissant:boolean = !this.isSensInverse()
        if (!impliqueDeuxSens) {
            return "emprises";
        } else {
            if (sensCroissant && emprisesModelType === "emprises-1")  return "emprises"; // sens croissant
            if (sensCroissant && emprisesModelType === "emprises-2")  return "emprisesSensInverse"; // sens croissant
            if (!sensCroissant && emprisesModelType === "emprises-1") return "emprisesSensInverse"; // sens décroissant
            if (!sensCroissant && emprisesModelType === "emprises-2") return "emprises";  // sens décroissant
        }
    }


    /**
     * Détermine si on peut ajouter une sous Section
     * @param section
     */
    public allowAddSousEmprise(emprise:Emprise) {
        this.model.ctx.emprise = emprise;
    }


    //----------------------------------------------------------------------------
    //-- UTILS
    //----------------------------------------------------------------------------
    /**
     * Détermine si on peut ajouter une sous Section
     * @param emprise
     * @param pr
     */
    private splitEmprise(emprise:Emprise, pr:Pr):{ [key:string]: any} {
        let newEmprise1 = _.create({}, emprise);
        let newEmprise2 = _.create({}, emprise);
        let emprise1PrFin = _.create({}, emprise.prFin);
        let emprise2PrDebut = _.create({}, emprise.prDebut);

        newEmprise1.prFin = _.extend(emprise1PrFin, {abscisse: pr.abscisse, numero: pr.numero});
        newEmprise2.prDebut = _.extend(emprise2PrDebut, {abscisse: pr.abscisse, numero: pr.numero});
        newEmprise1.identifiant = undefined;
        newEmprise2.identifiant = undefined;
        return {
            newEmprise1: newEmprise1,
            newEmprise2: newEmprise2
        };
    }


    /**
     * Construit un objet de type Emprise.
     */
    private buildEmprise(section:any):Emprise {
        return <Emprise> {
            codeSection: section.codeInfo || section.codeSection,
            prDebut: _.create({}, section.prDebut),
            prFin: _.create({}, section.prFin),
            voies: [],
        }
    }


    /**
     * Construit la liste des paramètres à passer dans l'url.
     * @param typeLocalisant
     * @param axe
     * @param sens
     * @param prDebut
     * @param prFin
     */
    private buildParameters(typeLocalisant:string, axe:string, sens:string, prDebut:Pr, prFin?:Pr):string {
        switch (typeLocalisant) {
            case  EvenementCte.INPUT.TYPES_LOCALISANT_PONCTUEL:
                return `code_axe_debut=${axe}&code_sens_debut=${sens}&pr_debut=${prDebut.numero}%2B${prDebut.abscisse}`;
            case  EvenementCte.INPUT.TYPES_LOCALISANT_ETENDU:
                return `code_axe_debut=${axe}&code_sens_debut=${sens}&pr_debut=${prDebut.numero}%2B${prDebut.abscisse}&code_axe_fin=${axe}&code_sens_fin=${sens}&pr_fin=${prFin.numero}%2B${prFin.abscisse}`;
            case  EvenementCte.INPUT.TYPES_LOCALISANT_LIEU:
                let firstPart = `code_axe_debut=${axe}&code_sens_debut=${sens}&pr_debut=${prDebut.numero}%2B${prDebut.abscisse}`;
                let secondPart = ``;
                if (prFin && prFin.numero && prFin.abscisse) secondPart = `&code_axe_fin=${axe}&code_sens_fin=${sens}&pr_fin=${prFin.numero}%2B${prFin.abscisse}`;
                return `${firstPart}${secondPart}`;
            default:
                return '';
        }
    }

    /**
     * Construit un objet contenant les 2 types de pr en fonction de la localisation.
     * @param localisant de l'évenement.
     * @return un objet contenant les 2 types de pr en fonction de la localisation.
     */
    private getTypePrSensOppose(localisant:any):any {
        switch (this.evenement.localisant[FieldEvenementCte.FIELD.typeLocalisant]) {
            case  EvenementCte.INPUT.TYPES_LOCALISANT_PONCTUEL:
                return {
                    prDebut: this.evenement.localisant.prDebut,
                    prFin: this.evenement.localisant.prFin,
                };
            case  EvenementCte.INPUT.TYPES_LOCALISANT_ETENDU:
            case  EvenementCte.INPUT.TYPES_LOCALISANT_LIEU:
                return {
                    prDebut: this.evenement.localisant.prFin,
                    prFin: this.evenement.localisant.prDebut,
                };
            default:
                return {};
        }
    }

    /**
     * Ajoute ou supprime une voie dans une emprise.
     * @param voie
     * @param currentEmprise courante
     * @param emprises
     */
    private resolveAddOrRemoveVoie(voie:Voie, currentEmprise:Emprise, emprises:Emprise[]) {
        let result:{ [key:string]: any } = {};
        emprises.forEach(emprise => {
            if (this.compareEmprise(emprise, currentEmprise) === 0) {
                let i = emprise.voies.indexOf(voie.codeInfo);
                if (i < 0) {
                    let newVoie = _.create({}, voie);
                    emprise.voies.push(newVoie.codeInfo);
                    result = {
                        action: "add",
                    };
                } else {
                    emprise.voies.splice(i, 1);
                    result = {
                        action: "remove",
                    };
                }
            }
        });
        if (["add", "remove"].indexOf(result.action) > -1) {
            return result;
        }
        let emprise = this.buildEmprise(currentEmprise);
        emprise.voies.push(voie.codeInfo);
        emprises.push(emprise);
        return {
            action: "new",
        };
    }

    /**
     * Détermine les sens (debut , fin) en fonction du sens de l'evt.
     * FIXME non de la methode non pertinent.
     */
    private buildSensOfEmprises():any {
        let impliqueDeuxSens:boolean = this.evenement.localisant.impliqueDeuxSens;
        let sens1:boolean = !EvenementUtils.isSensInverse(this.evenement.localisant[FieldEvenementCte.FIELD.sens]);

        if (!impliqueDeuxSens) {
            return {
                left: this.evenement.localisant[FieldEvenementCte.FIELD.sens]
            }
        } else if (sens1) {
            return {
                left: EvenementCte.INPUT.SENS_CROISSANT,
                right: EvenementCte.INPUT.SENS_DECROISSANT
            }
        } else {
            return {
                left: EvenementCte.INPUT.SENS_DECROISSANT,
                right: EvenementCte.INPUT.SENS_CROISSANT
            }
        }
    }

    /**
     * Détermine les prs début et fin de l'évènement.
     */
    private getPrMinPrMaxEvenement(sections?:any):any {
        let sens1:boolean = !EvenementUtils.isSensInverse(this.evenement.localisant[FieldEvenementCte.FIELD.sens]);
        if (sens1) {
            if (this.evenement.localisant[FieldEvenementCte.FIELD.typeLocalisant] === EvenementCte.INPUT.TYPES_LOCALISANT_PONCTUEL) {
                let keys = Object.keys(sections);
                return {
                    prDebut: _.create({}, sections[keys[0]].prDebut),
                    prFin: _.create({}, sections[keys[0]].prFin)
                }
            } else {
                return {
                    prDebut: this.evenement.localisant.prDebut,
                    prFin: this.evenement.localisant.prFin
                }
            }
        } else {
            if (this.evenement.localisant[FieldEvenementCte.FIELD.typeLocalisant] === EvenementCte.INPUT.TYPES_LOCALISANT_PONCTUEL) {
                let keys = Object.keys(sections);
                return {
                    prDebut: _.create({}, sections[keys[0]].prFin),
                    prFin: _.create({}, sections[keys[0]].prDebut)
                }
            } else {
                return {
                    prDebut: this.evenement.localisant.prFin,
                    prFin: this.evenement.localisant.prDebut
                }
            }
        }
    }


    /**
     * Récupération des sections.
     * @param localisant
     */
    private resolveSectionsSubscription(localisant:Localisant) {
        let model:any = {};
        model.sens1 = !EvenementUtils.isSensInverse(this.evenement.localisant[FieldEvenementCte.FIELD.sens]);
        model.parameters = this.buildParameters(
            this.evenement.localisant[FieldEvenementCte.FIELD.typeLocalisant],
            this.evenement.localisant.prDebut.codeAxe,
            this.buildSensOfEmprises().left, // calcule le sens des emprises de la partie gauche
            this.evenement.localisant.prDebut,
            this.evenement.localisant.prFin
        );

        if (this.evenement.localisant.impliqueDeuxSens) {
            model.typePr = this.getTypePrSensOppose(this.evenement.localisant);
            model.parametersSensInverse = this.buildParameters(
                this.evenement.localisant[FieldEvenementCte.FIELD.typeLocalisant],
                this.evenement.localisant.prDebut.codeAxe,
                this.buildSensOfEmprises().right, // calcule le sens des emprises de la partie droite
                model.typePr.prDebut,
                model.typePr.prFin,
            );

            this.subscriptions.push(this.referenceService.getSections(model.parametersSensInverse)
                .subscribe(response => {
                    if (response) {
                        this.resolveEmprisesModel(response.sections);
                    }
                }));
        }
        this.subscriptions.push(this.referenceService.getSections(model.parameters)
            .subscribe(response => {
                if (response) {
                    this.resolveEmprisesModel(response.sections);
                }
            }));
    }


    /**
     * Determine dans quel model (emprises, ou emprisesSensInverse) seront stockées les emprises à construire.
     * @param sections
     */
    private resolveEmprisesModel(sections:any) {
        let impliqueDeuxSens:boolean = this.evenement.localisant.impliqueDeuxSens;
        let isSectionsSens2:boolean = this.isSectionsSens2(sections);
        let sens1:boolean = !EvenementUtils.isSensInverse(this.evenement.localisant[FieldEvenementCte.FIELD.sens]);// sens evenement

        if (!impliqueDeuxSens) {
            this.sections = this.replacePrMinMaxPrs(_.create({}, sections), this.evenement.localisant);
            this.evenement.localisant.emprises = this.initEmprises(this.sections, this.evenement.localisant.emprises);
        } else if (sens1) { // evt en sens 1
            if (!isSectionsSens2) { // sections en sens 1
                this.sections = this.replacePrMinMaxPrs(_.create({}, sections), this.evenement.localisant);
                this.evenement.localisant.emprises = this.initEmprises(this.sections, this.evenement.localisant.emprises);
            } else { // sections en sens 2
                this.sectionsSensInverse = this.replacePrMinMaxPrs(_.create({}, sections), this.evenement.localisant);
                this.evenement.localisant.emprisesSensInverse = this.initEmprises(this.sectionsSensInverse, this.evenement.localisant.emprisesSensInverse);
            }

        } else if (!sens1) { // evt sens 2
            if (!isSectionsSens2) { // sections en sens 1
                this.sectionsSensInverse = this.replacePrMinMaxPrs(_.create({}, sections), this.evenement.localisant);
                this.evenement.localisant.emprisesSensInverse = this.initEmprises(this.sectionsSensInverse, this.evenement.localisant.emprisesSensInverse);
            } else { // sections en sens 2
                this.sections = this.replacePrMinMaxPrs(_.create({}, sections), this.evenement.localisant);
                this.evenement.localisant.emprises = this.initEmprises(this.sections, this.evenement.localisant.emprises);
            }
        }
    }

    /**
     * Ajoute ou supprime une voie dans une emprise.
     * @param sections
     * @param emprises
     * @param sensInverse
     * @return une collections d'emprises.
     */
    private initEmprises(sections:any, oldEmprises:Emprise[]):Emprise[] {
        if (Object.keys(sections).length === 0) return [];
        let isSensInverse = this.isSectionsSens2(sections);
        // changement de sections
        let res:any = [];
        let newEmprises:any = [];
        // reconstitution des nouvelles emprises.
        let keys = Object.keys(sections).sort();
        if (isSensInverse) keys.reverse(); // si sens 2

        for (let i = 0; i < keys.length; i++) {
            let section = sections[keys[i]];
            let res = this.buildEmprise(section);
            newEmprises.push(res);
        }
        let mapData = {
            ids: {},
            emprises: {},
            voies: {},
        };
        this.sortEmprises(oldEmprises, isSensInverse);
        this.sortEmprises(newEmprises, isSensInverse);
        oldEmprises.forEach(emprise => {
            mapData.emprises[this.buildKeyPr(emprise.prDebut)] = emprise;
            mapData.emprises[this.buildKeyPr(emprise.prFin)] = emprise;
            mapData.voies[this.buildKeyPr(emprise.prDebut)] = emprise.voies;
            mapData.ids[this.buildKeyPr(emprise.prDebut)] = emprise.identifiant;
            mapData.ids[this.buildKeyPr(emprise.prFin)] = emprise.identifiant;
        });

        if(this.evenement.localisant[FieldEvenementCte.FIELD.typeLocalisant] === EvenementCte.INPUT.TYPES_LOCALISANT_PONCTUEL){
            let mapDataCopie = {
                ids: {},
                emprises: {},
                voies: {},
            };
            newEmprises.forEach(emprise => {
                let keyPrDebut = this.buildKeyPr(emprise.prDebut);
                if (mapData.emprises[keyPrDebut]) {
                    mapDataCopie.emprises[keyPrDebut] = emprise;
                    mapDataCopie.voies[keyPrDebut] = mapData.emprises[keyPrDebut].voies;
                    mapDataCopie.ids[keyPrDebut] = mapData.emprises[keyPrDebut].identifiant;
                }else{
                    mapDataCopie.emprises[keyPrDebut] = emprise;
                }

                let keyPrFin = this.buildKeyPr(emprise.prFin);
                if (mapData.emprises[keyPrFin]) {
                    mapDataCopie.emprises[keyPrFin] = emprise;
                    mapDataCopie.voies[keyPrFin] = mapData.emprises[keyPrFin].voies;
                    mapDataCopie.ids[keyPrFin] = mapData.emprises[keyPrFin].identifiant;
                }else{
                    mapDataCopie.emprises[keyPrFin] = emprise;
                }

            });
            keys = this.sortKeyPr(Object.keys(mapDataCopie.emprises), isSensInverse);
            // reconstruction des emprises.
            res = this.rebuildEmprises(keys, mapDataCopie, sections);
        }else{
            newEmprises.forEach(emprise => {
                emprise.identifiant = undefined;
                let keyPrDebut = this.buildKeyPr(emprise.prDebut);
                if (!mapData.emprises[keyPrDebut]) {
                    mapData.emprises[keyPrDebut] = emprise;
                }
                let keyPrFin = this.buildKeyPr(emprise.prFin);
                if (!mapData.emprises[keyPrFin]) {
                    mapData.emprises[keyPrFin] = emprise;
                }
            });
            keys = this.sortKeyPr(Object.keys(mapData.emprises), isSensInverse);
            // reconstruction des emprises.
            res = this.rebuildEmprises(keys, mapData, sections);
            res = this.removeEmprisesOutOfRange(res, isSensInverse);
            res = this.removeVoiesObsoletes(res, oldEmprises);
        }
        return res;
    }

    /**
     * Supprimes les voies obsoletes suite à un éventuel changement des pr de l'évenement.
     * Reset les voies dans les nouvelles emprises.
     * @param emprises
     * @param oldEmprises
     * @return la nouvelle liste d'emprises.
     */
    private removeVoiesObsoletes(emprises:Emprise[], oldEmprises):Emprise[] {
        let cleanedEmprises = emprises.map(emprise => {
            emprise.voies = emprise.voies.filter(voie => {
                let codeSectionVoie = _.last(voie.split("-"));
                codeSectionVoie = _.first(voie.split("."));
                return codeSectionVoie === emprise.codeSection;
            });
            return emprise;
        });

        cleanedEmprises = emprises.map(emprise => {
            oldEmprises.filter(oldEmprise => {
                if (this.compareEmprise(oldEmprise, emprise, true) === 0) {
                    emprise.voies = oldEmprise.voies;
                }
                return this.compareEmprise(oldEmprise, emprise, true) === 0;
            })
            return emprise;
        });
        return cleanedEmprises;
    }


    /**
     * Supprimes les emprises qui sont en dehors de l'intervalle(prDebut et prFin)
     * @param emprises
     * @return la nouvelle liste d'emprises
     */
    private removeEmprisesOutOfRange(emprises:Emprise[], isSensInverse:boolean):Emprise[] {
        if (!EvenementUtils.existPr(this.evenement.localisant.prFin)) return emprises;
        let model:any = {};
        model.prsMinMaxEvt = this.getPrMinPrMaxEvenement();

        return emprises.filter(emprise => {
            let res = this.comparePr(emprise.prDebut, emprise.prFin) !== 0

            if (!isSensInverse) {
                // sens croissant
                res = res && [-1, 0].indexOf(this.comparePr(model.prsMinMaxEvt.prDebut, emprise.prDebut)) > -1; // Tout pr debut est >= à la borne inf
                res = res && [-1, 0].indexOf(this.comparePr(emprise.prFin, model.prsMinMaxEvt.prFin)) > -1; // Tout pr fin est <= à la borne sup
            } else {
                // sens decroissant
                res = res && [-1, 0].indexOf(this.comparePr(emprise.prDebut, model.prsMinMaxEvt.prFin)) > -1; // Tout pr debut est <= à la borne sup
                res = res && [-1, 0].indexOf(this.comparePr(model.prsMinMaxEvt.prDebut, emprise.prFin)) > -1; // Tout pr fin est >= à la borne inf
            }
            return res;
        });
    }

    /**
     * Constitue une clé formée de numero+abscisse
     * @param keys la liste des clés de mapData
     * @param mapData objects contenant tous les prs qui sont dans l'intervalle prDebut et prFin de l'événement.
     * @param sections object sections
     * @return une clé formée de numero+abscisse
     */
    private rebuildEmprises(keys, mapData:any, sections:any):Emprise[] {
        let res:any = [];
        for (let i = 0; i < keys.length - 1; i++) {
            let currentEmprise = mapData.emprises[keys[i]];
            let nextEmprise = keys[i + 1] ? mapData.emprises[keys[i + 1]] : undefined;
            if (!currentEmprise || !nextEmprise) return;

            if (this.buildKeyPr(currentEmprise.prDebut) === keys[i] && this.buildKeyPr(currentEmprise.prFin) === keys[i + 1]) {
                let emprise = this.resolveCodeSection(currentEmprise, sections);
                emprise.voies = mapData.voies[keys[i]] || [];
                emprise.identifiant = mapData.ids[keys[i]];
                res.push(emprise);
            } else {
                // recherche puis reconstitution des pr
                let newEmprise = _.create({}, currentEmprise);
                let prDebut = this.searchPrMap(keys[i], mapData.emprises) || this.searchPrMap(keys[i], sections);
                let prFin = this.searchPrMap(keys[i + 1], mapData.emprises) || this.searchPrMap(keys[i + 1], sections);
                if (prDebut && prFin) {
                    // on a trouvé les prDébut et prFin.
                    newEmprise.prDebut = _.extend({}, prDebut);
                    newEmprise.prFin = _.extend({}, prFin);
                    newEmprise.voies = mapData.voies[keys[i]] || [];
                    newEmprise.identifiant = mapData.ids[keys[i + 1]];
                    res.push(this.resolveCodeSection(newEmprise, sections));
                }
            }
        }
        return res;
    }

    /**
     * Remet le bon code Section correspondant.
     * @param emprise
     * @param sections object sections
     * @return Remet le bon code Section correspondant.
     */
    private resolveCodeSection(emprise:Emprise, sections:any):Emprise {
        for (const key in sections) {
            let section = sections[key];
            if (emprise.codeSection !== section.codeInfo &&
                [-1, 0].indexOf(this.comparePr(section.prDebut, emprise.prDebut)) > -1 &&
                [0, 1].indexOf(this.comparePr(section.prFin, emprise.prFin)) > -1) {
                emprise.codeSection = section.codeInfo;
            }
        }
        return emprise;
    }


    /**
     * Recherche un Pr dans une map à partir de la clé(numero+abscisse)
     * @param cle
     * @return le pr correspondant si trouvé, undefined le cas échéant.
     */
    private searchPrMap(key:string, sections:any):Pr {
        for (const k in sections) {
            if (this.buildKeyPr(sections[k].prDebut) === key) return sections[k].prDebut;
            if (this.buildKeyPr(sections[k].prFin) === key) return sections[k].prFin;
        }
        return undefined;
    }


    /**
     * Constitue une clé formée de numero+abscisse
     * @param pr
     * @return une clé formée de numero+abscisse
     */
    private buildKeyPr(pr:Pr):string {
        return `${pr.numero}+${pr.abscisse}`;
    }

    /**
     * Trie les clés dans le sens passé en paramètres.
     * @param keys
     * @param sensInverse
     * @return les emprises triées dans le sens correspondant.
     */
    private sortKeyPr(keys:string[], sensInverse:boolean):string[] {
        keys = keys.sort((a, b) => {
            let prA = EvenementUtils.stringToPr(a);
            let prB = EvenementUtils.stringToPr(b);
            return this.comparePr(prA, prB)
        });
        if (sensInverse) keys = keys.reverse();
        return keys;
    }


    /**
     * Trie les clés d'une sections dans le sens croissant
     * @param keys
     * @return les emprises triées dans le sens correspondant.
     */
    private sortSectionKeyString(keys:string[]):string[] {
        keys = keys.sort((a, b) => {
            try {
                let aValue = parseInt(a.slice(10, a.length));
                let bValue = parseInt(b.slice(10, b.length));
                return aValue < bValue ? -1 : aValue === bValue ? 0 : 1;
            } catch (e) {
                return a.localeCompare(b);
            }
        });
        return keys;
    }

    /**
     * Trie les emprises dans le sens passé en paramètres.
     * @param emprises
     * @param sensInverse
     * @return les emprises triées dans le sens correspondant.
     */
    private sortEmprises(emprises:Emprise[], sensInverse:boolean):Emprise[] {
        emprises = emprises.sort((a, b) => {
            return this.compareEmprise(a, b, true)
        });
        if (sensInverse) emprises = emprises.reverse();
        return emprises;
    }

    /**
     * Trie les voies.
     * @param voie
     * @return les voies triées.
     */
    private sortVoies(voies:Voie[]):Voie[] {
        voies = voies.sort((a, b) => {
            return this.compareVoie(a, b, EvenementCte.INDICES_VOIES)
        });
        return voies;
    }

    /**
     * Réajuste les bornes inféreures et supérieures des sections
     * @param sections
     * @param localisant
     * @return true si égalité false sinon
     */
    private replacePrMinMaxPrs(sections:any, localisant:Localisant):Section[] {
        if (!sections || Object.keys(sections).length === 0 || !EvenementUtils.existPr(localisant.prDebut))  return sections;
        let model:any = {};
        if (this.evenement.localisant[FieldEvenementCte.FIELD.typeLocalisant] === EvenementCte.INPUT.TYPES_LOCALISANT_PONCTUEL) {
            model.prsMinMaxEvt = this.getPrMinPrMaxEvenement(sections);
            return sections;
        } else {
            model.prsMinMaxEvt = this.getPrMinPrMaxEvenement();
        }

        let keys = Object.keys(sections)
        keys = this.sortSectionKeyString(keys);
        let isSensInverse = this.isSectionsSens2(sections);
        if (isSensInverse) keys.reverse(); // si sens 2
        if (!isSensInverse) {
            sections[keys[0]].prDebut = model.prsMinMaxEvt.prDebut; // sens croissant
        } else {
            sections[keys[0]].prDebut = model.prsMinMaxEvt.prFin; // sens decroissant
        }

        if (!EvenementUtils.existPr(localisant.prFin)) return sections;
        if (!isSensInverse && localisant.prFin) {
            sections[keys[keys.length - 1]].prFin = model.prsMinMaxEvt.prFin; // sens croissant
        } else if (localisant.prFin) {
            sections[keys[keys.length - 1]].prFin = model.prsMinMaxEvt.prDebut; // sens decroissant
        }
        return sections;
    }

    /**
     * Compare 2 emprises via les prs
     * @param emprise1
     * @param emprise2
     * @param dontCompareCodeSection
     * @return -1 si emprise1 < emprise2 , 0 si égalité, 1 si emprise1 > emprise2
     */
    private compareEmprise(emprise1:Emprise, emprise2:Emprise, dontCompareCodeSection?:boolean):number {
        if (!dontCompareCodeSection) {
            if (emprise1.codeSection < emprise2.codeSection) return -1;
            if (emprise1.codeSection > emprise2.codeSection) return 1;
        }

        if (emprise1.prDebut.numero < emprise2.prDebut.numero) return -1;
        if (emprise1.prDebut.numero > emprise2.prDebut.numero) return 1;

        if (emprise1.prDebut.abscisse < emprise2.prDebut.abscisse) return -1;
        if (emprise1.prDebut.abscisse > emprise2.prDebut.abscisse) return 1;

        if (emprise1.prFin.numero < emprise2.prFin.numero) return -1;
        if (emprise1.prFin.numero > emprise2.prFin.numero) return 1;

        if (emprise1.prFin.abscisse < emprise2.prFin.abscisse) return -1;
        if (emprise1.prFin.abscisse > emprise2.prFin.abscisse) return 1;

        return 0;
    }

    /**
     * Compare 2 prs
     * @param pr1
     * @param pr2
     * @return -1 si pr1 < pr2, 0 si égalité et 1 si pr1 > pr2
     */
    private comparePr(pr1:Pr, pr2:Pr):number {

        if (pr1.numero < pr2.numero) return -1;
        if (pr1.numero > pr2.numero) return 1;

        if (pr1.abscisse < pr2.abscisse) return -1;
        if (pr1.abscisse > pr2.abscisse) return 1;

        return 0;
    }

    /**
     * Compare 2 voies
     * @param v1
     * @param v2
     * @param model
     * @return -1 si v1 < v, 0 si égalité et 1 si v1 > v2
     */
    private compareVoie(v1:Voie, v2:Voie, model:any):number {
        if (v1.nom === v2.nom) return 0;
        let compareTo = (a, b) => {
            return a < b ? -1 : a === b ? 0 : 1
        } // fonction lamda
        return compareTo(model[v1.nom.slice(0, 3)], model[v2.nom.slice(0, 3)])
    }

    /**
     * Renvoie true si sens inverse
     * @param sens
     * @return renvoie true si sens inverse
     */
    private isSensInverse(sens?:string):boolean {
        if (!sens) sens = this.evenement.localisant[FieldEvenementCte.FIELD.sens];
        return sens === EvenementCte.INPUT.SENS_DECROISSANT;
    }

    /**
     * Renvoie true si sens inverse
     * @param sens
     * @return renvoie true si sens inverse
     */
    public isSectionsSens2(sections?:any):boolean {
        if (!sections) return false;
        let keys = Object.keys(sections);
        if (!keys || keys.length < 0 || !sections[keys[0]]) return false;

        return sections[keys[0]].codeSens === EvenementCte.INPUT.SENS_DECROISSANT;
    }

    /**
     * Renvoie true si sens inverse
     * @param codeSection
     * @return renvoie true si sens inverse
     */
    public isCodeSectionsSens2(codeSection:string):boolean {
        return codeSection.slice(8, 9) === "2";
    }

    /**
     * Renvoie true le model emprisesSensInverses abritent les emprises principales
     */
    public isSecondaryBlock(sections:any):boolean {
        return this.evenement.localisant.impliqueDeuxSens && this.isSensInverse();
    }

    public getEntites():any {
        let impliqueDeuxSens:boolean = this.evenement.localisant.impliqueDeuxSens;
        let sens1:boolean = !EvenementUtils.isSensInverse(this.evenement.localisant[FieldEvenementCte.FIELD.sens]);// sens evenement
        if (!impliqueDeuxSens) {
            return {
                emprisesPrincipales: this.evenement.localisant.emprises,
                sectionsPrincipales: this.sections,
                emprisesSecondaires: this.evenement.localisant.emprises,
                sectionsSecondaires: this.sections
            }
        } else {
            return {
                emprisesPrincipales: this.evenement.localisant.emprises,
                sectionsPrincipales: this.sections,
                emprisesSecondaires: this.evenement.localisant.emprisesSensInverse,
                sectionsSecondaires: this.sectionsSensInverse
            }
        }
    }
}
