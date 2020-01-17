import { Component, OnInit, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AnnuaireCte } from '../constantes/annuaire.constantes';

/**
* Service de gestion des ressources
*/
@Injectable()
export class AnnuaireService {


    static BASE_URL = `${environment.apiUrl}/agorav2/rsc`;  // URL to web api
    static PRIMITIVE_BASE_URL = `${environment.apiUrl}/agorav2/prm`;
    private headers;
    constructor(
        private http: Http) {
        this.headers = new Headers({ 'Content-Type': 'application/json' });
    }



    /**
     * Service de récupération des ressources
     */
    public getModeleRessources(): Observable<any> {

        //Construction de l'url
        const url = `${AnnuaireService.BASE_URL}/modeles_ressources`;

        return this.http.get(url)
            .map(response => response.json());

    }    

    /**
     * Service de récupération des ressources
     */
    public getRessources(): Observable<any> {

        //Construction de l'url
        const url = `${AnnuaireService.BASE_URL}/ressources`;

        return this.http.get(url)
            .map(response => response.json());

    }

    /**
     * Service de récupération des ressources
     */
    public getRessource(codeInfoRessource: string): Observable<any> {

        //Construction de l'url
        const url = `${AnnuaireService.BASE_URL}/ressources/${codeInfoRessource}`;

        return this.http.get(url)
            .map(response => response.json());

    }

    /**
     * Appeler une astreinte
     */
    public appelerRessource(codeRessource: string, codeTypeNumero: string){
        //Construction de l'url
        const codePrimitiveAppelerAstreinte = 'ACT_APPELER_ASTREINTE';
        const url = 
            `${AnnuaireService.PRIMITIVE_BASE_URL}/modeles_primitives/${AnnuaireCte.PRIMITIVE_APPELER_RESSOURCE}/execute?${AnnuaireCte.PRIMITIVE_APPELER_RESSOURCE_PARAM_RESSOURCE}=${codeRessource}&${AnnuaireCte.PRIMITIVE_APPELER_RESSOURCE_PARAM_TYPE_NUMERO}=${codeTypeNumero}`;
        return this.http.post(url,{});
    }




    /**
     * Abonnement à la websocket de notification de modification du 
     * référentiel dynamique
     */
    

}