import { Component, OnInit, Input } from '@angular/core';
import { ModeleValeur } from 'app/shared/utils/modele-valeur-builder';
import { ModeleEvenementService } from 'app/core/evenement/services/modele-evenement.service';
import { FieldEvenementCte } from 'app/core/evenement/constantes/field-evenement.constantes';
import { EvenementCte } from 'app/core/evenement/constantes/evenement.constantes';
import { Evenement } from 'app/shared/models/generic/Evenement';
import { CtxCte } from 'app/shared/services/constantes/ctx.constantes';
import * as _ from 'underscore';

@Component({
    selector: 'evenement-secours',
    templateUrl: './evenement-secours.component.html',
    styleUrls: ['./evenement-secours.component.scss']
})
export class EvenementSecoursComponent implements OnInit {

    @Input() evenement:Evenement;
    @Input() currentCtx:string; // mode d'accès à la ressource (lecture, edition)
    isCollapsedContent:boolean = true;
    field:{ [key: string]: any };
    motifsSuiviGendarmerie:string[];
    listeSuivisGendarmerie:any;
    listeSuivisSapeurPompier:any;
    modelSuiviGendarmerie:{ [key: string]: any };
    modelSuiviSapeurPompier:{ [key: string]: any };
    evenementsConjointsSuiviGendarmerie:any = [];
    evenementsConjointsSuiviSapeurPompier:any = ['123415', '123425', '123430'];
    modeleEvenementCte:{ [key: string]: any };
    contexte:any;
    //----------------------------------------------------------------------------
    //-- INITIALISATION
    //----------------------------------------------------------------------------
    constructor(private modeleEvenementService:ModeleEvenementService) {

    }

    ngOnInit() {
        this.contexte = CtxCte.CTX;
        this.field = FieldEvenementCte.FIELD;
        this.modeleEvenementCte = EvenementCte.INPUT;
        this.motifsSuiviGendarmerie = _.values(ModeleEvenementService.enumerations[EvenementCte.INPUT.MOTIFS_SUIVI_GENDARMRIE].valeursEnumerations);

        this.modelSuiviGendarmerie = ModeleValeur.initModel(this.getSubFields(FieldEvenementCte.FIELD.listeSuivisGendarmerie), {});
        this.modelSuiviSapeurPompier = ModeleValeur.initModel(this.getSubFields(FieldEvenementCte.FIELD.listeSuivisSapeurPompier), {});

        if (!this.evenement.attributs[FieldEvenementCte.FIELD.listeSuivisGendarmerie][FieldEvenementCte.FIELD.itemSuiviGendarmerie]) {
            this.evenement.attributs[FieldEvenementCte.FIELD.listeSuivisGendarmerie][FieldEvenementCte.FIELD.itemSuiviGendarmerie] = [];
        }
        if (!this.evenement.attributs[FieldEvenementCte.FIELD.listeSuivisSapeurPompier][FieldEvenementCte.FIELD.itemSuiviSapeurPompier]) {
            this.evenement.attributs[FieldEvenementCte.FIELD.listeSuivisSapeurPompier][FieldEvenementCte.FIELD.itemSuiviSapeurPompier] = [];
        }
        this.listeSuivisGendarmerie = this.evenement.attributs[FieldEvenementCte.FIELD.listeSuivisGendarmerie];
        this.listeSuivisSapeurPompier = this.evenement.attributs[FieldEvenementCte.FIELD.listeSuivisSapeurPompier];
        this.initListeEvtsGroupe(this.evenement.identifiant);
    }

    //----------------------------------------------------------------------------
    //-- EVENEMENTS
    //----------------------------------------------------------------------------
    addSuiviGendarmerie() {
        if (!ModeleValeur.isModelNotEmpty(this.modelSuiviGendarmerie)) {
            return;
        }
        let newItem = {};
        newItem[FieldEvenementCte.FIELD.codeInfoModele] = FieldEvenementCte.FIELD.itemSuiviGendarmerie;
        newItem = _.extend(newItem, this.modelSuiviGendarmerie);
        this.listeSuivisGendarmerie[FieldEvenementCte.FIELD.itemSuiviGendarmerie].push(newItem);
        this.modelSuiviGendarmerie = ModeleValeur.initModel(this.getSubFields(FieldEvenementCte.FIELD.listeSuivisGendarmerie), {}); // reset the model.
    }

    /**
     * Permet de supprimer une intervention.
     * @param index indice de l'élément à supprimer.
     */
    removeSuiviGendarmerie(index) {
        this.listeSuivisGendarmerie[FieldEvenementCte.FIELD.itemSuiviGendarmerie].splice(index, 1);
    }

    addSuiviSapeurPomier() {
        if (!ModeleValeur.isModelNotEmpty(this.modelSuiviSapeurPompier)) {
            return;
        }
        let newItem = {};
        newItem[FieldEvenementCte.FIELD.codeInfoModele] = FieldEvenementCte.FIELD.itemSuiviSapeurPompier;
        newItem = _.extend(newItem, this.modelSuiviSapeurPompier);
        this.listeSuivisSapeurPompier[FieldEvenementCte.FIELD.itemSuiviSapeurPompier].push(newItem);
        this.modelSuiviSapeurPompier = ModeleValeur.initModel(this.getSubFields(FieldEvenementCte.FIELD.listeSuivisSapeurPompier), {}); // reset the model.
    }

    /**
     * Permet de supprimer une intervention.
     * @param index indice de l'élément à supprimer.
     */
    removeSuiviSapeurPomier(index) {
        this.listeSuivisSapeurPompier[FieldEvenementCte.FIELD.itemSuiviSapeurPompier].splice(index, 1);
    }


    //----------------------------------------------------------------------------
    //-- FONCTIONS UTILITAIRES
    //----------------------------------------------------------------------------
    private getSubFields(suivi):string[] {
        switch (suivi) {
            case FieldEvenementCte.FIELD.listeSuivisGendarmerie:
                return [
                    FieldEvenementCte.FIELD.intervenantSuiviGendarmerie,
                    FieldEvenementCte.FIELD.horodateAppelSuiviGendarmerie,
                    FieldEvenementCte.FIELD.horodateArriveeLieuSuiviGendarmerie,
                    FieldEvenementCte.FIELD.horodateQuitteLieuSuiviGendarmerie,
                ];
            case FieldEvenementCte.FIELD.listeSuivisSapeurPompier:
                return [
                    FieldEvenementCte.FIELD.intervenantSuiviSapeurPompier,
                    FieldEvenementCte.FIELD.horodateAppelSuiviSapeurPompier,
                    FieldEvenementCte.FIELD.horodateArriveeLieuSuiviSapeurPompier,
                    FieldEvenementCte.FIELD.horodateQuitteLieuSuiviSapeurPompier,
                ];
            default:
                return [];
        }
    }

    private initListeEvtsGroupe(identifiantEvt:number) {

        this.modeleEvenementService.getListEvtsGroup(identifiantEvt)
            .subscribe(response => {
                if(response && response.length > 0){
                    this.evenementsConjointsSuiviGendarmerie = response[0].evenements;
                }else{
                    this.evenementsConjointsSuiviGendarmerie = response;
                }
            }, error => {
            },
            () => {
                //Finally
            });
    }
}
