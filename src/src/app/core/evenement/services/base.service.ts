import { Injectable } from '@angular/core';
import { Headers, RequestOptions, RequestMethod, Http, ResponseOptions, Response, URLSearchParams } from '@angular/http';
import { InterceptableHttp } from '../../../../app/shared/http/interceptable.http';
import { EvenementWebsocketService } from '../../../../app/core/evenement/services/evenement-websocket.service';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import * as _ from 'underscore';
import { environment } from '../../../../environments/environment';
import { Evenement } from '../../../../app/shared/models/generic/Evenement';
import { ResumeEvenement } from '../../../../app/shared/models/generic/ResumeEvenement';
import { Localisant } from '../../../../app/shared/models/generic/Localisant';
import { ConfigGenerale } from '../../../../app/shared/services/config/config.generale';
import { Alerte } from '../../../../app/shared/models/generic/Alerte';
import { AlerteService } from '../../../../app/core/alerte/services/alerte.service';

/**
* Service de gestion des événements.
*/
@Injectable()
export class BaseService {

    private baseUrl = `${environment.apiUrl}/agorav2/evt`;  // URL to web api
    private baseUrlPPO = `${environment.apiUrl}/agorav2/ppo`;
    private baseUrlPRM = `${environment.apiUrl}/agorav2/prm`;  // URL to web api
    private headers;
    constructor(
        private EvenementWebsocketService: EvenementWebsocketService,
        private http: Http,
        private alerteService: AlerteService,

    ) {
        this.headers = new Headers({ 'Content-Type': 'application/json' });
    }


    /**
    * Initialise un evenement à partir d'un type.
    * @param  {string}                typeEvenement  [description]
    * @param  {number}                idAlerteSource [description]
    * @return {Observable<Evenement>}                [description]
    */
    public getPrototypeEvenement(typeEvenement: string, 
                                 idAlerteSource?: number,
                                 codeAxe?: string,
                                 sens?: string,
                                 numero?: number,
                                 abscisse?: number): Observable<Evenement> {
        let url = `${this.baseUrl}/prototype/${typeEvenement}`;

        let queryParameters = new URLSearchParams();
        
        // l'alerte source
        if (idAlerteSource !== undefined) {
            queryParameters.append('identifiant_source',''+idAlerteSource);
        }

        // la position
        if(codeAxe  !== undefined && 
           sens  !== undefined && 
           numero  !== undefined && 
           abscisse  !== undefined){
            queryParameters.append('code_axe',codeAxe); 
            queryParameters.append('sens',sens); 
            queryParameters.append('numero',''+numero); 
            queryParameters.append('abscisse',''+abscisse); 
        }


        
        const options = new RequestOptions();
        options.params = queryParameters;        
        return this.http.get(url, options)
                        .map((response) => {
                                return response.json();
                            });
    }

    /**
    * Metg à jour un événement.
    * @param  {Evenement}             evenement [description]
    * @return {Observable<Evenement>}           [description]
    */
    public updateEvenement(evenement: Evenement): Observable<any> {
        const url = `${this.baseUrl}/evenement`;
        return this.http.put(url, evenement, { headers: this.headers })
        .map(response => response);
    }

    /**
    * Met à jour un type d'événement.
    * @param  {Evenement}             evenement   [description]
    * @param  {string}                nouveauType [description]
    * @return {Observable<Evenement>}             [description]
    */
    public updateTypeEvenement(evenement: Evenement, nouveauType: string): Observable<any> {
        const url = `${this.baseUrl}/evenements/${evenement.identifiant}/changer_type`;
        return this.http.put(url, nouveauType, { headers: this.headers })
        .map(response => response);
    }

    /**
    * Met à jour un état événement.
    * @param  {Evenement}             evenement  [description]
    * @param  {string}                nouvelEtat [description]
    * @return {Observable<Evenement>}            [description]
    */
    public updateEtatEvenement(evenement: Evenement, nouvelEtat: string): Observable<any> {
        const url = `${this.baseUrl}/evenements/${evenement.identifiant}/changer_etat`;
        return this.http.put(url, nouvelEtat, { headers: this.headers })
        .map(response => response);
    }

    /**
    * Récupère la liste des résumés événements.
    * @param  {string}                        type [description]
    * @return {Observable<ResumeEvenement[]>}      [description]
    */
    public getResumes(type: string, etats?: string): Observable<ResumeEvenement[]> {
        const nomMethode = 'BaseService.getResumes';
        console.debug(nomMethode + ' : type = ' + type + ' | etats = ' + etats);


        let url = `${this.baseUrl}/resumes_evenements?types=${type}`;
        if (etats){
            url = `${this.baseUrl}/resumes_evenements?types=${type}&etat=${etats}`;
        }
        return this.http.get(url)
        .map(response => {
            let result = [];
            if (response && response.json()) {
                response = response.json();
                for (const key1 in response) {
                    let item = response[key1];
                    for (const key2 in item) {
                        result.push(item[key2]);
                    }
                }
            }
            return result;
        });
    }

