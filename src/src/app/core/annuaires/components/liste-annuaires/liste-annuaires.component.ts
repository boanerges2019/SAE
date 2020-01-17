import { Component, OnInit } from '@angular/core';
import { Ressource } from '../../../../shared/models/generic/Ressource';
import { AnnuaireService } from '../../services/annuaire.services';
import { ModeleObjetAttribut } from '../../../../shared/models/generic/models';
import { ModeleObjetUtils } from '../../../../shared/utils/modele-objet-utils';
import { AnnuaireCte } from '../../constantes/annuaire.constantes';
import { EventManager } from '../../../../shared/services/event/event-manager.service';

@Component({
  selector: 'liste-annuaires',
  templateUrl: './liste-annuaires.component.html',
  styleUrls: ['./liste-annuaires.component.scss']
})
export class ListeAnnuairesComponent implements OnInit {


  expandable: any = {};
  modeleRessources: Map<string,ModeleObjetAttribut> = new Map(); 
  racines: Array<Ressource> = [];
  organisations: Map<string,Array<Ressource>> = new Map();
  ressources: Map<string,Array<Ressource>>  = new Map();
  ressourceMap: Map<string,Ressource> = new Map();
  ressourceSelectionnee: Ressource;
  isLoading: boolean = false;

  constructor(private annuaireService: AnnuaireService,
              private eventManager:EventManager) { }

  ngOnInit() {
    //Charger les modèles de ressources
    this.chargerModelesRessources();

    //Charger les ressources
    this.rechargerRessources();
  }


  chargerModelesRessources() {
    const nomMethode = 'chargerModelesRessources';
    this.modeleRessources.clear();
    this.annuaireService.getModeleRessources().subscribe(

      response => {
        console.debug(nomMethode+ ' : ' + JSON.stringify(response));
        if (Object.keys(response)) {
          for (const key of Object.keys(response)) {
              const moa = response[key];
              this.modeleRessources.set(key,moa);
          }
        }
      }
    );

  }


  rechargerRessources(){
    const nomMethode = 'rechargerRessources';

    this.expandable = {};
    this.organisations.clear();    
    this.ressources.clear();
    this.isLoading = true;
    this.annuaireService.getRessources().subscribe(
      response => {
        console.debug(nomMethode + ' : ' + Object.keys(response).length + ' lignes');
        if (Object.keys(response)) {
          //On ajoute l'organisation par défaut
          for (const key of Object.keys(response)) {
            const ress: Ressource = response[key];

            if (ModeleObjetUtils.heriteDe(ress.codeModele, AnnuaireCte.CODE_MODELE_ORGANISATION, this.modeleRessources)) {
              // On rattache les organisations aux racines
              let codeRacine = AnnuaireCte.CODE_RACINE_PAR_DEFAUT;
              if(ress.codeOrganisation){
                codeRacine = ress.codeOrganisation;
              }
              if(!this.organisations.has(codeRacine)){
                this.organisations.set(codeRacine, []);
              }              
              this.organisations.get(codeRacine).push(ress);
              this.ressourceMap.set(ress.codeInfo,ress);
              this.expandable[codeRacine] = true;

            } else if (ModeleObjetUtils.heriteDe(ress.codeModele, AnnuaireCte.CODE_MODELE_RACINE, this.modeleRessources) ||
                       (!ress.codeOrganisation)) {
              this.racines.push(ress); 
              this.ressourceMap.set(ress.codeInfo,ress);             
            } else {
              // On rattache les intervenants aux organisation
              let codeOrg = AnnuaireCte.CODE_ORGANISATION_PAR_DEFAUT;
              if (ress.codeOrganisation) {
                codeOrg = ress.codeOrganisation;
              }
              if (!this.ressources.has(codeOrg)) {
                this.ressources.set(codeOrg, []);                
              }
              this.ressources.get(codeOrg).push(ress);
              this.ressourceMap.set(ress.codeInfo,ress);
              this.expandable[codeOrg] = true;
            }
          }
        }
        this.isLoading = false;
      }
    );



  }

  /** 
   * renvoie la liste des organisations sous forme de tableau
  */
  getOrganisations(codeRacine: string): Array<Ressource> {
    const  nomMethode: string = 'getOrganisations';
    let retour: Array<Ressource> = [];
    if(this.organisations.has(codeRacine)){
      retour = this.organisations.get(codeRacine);
    }
    return retour;
  }

  hasOrganisations(codeRacine: string): boolean {
    const  nomMethode: string = 'hasOrganisations'; 
    let retour = false;   
    if(this.organisations.has(codeRacine) && (this.organisations.get(codeRacine).length > 0)){
      retour = true;
    }
    console.debug(nomMethode + ' : ' + retour);
    return retour;    
  }

  hasRessources(codeOrganisation: string): boolean {
    const  nomMethode: string = 'hasRessources'; 
    let retour = false;   
    if(this.ressources.has(codeOrganisation) && (this.ressources.get(codeOrganisation).length > 0)){
      retour = true;
    }
    console.debug(nomMethode + '<'+ codeOrganisation+'> : ' + retour);
    return retour;    
  }

  getRacines(): Array<Ressource> {
    const  nomMethode: string = 'getRacines';
    let retour: Array<Ressource> = [];
    retour = this.racines;
    return retour;
  }






  /**
   * renvoie la liste des ressource d'une organisation
   * @param codeOrganisation 
   */
  getRessourcesOf(codeOrganisation: string): Array<Ressource> {
    const  nomMethode: string = 'getRessourcesOf';
    let retour: Array<Ressource> = [];
    //console.debug(nomMethode + " : " + codeOrganisation);
    if(this.ressources.has(codeOrganisation)){
      retour = this.ressources.get(codeOrganisation);
    }else{
      //console.debug(nomMethode + " : " + codeOrganisation + " : aucune ressources");
    }
    return retour;
  }


  selectionnerRessource(codeRessource: string){
    const nomMethode = 'selectionnerRessource';
    if(this.ressourceMap.has(codeRessource)){
      this.ressourceSelectionnee = this.ressourceMap.get(codeRessource);
      this.eventManager.broadcast(
        {
          name: AnnuaireCte.EVENT_NAME.fireRessourceSelectionnee,
          content: this.ressourceSelectionnee
          // name: AnnuaireCte.EVENT_NAME.fireCodeRessourceSelectionnee,
          // content: this.ressourceSelectionnee.codeInfo
        }
      );
      console.info(nomMethode + ' : ' + JSON.stringify(this.ressourceSelectionnee));
    }
  }

}