    /**
    * Retourne un évenement.
    * @param  {number}                identifiant [description]
    * @return {Observable<Evenement>}             [description]
    */
    public getEvenement(identifiant: number): Observable<Evenement> {
        return this.http.get(`${this.baseUrl}/evenements/${identifiant}`)
        .map(response => response.json());
    }

    /**
    * Retourne des événements en cours.
    * @return {Observable<any[]>} [description]
    */
    public getEvenementsEnCours(params?: any): Observable<any[]> {
        let url = `${this.baseUrl}/resumes_evenements`;
        if (params) {
            url = `${url}?${params}`;
        }
        return this.http.get(url)
        .map(response => {
            let result: any = [];
            if (response && response.json()["resumesEvenements"]) {
                let data = response.json()["resumesEvenements"];
                for (const key in data) {
                    let item = data[key];
                    result.push({
                        identifiant: item.identifiant,
                        nomLocalisant: item.nomLocalisant,
                        groupe: item.attributs["EVT.GROUPE"]
                    });
                }
            }
            return result;
        });
    }

    /**
     * Récupère la liste des interventions conjointes.
     * @param  {number}            id [description]
     * @return {Observable<any[]>}    [description]
     */
    public getInterventionsConjointes(id: number): Observable<any[]> {
        const params = `etat=EVT_ETAT.ENCOURS|EVT_ETAT.SIGNALE|EVT_ETAT.PREVU`;
        return this.getEvenementsEnCours(params).map(
            response => {
                return response;
            }
        )
    }

    /**
     * @param  {[type]} identifiant [description]
     * @return {[type]}             [description]
     */
    public getListeEvenementWithoutCause(){
        const url = `${this.baseUrl}/evenements?types=EVT-EVT&etat=EVT_ETAT.ENCOURS|EVT_ETAT.SIGNALE|EVT_ETAT.PREVU`;
        return this.http.get(url).map(
            response => {
                if (!response.json() || !response.json()["evenements"]) return [];

                let data =  _.values(response.json()["evenements"]);
                data = data.filter(item => {
                    return !item.attributs["EVT.CAUSE"] || !item.attributs["EVT.CAUSE"].valeur;
                });
                return data;
            }
        )
    }


    /**
    * Change l'état d'une alerte.
    * @param alerte
    * @param etatAlerte état cible
    */
    public createEvenementFromAlerte(alerte: Alerte, etatAlerte: string, linkWithEvenement?: number, typeEvenement?: string): Observable<Response> {
        return this.alerteService.changeAlertState(alerte, etatAlerte, linkWithEvenement, typeEvenement)
        .map(response => response);
    }



    // public getAlerteSource(identifiant) {
    //     return this.alerteService.getAlerte(identifiant)
    //     .map(response => response);
    // }


    /**
    * Renvoie la liste des alertes liées à un événement.
    * @param  {number} identifiant de l'événement.
    * @return {[type]}             la liste des alertes liées à un événement.
    */
    public getAlertesLiees(identifiant: number) {
        return this.alerteService.getAlertesLiees(identifiant);
    }

    public entrerOuSortirModeEdition(identifiant: number, enterOuSortir:string){
        const url = `${this.baseUrlPPO}/editer/evenement/${identifiant}?etat_edition=${enterOuSortir}`;
        return this.http.post(url, {}, { headers: this.headers }).map(response => response.json());
    }



    // localiser un évènement sur le synoptique
    public localiserEvenement(poste: string, idEvt: number, balisage: boolean) {
        const nomMethode = 'localiserEvenement';
        console.debug(nomMethode + ' : poste='+poste+' evt='+idEvt+' balisage='+balisage);

        const codePrimitive = balisage ? 'ACT_AFFICHER_BALISAGE' : 'ACT_AFFICHER_EVENEMENT';
        const codeActionTerrain = balisage ? 'ACT_TER_SSCC_PCC0_AFFICHAGE_BAL' : 'ACT_TER_SSCC_PCC0_AFFICHAGE_EVT';
                
        const url = `${this.baseUrlPRM}/modeles_primitives/${codePrimitive}/execute`;

        let queryParameters = new URLSearchParams();

        //'xxx.0'    code poste operateur
        //'xxx.1'	 Type de commande
        //'xxx.2'	 identifiant de l'evt
        queryParameters.append(codePrimitive + '.0', poste);
        queryParameters.append(codePrimitive + '.1', codeActionTerrain);
        queryParameters.append(codePrimitive + '.2', ''+idEvt);
        const options = new RequestOptions();
        options.params = queryParameters;

        return this.http.post(url, {}, options).map(response => response);
    }    


}
